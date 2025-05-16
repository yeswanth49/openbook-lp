"use client"

import { useEffect, useState, useRef } from 'react'

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
  
  // Initialize particles
  useEffect(() => {
    const types: ParticleType[] = ['book', 'pencil', 'glasses', 'lightbulb', 'bookmark', 'note']
    const newParticles: Particle[] = []
    
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
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
  
  // Animate particles (drift, rotation, mouse interaction)
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newOffsetX = particle.offsetX
          let newOffsetY = particle.offsetY

          if (mousePosition && containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth
            const containerHeight = containerRef.current.offsetHeight

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
      )
    }, 50) // Update interval for smoother animation
    
    return () => clearInterval(interval)
  }, [mousePosition]) // Re-run if mousePosition changes for interaction logic
  
  const handleParticleMouseEnter = (id: number) => {
    setParticles(prev => prev.map(p => p.id === id ? { ...p, currentScale: 1.3 } : p))
  }

  const handleParticleMouseLeave = (id: number) => {
    setParticles(prev => prev.map(p => p.id === id ? { ...p, currentScale: 1 } : p))
  }

  // Render different SVG shapes based on particle type
  const renderParticleIcon = (particle: Particle) => {
    switch (particle.type) {
      case 'book':
        return (
          <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="1" stroke="black" strokeWidth="1" />
            <line x1="12" y1="4" x2="12" y2="20" stroke="black" strokeWidth="1" />
          </svg>
        )
      case 'pencil':
        return (
          <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill="none">
            <path d="M4 20L15 9L19 13L8 24H4V20Z" stroke="black" strokeWidth="1" />
            <path d="M15 9L17 7L21 11L19 13L15 9Z" stroke="black" strokeWidth="1" />
          </svg>
        )
      case 'glasses':
        return (
          <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="4" stroke="black" strokeWidth="1" />
            <circle cx="18" cy="12" r="4" stroke="black" strokeWidth="1" />
            <line x1="10" y1="12" x2="14" y2="12" stroke="black" strokeWidth="1" />
          </svg>
        )
      case 'lightbulb':
        return (
          <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill="none">
            <path d="M9 18H15M9 22H15M12 2V6M4 12L6 12M18 12H20M6 7L8 9M18 7L16 9" stroke="black" strokeWidth="1" />
            <path d="M9 10.5C9 14 12 14.5 12 17C12 14.5 15 14 15 10.5C15 7 12 4 9 10.5Z" stroke="black" strokeWidth="1" />
          </svg>
        )
      case 'bookmark':
        return (
          <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill="none">
            <path d="M6 2H18C19.1 2 20 2.9 20 4V22L12 17L4 22V4C4 2.9 4.9 2 6 2Z" stroke="black" strokeWidth="1" />
          </svg>
        )
      case 'note':
        return (
          <svg width={particle.size} height={particle.size} viewBox="0 0 24 24" fill="none">
            <path d="M4 4H20V20H4V4Z" stroke="black" strokeWidth="1" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="black" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="black" strokeWidth="1" />
            <line x1="8" y1="16" x2="12" y2="16" stroke="black" strokeWidth="1" />
          </svg>
        )
    }
  }
  
  return (
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
  )
} 