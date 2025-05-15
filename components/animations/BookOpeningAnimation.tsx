"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import styles from './BookOpeningAnimation.module.css' // Import the CSS module

export default function BookOpeningAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [animationState, setAnimationState] = useState<"initial" | "opening" | "zooming" | "complete">("initial")
  // const [showAnimation, setShowAnimation] = useState(true); // Controlled by parent

  useEffect(() => {
    // Sequence: initial -> opening -> zooming -> complete
    let timeoutId: ReturnType<typeof setTimeout>
    if (animationState === "initial") {
      timeoutId = setTimeout(() => setAnimationState("opening"), 500)
    } else if (animationState === "opening") {
      timeoutId = setTimeout(() => setAnimationState("zooming"), 1500) // After cover opening
    } else if (animationState === "zooming") {
      timeoutId = setTimeout(() => setAnimationState("complete"), 2000) // Duration of final zoom
    } else if (animationState === "complete") {
      timeoutId = setTimeout(() => onAnimationComplete(), 500) // Fade out and complete
    }
    return () => clearTimeout(timeoutId)
  }, [animationState, onAnimationComplete])

  const skipAnimation = () => {
    setAnimationState("complete") // This will trigger the onAnimationComplete via useEffect
  }

  // if (!showAnimation) return null; // Parent controls visibility

  return (
    <div className={`${styles.animationOverlay} fixed inset-0 flex items-center justify-center bg-transparent z-50 overflow-hidden`}>
      <button
        onClick={skipAnimation}
        className={`${styles.skipButton} absolute top-4 right-4 p-2 rounded-full text-white hover:bg-gray-800 transition-colors`}
        aria-label="Skip animation"
      >
        <X size={24} />
      </button>

      <div
        className={`${styles.bookAnimationContainer} ${
          animationState === "complete" ? styles.fadeOut : styles.fadeIn
        } ${
          animationState === "zooming" ? styles.zoomActive : ""
        } ${styles.bookContainerOnTop}`}
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
          <rect x="145" y="75" width="10" height="150" fill="white" />

          {/* Left cover (back of book) */}
          <g>
            <rect // Outer Left Cover
              x="50"
              y="75"
              width="95"
              height="150"
              fill="black"
              stroke="white"
              strokeWidth="2"
              className={`${styles.bookCover} ${styles.bookLeftCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookLeftCoverOpen : ""
              }`}
            />
            <rect // Inner Left Cover Lining (visible when open)
              x="50"
              y="75"
              width="95"
              height="150"
              fill="black" // Should be black
              className={`${styles.bookCoverLining} ${styles.bookLeftCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookLeftCoverOpen : ""
              }`}
              style={{ transformOrigin: '100% 50%', transform: 'scaleX(-1) translate(-95px, 0) translate(95px, 0)' }} // Flip and position for inside
            />
          </g>

          {/* Right cover (front of book) */}
          <g>
            <rect // Outer Right Cover
              x="155"
              y="75"
              width="95"
              height="150"
              fill="black"
              stroke="white"
              strokeWidth="2"
              className={`${styles.bookCover} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
            <rect // Inner Right Cover Lining
              x="155"
              y="75"
              width="95"
              height="150"
              fill="black" // Should be black
              className={`${styles.bookCoverLining} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
              style={{ transformOrigin: '0% 50%', transform: 'scaleX(-1) translate(95px, 0) translate(-95px, 0) ' }} // Flip and position for inside
            />
          </g>

          {/* Pages */}
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={`page-group-${i}`}>
              <rect
                x={155 - i}
                y={80 + i * 0.5}
                width={90 - i}
                height={140 - i}
                fill="white"
                stroke="black"
                className={`${styles.bookPage} ${styles.bookPageInitial}`}
              />
              {/* Subtle page content illustration: 3 horizontal lines */}
              {animationState === "zooming" && (
                <g className={styles.pageLines} style={{ animationDelay: `${i * 0.2 + 0.1}s` }}>
                  <line x1={160 - i} y1={100 + i * 0.5} x2={230 - i} y2={100 + i * 0.5} stroke="black" strokeWidth="0.3" />
                  <line x1={160 - i} y1={120 + i * 0.5} x2={225 - i} y2={120 + i * 0.5} stroke="black" strokeWidth="0.3" />
                  <line x1={160 - i} y1={140 + i * 0.5} x2={235 - i} y2={140 + i * 0.5} stroke="black" strokeWidth="0.3" />
                </g>
              )}
            </g>
          ))}

          {/* Sparkle/Dust Elements */}
          {animationState === "opening" && (
            <g className={styles.sparklesContainer}>
              <circle cx="100" cy="100" r="2.5" fill="white" className={styles.sparkle1} />
              <circle cx="120" cy="180" r="1.5" fill="white" className={styles.sparkle2} />
              <circle cx="200" cy="90" r="2" fill="white" className={styles.sparkle3} />
              <circle cx="220" cy="190" r="1.5" fill="white" className={styles.sparkle4} />
              <path d="M 150 60 q 5 -10 10 0 t 10 0" stroke="white" strokeWidth="0.7" fill="none" className={styles.swirl} />

              <circle cx="80" cy="150" r="2" fill="white" className={styles.sparkle5} />
              <circle cx="230" cy="130" r="1.5" fill="white" className={styles.sparkle6} />
              <circle cx="150" cy="230" r="2.2" fill="white" className={styles.sparkle7} />

              <path d="M 70 80 C 75 70, 85 70, 90 80" stroke="white" strokeWidth="0.5" fill="none" className={styles.swirl2} />
              <path d="M 210 220 C 215 210, 225 210, 230 220 S 235 230, 230 240" stroke="white" strokeWidth="0.5" fill="none" className={styles.swirl3} />
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
