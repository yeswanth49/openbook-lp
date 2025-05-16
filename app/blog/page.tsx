import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import SectionHeading from '@/components/section-heading'
import BlogCard from '@/components/blog-card'
import AnimateInView from '@/components/animate-in-view'

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
          <section key={key} className="mb-16">
            <SectionHeading title={label} />
            <div className="grid md:grid-cols-3 gap-8">
              {postsByCategory.map((post, idx) => (
                <AnimateInView key={post.slug} delay={0.1 * idx}>
                  <BlogCard
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readTime={post.readTime || ''}
                    author={post.author}
                    image={post.image || '/placeholder.svg'}
                    slug={post.slug}
                  />
                </AnimateInView>
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
} 