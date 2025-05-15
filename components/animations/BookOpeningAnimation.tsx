"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Pause, Play } from "lucide-react"
import styles from './BookOpeningAnimation.module.css'

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
  const [rollingPageIndex, setRollingPageIndex] = useState<number>(0) // 0: not rolling, 1-5: page turning
  const [whiteFlash, setWhiteFlash] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0) // 0-100 for progress indicator
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const animationStartTimeRef = useRef<number | null>(null)
  const TOTAL_ANIMATION_DURATION = 4400 // Total duration in ms
  const NUM_PAGES = 5; // Define number of pages
  const PAGE_TURN_DURATION = 800; // Duration of one page flutter animation (must match CSS)
  const PAGE_TURN_STAGGER = 200; // Delay between start of each page turn

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

    // Sequence: initial → opening → rolling → (pages turn) → zooming → transitioning → complete
    if (animationState === "initial") {
      timerRef.current = setTimeout(() => setAnimationState("opening"), 500)
    } else if (animationState === "opening") {
      timerRef.current = setTimeout(() => {
        setAnimationState("rolling");
        setRollingPageIndex(1); // Start turning the first page
      }, 1500)
    } else if (animationState === "rolling") {
      // Page turning is handled by the rollingPageIndex useEffect
      // Transition to zooming is also handled there after all pages turn
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

  // Handle sequential page turning during "rolling" state
  useEffect(() => {
    if (isPaused || animationState !== "rolling" || rollingPageIndex === 0 || rollingPageIndex > NUM_PAGES) {
      return;
    }

    // If current page index is within the number of pages, set timeout for the next page
    if (rollingPageIndex <= NUM_PAGES) {
      timerRef.current = setTimeout(() => {
        setRollingPageIndex(prev => prev + 1);
      }, PAGE_TURN_STAGGER); 
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [rollingPageIndex, animationState, isPaused]);

  // Effect to transition from rolling to zooming after all pages have had a chance to start turning
  useEffect(() => {
    if (isPaused || animationState !== "rolling") return;

    if (rollingPageIndex > NUM_PAGES) {
       // All pages have been triggered to turn. Wait for the last page animation to substantially complete.
       // The last page starts at (NUM_PAGES-1)*PAGE_TURN_STAGGER. It takes PAGE_TURN_DURATION.
       // We transition a bit before it fully finishes to blend.
      const timeForLastPageToStart = (NUM_PAGES -1) * PAGE_TURN_STAGGER;
      const timeToTransition = timeForLastPageToStart + PAGE_TURN_DURATION - PAGE_TURN_STAGGER; // Start transition as last page is mostly done.
      
      timerRef.current = setTimeout(() => {
        setAnimationState("zooming");
      }, PAGE_TURN_DURATION); // Wait for the last initiated page animation to complete
    }
     return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [rollingPageIndex, animationState, isPaused]);

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

  const getPageAnimationClass = (pageOrder: number) => { // pageOrder is 1-based
    if (animationState === "rolling") {
      if (rollingPageIndex >= pageOrder) {
        // This page should be animating or have finished animating
        // The flutter animation classes are 1-indexed (bookPageFlutter1, bookPageFlutter2, etc.)
        return styles[`bookPageFlutter${pageOrder}` as keyof typeof styles] || "";
      }
      // If page has not started turning yet, or if it's an invalid index.
      // Pages are initially styled with bookPage and bookPageInitial (opacity 0.3)
      // The flutter animations start with opacity 1, so they will become fully visible when their turn comes.
      return styles.bookPageInitial; 
    }
    if (animationState === "zooming") {
      return getPageZoomClass(pageOrder -1); // getPageZoomClass expects 0-indexed
    }
    // if opening, initial, transitioning, complete etc, apply initial style
    return styles.bookPageInitial; 
  };

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
          {/* Book spine - plain */}
          <g className={styles.bookSpine}>
            <rect x="145" y="75" width="10" height="150" fill="white" />
          </g>

          {/* Left cover (back of book) - plain */}
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

          {/* Right cover (front of book) - plain */}
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

          {/* Pages - simplified */}
          <g className={styles.pagesContainer}>
            {/* Page 1 - frontmost page */}
            <rect
              x="155"
              y="80"
              width="90"
              height="140"
              className={`${styles.bookPage} ${getPageAnimationClass(1)}`}
            />

            {/* Page 2 */}
            <rect
              x="154"
              y="81"
              width="89"
              height="138"
              className={`${styles.bookPage} ${getPageAnimationClass(2)}`}
            />

            {/* Page 3 */}
            <rect
              x="153"
              y="82"
              width="88"
              height="136"
              className={`${styles.bookPage} ${getPageAnimationClass(3)}`}
            />

            {/* Page 4 */}
            <rect
              x="152"
              y="83"
              width="87"
              height="134"
              className={`${styles.bookPage} ${getPageAnimationClass(4)}`}
            />

            {/* Page 5 - innermost page */}
            <rect
              x="151"
              y="84"
              width="86"
              height="132"
              className={`${styles.bookPage} ${getPageAnimationClass(5)}`}
            />

            {/* Page content - very minimal lines */}
            <g className={`${styles.pageLines} ${animationState === "zooming" ? styles.pageLinesZoomThrough : ""}`}>
              {/* Create pattern of horizontal lines to represent text */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line 
                  key={i}
                  x1="165" 
                  y1={100 + i * 15} 
                  x2={230}
                  y2={100 + i * 15} 
                  stroke="black" 
                  strokeWidth="0.3" 
                />
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
