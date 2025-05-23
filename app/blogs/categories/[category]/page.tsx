import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import SectionHeading from '@/components/section-heading'
import BlogCard from '@/components/blog-card'
import AnimateInView from '@/components/animate-in-view'
import { notFound } from 'next/navigation'

type CategoryParams = {
  category: string;
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<CategoryParams>
}): Promise<Metadata> {
  const { category } = await params;
  const categoryLabels: Record<string, string> = {
    'personal': 'Personal Blogs',
    'weekly': 'Weekly Blogs',
    'company': 'Company Blogs',
  }
  
  const label = categoryLabels[category]
  if (!label) return notFound()
  
  return {
    title: `${label} - OpenBook Blog`,
    description: `Browse all ${label.toLowerCase()}`,
  }
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<CategoryParams>
}) {
  const { category } = await params;
  const categoryLabels: Record<string, string> = {
    'personal': 'Personal Blogs',
    'weekly': 'Weekly Blogs',
    'company': 'Company Blogs',
  }
  
  const label = categoryLabels[category]
  
  if (!label) {
    notFound()
  }
  
  const posts = await getAllPosts()
  const filteredPosts = posts.filter((post) => post.category === category)
  
  if (filteredPosts.length === 0) {
    notFound()
  }
  
  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      <SectionHeading 
        title={label} 
        description={`Browse all ${label.toLowerCase()}`} 
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx: number) => (
          <AnimateInView key={post.slug} delay={0.1 * (idx % 3)}>
            <BlogCard
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime || ''}
              author={post.author}
              image={post.image}
              slug={post.slug}
            />
          </AnimateInView>
        ))}
      </div>
    </main>
  )
} 