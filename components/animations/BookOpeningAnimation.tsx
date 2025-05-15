"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Pause, Play } from "lucide-react"
import styles from './BookOpeningAnimation.module.css' // Import the CSS module

export default function BookOpeningAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [animationState, setAnimationState] = useState<
    "initial" | 
    "opening" | 
    "rolling" | 
    "zooming" | 
    "transitioning" | 
    "complete"
  >("initial")
  const [zoomPhase, setZoomPhase] = useState<number>(0) // 0-5 for page sequence
  const [whiteFlash, setWhiteFlash] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0) // 0-100 for progress indicator
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const animationStartTimeRef = useRef<number | null>(null)
  const TOTAL_ANIMATION_DURATION = 4400 // Total duration in ms

  // Animation timeline controller
  const updateProgress = useCallback(() => {
    if (!animationStartTimeRef.current || isPaused) return
    
    const elapsed = Date.now() - animationStartTimeRef.current
    const newProgress = Math.min((elapsed / TOTAL_ANIMATION_DURATION) * 100, 100)
    setProgress(newProgress)

    if (newProgress < 100) {
      requestAnimationFrame(updateProgress)
    }
  }, [isPaused])

  // Initialize animation start time
  useEffect(() => {
    if (animationState === "initial") {
      animationStartTimeRef.current = Date.now()
      requestAnimationFrame(updateProgress)
    }
  }, [animationState, updateProgress])

  // Handle main animation sequence
  useEffect(() => {
    if (isPaused) return // Don't progress animation if paused

    // Sequence: initial → opening → rolling → zooming → transitioning → complete
    if (animationState === "initial") {
      timerRef.current = setTimeout(() => setAnimationState("opening"), 500)
    } else if (animationState === "opening") {
      timerRef.current = setTimeout(() => setAnimationState("rolling"), 1500)
    } else if (animationState === "rolling") {
      timerRef.current = setTimeout(() => setAnimationState("zooming"), 1000)
    } else if (animationState === "zooming") {
      // Start zoom phase sequence
      setZoomPhase(1)
      // Add white flash near end of zoom
      timerRef.current = setTimeout(() => setWhiteFlash(true), 2000)
      timerRef.current = setTimeout(() => setAnimationState("transitioning"), 2400)
    } else if (animationState === "transitioning") {
      timerRef.current = setTimeout(() => setAnimationState("complete"), 500)
    } else if (animationState === "complete") {
      timerRef.current = setTimeout(() => onAnimationComplete(), 250)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [animationState, onAnimationComplete, isPaused])

  // Handle page zoom-through phases
  useEffect(() => {
    if (isPaused) return // Don't progress zoom phases if paused
    if (animationState !== "zooming" || zoomPhase === 0) return

    // Sequence through page phases
    if (zoomPhase < 5) {
      timerRef.current = setTimeout(() => setZoomPhase(prev => prev + 1), 350)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [zoomPhase, animationState, isPaused])

  const skipAnimation = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setWhiteFlash(true)
    setAnimationState("complete") // This will trigger the onAnimationComplete via useEffect
  }

  const togglePause = () => {
    setIsPaused(prev => {
      if (!prev) { // If we're pausing
        // Store the elapsed time when pausing
        if (animationStartTimeRef.current) {
          const elapsed = Date.now() - animationStartTimeRef.current
          animationStartTimeRef.current = Date.now() - elapsed
        }
      } else { // If we're resuming
        // Update the start time to account for the pause duration
        if (animationStartTimeRef.current) {
          animationStartTimeRef.current = Date.now() - (TOTAL_ANIMATION_DURATION * (progress / 100))
          requestAnimationFrame(updateProgress)
        }
      }
      return !prev
    })
  }

  // Get page zoom class based on zoom phase and page index
  const getPageZoomClass = (pageIndex: number) => {
    if (animationState !== "zooming") return ""
    
    // Apply zoom class based on current phase relationship to page
    if (zoomPhase === pageIndex + 1) {
      return styles.pageZoomThrough1
    } else if (zoomPhase === pageIndex) {
      return styles.pageZoomThrough2
    } else if (zoomPhase === pageIndex - 1) {
      return styles.pageZoomThrough3
    } else if (zoomPhase === pageIndex - 2) {
      return styles.pageZoomThrough4
    } else if (zoomPhase === pageIndex - 3) {
      return styles.pageZoomThrough5
    }
    
    return ""
  }

  return (
    <div className={`${styles.animationOverlay} fixed inset-0 flex items-center justify-center ${whiteFlash ? styles.whiteFlash : 'bg-transparent'} z-50 overflow-hidden`}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={togglePause}
          className={`${styles.skipButton} p-2 rounded-full text-white hover:bg-gray-800 transition-colors`}
          aria-label={isPaused ? "Resume animation" : "Pause animation"}
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
        <button
          onClick={skipAnimation}
          className={`${styles.skipButton} p-2 rounded-full text-white hover:bg-gray-800 transition-colors`}
          aria-label="Skip animation"
        >
          <X size={24} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
        <div 
          className="h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className={`${styles.bookAnimationContainer} ${
          animationState === "complete" ? styles.fadeOut : styles.fadeIn
        } ${
          animationState === "zooming" ? styles.zoomActive : ""
        } ${styles.bookContainerOnTop} ${isPaused ? styles.paused : ""}`}
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
          <g className={styles.bookSpine}>
            <rect x="145" y="75" width="10" height="150" fill="white" />
          </g>

          {/* Left cover (back of book) */}
          <g>
            <rect
              x="50"
              y="75"
              width="95"
              height="150"
              fill="black"
              className={`${styles.bookCover} ${styles.bookLeftCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookLeftCoverOpen : ""
              }`}
            />
          </g>

          {/* Right cover (front of book) */}
          <g>
            <rect
              x="155"
              y="75"
              width="95"
              height="150"
              fill="black"
              className={`${styles.bookCover} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
          </g>

          {/* Pages */}
          <g className={styles.pagesContainer}>
            {/* Page 1 - frontmost page */}
            <rect
              x="155"
              y="80"
              width="90"
              height="140"
              className={`${styles.bookPage} ${
                animationState === "rolling" ? styles.bookPageRolling : ""
              } ${animationState === "zooming" ? getPageZoomClass(1) : ""}`}
            />

            {/* Page 2 */}
            <rect
              x="154"
              y="81"
              width="89"
              height="138"
              className={`${styles.bookPage} ${
                animationState === "rolling" ? styles.bookPageRolling : ""
              } ${animationState === "zooming" ? getPageZoomClass(2) : ""}`}
            />

            {/* Page 3 */}
            <rect
              x="153"
              y="82"
              width="88"
              height="136"
              className={`${styles.bookPage} ${
                animationState === "rolling" ? styles.bookPageRolling : ""
              } ${animationState === "zooming" ? getPageZoomClass(3) : ""}`}
            />

            {/* Page 4 */}
            <rect
              x="152"
              y="83"
              width="87"
              height="134"
              className={`${styles.bookPage} ${
                animationState === "rolling" ? styles.bookPageRolling : ""
              } ${animationState === "zooming" ? getPageZoomClass(4) : ""}`}
            />

            {/* Page 5 - innermost page */}
            <rect
              x="151"
              y="84"
              width="86"
              height="132"
              className={`${styles.bookPage} ${
                animationState === "rolling" ? styles.bookPageRolling : ""
              } ${animationState === "zooming" ? getPageZoomClass(5) : ""}`}
            />

            {/* Page content - simplified lines */}
            <g className={`${styles.pageLines} ${animationState === "zooming" ? styles.pageLinesZoomThrough : ""}`}>
              {/* Create pattern of horizontal lines to represent text */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line 
                  key={i}
                  x1="165" 
                  y1={100 + i * 12} 
                  x2={220 + (i % 3) * 15}
                  y2={100 + i * 12} 
                  stroke="black" 
                  strokeWidth="0.5" 
                />
              ))}
            </g>
          </g>

          {/* Simplified sparkles - fewer and more subtle */}
          <g className={styles.sparklesContainer}>
            <path
              d="M 150 130 c -5 -5, 2 -8, 4 -12"
              stroke="white"
              strokeDasharray="3 2"
              className={styles.sparkle1}
            />
            <path
              d="M 180 120 c 8 -4, 2 -10, 15 -8"
              stroke="white"
              strokeDasharray="4 4"
              className={styles.sparkle3}
            />
            <path
              d="M 190 170 c -5 10, 10 5, 5 15"
              stroke="white"
              strokeDasharray="3 3"
              className={styles.sparkle4}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
