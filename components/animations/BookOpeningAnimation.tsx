"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Pause, Play } from "lucide-react"
import styles from './BookOpeningAnimation.module.css'
import { AnimationTimeline, AnimationState, AnimationPhase } from './AnimationTimeline'

const ANIMATION_PHASES: AnimationPhase[] = [
  { state: 'initial', duration: 500 },
  { state: 'opening', duration: 1500 },
  { state: 'rolling', duration: 1000 },
  { state: 'zooming', duration: 2000 },
  { state: 'transitioning', duration: 500 },
  { state: 'complete', duration: 250 }
]

export default function BookOpeningAnimation({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [animationState, setAnimationState] = useState<AnimationState>("initial")
  const [zoomPhase, setZoomPhase] = useState<number>(0)
  const [whiteFlash, setWhiteFlash] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const timelineRef = useRef<AnimationTimeline | null>(null)

  // Handle keyboard controls
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case ' ':
      case 'k':
        // Space or K to toggle pause/play (common video player controls)
        event.preventDefault()
        togglePause()
        break
      case 'Escape':
        // Escape to skip animation
        event.preventDefault()
        skipAnimation()
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    // Add keyboard event listeners
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  useEffect(() => {
    // Initialize timeline
    timelineRef.current = new AnimationTimeline(ANIMATION_PHASES, (state) => {
      setAnimationState(state)
      if (state === 'zooming') {
        setZoomPhase(1)
      } else if (state === 'transitioning') {
        setWhiteFlash(true)
      } else if (state === 'complete') {
        onAnimationComplete()
      }
    })

    // Start animation
    timelineRef.current.start()

    return () => {
      timelineRef.current?.cleanup()
    }
  }, [onAnimationComplete])

  // Handle zoom phase transitions
  useEffect(() => {
    if (isPaused || animationState !== "zooming" || zoomPhase === 0) return
    
    const timeout = setTimeout(() => {
      if (zoomPhase < 5) {
        setZoomPhase(prev => prev + 1)
      }
    }, 350)
    
    return () => clearTimeout(timeout)
  }, [zoomPhase, animationState, isPaused])

  const skipAnimation = () => {
    timelineRef.current?.skip()
  }

  const togglePause = () => {
    setIsPaused(prev => {
      const newState = !prev
      if (newState) {
        timelineRef.current?.pause()
      } else {
        timelineRef.current?.resume()
      }
      return newState
    })
  }

  // Get page zoom class based on zoom phase and page index
  const getPageZoomClass = (pageIndex: number) => {
    if (animationState !== "zooming") return ""
    
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
    <div 
      className={`${styles.animationOverlay} fixed inset-0 flex items-center justify-center ${whiteFlash ? styles.whiteFlash : 'bg-transparent'} z-50 overflow-hidden`}
      role="presentation"
      aria-label="Book opening animation"
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={togglePause}
          className={`${styles.skipButton} p-2 rounded-full text-white hover:bg-gray-800 transition-colors`}
          aria-label={isPaused ? "Resume animation (press Space or K)" : "Pause animation (press Space or K)"}
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
        <button
          onClick={skipAnimation}
          className={`${styles.skipButton} p-2 rounded-full text-white hover:bg-gray-800 transition-colors`}
          aria-label="Skip animation (press Escape)"
        >
          <X size={24} />
        </button>
      </div>

      <div
        className={`${styles.bookAnimationContainer} ${
          animationState === "complete" ? styles.fadeOut : styles.fadeIn
        } ${
          animationState === "zooming" ? styles.zoomActive : ""
        } ${styles.bookContainerOnTop} ${isPaused ? styles.paused : ""}`}
        role="img"
        aria-label={`Book animation in ${animationState} state${isPaused ? ', paused' : ''}`}
      >
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.bookSvg}
          role="presentation"
        >
          {/* Book spine */}
          <rect x="145" y="75" width="10" height="150" fill="white" />

          {/* Left cover (back of book) */}
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
            {/* Add decorative border elements */}
            <path
              d="M55 80 h85 M55 220 h85"
              stroke="white"
              strokeWidth="1"
              fill="none"
              className={styles.coverDecoration}
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
              stroke="white"
              strokeWidth="2"
              className={`${styles.bookCover} ${styles.bookRightCover} ${
                (animationState === "opening" || animationState === "zooming" || animationState === "complete") ? styles.bookRightCoverOpen : ""
              }`}
            />
            {/* Add decorative border elements */}
            <path
              d="M160 80 h85 M160 220 h85"
              stroke="white"
              strokeWidth="1"
              fill="none"
              className={styles.coverDecoration}
            />
          </g>

          {/* Pages */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={`page-group-${i}`} className={getPageZoomClass(i)}>
              <rect
                x={155 - i}
                y={80 + i * 0.5}
                width={90 - i}
                height={140 - i}
                fill="white"
                stroke="black"
                className={`${styles.bookPage} ${styles.bookPageInitial}`}
              />
              {/* Page content illustration */}
              {(animationState === "zooming" || animationState === "complete") && (
                <g className={`${styles.pageLines} ${animationState === "zooming" ? styles.pageLinesZoomThrough : ""}`} 
                   style={{ animationDelay: `${i * 0.2 + 0.1}s` }}>
                  <line x1={160 - i} y1={100 + i * 0.5} x2={230 - i} y2={100 + i * 0.5} stroke="black" strokeWidth="0.3" />
                  <line x1={160 - i} y1={120 + i * 0.5} x2={225 - i} y2={120 + i * 0.5} stroke="black" strokeWidth="0.3" />
                  <line x1={160 - i} y1={140 + i * 0.5} x2={235 - i} y2={140 + i * 0.5} stroke="black" strokeWidth="0.3" />
                  <line x1={165 - i} y1={160 + i * 0.5} x2={220 - i} y2={160 + i * 0.5} stroke="black" strokeWidth="0.3" />
                  <line x1={170 - i} y1={180 + i * 0.5} x2={215 - i} y2={180 + i * 0.5} stroke="black" strokeWidth="0.3" />
                </g>
              )}
            </g>
          ))}

          {/* Sparkle/Dust Elements - Only show during opening */}
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
