"use client";

import { useState, useEffect } from "react";
import { CardStack, CardStackItem } from "@/components/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "",
    description: "",
    imageSrc: "/preview-thumbnail/thumbnailgpt-preview1.webp",
  },
  {
    id: 2,
    title: "",
    description: "",
    imageSrc: "/preview-thumbnail/thumbnailgpt-preview2.webp",
  },
  {
    id: 3,
    title: "",
    description: "",
    imageSrc: "/preview-thumbnail/thumbnailgpt-preview3.webp",
  },
  {
    id: 4,
    title: "",
    description: "",
    imageSrc: "/preview-thumbnail/thumbnailgpt-preview4.webp",
  },
  {
    id: 5,
    title: "",
    description: "",
    imageSrc: "/preview-thumbnail/thumbnailgpt-preview5.webp",
  },
];

export default function ThumbnailPreview() {
  const [cardWidth, setCardWidth] = useState(380);
  const [cardHeight, setCardHeight] = useState(214);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateCardSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setCardWidth(280);
        setCardHeight(158);
      } else if (width < 1024) {
        // Tablet
        setCardWidth(400);
        setCardHeight(225);
      } else {
        // Desktop
        setCardWidth(380);
        setCardHeight(214);
      }
    };

    updateCardSize();
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  return (
    <div className="w-full bg-orange-flow">
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
