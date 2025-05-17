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
import { Suspense } from 'react'

// Define types for cached post and frontmatter
interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  readTime: string;
  [key: string]: any; // For other frontmatter fields
}

interface CachedPost {
  content: string;
  data: PostFrontmatter;
}

// Updated in-memory cache with composite key (category-slug)
const postCache = new Map<string, CachedPost>();

// Helper function to create a cache key from category and slug
function createCacheKey(category: string, slug: string): string {
  return `${category}-${slug}`;
}

interface BlogPostPageParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageParams): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error('Error in generateMetadata:', error)
    return { title: 'Post Not Found' }
  }
}

// New async component for loading and displaying the post content
async function PostContentLoader({ slug, category }: { slug: string; category: string }) {
  const cacheKey = createCacheKey(category, slug);
  
  if (postCache.has(cacheKey)) {
    const cachedPost = postCache.get(cacheKey)!;
    // Optional: await Promise.resolve(); to ensure Suspense can yield if cache hit is too fast
    return (
      <article className="prose prose-invert max-w-none">
        <h1>{cachedPost.data.title}</h1>
        <header className="mb-8 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground" aria-label="Post metadata">
          <time dateTime={cachedPost.data.date}>
            {cachedPost.data.date}
          </time>
          <span aria-hidden="true">•</span>
          <p className="author-info m-0">
            <span className="sr-only">Author: </span>
            <span>{cachedPost.data.author}</span>
          </p>
          <span aria-hidden="true">•</span>
          <p className="read-time-info m-0">
            <span className="sr-only">Reading time: </span>
            <span>{cachedPost.data.readTime}</span>
          </p>
        </header>
        <ErrorBoundary>
          <MDXRemote source={cachedPost.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
        </ErrorBoundary>
      </article>
    );
  }

  const filePath = path.join(process.cwd(), 'content', category, `${slug}.mdx`)
  let source: string;
  try {
    source = await fs.promises.readFile(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file for slug ${slug} in PostContentLoader:`, error);
    // Consistent with original behavior: if file read fails, treat as not found.
    // The parent BlogPostPage already checks for postMeta existence.
    // This handles unexpected file system errors for an *expected* file.
    notFound(); 
    return;
  }
  
  // Parse frontmatter and cast data to PostFrontmatter for type safety
  const { content, data } = matter(source);
  const typedData = data as PostFrontmatter;

  postCache.set(cacheKey, { content, data: typedData });

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{typedData.title}</h1>
      <header className="mb-8 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground" aria-label="Post metadata">
        <time dateTime={typedData.date}>
          {typedData.date}
        </time>
        <span aria-hidden="true">•</span>
        <p className="author-info m-0">
          <span className="sr-only">Author: </span>
          <span>{typedData.author}</span>
        </p>
        <span aria-hidden="true">•</span>
        <p className="read-time-info m-0">
          <span className="sr-only">Reading time: </span>
          <span>{typedData.readTime}</span>
        </p>
      </header>
      <ErrorBoundary>
        <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
      </ErrorBoundary>
    </article>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = await params
  
  // It's good to get postMeta here to check existence and pass necessary info (like category)
  // This avoids calling getAllPosts() inside PostContentLoader repeatedly if it were structured differently.
  const posts = getAllPosts() 
  const postMeta = posts.find((p) => p.slug === slug) // Assuming postMeta has a 'category' property
  
  if (!postMeta) {
    notFound()
  }

  const loadingFallback = (
    <div className="prose prose-invert max-w-none flex flex-col items-center justify-center min-h-[300px] py-20">
      <h2 className="text-2xl font-semibold mb-2">Loading Post...</h2>
      <p className="text-muted-foreground">Please wait while we fetch the content.</p>
      {/* You could add an actual spinner component here */}
    </div>
  );

  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      <Suspense fallback={loadingFallback}>
        <PostContentLoader slug={slug} category={postMeta.category} />
      </Suspense>
    </main>
  )
} 