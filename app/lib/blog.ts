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

function getPostsFromCategory(category: string): BlogPost[] {
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
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPosts(): BlogPost[] {
  const categories = ['personal', 'weekly', 'company']
  let allPosts: BlogPost[] = []
  
  for (const category of categories) {
    allPosts = [...allPosts, ...getPostsFromCategory(category)]
  }
  
  return allPosts.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getPostsFromCategory(category)
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count)
} 