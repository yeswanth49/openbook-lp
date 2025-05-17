"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Brain, Search, Edit, PenTool, KeyRound, Lightbulb, Clock, Sparkles } from "lucide-react"
import Header from "@/components/header"
import CombinedFooter from "@/components/CombinedFooter"
import AnimateInView from "@/components/animate-in-view"
import SectionHeading from "@/components/section-heading"
import { ParticleBackground } from "@/components/particle-background"
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import BookOpeningAnimation from '@/components/animations/BookOpeningAnimation'
import BlogCard from '@/components/blog-card'
import { FeatureCard } from '@/components/feature-card'
import { useRouter } from 'next/navigation'

// Blog post interface for type safety
interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime?: string
  author: string
  image?: string
  slug: string
  category: string
  featured?: boolean
}

export default function LandingPage() {
  const router = useRouter();
  
  // Set this to true to skip the book opening animation during development
  const SKIP_ANIMATION = true
  
  const [showAnimation, setShowAnimation] = useState(!SKIP_ANIMATION)
  const [showLandingContent, setShowLandingContent] = useState(SKIP_ANIMATION)
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [blogError, setBlogError] = useState<string | null>(null)

  useEffect(() => {
    // Optional: Check if animation was already played this session
    // const animationPlayed = sessionStorage.getItem('animationPlayed')
    // if (animationPlayed) {
    //   setShowAnimation(false)
    //   setShowLandingContent(true)
    // }
  }, [])

  useEffect(() => {
    fetch('/api/blogs?featured=true')
      .then(res => res.json())
      .then(data => {
        // If there are featured posts, use them
        const featuredPosts = data.filter((post: BlogPost) => post.featured)
        if (featuredPosts.length > 0) {
          // Take up to 3 featured posts
          setLatestPosts(featuredPosts.slice(0, 3))
        } else {
          // Fallback to latest posts if no featured ones
          setLatestPosts(data.slice(0, 3))
        }
      })
      .catch((err) => {
        console.error('Failed to fetch blog posts:', err)
        setBlogError('Failed to load blog posts. Please try again later.')
      })
  }, [])

  const handleAnimationComplete = () => {
    setShowAnimation(false)
    setShowLandingContent(true)
    // Optional: Mark animation as played for this session
    // sessionStorage.setItem('animationPlayed', 'true')
  }

  return (
    <div>
      {showAnimation ? (
        <BookOpeningAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
        <>
          {showLandingContent && <Header />}
          <div className="landing-content animate-fadeIn">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32">
              <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                  <AnimateInView>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
                      AI Powered Notebook, Built to Learn Faster
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                      OpenBook is an AI-native notebook that helps you learn, retain, and apply knowledge more effectively than ever before.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-white text-black hover:bg-gray-200 group">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        See How It Works
                      </Button>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Key Features Section */}
            <section className="py-20 bg-background/50">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeading
                  title="Speed Is Everything"
                  description="Designed for students and lifelong learners who value their time"
                />
                
                <div className="mt-12 mb-16">
                  <AnimateInView>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                      <div className="aspect-video bg-gradient-to-br from-black to-gray-900 p-6 md:p-8">
                        <div className="flex flex-col h-full">
                          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/10">
                            <div className="flex items-center mb-4">
                              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <div className="ml-4 text-sm text-white/60">OpenBook Interface</div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex">
                                <div className="w-1/3 pr-4">
                                  <div className="h-8 bg-white/5 rounded"></div>
                                  <div className="mt-2 space-y-2">
                                    <div className="h-6 bg-white/5 rounded w-3/4"></div>
                                    <div className="h-6 bg-white/5 rounded"></div>
                                    <div className="h-6 bg-white/5 rounded w-5/6"></div>
                                  </div>
                                </div>
                                <div className="w-2/3 pl-4 border-l border-white/10">
                                  <div className="h-8 bg-white/5 rounded mb-4"></div>
                                  <div className="relative bg-white/5 rounded-lg p-4">
                                    <div className="text-sm text-white/80">How does photosynthesis work?</div>
                                    <div className="mt-3 space-y-2">
                                      <div className="h-4 bg-white/10 rounded w-full"></div>
                                      <div className="h-4 bg-white/10 rounded w-11/12"></div>
                                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                    </div>
                                    <div className="mt-4 flex space-x-3">
                                      <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">Detailed</div>
                                      <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">Simple</div>
                                      <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">Visual</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-20">
              <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8">
                  <AnimateInView delay={0.1}>
                    <FeatureCard
                      id="lightning-fast-interface"
                      icon={KeyRound}
                      title="Lightning-Fast Interface"
                      description="Navigate your entire notebook using just your keyboard. Process and organize information in seconds."
                    />
                  </AnimateInView>
                  
                  <AnimateInView delay={0.2}>
                    <FeatureCard
                      id="ai-powered-learning"
                      icon={Brain}
                      title="AI-Powered Learning"
                      description="Let our AI generate explanations, create practice questions, and provide personalized study materials."
                    />
                  </AnimateInView>
                  
                  <AnimateInView delay={0.3}>
                    <FeatureCard
                      id="smart-search"
                      icon={Search}
                      title="Smart Search"
                      description="Create personalized learning flows that match exactly how you study, memorize, and process information."
                    />
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Interface Preview Section */}
            <section className="py-20 bg-background/50">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeading
                  title="Designed for Better Learning"
                  description="A clean interface that helps you focus on what matters most"
                  highlightWords={[
                    {
                      word: "Better",
                      className: "font-script text-white text-5xl md:text-6xl relative text-3d mx-2",
                    },
                    {
                      word: "Learning",
                      className: "font-script text-white text-5xl md:text-6xl relative textured-underline text-3d",
                    }
                  ]}
                />
                
                <div className="mt-12">
                  <AnimateInView>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                      <div className="bg-gradient-to-br from-black to-gray-900 p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-6">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-white/70 mb-2">Smart Organization</h4>
                              <div className="space-y-2">
                                <div className="h-6 bg-white/10 rounded w-full"></div>
                                <div className="h-6 bg-white/10 rounded w-3/4"></div>
                              </div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-white/70 mb-2">Flexible Note-Taking</h4>
                              <div className="space-y-2">
                                <div className="h-6 bg-white/10 rounded w-full"></div>
                                <div className="h-6 bg-white/10 rounded w-5/6"></div>
                              </div>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-white/70 mb-2">Resource Management</h4>
                              <div className="space-y-2">
                                <div className="h-6 bg-white/10 rounded w-full"></div>
                                <div className="h-6 bg-white/10 rounded w-4/5"></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 h-full">
                            <h4 className="text-sm font-medium text-white/70 mb-4">Interactive Learning Experience</h4>
                            <div className="space-y-4">
                              <div className="p-3 bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                    <Brain className="h-4 w-4 text-white/60" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-4 bg-white/15 rounded w-3/4"></div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-3 bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                    <Lightbulb className="h-4 w-4 text-white/60" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-4 bg-white/15 rounded w-full"></div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-3 bg-white/10 rounded-lg">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                    <Edit className="h-4 w-4 text-white/60" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-4 bg-white/15 rounded w-5/6"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Natural Language Interaction */}
            <section className="py-20">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeading
                  title="AI notebook chat with natural language"
                  description="Ask away"
                />
                
                <div className="mt-10 max-w-3xl mx-auto">
                  <AnimateInView>
                    <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <PenTool className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex-1 p-3 rounded-lg bg-white/10">
                            <p className="text-white/80">Explain quantum computing for beginners</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <PenTool className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex-1 p-3 rounded-lg bg-white/10">
                            <p className="text-white/80">Generate practice questions about cell biology</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <PenTool className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex-1 p-3 rounded-lg bg-white/10">
                            <p className="text-white/80">Create a study schedule for my calculus exam</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <PenTool className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex-1 p-3 rounded-lg bg-white/10">
                            <p className="text-white/80">Find my notes on Renaissance art</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <PenTool className="h-4 w-4 text-white/60" />
                          </div>
                          <div className="flex-1 p-3 rounded-lg bg-white/10">
                            <p className="text-white/80">Summarize all my notes on machine learning</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Productivity Benefits Section */}
            <section className="py-20 bg-background/50">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <AnimateInView>
                    <div className="inline-flex p-1 bg-white/10 rounded-full mb-6">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full">
                        <Clock className="h-4 w-4 text-white/60" />
                        <span className="text-sm font-medium text-white/80">Productivity Benefits</span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                      Learn smarter, not harder
                    </h2>
                    
                    <p className="text-lg text-muted-foreground mb-8">
                      Automate repetitive study tasks with smart templates, scheduled reviews, memory-optimized learning paths, and personalized practice that save hours every week while boosting retention.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-white/60" />
                        <span className="text-white/80">Spaced repetition</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-white/60" />
                        <span className="text-white/80">Active recall</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-white/60" />
                        <span className="text-white/80">Concept mapping</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-white/60" />
                        <span className="text-white/80">Knowledge synthesis</span>
                      </div>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Blog Section */}
            <section className="py-20">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeading title="From Our Blog" description="Latest articles and insights" />

                <div className="mt-12 grid md:grid-cols-3 gap-8">
                  {latestPosts.length > 0 ? (
                    latestPosts.map((post, index) => (
                      <AnimateInView key={post.slug} delay={0.1 * index}>
                        <BlogCard
                          title={post.title}
                          excerpt={post.excerpt}
                          date={post.date}
                          readTime={post.readTime || ''}
                          author={post.author}
                          icon={index === 0 ? Brain : index === 1 ? Lightbulb : PenTool}
                          slug={post.slug}
                        />
                      </AnimateInView>
                    ))
                  ) : (
                    // Fallback for when no posts are loaded
                    <>
                      <AnimateInView delay={0.1}>
                        <BlogCard
                          title="Learning with AI"
                          excerpt="Discover how AI is transforming the education landscape and helping students learn more effectively."
                          date="2023-06-15"
                          readTime="5 min read"
                          author="OpenBook Team"
                          icon={Brain}
                          slug="learning-with-ai"
                        />
                      </AnimateInView>
                      <AnimateInView delay={0.2}>
                        <BlogCard
                          title="The Science of Memory"
                          excerpt="Understanding how the brain processes and retains information can help you optimize your study habits."
                          date="2023-06-10"
                          readTime="4 min read"
                          author="OpenBook Team"
                          icon={Lightbulb}
                          slug="science-of-memory"
                        />
                      </AnimateInView>
                      <AnimateInView delay={0.3}>
                        <BlogCard
                          title="Note-Taking Strategies"
                          excerpt="Effective note-taking methods that can help you capture and organize information for better recall."
                          date="2023-06-05"
                          readTime="3 min read"
                          author="OpenBook Team"
                          icon={PenTool}
                          slug="note-taking-strategies"
                        />
                      </AnimateInView>
                    </>
                  )}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => router.push('/blog')}>
                    View All Articles <ChevronRight className="ml-2 h-4 w-4 inline-block" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-32 md:py-40 bg-background/50">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <AnimateInView>
                    <h2 className="inline-block bg-gradient-to-b from-[#FFFFFF] to-[#1a1a19] bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl lg:text-7xl" style={{ opacity: 1, transform: 'none' }}>
                      Experience the Future of <br />Learning Today
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                      Watch how OpenBook helps you learn in a fraction of the time.
                    </p>
                    <div className="flex justify-center">
                      <Button size="lg" className="bg-white text-black hover:bg-gray-200 group">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>
          </div>
          {showLandingContent && <CombinedFooter />}
        </>
      )}

      {/* Basic styles for fadeIn animation of landing content */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
