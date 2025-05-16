"use client"

import { useState } from 'react'

export default function BookIllustration() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative w-full h-full cursor-pointer transition-transform duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: isHovered ? 'scale(1.05) rotate(5deg)' : 'scale(1) rotate(0)' }}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Book base */}
        <rect 
          x="20" 
          y="25" 
          width="60" 
          height="60" 
          rx="2" 
          fill="white" 
          stroke="black" 
          strokeWidth="2"
          className={`transition-all duration-300 ${isHovered ? 'fill-gray-50' : 'fill-white'}`}
        />
        
        {/* Book spine */}
        <rect 
          x="20" 
          y="25" 
          width="5" 
          height="60" 
          fill="black" 
          className={`transition-all duration-300 ${isHovered ? 'opacity-90' : 'opacity-100'}`}
        />
        
        {/* Book pages */}
        <rect 
          x="25" 
          y="30" 
          width="50" 
          height="50" 
          fill="white" 
          stroke="black" 
          strokeWidth="1"
          strokeDasharray={isHovered ? "1 1" : "0 0"}
          className="transition-all duration-300"
        />
        
        {/* Page lines */}
        <line x1="30" y1="40" x2="70" y2="40" stroke="black" strokeWidth="0.5" className="transition-all duration-300" />
        <line x1="30" y1="50" x2="70" y2="50" stroke="black" strokeWidth="0.5" className="transition-all duration-300" />
        <line x1="30" y1="60" x2="70" y2="60" stroke="black" strokeWidth="0.5" className="transition-all duration-300" />
        <line x1="30" y1="70" x2="70" y2="70" stroke="black" strokeWidth="0.5" className="transition-all duration-300" />
        
        {/* Book title */}
        <rect 
          x="35" 
          y="35" 
          width="30" 
          height="5" 
          fill="black" 
          className={`transition-all duration-300 ${isHovered ? 'opacity-80' : 'opacity-100'}`}
        />
        
        {/* Open book animation elements - only visible on hover */}
        {isHovered && (
          <>
            <circle cx="75" cy="30" r="2" fill="black" className="animate-pulse" />
            <path 
              d="M80 40 C 85 35, 90 35, 95 40" 
              stroke="black" 
              strokeWidth="0.75" 
              strokeDasharray="2 1"
              className="animate-pulse"
            />
          </>
        )}
      </svg>
    </div>
  )
} 