"use client"

import { Zap, ImageIcon, Download, Check } from "lucide-react"
import { useState } from "react"
import { AnimatedButton } from "@/components/ui/animated-button"

export function Pricing() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR")

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small projects getting started with AI thumbnail generator tools for YouTube.",
      price: { INR: 299, USD: 3.37 },
      credits: 200,
      thumbnails: 20,
      features: ["Text to Thumbnail", "Image to Thumbnail", "Recreate Thumbnail"],
      popular: false,
    },
    {
      name: "Pro",
      description: "Best value for professionals and growing businesses that need more power from their YouTube thumbnail generator.",
      price: { INR: 599, USD: 6.76 },
      credits: 500,
      thumbnails: 50,
      features: ["Text to Thumbnail", "Image to Thumbnail", "Recreate Thumbnail"],
      popular: true,
    },
    {
      name: "Premium",
      description: "Advanced plan with unlimited access for large teams and power users who need premium AI thumbnail maker capabilities.",
      price: { INR: 1199, USD: 13.52 },
      credits: 1500,
      thumbnails: 150,
      features: ["Text to Thumbnail", "Image to Thumbnail", "Recreate Thumbnail"],
      popular: false,
    },
  ]

  return (
    <section className="relative py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex flex-col items-center gap-2">
            <span>Find the right plan to fuel your</span>
            <span className="inline-block border-2 border-dashed border-[#FF8D00] px-3 py-1 rounded-xl bg-[#FF8D00]/10">
              Content Creation
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of creators using our AI thumbnail generator to produce stunning YouTube thumbnails. Choose the perfect plan for your
            content creation needs and unlock the power of thumbnail maker AI technology.
          </p>

          <div className="inline-flex items-center gap-0 p-1 rounded-full bg-neutral-900/60 backdrop-blur-sm border border-[#FF8D00]/20 relative">
            {/* Sliding indicator background */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#FF8D00] to-[#FFA500] rounded-full transition-all duration-300 shadow-lg shadow-[#FF8D00]/40 ${
                currency === "USD" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
              }`}
            />

            <button
              onClick={() => setCurrency("INR")}
              className={`relative z-10 px-8 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                currency === "INR" ? "text-black" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              INR ₹
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`relative z-10 px-8 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                currency === "USD" ? "text-black" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              USD $
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-br from-[#1a0f00] to-black border-2 border-[#FF8D00] shadow-2xl shadow-[#FF8D00]/20"
                  : "bg-gradient-to-br from-neutral-900/60 to-black border border-[#FF8D00]/10 hover:border-[#FF8D00]/30 backdrop-blur-sm"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF8D00] to-[#FFA500] text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-[#FF8D00]/50">
                  Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {currency === "INR" ? "₹" : "$"}
                    {plan.price[currency]}
                  </span>
                  <span className="text-gray-500 text-sm">one-time</span>
                </div>
              </div>

              <a href="https://app.thumbnailgpt.com/" target="_blank" rel="noopener noreferrer" className="block mb-6">
                <AnimatedButton variant={plan.popular ? "primary" : "secondary"} size="md" className="w-full">
                  {index === 0 ? "Get Started" : index === 1 ? "Choose Pro" : "Go Premium"}
                </AnimatedButton>
              </a>

              {/* Features with Icons */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#FF8D00]/10">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#FF8D00]" />
                  <span className="text-white font-medium">{plan.credits} Credits</span>
                </div>
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-[#FF8D00]" />
                  <span className="text-white font-medium">{plan.thumbnails} Thumbnails</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-[#FF8D00]" />
                  <span className="text-white font-medium">High Quality Downloads</span>
                </div>
              </div>

              {/* Includes Section */}
              <div>
                <h4 className="text-white font-semibold mb-3">Includes:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-[#FF8D00] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#FF8D00]" />
                      </div>
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
