import BookOpeningAnimation from "@/components/book-opening-animation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <BookOpeningAnimation />

      {/* Your existing landing page content would go here */}
      <div className="landing-content hidden animate-fade-in">
        <h1 className="text-4xl font-bold text-center mt-20">Your Landing Page</h1>
        <p className="text-center mt-4">This is where your existing content would appear after the animation.</p>
      </div>
    </main>
  )
}
