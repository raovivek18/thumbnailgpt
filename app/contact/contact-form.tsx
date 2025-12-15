"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Clock, RefreshCw, MessageCircle, Send } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    setTimeout(() => {
      setSubmitMessage("Thank you! We'll get back to you soon.")
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })
    }, 1500)
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          {/* Email Card */}
          <div className="flex-1 group relative bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-2xl p-6 hover:border-[#FF8D00]/50 transition-all duration-300 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF8D00]/0 to-[#FF8D00]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#FF8D00]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Email Support</h3>
              <p className="text-gray-400 text-sm mb-2">Send us an email anytime</p>
              <a
                href="mailto:support@thumbnailgpt.com"
                className="text-[#FF8D00] hover:text-[#FF8D00]/80 transition-colors mt-auto"
              >
                support@thumbnailgpt.com
              </a>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="flex-1 group relative bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-2xl p-6 hover:border-[#FF8D00]/50 transition-all duration-300 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF8D00]/0 to-[#FF8D00]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#FF8D00]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Response Time</h3>
              <p className="text-gray-400 text-sm">We typically respond within 24-48 hours during business days</p>
            </div>
          </div>

          {/* Refund Info Card */}
          <div className="flex-1 group relative bg-gradient-to-b from-[#FF8D00]/5 to-transparent border border-[#FF8D00]/20 rounded-2xl p-6 hover:border-[#FF8D00]/50 transition-all duration-300 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF8D00]/0 to-[#FF8D00]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#FF8D00]/10 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-[#FF8D00]" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Refund Requests</h3>
              <p className="text-gray-400 text-sm mb-2">Use subject: "Refund Request - ThumbnailGPT"</p>
              <p className="text-gray-500 text-xs">Include your account email and purchase details</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#FF8D00]/10 via-transparent to-transparent border border-[#FF8D00]/20 rounded-3xl p-8 md:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8D00]/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#FF8D00]/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#FF8D00]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-[#FF8D00]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8D00] focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-[#FF8D00]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8D00] focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-[#FF8D00]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8D00] focus:border-transparent text-white placeholder-gray-500 resize-none transition-all"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </AnimatedButton>

                {submitMessage && (
                  <div className="p-4 bg-[#FF8D00]/10 border border-[#FF8D00]/30 rounded-xl">
                    <p className="text-[#FF8D00] text-center font-medium">{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

