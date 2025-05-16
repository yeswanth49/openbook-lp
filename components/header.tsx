"use client"

import { useState } from "react"
import { BookOpen, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm"
    >
      <nav className="border-input/50 bg-popover flex w-full max-w-3xl mx-auto items-center justify-between gap-2 rounded-xl border p-2 px-4 md:my-4 my-2">
        <div className="flex items-center gap-4 md:gap-6">
          <Link className="relative cursor-pointer flex items-center gap-1 md:gap-2" href="/">
            <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
              <BookOpen className="h-5 w-5 md:h-[22px] md:w-[22px]" />
            </motion.div>
            <span className="text-base md:text-lg font-bold tracking-tight">OpenBook</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="group flex flex-1 list-none items-center justify-center space-x-1 gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground group bg-transparent rounded-none border-none shadow-none data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover rounded-lg border shadow-md">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link href="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">About</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">Learn about our mission and values</div>
                    </Link>
                    <Link href="#team" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Team</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">Meet the people behind OpenBook</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground group bg-transparent rounded-none border-none shadow-none data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover rounded-lg border shadow-md">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link href="#features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Features</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">Explore our platform features</div>
                    </Link>
                    <Link href="#how-it-works" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">How It Works</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">Learn how our platform works</div>
                    </Link>
                    <Link href="#blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Blog</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">Read our latest articles</div>
                    </Link>
                    <Link href="/styled-demo" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Styled Text Demo</div>
                      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">See examples of styled text components</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link target="_blank" href="https://x.com/GoOpenBook">
                  <Button variant="ghost" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground px-3 py-1.5 h-7">
                    Twitter
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="hidden md:flex gap-2">
        <Link target="_blank" href="https://cal.com/team/0">
            <Button variant="ghost" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground px-4 py-2 h-8">
              Contact Us
            </Button>
          </Link>
          <Link href="https://goopenbook.in">
            <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 h-8">
              Sign In
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-popover border-t border-input/50 mx-4 rounded-xl mb-2"
        >
          <div className="p-2 space-y-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div className="font-medium text-xs w-full mb-1">Company</div>
              <Link
                href="/about"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#team"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <div className="font-medium text-xs w-full mb-1">Resources</div>
              <Link
                href="#features"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#blog"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/styled-demo"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Styled Text Demo
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <Link
                target="_blank"
                href="https://x.com/GoOpenBook"
                className="text-xs font-medium text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Twitter
              </Link>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2 rounded-none">
                  Sign In
                </Button>
                <Button size="sm" className="text-xs h-6 px-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
