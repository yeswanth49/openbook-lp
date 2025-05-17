import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

// In-memory cache for blog posts
let cachedPosts: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    
    const now = Date.now()
    if (cachedPosts && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedPosts)
    }
    const posts = getAllPosts()
    cachedPosts = posts
    cacheTimestamp = now
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts.' }, { status: 500 })
  }
} 