"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is ThumbnailGPT?",
    answer:
      "ThumbnailGPT is an AI-powered YouTube thumbnail generator built for creators who want higher click-through rates. It generates, analyzes, and optimizes thumbnails using proven viral design patterns.",
  },
  {
    question: "Is ThumbnailGPT free to use?",
    answer:
      "ThumbnailGPT is a premium AI thumbnail generator. Each plan includes credits that unlock high-quality, watermark-free thumbnails and advanced optimization tools.",
  },
  {
    question: "How is ThumbnailGPT different from free AI thumbnail makers?",
    answer:
      "Most free tools only generate images. ThumbnailGPT goes further by analyzing thumbnails, detecting design issues, and automatically fixing them to improve CTR and engagement.",
  },
  {
    question: "Can I create YouTube thumbnails from text or images?",
    answer: (
      <div>
        Yes. You can generate thumbnails using:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Text prompts</li>
          <li>Uploaded images</li>
          <li>Existing YouTube thumbnails</li>
          <li>Video titles or sketches</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Does ThumbnailGPT help increase YouTube CTR?",
    answer:
      "Yes. ThumbnailGPT includes thumbnail analysis, viral scoring, and optimization tools designed to improve click-through rate, clarity, and visual hook.",
  },
  {
    question: "Are AI-generated thumbnails allowed on YouTube?",
    answer:
      "Yes. YouTube allows AI-generated thumbnails as long as they follow platform policies and do not mislead viewers. All thumbnails created with ThumbnailGPT are safe for commercial use.",
  },
  {
    question: "Can I use thumbnails commercially?",
    answer:
      "Yes. All thumbnails generated with ThumbnailGPT can be used commercially on YouTube and other platforms without watermark restrictions.",
  },
  {
    question: "Do I need design skills to use ThumbnailGPT?",
    answer:
      "No. ThumbnailGPT is built for creators with zero design experience. The AI handles layout, text hierarchy, contrast, and focus automatically.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative py-20 px-4 overflow-hidden scroll-mt-24 bg-orange-flow">

      <div className="relative max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-[#FF8D00]">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about ThumbnailGPT. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 rounded-xl bg-black/40 px-6 hover:border-[#FF8D00]/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-white hover:text-[#FF8D00] transition-colors py-5">
                  <span className="text-base md:text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
