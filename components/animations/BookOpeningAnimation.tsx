"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import styles from './BookOpeningAnimation.module.css' // Import the CSS module

export default function BookOpeningAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [animationState, setAnimationState] = useState<"initial" | "opening" | "fluttering" | "complete">("initial")
  // const [showAnimation, setShowAnimation] = useState(true); // Controlled by parent

  useEffect(() => {
    // Start the animation sequence
    if (animationState === "initial") {
      setTimeout(() => setAnimationState("opening"), 500)
    } else if (animationState === "opening") {
      setTimeout(() => setAnimationState("fluttering"), 1500) // Duration of cover opening
    } else if (animationState === "fluttering") {
      setTimeout(() => setAnimationState("complete"), 2500) // Duration of page fluttering
    } else if (animationState === "complete") {
      setTimeout(() => {
        // setShowAnimation(false); // Parent will handle this
        onAnimationComplete();
      }, 1000) // Duration for fade out or final state
    }
  }, [animationState, onAnimationComplete])

  const skipAnimation = () => {
    setAnimationState("complete") // This will trigger the onAnimationComplete via useEffect
  }

  // if (!showAnimation) return null; // Parent controls visibility

  return (
    <div className={`${styles.animationOverlay} fixed inset-0 flex items-center justify-center bg-white z-50`}>
      <button
        onClick={skipAnimation}
        className={`${styles.skipButton} absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors`}
        aria-label="Skip animation"
      >
        <X size={24} />
      </button>

      <div
        className={`${styles.bookAnimationContainer} ${
          animationState === "complete" ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bookSvg}
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
            className={`${styles.bookCover} ${styles.bookLeftCover} ${
              animationState === "opening" || animationState === "fluttering" || animationState === "complete" ? styles.bookLeftCoverOpen : ""
            }`}
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
            className={`${styles.bookCover} ${styles.bookRightCover} ${
              animationState === "opening" || animationState === "fluttering" || animationState === "complete" ? styles.bookRightCoverOpen : ""
            }`}
          />

          {/* Pages */}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect
              key={i}
              x={155 - i * 1} // Adjusted for tighter packing
              y={80 + i * 0.5} // Adjusted for tighter packing
              width={90 - i * 1} // Adjusted
              height={140 - i * 1} // Adjusted
              fill="white"
              stroke="black"
              strokeWidth="0.5" // Thinner lines for pages
              className={`${styles.bookPage} ${
                animationState === "fluttering" || animationState === "complete"
                  ? styles[`bookPageFlutter${i + 1}`]
                  : styles.bookPageInitial
              }`}
              style={{
                transformOrigin: '155px 150px', // Hinge on the right side of the spine for these pages
                animationDelay: animationState === 'fluttering' ? `${i * 0.2}s` : '0s'
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
} 