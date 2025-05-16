"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

// Create a singleton supabase client for the browser
const createBrowserClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

export default function WaitlistCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()

    // Subscribe to changes in the waitlist table
    const channel = supabase
      .channel("waitlist-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "waitlist" }, () => {
        // Trigger animation
        setIsAnimating(true)
        
        // Increment the counter when a new record is inserted
        setCount((prevCount) => prevCount + 1)
        
        // Reset animation after a short delay
        setTimeout(() => setIsAnimating(false), 1000)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex items-center justify-center space-x-1.5 animate-pulse">
      <div className="w-5 h-5 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="12" cy="8" r="5" stroke="black" strokeWidth="1.5" />
          <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="black" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="text-sm text-gray-600 font-medium">
        <span className={`font-bold text-black transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
          {count}
        </span> People have joined
      </div>
    </div>
  )
}
