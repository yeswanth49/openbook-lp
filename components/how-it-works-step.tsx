"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface HowItWorksStepProps {
  number: string
  title: string
  description: string
  image: string
}

export default function HowItWorksStep({ number, title, description, image }: HowItWorksStepProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover opacity-80" />
          <motion.div
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {number}
          </motion.div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
