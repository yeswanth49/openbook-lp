"use client"

import Header from "@/components/header"
import { HeroHeading } from "@/components/hero-heading"
import { StyledText } from "@/components/styled-text"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StyledDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-8">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-16">
          {/* Example 1: Hero Heading */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Example 1: Hero Heading</h2>
            <div className="p-10 rounded-xl bg-background/50 border">
              <HeroHeading />
            </div>
          </section>

          {/* Example 2: Different Styles */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Example 2: Different Styling Options</h2>
            <div className="p-10 rounded-xl bg-background/50 border space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Simple Color Change:</h3>
                <h2 className="text-3xl font-bold">
                  <StyledText 
                    text="Welcome to WonderKids learning platform"
                    highlightWords={[
                      {
                        word: "WonderKids",
                        className: "text-purple-600",
                      },
                    ]}
                  />
                </h2>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Font Family Change:</h3>
                <h2 className="text-3xl font-bold">
                  <StyledText 
                    text="Create and explore with us"
                    highlightWords={[
                      {
                        word: "Create",
                        className: "font-script text-amber-400",
                      },
                      {
                        word: "explore",
                        className: "font-handwriting text-purple-600",
                      },
                    ]}
                  />
                </h2>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">With Decorations:</h3>
                <h2 className="text-3xl font-bold">
                  <StyledText 
                    text="Discover joy in learning together"
                    highlightWords={[
                      {
                        word: "joy",
                        className: "font-script text-amber-400 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-amber-400/30 after:rounded-full",
                      },
                      {
                        word: "learning",
                        className: "font-handwriting text-purple-600 relative",
                      },
                    ]}
                  />
                </h2>
              </div>
            </div>
          </section>

          {/* Example 3: In Paragraph */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Example 3: In Paragraph Text</h2>
            <div className="p-10 rounded-xl bg-background/50 border">
              <p className="text-lg">
                <StyledText 
                  text="At WonderKids, we believe that every child deserves a fun and engaging learning experience. Our interactive lessons make education exciting and memorable for kids of all ages."
                  highlightWords={[
                    {
                      word: "fun",
                      className: "font-script text-amber-400",
                    },
                    {
                      word: "engaging",
                      className: "font-script text-amber-400",
                    },
                    {
                      word: "exciting",
                      className: "font-handwriting text-purple-600",
                    },
                    {
                      word: "memorable",
                      className: "font-handwriting text-purple-600",
                    },
                  ]}
                />
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
} 