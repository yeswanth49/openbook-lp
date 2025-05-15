"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function BookOpeningAnimation() {
  const [animationState, setAnimationState] = useState<"initial" | "opening" | "fluttering" | "complete">("initial")
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    // Start the animation sequence
    if (animationState === "initial") {
      setTimeout(() => setAnimationState("opening"), 500)
    } else if (animationState === "opening") {
      setTimeout(() => setAnimationState("fluttering"), 1500)
    } else if (animationState === "fluttering") {
      setTimeout(() => setAnimationState("complete"), 1500)
    } else if (animationState === "complete") {
      setTimeout(() => {
        setShowAnimation(false)
        // Show the landing page content
        document.querySelector(".landing-content")?.classList.remove("hidden")
      }, 1000)
    }
  }, [animationState])

  const skipAnimation = () => {
    setAnimationState("complete")
  }

  if (!showAnimation) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <button
        onClick={skipAnimation}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Skip animation"
      >
        <X size={24} />
      </button>

      <div
        className={`book-animation-container ${
          animationState === "complete" ? "opacity-0" : "opacity-100"
        } transition-opacity duration-1000`}
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="book-svg"
        >
          {/* Book spine */}
          <rect x="145" y="75" width="10" height="150" fill="black" />

          {/* Left cover (back of book) */}
          <rect
            x="50"
            y="75"
            width="95"
            height="150"
            fill="white"
            stroke="black"
            strokeWidth="2"
            className={`book-left-cover ${animationState === "initial" ? "" : "book-left-cover-open"}`}
          />

          {/* Right cover (front of book) */}
          <rect
            x="155"
            y="75"
            width="95"
            height="150"
            fill="white"
            stroke="black"
            strokeWidth="2"
            className={`book-right-cover ${animationState === "initial" ? "" : "book-right-cover-open"}`}
          />

          {/* Pages */}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={155 - i * 2}
              y={80 + i * 2}
              width={90 - i * 2}
              height={140 - i * 4}
              fill="white"
              stroke="black"
              strokeWidth="1"
              className={`book-page ${
                animationState === "fluttering" || animationState === "complete" ? `book-page-flutter-${i + 1}` : ""
              }`}
            />
          ))}

          {/* Simple book decoration */}
          <line x1="70" y1="100" x2="120" y2="100" stroke="black" strokeWidth="1" className="book-decoration" />
          <line x1="70" y1="120" x2="120" y2="120" stroke="black" strokeWidth="1" className="book-decoration" />
          <line x1="70" y1="140" x2="120" y2="140" stroke="black" strokeWidth="1" className="book-decoration" />
          <line x1="70" y1="160" x2="120" y2="160" stroke="black" strokeWidth="1" className="book-decoration" />
          <line x1="70" y1="180" x2="120" y2="180" stroke="black" strokeWidth="1" className="book-decoration" />
        </svg>
      </div>
    </div>
  )
}
