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
  
  // Fixed dimensions for consistency
  const CARD_WIDTH = 320; // px
  
  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      <SectionHeading title="Blog" description="Explore our latest insights" />
      {categories.map(({ key, label }) => {
        const postsByCategory = posts.filter((post) => post.category === key)
        if (postsByCategory.length === 0) return null
        
        // Show all posts in the category for horizontal scrolling
        const displayedPosts = postsByCategory;
        const hasMorePosts = displayedPosts.length > 4;
        
        return (
          <section key={key} className="mb-24">
            <div className="flex justify-between items-center mb-6">
              <SectionHeading title={label} className="mb-0" />
              <a href={`/blog/categories/${key}`} className="text-sm text-white/70 hover:text-white flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            {/* Horizontal scrolling container */}
            <div className="relative">
              {/* Scrollable container with multiple methods to hide scrollbar */}
              <div 
                className="overflow-x-auto hide-scrollbar scrollbar-hide pb-6" 
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {/* Content container */}
                <div className="flex gap-6">
                  {displayedPosts.map((post, idx) => (
                    <div 
                      key={post.slug} 
                      style={{ 
                        width: `${CARD_WIDTH}px`,
                        flexShrink: 0
                      }}
                    >
                      <AnimateInView delay={0.1 * Math.min(idx, 3)}>
                        <BlogCard
                          title={post.title}
                          excerpt={post.excerpt}
                          date={post.date}
                          readTime={post.readTime || ''}
                          author={post.author}
                          image={post.image}
                          slug={post.slug}
                          category={post.category}
                        />
                      </AnimateInView>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Show scroll indicators if there are more than 4 posts */}
              {hasMorePosts && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                  <div className="bg-gradient-to-l from-background to-transparent w-20 h-full"></div>
                  <div className="bg-background/80 text-white/70 rounded-full p-1 backdrop-blur-sm">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          </section>
        )
      })}
    </main>
  )
} 