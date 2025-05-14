"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Brain, BarChart3, Globe, MessageSquare, CheckCircle, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TestimonialCard from "@/components/testimonial-card"
import FeatureCard from "@/components/feature-card"
import HowItWorksStep from "@/components/how-it-works-step"
import { ParticleBackground } from "@/components/particle-background"
import ContactForm from "@/components/contact-form"
import AnimateInView from "@/components/animate-in-view"
import SectionHeading from "@/components/section-heading"
import BlogCard from "@/components/blog-card"
import { motion } from "framer-motion"

export default function LandingPage() {
  // Blog posts data
  const blogPosts = [
    {
      title: "How AI is Transforming Education in 2025",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way students learn and teachers teach in the modern classroom.",
      date: "May 2, 2025",
      readTime: "5 min read",
      author: "Dr. Sarah Chen",
      image: "/placeholder.svg?height=300&width=500",
      slug: "ai-transforming-education-2025",
    },
    {
      title: "5 Effective Study Techniques Backed by Science",
      excerpt:
        "Learn about evidence-based study methods that can help you retain information better and improve your academic performance.",
      date: "April 28, 2025",
      readTime: "7 min read",
      author: "Prof. Michael Rivera",
      image: "/placeholder.svg?height=300&width=500",
      slug: "effective-study-techniques",
    },
    {
      title: "The Future of Personalized Learning Paths",
      excerpt:
        "Explore how adaptive learning technologies are creating customized educational experiences for students worldwide.",
      date: "April 15, 2025",
      readTime: "6 min read",
      author: "Aisha Johnson",
      image: "/placeholder.svg?height=300&width=500",
      slug: "future-personalized-learning",
    },
  ]

  return (
    <div className="min-h-screen bg-background dot-pattern">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <AnimateInView className="md:w-1/2 z-10" direction="left">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-white/10 text-white">
              Backed by Y Combinator
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
              AI Powered Notebook,
              <br />
              Built to learn
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg">
              Personalized learning that adapts to your needs—accessible anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 group">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </AnimateInView>
          <AnimateInView className="md:w-1/2 mt-10 md:mt-0 relative" direction="right" delay={0.2}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
            >
              {/* GRADIENT: Hero split-screen gradient - to remove, change to "bg-black" */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-xl">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 p-6 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-4 w-full max-w-[200px] opacity-60">
                      <div className="h-4 w-3/4 bg-gray-700 rounded mb-3"></div>
                      <div className="h-20 w-full bg-gray-700 rounded mb-3"></div>
                      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="w-1/2 p-6 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-4 w-full max-w-[200px] relative overflow-hidden">
                      <div className="h-4 w-3/4 bg-gray-700 rounded mb-3"></div>
                      <div className="h-20 w-full bg-white bg-opacity-10 rounded mb-3 flex items-center justify-center">
                        <span className="text-xs text-white opacity-80">f(x) = ∫ e^x dx</span>
                      </div>
                      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
                      <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white bg-opacity-5 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimateInView>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Powerful Features for Academic Success"
            description="OpenBook combines cutting-edge AI with proven learning methodologies to help you excel."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimateInView delay={0.1}>
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10" />}
                title="Real-time Chat Support"
                description="Get instant answers to your academic questions across all subjects, 24/7."
              />
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <FeatureCard
                icon={<Brain className="h-10 w-10" />}
                title="Adaptive Learning"
                description="Personalized learning paths that adjust based on your strengths and areas for improvement."
              />
            </AnimateInView>
            <AnimateInView delay={0.3}>
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10" />}
                title="Immediate Feedback"
                description="Practice with instant feedback to accelerate your learning and retention."
              />
            </AnimateInView>
            <AnimateInView delay={0.4}>
              <FeatureCard
                icon={<Globe className="h-10 w-10" />}
                title="Cross-platform Access"
                description="Learn seamlessly across all your devices, whether at home or on the go."
              />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Traditional Learning vs OpenBook"
            description="Students worldwide face common challenges. OpenBook provides the solution."
          />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimateInView direction="left">
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">Traditional Learning Challenges</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 text-red-500 mt-1">✖</div>
                    <p className="text-muted-foreground">Limited access to quality academic support</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 text-red-500 mt-1">✖</div>
                    <p className="text-muted-foreground">
                      One-size-fits-all approach that doesn't adapt to individual needs
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 text-red-500 mt-1">✖</div>
                    <p className="text-muted-foreground">Delayed feedback on practice and assessments</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 text-red-500 mt-1">✖</div>
                    <p className="text-muted-foreground">Time-bound learning restricted to specific hours</p>
                  </li>
                </ul>
              </Card>
            </AnimateInView>

            <AnimateInView direction="right" delay={0.2}>
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-4">OpenBook Solutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-green-400 mt-1" />
                    <p className="text-muted-foreground">Instant, AI-powered academic support available 24/7</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-green-400 mt-1" />
                    <p className="text-muted-foreground">Personalized learning paths that adapt to your progress</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-green-400 mt-1" />
                    <p className="text-muted-foreground">Immediate feedback on practice questions and assessments</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-green-400 mt-1" />
                    <p className="text-muted-foreground">Learn anytime, anywhere on any device</p>
                  </li>
                </ul>
              </Card>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="How OpenBook Works"
            description="Getting started is simple. Follow these three easy steps."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <AnimateInView delay={0.1}>
              <HowItWorksStep
                number="1"
                title="Sign Up"
                description="Create your account in seconds to access the full platform."
                image="/placeholder.svg?height=200&width=300"
              />
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <HowItWorksStep
                number="2"
                title="Chat with OpenBook"
                description="Ask questions and get instant academic support across subjects."
                image="/placeholder.svg?height=200&width=300"
              />
            </AnimateInView>
            <AnimateInView delay={0.3}>
              <HowItWorksStep
                number="3"
                title="Track Progress"
                description="Monitor your learning journey and improve with personalized insights."
                image="/placeholder.svg?height=200&width=300"
              />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="What Students Are Saying"
            description="Students from over 30 countries trust OpenBook for academic success."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <AnimateInView delay={0.1}>
              <TestimonialCard
                quote="OpenBook made tackling complex concepts simple and engaging! I've improved my grades significantly."
                name="Priya S."
                location="India"
                image="/placeholder.svg?height=100&width=100"
              />
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <TestimonialCard
                quote="The personalized learning approach helped me understand difficult topics at my own pace. Highly recommend!"
                name="Michael T."
                location="United States"
                image="/placeholder.svg?height=100&width=100"
              />
            </AnimateInView>
            <AnimateInView delay={0.3}>
              <TestimonialCard
                quote="Having 24/7 access to academic support has been a game-changer for my studies."
                name="Sophia L."
                location="Singapore"
                image="/placeholder.svg?height=100&width=100"
              />
            </AnimateInView>
          </div>

          <AnimateInView className="mt-16 text-center" delay={0.4}>
            <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 font-medium text-muted-foreground">
                4.9/5 average rating from over 10,000 students
              </span>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Latest from Our Blog"
            description="Insights, tips, and the latest trends in education and learning technology."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimateInView key={post.slug} delay={0.1 * (index + 1)}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  author={post.author}
                  image={post.image}
                  slug={post.slug}
                />
              </AnimateInView>
            ))}
          </div>

          <AnimateInView className="mt-12 text-center">
            <Button variant="outline" size="lg" className="group border-white/20 text-white hover:bg-white/10">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </AnimateInView>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateInView>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Join Thousands of Students Worldwide—Start Learning Smarter Today!
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Experience the future of learning with OpenBook's AI-powered platform. Get instant academic support,
                personalized learning paths, and track your progress—all in one place.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                <ContactForm />
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
