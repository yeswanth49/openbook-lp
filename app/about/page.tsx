import Link from "next/link"
import { CallToAction } from "@/components/call-to-action"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-24">About Us</h1>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg">
            OpenBook is an AI-powered reading platform that manages your library, so you don't have to. We help busy
            readers unlock knowledge, prioritize important content, summarize books and articles,
            complete reading goals, and even chat with their reading material — letting them spend less time
            managing books and more time gaining insights and knowledge.
          </p>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-6">Why We Started</h2>
          <p className="text-lg">
            We started OpenBook because we were frustrated that reading — the most-used method for gaining knowledge in the
            world — hasn't meaningfully evolved in decades. Despite countless new apps, none actually solve the
            real problem: helping you finish what you intend to read and extract valuable insights. We realized the real solution isn't just a new
            interface — it's AI acting like a true assistant inside your reading experience.
          </p>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-6">Open Source</h2>
          <p className="text-lg mb-6">
            OpenBook is built on the principles of transparency and community collaboration. Our entire codebase is
            open source, allowing anyone to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Review our code for security and privacy</li>
            <li>Contribute improvements and new features</li>
            <li>Self-host their own instance of OpenBook</li>
          </ul>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-6">Our Founders</h2>
          <p className="text-lg mb-6">
            Our founders met through a shared passion for reading and knowledge management. Coming from backgrounds in
            product design and software engineering, we both felt the frustration of managing an ever-growing reading list
            while trying to build and grow companies.
          </p>
          <p className="text-lg">
            We're driven by a shared belief that reading should help you gain knowledge faster, not slow you down.
          </p>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-6">Contact</h2>
          <p className="text-lg mb-6">
            Want to learn more about OpenBook? Get in touch:
          </p>
          <div className="space-y-4">
            <Link href="mailto:founders@openbook.com" className="text-blue-400 hover:underline inline-flex items-center">
              founders@openbook.com
            </Link>
            <div>
              <Link href="https://github.com/openbook" target="_blank" className="text-blue-400 hover:underline inline-flex items-center">
                Open an issue on GitHub
              </Link>
            </div>
          </div>
        </section>
      </div>

      <CallToAction 
        title="Experience the Future of Learning Today"
        description="Watch how OpenBook helps you learn in a fraction of the time."
        buttonText="Get Started"
        buttonHref="/"
      />
    </main>
  )
} 