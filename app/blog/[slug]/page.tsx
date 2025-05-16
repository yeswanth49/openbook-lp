import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import mdxComponents from '@/components/mdx-components'
import { getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Params {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const posts = getAllPosts()
  const postMeta = posts.find((p) => p.slug === slug)
  if (!postMeta) {
    notFound()
  }
  const filePath = path.join(process.cwd(), 'content', postMeta.category, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)
  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      <article className="prose prose-invert max-w-none">
        <h1>{data.title}</h1>
        <p className="text-muted-foreground mb-8">
          {data.date} • {data.author} • {data.readTime}
        </p>
        <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
      </article>
    </main>
  )
} 