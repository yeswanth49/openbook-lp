"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { addToWaitlist } from "../actions/waitlist"
import WaitlistCounter from "./waitlist-counter"

export default function WaitlistForm({ initialCount }: { initialCount: number }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [source, setSource] = useState("")
  const [focus, setFocus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!source) {
      setError("Please select where you heard about OpenBook")
      return
    }
    setIsSubmitting(true)

    try {
      const result = await addToWaitlist(email, source)

      if (result.success) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocus('email')}
                onBlur={() => setFocus(null)}
                className={`w-full h-12 transition-all duration-300 bg-white text-black placeholder-gray-500
                  ${focus === 'email' 
                    ? 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]' 
                    : 'border border-gray-300 shadow-sm'}`}
                aria-label="Email address"
              />
              {email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black">
                  <span className="text-xs">{email.split('@')[1] ? '✓' : ''}</span>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-center space-x-1 text-black">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Select
              value={source}
              onValueChange={(value) => setSource(value)}
            >
              <SelectTrigger 
                className={`w-full h-12 transition-all duration-300 bg-white text-black
                  ${focus === 'source' 
                    ? 'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]' 
                    : 'border border-gray-300 shadow-sm hover:border-gray-500'}`}
                onFocus={() => setFocus('source')}
                onBlur={() => setFocus(null)}
              >
                <SelectValue placeholder="Where did you hear about OpenBook" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <SelectItem value="X" className="hover:bg-gray-100 focus:bg-gray-100">X</SelectItem>
                <SelectItem value="Founders" className="hover:bg-gray-100 focus:bg-gray-100">Founders</SelectItem>
                <SelectItem value="Referals" className="hover:bg-gray-100 focus:bg-gray-100">Referals</SelectItem>
                <SelectItem value="Others" className="hover:bg-gray-100 focus:bg-gray-100">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-black hover:bg-black text-white transition-all duration-300 border-2 border-black
              shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] 
              hover:translate-x-1 hover:translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Join the Waitlist
                <Send className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>

          <div className="flex justify-center pt-2">
            <WaitlistCounter initialCount={initialCount} />
          </div>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center space-y-5 animate-fadeIn">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="3" />
              <path 
                d="M30 50 L45 65 L70 35" 
                fill="none" 
                stroke="black" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="animate-draw"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: 0,
                  animation: "drawCheck 1s ease-in-out"
                }}
              />
            </svg>
          </div>
          <p className="text-center font-medium">Thank you for joining our waitlist! We'll be in touch soon.</p>
          <WaitlistCounter initialCount={initialCount} />
        </div>
      )}
    </div>
  )
}
