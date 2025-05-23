import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import { getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MDXRemote } from 'next-mdx-remote/rsc'
import mdxComponents from '@/components/mdx-components'
import { unstable_cache } from 'next/cache'

// Dynamically import heavy components with proper error boundaries
const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary').then(mod => ({ default: mod.ErrorBoundary })))

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

// Add ISR revalidation
export const revalidate = 60 // Revalidate this page every 60 seconds

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageParams): Promise<Metadata> {
  try {
    const { slug } = await params
    const posts = await getAllPosts()
    const post = posts.find((p) => p.slug === slug)
    if (!post) {
      return { title: 'Post Not Found' }
    }
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://openbook.ai'),
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

// Enhanced cache with unstable_cache API for better edge caching
const getPostContent = unstable_cache(
  async (category: string, slug: string) => {
    const dirPath = path.join(process.cwd(), 'content', category)
    const filePath = path.join(dirPath, `${slug}.mdx`)
  
    try {
      const source = await fs.readFile(filePath, 'utf8')
      const { content, data } = matter(source)
      return { content, data: data as PostFrontmatter }
    } catch (error) {
      console.error(`Error reading file for slug ${slug}:`, error)
      return null
    }
  },
  ['post-content'], // Cache key namespace
  { revalidate: 60, tags: ['post-content'] } // Revalidate every 60 seconds
)

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
            <Image
              src={cachedPost.data.image}
              alt={`Cover image for ${cachedPost.data.title}`}
              className="object-cover object-center"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              priority
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

  // Use the cached getPostContent function instead of direct file access
  const postData = await getPostContent(category, slug);
  
  if (!postData) {
    notFound();
    return null;
  }
  
  const { content, data: typedData } = postData;
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
          <Image
            src={typedData.image}
            alt={`Cover image for ${typedData.title}`}
            className="object-cover object-center"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
            priority
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
  
  const posts = await getAllPosts() 
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