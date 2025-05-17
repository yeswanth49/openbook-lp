import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import mdxComponents from '@/components/mdx-components'
import { getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ErrorBoundary } from '@/components/ErrorBoundary'

interface Params {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { slug } = params
    const posts = getAllPosts()
    const post = posts.find((p) => p.slug === slug)
    if (!post) {
      return { title: 'Post Not Found' }
    }
    return {
      title: post.title,
      description: post.excerpt,
    }
  } catch (error) {
    console.error('Error in generateMetadata:', error)
    return { title: 'Post Not Found' }
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = params
  const posts = getAllPosts()
  const postMeta = posts.find((p) => p.slug === slug)
  if (!postMeta) {
    notFound()
  }
  try {
    const filePath = path.join(process.cwd(), 'content', postMeta.category, `${slug}.mdx`)
    const source = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(source)
    return (
      <main className="container mx-auto px-4 md:px-6 py-20">
        <article className="prose prose-invert max-w-none">
          <h1>{data.title}</h1>
          <header className="mb-8" aria-label="Post metadata">
            <time dateTime={data.date} className="text-muted-foreground mr-4">
              {data.date}
            </time>
            <div className="inline text-muted-foreground">
              {data.author} • {data.readTime}
            </div>
          </header>
          <ErrorBoundary>
            <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
          </ErrorBoundary>
        </article>
      </main>
    )
  } catch (error) {
    console.error('Error reading or parsing blog post:', error)
    notFound()
  }
} 