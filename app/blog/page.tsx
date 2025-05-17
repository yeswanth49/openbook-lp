import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import SectionHeading from '@/components/section-heading'
import BlogCard from '@/components/blog-card'
import AnimateInView from '@/components/animate-in-view'
import { ChevronRight } from 'lucide-react'
import '@/styles/scrollbar.css'

export const metadata: Metadata = {
  title: 'Blog - OpenBook',
  description: 'Browse all blog posts',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const categories = [
    { key: 'personal', label: 'Personal Blogs' },
    { key: 'weekly', label: 'Weekly Blogs' },
    { key: 'company', label: 'Company Blogs' },
  ]

  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      <SectionHeading title="Blog" description="Explore our latest insights" />
      {categories.map(({ key, label }) => {
        const postsByCategory = posts.filter((post) => post.category === key)
        if (postsByCategory.length === 0) return null
        return (
          <section key={key} className="mb-24">
            <div className="flex justify-between items-center mb-6">
              <SectionHeading title={label} className="mb-0" />
              <a href={`/blog/categories/${key}`} className="text-sm text-white/70 hover:text-white flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="relative">
              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-6" style={{ minWidth: 'min-content' }}>
                  {postsByCategory.map((post, idx) => (
                    <div key={post.slug} className="min-w-[320px] max-w-[400px]">
                      <AnimateInView delay={0.1 * idx}>
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </main>
  )
} 