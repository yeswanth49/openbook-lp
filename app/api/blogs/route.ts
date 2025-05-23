import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

// In-memory cache for blog posts
let cachedPosts: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

// Add revalidation for the API route
export const revalidate = 60 // Revalidate every 60 seconds

// Use GET function with cache options
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    
    // Use caching for the API response
    const now = Date.now()
    if (cachedPosts && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(cachedPosts)
    }

    // Fetch posts with optimized caching
    const posts = await getAllPosts()
    cachedPosts = posts
    cacheTimestamp = now
    
    // Set cache headers for better edge caching
    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts.' }, { status: 500 })
  }
} 