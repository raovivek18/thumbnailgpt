"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is ThumbnailGPT and how does it work?",
    answer:
      "ThumbnailGPT is an AI thumbnail generator and YouTube thumbnail generator powered by advanced AI. You enter a prompt and optionally upload images. The system processes your input and creates a custom thumbnail using thumbnail AI technology that you can use for YouTube, social media, blogs, or other projects. No design skills are required.",
  },
  {
    question: "Do I need to install any software to use it?",
    answer:
      "No installation is needed. ThumbnailGPT works directly in your browser. Just sign in with Google, choose a tool, enter your input, and generate your thumbnail instantly.",
  },
  {
    question: "How do credits work?",
    answer:
      "Credits act as usage tokens. Every time you generate a thumbnail, a certain number of credits is deducted from your account. You can buy credit packs whenever you need more.",
  },
  {
    question: "Are my uploaded images saved?",
    answer:
      "No, uploaded images are not stored permanently. Any image you upload for reference, processing, or recreation is deleted automatically after the thumbnail is generated. Only the final output image is stored safely in your account.",
  },
  {
    question: "Can I get a refund if I do not like the result?",
    answer:
      "Refunds are only possible if all purchased credits are unused. If even one credit is used, refunds are not allowed. This rule ensures fair usage for all users.",
  },
  {
    question: "Is there any content that is not allowed?",
    answer:
      "Yes. ThumbnailGPT does not allow adult, NSFW, harmful, or illegal content. If such content is detected, the account may be banned without refund.",
  },
  {
    question: "Can I use the generated thumbnails commercially?",
    answer:
      "Yes. You are free to use the generated thumbnails for videos, social accounts, advertisements, or any other commercial purpose.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative py-20 px-4 overflow-hidden scroll-mt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Orange glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF8D00]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF8D00]/5 rounded-full blur-[120px]" />

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
