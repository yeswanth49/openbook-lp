import fs from 'fs'
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
}

const contentDir = path.join(process.cwd(), 'content')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) {
    return []
  }
  const categories = fs.readdirSync(contentDir).filter((name) => fs.statSync(path.join(contentDir, name)).isDirectory())
  let posts: Post[] = []
  categories.forEach((category) => {
    const categoryDir = path.join(contentDir, category)
    fs.readdirSync(categoryDir).forEach((file) => {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(categoryDir, file)
        const source = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(source)
        const slug = file.replace(/\.mdx$/, '')
        posts.push({
          title: data.title,
          excerpt: data.excerpt,
          date: data.date,
          readTime: data.readTime,
          author: data.author,
          image: data.image,
          slug,
          category,
        })
      }
    })
  })
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getLatestPosts(limit: number = 3): Post[] {
  return getAllPosts().slice(0, limit)
} 