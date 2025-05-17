"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { LucideIcon } from "lucide-react"
import { FeaturePopup } from './feature-popup'

interface FeatureCardProps {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ id, icon: Icon, title, description }: FeatureCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm h-full">
        <Icon className="h-12 w-12 mb-5 text-white/80" />
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <div className="mt-auto">
          <Button 
            variant="ghost" 
            className="p-0 h-auto text-white/70 hover:text-white"
            onClick={() => setIsPopupOpen(true)}
            aria-haspopup="dialog"
            aria-controls={`feature-popup-${id}`}
          >
            Learn more <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <FeaturePopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        featureId={id} 
      />
    </>
  )
}
