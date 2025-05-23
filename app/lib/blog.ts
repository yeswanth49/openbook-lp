import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  category: string;
  image?: string;
}

// Add a cache for posts per category to avoid repeated file system operations
const categoryPostCache: Record<string, { posts: BlogPost[], timestamp: number }> = {};
const allPostsCache: { posts: BlogPost[], timestamp: number } | null = null;

// Cache expiration time in milliseconds (5 minutes in development, 1 hour in production)
const CACHE_EXPIRATION = process.env.NODE_ENV === 'development' ? 5 * 60 * 1000 : 60 * 60 * 1000;

function getPostsFromCategory(category: string): BlogPost[] {
  // Check if we have a valid cache for this category
  const now = Date.now();
  if (
    categoryPostCache[category] && 
    now - categoryPostCache[category].timestamp < CACHE_EXPIRATION
  ) {
    return categoryPostCache[category].posts;
  }

  const postsDirectory = path.join(process.cwd(), 'app/blog/content', category)
  
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => {
      return fileName.endsWith('.mdx')
    })
    .map((fileName) => {
      // Remove ".mdx" from file name to get id/slug
      const slug = fileName.replace(/\.mdx$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const { data } = matter(fileContents)

      // Validate frontmatter and provide defaults
      const frontmatter = {
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        author: data.author || 'Anonymous',
        readTime: data.readTime || '3 min read',
        excerpt: data.excerpt || '',
        category: category,
        image: data.image || undefined
      }

      // Combine the data with the slug
      return {
        slug,
        ...frontmatter,
      }
    })
    
  // Sort posts by date
  const sortedPosts = allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
  
  // Update cache
  categoryPostCache[category] = {
    posts: sortedPosts,
    timestamp: now,
  };
  
  return sortedPosts;
}

export function getAllPosts(): BlogPost[] {
  // Check if we have a valid cache for all posts
  const now = Date.now();
  if (
    allPostsCache && 
    now - allPostsCache.timestamp < CACHE_EXPIRATION
  ) {
    return allPostsCache.posts;
  }
  
  const categories = ['personal', 'weekly', 'company']
  let allPosts: BlogPost[] = []
  
  for (const category of categories) {
    allPosts = [...allPosts, ...getPostsFromCategory(category)]
  }
  
  const sortedPosts = allPosts.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  });
  
  // Update cache
  (allPostsCache as any) = {
    posts: sortedPosts,
    timestamp: now,
  };
  
  return sortedPosts;
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getPostsFromCategory(category)
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count)
} 