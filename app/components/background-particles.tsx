"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'

// Define particle types
type ParticleType = 'book' | 'pencil' | 'glasses' | 'lightbulb' | 'bookmark' | 'note'

interface Particle {
  id: number
  type: ParticleType
  x: number // percentage
  y: number // percentage
  size: number
  rotation: number
  opacity: number
  speed: number
  currentScale: number
  offsetX: number // pixels
  offsetY: number // pixels
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use ref to store particle data for animation frames to avoid unnecessary re-renders
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)
  
  // Initialize particles
  useEffect(() => {
    const types: ParticleType[] = ['book', 'pencil', 'glasses', 'lightbulb', 'bookmark', 'note']
    const newParticles: Particle[] = []
    
    for (let i = 0; i < 15; i++) {
      const randomType = types[Math.floor(Math.random() * types.length)] || 'book';
      newParticles.push({
        id: i,
        type: randomType,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 15,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.2 + 0.1,
        speed: Math.random() * 0.1 + 0.05, // Slower speed for more subtle drift
        currentScale: 1,
        offsetX: 0,
        offsetY: 0,
      })
    }
    setParticles(newParticles)
    particlesRef.current = newParticles
  }, [])

  // Mouse move listener for interaction
  useEffect(() => {
    const currentContainer = containerRef.current
    if (!currentContainer) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentContainer.getBoundingClientRect()
      setMousePosition({ 
        x: event.clientX - rect.left, 
        y: event.clientY - rect.top 
      })
    }

    const handleMouseLeave = () => {
      setMousePosition(null)
    }

    currentContainer.addEventListener('mousemove', handleMouseMove)
    currentContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      currentContainer.removeEventListener('mousemove', handleMouseMove)
      currentContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  // Animation using requestAnimationFrame instead of setInterval
  useEffect(() => {
    let lastTime = 0
    const fps = 20 // Limit to 20 FPS for performance (same as previous 50ms interval)
    const frameDuration = 1000 / fps
    
    const animate = (timestamp: number) => {
      // Throttle frame rate for performance
      if (timestamp - lastTime < frameDuration) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastTime = timestamp
      
      // Skip animation if container not available
      if (!containerRef.current) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      
      // Update particles in the ref (not state)
      particlesRef.current = particlesRef.current.map(particle => {
          let newOffsetX = particle.offsetX
          let newOffsetY = particle.offsetY

          if (mousePosition && containerRef.current) {
            const pX = (particle.x / 100) * containerWidth + particle.offsetX + (particle.size * particle.currentScale / 2)
            const pY = (particle.y / 100) * containerHeight + particle.offsetY + (particle.size * particle.currentScale / 2)

            const dx = pX - mousePosition.x
            const dy = pY - mousePosition.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const interactionRadius = 120 // pixels

            if (distance < interactionRadius && distance > 0) {
              const forceFactor = (interactionRadius - distance) / interactionRadius
              const pushStrength = 2 * forceFactor // Max pixels to push
              newOffsetX += (dx / distance) * pushStrength
              newOffsetY += (dy / distance) * pushStrength
            }
          }

          // Dampen/decay the offset so particles return to normal
          newOffsetX *= 0.9 // Decay factor
          newOffsetY *= 0.9
          if (Math.abs(newOffsetX) < 0.1) newOffsetX = 0
          if (Math.abs(newOffsetY) < 0.1) newOffsetY = 0
          
          return {
            ...particle,
            y: (particle.y - particle.speed + 100) % 100, // Move upwards, loop from top
            rotation: (particle.rotation + 0.1) % 360, // Slower rotation
            offsetX: newOffsetX,
            offsetY: newOffsetY,
          }
        })
      
      // Update React state only when needed for rendering (fewer re-renders)
      setParticles([...particlesRef.current])
      
      // Continue animation loop
      rafRef.current = requestAnimationFrame(animate)
    }
    
    // Start animation loop
    rafRef.current = requestAnimationFrame(animate)
    
    // Cleanup on unmount
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [mousePosition]) // Re-run if mousePosition changes for interaction logic
  
  // Memoize event handlers to avoid recreating functions on each render
  const handleParticleMouseEnter = useCallback((id: number) => {
    // Update both the ref and state for hover effects
    particlesRef.current = particlesRef.current.map(p => 
      p.id === id ? { ...p, currentScale: 1.3 } : p
    )
    setParticles(particlesRef.current)
  }, [])

  const handleParticleMouseLeave = useCallback((id: number) => {
    // Update both the ref and state for hover effects
    particlesRef.current = particlesRef.current.map(p => 
      p.id === id ? { ...p, currentScale: 1 } : p
    )
    setParticles(particlesRef.current)
  }, [])
  
  // A single SVG sprite is loaded in public/particle-sprite.svg
  // This component just renders the SVG icon by referencing the sprite
  const renderParticleIcon = useCallback((particle: Particle) => {
    return (
      <svg 
        width={particle.size} 
        height={particle.size} 
        fill="none"
        stroke="black"
        aria-hidden="true"
      >
        <use href={`/particle-sprite.svg#particle-${particle.type}`} />
      </svg>
    )
  }, [])
  
  return (
    <>
      {/* Load the SVG sprite once */}
      <div className="hidden">
        <div dangerouslySetInnerHTML={{ __html: '<svg width="0" height="0" style="position:absolute"><use href="/particle-sprite.svg"></use></svg>' }} />
      </div>
    
      <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"> {/* Changed pointer-events */}
        {particles.map(particle => (
          <div 
            key={particle.id}
            className="absolute cursor-default" // Added cursor-default
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `translateX(${particle.offsetX}px) translateY(${particle.offsetY}px) rotate(${particle.rotation}deg) scale(${particle.currentScale})`,
              transition: 'transform 0.2s ease-out, top 2s linear', // Adjusted transitions
              willChange: 'transform, top' // Performance hint
            }}
            onMouseEnter={() => handleParticleMouseEnter(particle.id)}
            onMouseLeave={() => handleParticleMouseLeave(particle.id)}
          >
            {renderParticleIcon(particle)}
          </div>
        ))}
      </div>
    </>
  )
} 