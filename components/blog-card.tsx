import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CalendarIcon, Clock, User } from "lucide-react"
import Link from "next/link"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  author: string
  image: string
  slug: string
}

export default function BlogCard({ title, excerpt, date, readTime, author, image, slug }: BlogCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 opacity-80"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-1 text-muted-foreground" />
          <span className="text-muted-foreground">{author}</span>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="text-sm font-medium text-white hover:underline inline-flex items-center"
        >
          Read More
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardFooter>
    </Card>
  )
}
