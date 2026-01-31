"use client";

import { useState, useEffect } from "react";
import { CardStack, CardStackItem } from "@/components/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Luxury Performance",
    description: "Experience the thrill of precision engineering",
    imageSrc: "https://i.pinimg.com/736x/e7/cf/cb/e7cfcbd7a8af10b8839c8d9a3d8eb4ce.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 2,
    title: "Elegant Design",
    description: "Where beauty meets functionality",
    imageSrc: "https://i.pinimg.com/736x/f4/b0/00/f4b000a6880f7e8d0c677812d789e001.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 3,
    title: "Power & Speed",
    description: "Unleash the true potential of the road",
    imageSrc: "https://i.pinimg.com/1200x/ae/cf/d7/aecfd72b2439914647ec06d19cb182b5.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 4,
    title: "Timeless Craftsmanship",
    description: "Built with passion, driven by excellence",
    imageSrc: "https://i.pinimg.com/736x/5d/f7/69/5df7696c4f24b7961c8c72748a355ff8.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 5,
    title: "Future of Mobility",
    description: "Innovation that moves you forward",
    imageSrc: "https://i.pinimg.com/736x/9c/f2/8b/9cf28b4df4e06e0ca34fbe87f25734b6.jpg",
    href: "https://www.ruixen.com/",
  },
];

export default function ThumbnailPreview() {
  const [cardWidth, setCardWidth] = useState(380);
  const [cardHeight, setCardHeight] = useState(240);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateCardSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setCardWidth(280);
        setCardHeight(180);
      } else if (width < 1024) {
        // Tablet
        setCardWidth(400);
        setCardHeight(250);
      } else {
        // Desktop
        setCardWidth(380);
        setCardHeight(240);
      }
    };

    updateCardSize();
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  return (
    <div className="w-full bg-black pb-8 sm:pb-12 md:pb-16 -mt-8 md:-mt-12">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 md:px-6">
        {isMounted ? (
          <CardStack
            items={items}
            initialIndex={0}
            autoAdvance
            intervalMs={2000}
            pauseOnHover
            showDots
            cardWidth={cardWidth}
            cardHeight={cardHeight}
          />
        ) : (
          <div style={{ height: Math.max(380, cardHeight + 80) }} />
        )}
      </div>
    </div>
  );
}
