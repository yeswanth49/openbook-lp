import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ 
  href = "/", 
  label = "Back" 
}: BackButtonProps) {
  return (
    <Link 
      href={href} 
      className="inline-flex items-center mb-12 text-sm font-medium hover:text-muted-foreground"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Link>
  )
} 