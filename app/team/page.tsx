"use client"

import Link from "next/link"
import { CallToAction } from "@/components/call-to-action"
import { Github, Twitter } from "lucide-react"

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  social?: {
    twitter?: string;
    github?: string;
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "Co-Founder & CEO",
    bio: "John is passionate about AI and education. With over 10 years of experience in EdTech, he leads our vision to make learning more accessible and personalized.",
    social: {
      twitter: "https://x.com/Yeshh49",
      github: "https://github.com/yeswanth49",
    }
  },
  {
    name: "Jane Smith",
    role: "Co-Founder & CTO",
    bio: "Jane brings deep technical expertise in AI and machine learning. She's the architect behind our advanced learning algorithms and user experience.",
    social: {
      twitter: "https://x.com/Yeshh49",
      github: "https://github.com/yeswanth49",
    }
  }
];

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>
        
        <p className="text-lg text-center max-w-3xl mx-auto mb-16">
          Meet the passionate individuals behind OpenBook who are committed to transforming how we learn and retain knowledge.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-24 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="group flex flex-col items-center bg-background/30 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:shadow-md transition-all">
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
                </div>
              )}
            </div>
          ))}
        </div>

        <CallToAction 
          title="Join Us in Transforming Education"
          description="Be part of the revolution in learning technology."
          buttonText="Get Started"
          buttonHref="https://cal.com/yeshh49"
          withBreak={false}
        />
      </div>
    </main>
  )
} 