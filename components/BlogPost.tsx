'use client'

import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import mdxComponents from '@/components/mdx-components'

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult
  frontmatter: {
    title: string
    date: string
    author: string
    readTime?: string
  }
}

export default function BlogPost({ mdxSource, frontmatter }: BlogPostProps) {
  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      <article className="prose prose-invert max-w-none">
        <h1>{frontmatter.title}</h1>
        <p className="text-muted-foreground mb-8">
          {frontmatter.date} • {frontmatter.author} • {frontmatter.readTime}
        </p>
        <MDXRemote {...mdxSource} components={mdxComponents} />
      </article>
    </main>
  )
} 