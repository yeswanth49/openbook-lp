import AnimateInView from "./animate-in-view"

interface SectionHeadingProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({ title, description, centered = true, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""} ${className}`}>
      <AnimateInView>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{title}</h2>
        {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
      </AnimateInView>
    </div>
  )
}
