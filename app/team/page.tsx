"use client"

import Link from "next/link"
import Header from "@/components/header"
import { CallToAction } from "@/components/call-to-action"
import Image from "next/image"
import { BackButton } from "@/components/back-button"
import { Github, Linkedin, Twitter } from "lucide-react"

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "Co-Founder & CEO",
    bio: "John is passionate about AI and education. With over 10 years of experience in EdTech, he leads our vision to make learning more accessible and personalized.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=250&h=250&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    }
  },
  {
    name: "Jane Smith",
    role: "Co-Founder & CTO",
    bio: "Jane brings deep technical expertise in AI and machine learning. She's the architect behind our advanced learning algorithms and user experience.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&h=250&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com/janesmith",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith"
    }
  }
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <BackButton />

          <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
          
          <p className="text-lg text-center max-w-3xl mx-auto mb-16">
            Meet the passionate individuals behind OpenBook who are committed to transforming how we learn and retain knowledge.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-24 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="group flex flex-col items-center bg-background/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:shadow-md transition-all">
                <div className="mb-6 flex justify-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">{member.name}</h3>
                <p className="text-primary text-center mb-4">{member.role}</p>
                <p className="text-muted-foreground text-center mb-6">{member.bio}</p>
                
                {member.social && (
                  <div className="flex space-x-4">
                    {member.social.twitter && (
                      <Link href={member.social.twitter} target="_blank" className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {member.social.github && (
                      <Link href={member.social.github} target="_blank" className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {member.social.linkedin && (
                      <Link href={member.social.linkedin} target="_blank" className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <CallToAction 
            title="Join Us in Transforming Education"
            description="Be part of the revolution in learning technology."
            buttonText="Get Started"
            buttonHref="/"
            withBreak={false}
          />
        </div>
      </main>
    </>
  )
} 