import fs from 'fs/promises'
import { existsSync, statSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  title: string
  excerpt: string
  date: string
  readTime?: string
  author: string
  image?: string
  slug: string
  category: string
  featured?: boolean
}

const contentDir = path.join(process.cwd(), 'content')

// Add a cache in memory using globalThis
declare global {
  var cachedPosts: Post[] | undefined
  var lastCacheTime: number | undefined
}

// Cache expiration time in seconds (5 minutes during development)
const CACHE_EXPIRATION = process.env.NODE_ENV === 'development' ? 5 * 60 : 60 * 60 // 1 hour in production

export async function getAllPosts(): Promise<Post[]> {
  // In production, this function will be called during build or with ISR
  // In development, we'll cache to avoid frequent filesystem reads
  
  // Check if we have a valid cache (not expired)
  const now = Date.now()
  if (globalThis.cachedPosts && globalThis.lastCacheTime && 
      now - globalThis.lastCacheTime < CACHE_EXPIRATION * 1000) {
    return globalThis.cachedPosts
  }
  
  // No cache or expired, read from filesystem
  if (!existsSync(contentDir)) {
    return []
  }
  
  try {
    // Get all categories (directories)
    const allDirs = await fs.readdir(contentDir)
    const categories = allDirs.filter(name => 
      statSync(path.join(contentDir, name)).isDirectory()
    )
    
    // Process each category in parallel
    const categoryPromises = categories.map(async (category) => {
      const categoryDir = path.join(contentDir, category)
      
      // Get all MDX files in this category
      const files = await fs.readdir(categoryDir)
      const mdxFiles = files.filter(file => file.endsWith('.mdx'))
      
      // Process each MDX file in parallel
      const postsPromises = mdxFiles.map(async (file) => {
        const filePath = path.join(categoryDir, file)
        const source = await fs.readFile(filePath, 'utf8')
        const { data } = matter(source)
        const slug = file.replace(/\.mdx$/, '')
        
        return {
          title: data.title,
          excerpt: data.excerpt,
          date: data.date,
          readTime: data.readTime,
          author: data.author,
          image: data.image,
          slug,
          category,
          featured: data.featured || false,
        } as Post
      })
      
      // Wait for all files in this category to be processed
      return Promise.all(postsPromises)
    })
    
    // Wait for all categories to be processed and flatten the array
    const nestedPosts = await Promise.all(categoryPromises)
    const posts = nestedPosts.flat()
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Update the cache
    globalThis.cachedPosts = posts
    globalThis.lastCacheTime = now
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getLatestPosts(limit: number = 3): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
} 