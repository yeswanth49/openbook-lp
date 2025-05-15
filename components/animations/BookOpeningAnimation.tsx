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
          {/* Book spine with decorative elements */}
          <g className={styles.bookSpine}>
            <rect x="145" y="75" width="10" height="150" fill="white" />
            {/* Spine decorative lines */}
            <line x1="147" y1="85" x2="153" y2="85" stroke="black" strokeWidth="0.5" />
            <line x1="147" y1="95" x2="153" y2="95" stroke="black" strokeWidth="0.5" />
            <line x1="147" y1="205" x2="153" y2="205" stroke="black" strokeWidth="0.5" />
            <line x1="147" y1="215" x2="153" y2="215" stroke="black" strokeWidth="0.5" />
            {/* Spine title (vertical text) */}
            <text
              x="150"
              y="180"
              fill="black"
              fontSize="8"
              textAnchor="middle"
              transform="rotate(-90, 150, 180)"
              className={styles.spineText}
            >
              OPENBOOK
            </text>
          </g>

          {/* Left cover (back of book) with decorative border */}
          <g>
            <rect
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
            {/* Decorative border for left cover */}
            <path
              d="M 55 80 h 85 v 140 h -85 v -140"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              className={`${styles.decorativeBorder} ${styles.bookLeftCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookLeftCoverOpen : ""
              }`}
            />
            {/* Corner flourishes */}
            <path
              d="M 60 85 h 10 v 10 M 130 85 h -10 v 10 M 60 205 h 10 v -10 M 130 205 h -10 v -10"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              className={`${styles.cornerFlourish} ${styles.bookLeftCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookLeftCoverOpen : ""
              }`}
            />
          </g>

          {/* Right cover (front of book) with decorative elements */}
          <g>
            <rect
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
            {/* Decorative border for right cover */}
            <path
              d="M 160 80 h 85 v 140 h -85 v -140"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              className={`${styles.decorativeBorder} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
            {/* Corner flourishes */}
            <path
              d="M 165 85 h 10 v 10 M 235 85 h -10 v 10 M 165 205 h 10 v -10 M 235 205 h -10 v -10"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              className={`${styles.cornerFlourish} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
            {/* Title design on front cover */}
            <text
              x="202.5"
              y="130"
              fill="white"
              fontSize="14"
              textAnchor="middle"
              className={`${styles.coverTitle} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            >
              OPENBOOK
            </text>
            {/* Decorative line under title */}
            <line
              x1="175"
              y1="140"
              x2="230"
              y2="140"
              stroke="white"
              strokeWidth="0.5"
              className={`${styles.titleUnderline} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
            {/* Decorative symbol */}
            <path
              d="M 202.5 160 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M 202.5 160 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              className={`${styles.decorativeSymbol} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
          </g>

          {/* Pages with enhanced styling */}
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={`page-group-${i}`} className={`${getPageZoomClass(i)} ${animationState === "rolling" ? styles.bookPageRolling : ""}`}>
              <rect
                x={155 - i}
                y={80 + i * 0.5}
                width={90 - i}
                height={140 - i}
                fill="white"
                stroke="black"
                strokeWidth="0.3"
                className={`${styles.bookPage} ${styles.bookPageInitial}`}
              />
              {/* Enhanced page content with more varied text-like lines */}
              {(animationState === "zooming" || animationState === "complete") && (
                <g className={`${styles.pageLines} ${animationState === "zooming" ? styles.pageLinesZoomThrough : ""}`} 
                   style={{ animationDelay: `${i * 0.2 + 0.1}s` }}>
                  {/* Header-like lines */}
                  <line x1={160 - i} y1={90 + i * 0.5} x2={200 - i} y2={90 + i * 0.5} stroke="black" strokeWidth="0.5" />
                  {/* Body text lines with varying lengths */}
                  {Array.from({ length: 8 }).map((_, j) => (
                    <line
                      key={j}
                      x1={160 - i}
                      y1={110 + j * 15 + i * 0.5}
                      x2={230 - i - (Math.random() * 20)}
                      y2={110 + j * 15 + i * 0.5}
                      stroke="black"
                      strokeWidth="0.3"
                      opacity={0.8}
                    />
                  ))}
                </g>
              )}
            </g>
          ))}

          {/* Enhanced sparkle effects */}
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

              {/* Additional decorative elements */}
              <path
                d="M 140 70 q 10 -10 20 0 q 10 10 20 0"
                stroke="white"
                strokeWidth="0.3"
                fill="none"
                className={styles.decorativeSwirl}
              />
              <path
                d="M 120 220 q 5 5 10 0 q 5 -5 10 0"
                stroke="white"
                strokeWidth="0.3"
                fill="none"
                className={styles.decorativeSwirl}
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
