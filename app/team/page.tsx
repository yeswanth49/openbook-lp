import Link from "next/link"
import Header from "@/components/header"
import { CallToAction } from "@/components/call-to-action"
import Image from "next/image"
import { BackButton } from "@/components/back-button"

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "Co-Founder & CEO",
    bio: "Alex brings 15 years of experience in product design and has previously founded two successful EdTech startups.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&h=250&auto=format&fit=crop"
  },
  {
    name: "Jamie Lee",
    role: "Co-Founder & CTO",
    bio: "Jamie is a software engineer with a background in AI/ML, previously leading engineering teams at major tech companies.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&h=250&auto=format&fit=crop"
  },
  {
    name: "Taylor Smith",
    role: "Lead Designer",
    bio: "Taylor specializes in UX/UI design with a focus on creating accessible, intuitive learning experiences.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop"
  },
  {
    name: "Jordan Rivera",
    role: "AI Engineer",
    bio: "Jordan's expertise lies in developing natural language processing models that power OpenBook's learning features.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&h=250&auto=format&fit=crop"
  }
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <BackButton />

          <h1 className="text-4xl font-bold text-center mb-24">Our Team</h1>
          
          <p className="text-lg text-center max-w-3xl mx-auto mb-16">
            Meet the passionate individuals behind OpenBook who are committed to transforming how we learn and retain knowledge.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-background/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="mb-4 flex justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-blue-400 text-center mb-4">{member.role}</p>
                <p className="text-muted-foreground text-center">{member.bio}</p>
              </div>
            ))}
          </div>

          <section className="mb-24">
            <h2 className="text-2xl font-bold mb-6 text-center">Join Our Team</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-6">
              We're always looking for talented individuals who are passionate about education, 
              AI, and creating products that make a difference in how people learn.
            </p>
            <div className="text-center">
              <Link href="/careers" className="inline-block text-blue-400 hover:underline">
                View open positions →
              </Link>
            </div>
          </section>
        </div>

        <CallToAction 
          title="Join Us in Transforming Education"
          description="Be part of the revolution in learning technology."
          buttonText="Get Started"
          buttonHref="/"
          withBreak={false}
        />
      </main>
    </>
  )
} 