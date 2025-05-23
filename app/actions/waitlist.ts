'use server'

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
)

export interface WaitlistEntry {
  email: string
  name?: string
  referrer?: string
}

export async function addToWaitlist(data: WaitlistEntry): Promise<{ success: boolean; error?: string }> {
  try {
    if (!data.email) {
      return { success: false, error: 'Email is required' }
    }

    // Insert the waitlist entry into the database
    const { error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: data.email,
          name: data.name || null,
          referrer: data.referrer || null,
          joined_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Error adding to waitlist:', error)
      
      // Check if it's a duplicate entry
      if (error.code === '23505') {
        return { success: false, error: 'This email is already on the waitlist' }
      }
      
      return { success: false, error: 'Failed to join waitlist. Please try again later.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error adding to waitlist:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again later.' }
  }
}

/**
 * Get the current waitlist count
 */
export async function getWaitlistCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error getting waitlist count:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Unexpected error getting waitlist count:', error)
    return 0
  }
} 