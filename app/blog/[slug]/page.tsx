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
  image?: string;
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
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `/blog/${post.slug}`,
        images: post.image ? [{ url: post.image }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    }
  } catch (error) {
    console.error('Error in generateMetadata:', error)
    return { title: 'Post Not Found' }
  }
}

// Format the date to be more readable
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}

// New async component for loading and displaying the post content
async function PostContentLoader({ slug, category }: { slug: string; category: string }) {
  const cacheKey = createCacheKey(category, slug);
  
  if (postCache.has(cacheKey)) {
    const cachedPost = postCache.get(cacheKey)!;
    
    return (
      <article className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-6">{cachedPost.data.title}</h1>
        <header className="mb-12 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground" aria-label="Post metadata">
          <time dateTime={cachedPost.data.date}>
            {formatDate(cachedPost.data.date)}
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
        
        {cachedPost.data.image && (
          <div className="mb-10 mt-4 relative h-[400px] w-full rounded-xl overflow-hidden">
            <img
              src={cachedPost.data.image}
              alt={`Cover image for ${cachedPost.data.title}`}
              className="object-cover object-center absolute inset-0 w-full h-full"
            />
          </div>
        )}
        
        <ErrorBoundary>
          <div className="mdx-content">
            <MDXRemote 
              source={cachedPost.content} 
              options={{
                parseFrontmatter: false,
                mdxOptions: { 
                  remarkPlugins: [remarkGfm],
                  development: process.env.NODE_ENV === 'development'
                }
              }} 
              components={mdxComponents} 
            />
          </div>
        </ErrorBoundary>
      </article>
    );
  }

  const dirPath = path.join(process.cwd(), 'content', category)
  const filePath = path.join(dirPath, `${slug}.mdx`)
  
  let source: string;
  try {
    source = await fs.promises.readFile(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file for slug ${slug} in PostContentLoader:`, error);
    notFound(); 
    return;
  }
  
  // Parse frontmatter and cast data to PostFrontmatter for type safety
  const { content, data } = matter(source);
  const typedData = data as PostFrontmatter;

  postCache.set(cacheKey, { content, data: typedData });

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-6">{typedData.title}</h1>
      <header className="mb-12 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground" aria-label="Post metadata">
        <time dateTime={typedData.date}>
          {formatDate(typedData.date)}
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
      
      {typedData.image && (
        <div className="mb-10 mt-4 relative h-[400px] w-full rounded-xl overflow-hidden">
          <img
            src={typedData.image}
            alt={`Cover image for ${typedData.title}`}
            className="object-cover object-center absolute inset-0 w-full h-full"
          />
        </div>
      )}
      
      <ErrorBoundary>
        <div className="mdx-content">
          <MDXRemote 
            source={content} 
            options={{
              parseFrontmatter: false,
              mdxOptions: { 
                remarkPlugins: [remarkGfm],
                development: process.env.NODE_ENV === 'development'
              }
            }}
            components={mdxComponents} 
          />
        </div>
      </ErrorBoundary>
    </article>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = await params
  
  const posts = getAllPosts() 
  const postMeta = posts.find((p) => p.slug === slug)
  
  if (!postMeta) {
    notFound()
  }

  const loadingFallback = (
    <div className="prose prose-invert max-w-none flex flex-col items-center justify-center min-h-[300px] py-20">
      <h2 className="text-2xl font-semibold mb-2">Loading Post...</h2>
      <p className="text-muted-foreground">Please wait while we fetch the content.</p>
      <div className="mt-4 w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="container max-w-4xl mx-auto px-6 md:px-8 py-24 relative z-10">
      <Suspense fallback={loadingFallback}>
        <PostContentLoader slug={slug} category={postMeta.category} />
      </Suspense>
      
      <div className="mt-16 pt-8 border-t border-neutral-800">
        <a href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to all posts
        </a>
      </div>
    </main>
  )
} 