import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
        Content Not Found
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-lg">
        We couldn't find the blog content you're looking for. It may have been moved or doesn't exist.
      </p>
      <Button asChild>
        <Link href="/blog">
          Return to all blogs
        </Link>
      </Button>
    </div>
  )
} 