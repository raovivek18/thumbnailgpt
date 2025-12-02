import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Alex Rivera",
      handle: "@alexcreates",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "ThumbnailGPT completely changed my YouTube game. My CTR increased by 47% in just two weeks! The AI suggestions are spot-on every single time.",
    href: "https://twitter.com/alexcreates"
  },
  {
    author: {
      name: "Sarah Chen",
      handle: "@sarahvlogs",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a content creator with limited design skills, this tool is a lifesaver. I can now create professional thumbnails in seconds instead of hours."
  },
  {
    author: {
      name: "Marcus Johnson",
      handle: "@marcustech",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "The recreate feature is insane! I uploaded a competitor's thumbnail and got 5 better variations instantly. Worth every penny.",
    href: "https://twitter.com/marcustech"
  },
  {
    author: {
      name: "Emily Rodriguez",
      handle: "@emilyeducates",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "I've tried other thumbnail tools, but nothing comes close to ThumbnailGPT's AI quality. My videos are getting more clicks than ever before!"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidgaming",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Game changer for my gaming channel. The text-to-thumbnail feature understands exactly what kind of energy and style gaming thumbnails need."
  },
  {
    author: {
      name: "Jessica Lee",
      handle: "@jessfinance",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "Professional results without the professional price tag. ThumbnailGPT pays for itself with just a few extra views per video."
  }
]

export function Testimonials() {
  return (
    <TestimonialsSection
      title="Loved by Creators Worldwide"
      description="Join thousands of content creators who are already boosting their CTR with AI-powered thumbnails"
      testimonials={testimonials}
    />
  )
}
