"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import LaserFlow from './LaserFlow';

export default function HeroSection() {
  // ============================================
  // LASERFLOW POSITIONING CONTROLS
  // ============================================
  // Adjust these values to control LaserFlow position
  const laserFlowConfig = {
    // Container positioning
    position: 'absolute' as const, // 'absolute' | 'fixed' | 'relative'
    top: '0', // CSS value: '0', '50%', '100px', etc.
    left: '0', // CSS value: '0', '50%', '100px', etc.
    right: '0', // CSS value: '0', '50%', '100px', etc. (use 'auto' to disable)
    bottom: '0', // CSS value: '0', '50%', '100px', etc. (use 'auto' to disable)

    // Alignment (when using flexbox)
    alignItems: 'center' as const, // 'center' | 'flex-start' | 'flex-end' | 'stretch'
    justifyContent: 'center' as const, // 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'

    // Transform/Offset (for fine-tuning)
    translateX: '70px', // Move horizontally: '-100px', '50px', etc.
    // translateY will be set dynamically based on screen size

    // Size - Responsive controls for LaserFlow dimensions
    // Adjust width and height for each screen type independently
    // Screen Types: Mobile (<640px), Large Mobile (640-767px), Tablet-Portrait (770-790px), Tablet (768-1023px), Laptop (1024-1279px), Desktop (≥1280px)
    size: {
      mobile: {
        width: '1080px', // LaserFlow width for mobile screens (< 640px)
        height: '1080px', // LaserFlow height for mobile screens (< 640px)
      },
      largeMobile: {
        width: '1080px', // LaserFlow width for large mobile screens (640-767px)
        height: '1080px', // LaserFlow height for large mobile screens (640-767px)
      },
      tabletPortrait: {
        width: '1080px', // LaserFlow width for tablet-portrait problematic range (770-790px)
        height: '1080px', // LaserFlow height for tablet-portrait problematic range (770-790px)
      },
      tablet: {
        width: '1080px', // LaserFlow width for tablet screens (768-1023px)
        height: '1080px', // LaserFlow height for tablet screens (768-1023px)
      },
      laptop: {
        width: '1080px', // LaserFlow width for laptop screens (1024-1279px)
        height: '1080px', // LaserFlow height for laptop screens (1024-1279px)
      },
      desktop: {
        width: '1080px', // LaserFlow width for desktop screens (≥ 1280px)
        height: '1080px', // LaserFlow height for desktop screens (≥ 1280px)
      },
    },

    // Z-index
    zIndex: 0,

    // LaserFlow component props - Responsive beam offsets
    // Control placement using horizontalBeamOffset and verticalBeamOffset
    beamOffsets: {
      mobile: {
        horizontalBeamOffset: 0.1,
        verticalBeamOffset: -0.0285,
        decay: 0.6,
        verticalSizing: 2.5,
      },
      largeMobile: {
        horizontalBeamOffset: 0.15,
        verticalBeamOffset: -0.054,
        decay: 0.55, // Responsive decay control for largeMobile
        verticalSizing: 2.5,
      },
      tabletPortrait: {
        horizontalBeamOffset: 0.2,
        verticalBeamOffset: -0.15,
        decay: 1.1,
        verticalSizing: 2.25,
      },
      tablet: {
        horizontalBeamOffset: 0.2,
        verticalBeamOffset: -0.114,
        decay: 1.1,
        verticalSizing: 2.5,
      },
      laptop: {
        horizontalBeamOffset: 0.2,
        verticalBeamOffset: -0.11,
        decay: 1.1,
        verticalSizing: 2.256,
      },
      desktop: {
        horizontalBeamOffset: 0.2,
        verticalBeamOffset: -0.11,
        decay: 1.1,
        verticalSizing: 2,
      },
    },
    laserFlowProps: {
      color: "#ff8D00",
      wispDensity: 1,
      flowSpeed: 0.35,
      horizontalSizing: 0.5,
      fogIntensity: 0.5,
      fogScale: 0.3,
      wispSpeed: 15,
      wispIntensity: 5,
      flowStrength: 0.25,
      decay: 1.1, // Default for tablet/desktop, overridden for mobile
    }
  };
  // ============================================

  // Responsive LaserFlow positioning
  const [screenSize, setScreenSize] = useState<'mobile' | 'largeMobile' | 'tabletPortrait' | 'tablet' | 'laptop' | 'desktop'>('desktop');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: < 640px (Phones)
        setScreenSize('mobile');
      } else if (width >= 640 && width < 768) {
        // Large Mobile: 640 - 767px (Big phones / small tablets)
        setScreenSize('largeMobile');
      } else if (width >= 770 && width <= 790) {
        // Custom: 770 - 790px (Tablet-portrait UI-problematic range)
        setScreenSize('tabletPortrait');
      } else if (width >= 768 && width < 1024) {
        // Tablet: 768 - 1023px (iPad, tablets)
        setScreenSize('tablet');
      } else if (width >= 1024 && width < 1280) {
        // Laptop: 1024 - 1279px (Small laptops)
        setScreenSize('laptop');
      } else {
        // Desktop: ≥ 1280px (Large screens)
        setScreenSize('desktop');
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // State for the interactive input area
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Animated Placeholder Logic
  const placeholders = [
    "Minecraft Survival Ep. 1: We Found Diamonds in the First 10 Minutes!",
    "iPhone 16 Pro Max Review: Is It Actually Worth The Upgrade?",
    "How I Scaled My SaaS to $10k/Month in 30 Days (Step-by-Step)",
    "Solo Travel Vlog: Exploring Tokyo's Hidden Alleys at Midnight",
    "The Ultimate Gym Transformation: From Skinny to Shredded in 6 Months",
    "World's Hottest Pepper Challenge Gone Wrong (Do Not Try This)"
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOpacity(0); // Fade out
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        setFadeOpacity(1); // Fade in
      }, 500); // Wait for transition duration
    }, 4000); // 4 seconds visible

    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Auto-resize textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';

      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120; // Matches the maxHeight in styles

      // Set the new height
      textareaRef.current.style.height = `${scrollHeight}px`;

      // Only show scrollbar if content exceeds max height
      if (scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = 'auto';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [message]);

  const handleSubmit = () => {
    if (!message.trim()) return;
    console.log("Generating thumbnail for:", message);
    // Logic to trigger generation would go here
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Custom CSS for the button, animations, and scrollbar
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    /* Ensure body has dark background as fallback */
    body {
      font-family: 'Inter', sans-serif;
      background-color: #000000;
      margin: 0;
    }

    /* Custom Scrollbar - Sleek and minimal */
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: rgba(255, 141, 0, 0.6); /* Brand orange on hover */
    }

    /* Fade Masks */
    .fade-left {
      mask-image: linear-gradient(to right, transparent 0%, black 50%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 50%);
    }
    .fade-right {
      mask-image: linear-gradient(to left, transparent 0%, black 50%);
      -webkit-mask-image: linear-gradient(to left, transparent 0%, black 50%);
    }

    /* Generate Button Styles */
    .btn-generate {
      --clr-font-main: hsla(0 0% 20% / 100);
      --btn-bg-1: hsla(25 95% 53% / 1);
      --btn-bg-2: hsla(16 100% 50% / 1);
      --btn-bg-color: hsla(360 100% 100% / 1);
      --radii: 9999px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: 0.8s;
      background-size: 280% auto;
      background-image: linear-gradient(
        325deg,
        var(--btn-bg-2) 0%,
        var(--btn-bg-1) 55%,
        var(--btn-bg-2) 90%
      );
      border: none;
      border-radius: var(--radii);
      color: var(--btn-bg-color);
      box-shadow:
        0px 0px 20px rgba(255, 165, 0, 0.5),
        0px 5px 5px -1px rgba(255, 140, 0, 0.25),
        inset 4px 4px 8px rgba(255, 200, 150, 0.5),
        inset -4px -4px 8px rgba(200, 100, 0, 0.35);
    }

    .btn-generate:hover {
      background-position: right top;
    }

    .btn-generate:is(:focus, :focus-visible, :active) {
      outline: none;
      box-shadow:
        0 0 0 3px var(--btn-bg-color),
        0 0 0 6px var(--btn-bg-2);
    }

    .btn-generate:disabled {
      cursor: not-allowed;
      opacity: 0.7;
      background-image: linear-gradient(325deg, hsla(25 95% 53% / 0.3) 0%, hsla(25 95% 53% / 0.2) 55%, hsla(25 95% 53% / 0.3) 90%);
      box-shadow: 0px 2px 4px rgba(255, 165, 0, 0.2);
      color: hsla(25 95% 53% / 0.8);
    }

    @media (prefers-reduced-motion: reduce) {
      .btn-generate {
        transition: linear;
      }
    }
  `;

  return (
    <div
      className="w-full flex flex-col items-center justify-center text-white selection:bg-[#FF8D00] selection:text-black relative min-h-[100dvh] bg-transparent"
    >
      <style>{customStyles}</style>

      {/* LaserFlow Background */}
      {/* 
        POSITIONING CONTROLS: Edit laserFlowConfig object above to adjust position
        Examples:
        - Center: top: '0', left: '0', right: '0', bottom: '0' with flexbox centering
        - Top-left: top: '0', left: '0', right: 'auto', bottom: 'auto'
        - Bottom-right: top: 'auto', left: 'auto', right: '0', bottom: '0'
        - Custom offset: Use translateX/translateY for fine adjustments
      */}
      {/* LaserFlow Background */}
      {isMounted && (
        <div
          className={`flex pointer-events-none`}
          style={{
            position: laserFlowConfig.position,
            top: laserFlowConfig.top,
            left: laserFlowConfig.left,
            right: laserFlowConfig.right === 'auto' ? undefined : laserFlowConfig.right,
            bottom: laserFlowConfig.bottom === 'auto' ? undefined : laserFlowConfig.bottom,
            alignItems: laserFlowConfig.alignItems,
            justifyContent: laserFlowConfig.justifyContent,
            zIndex: laserFlowConfig.zIndex,
          }}
        >
          {isMounted && (
            <div
              style={{
                width:
                  screenSize === 'mobile'
                    ? laserFlowConfig.size.mobile.width
                    : screenSize === 'largeMobile'
                      ? laserFlowConfig.size.largeMobile.width
                      : screenSize === 'tabletPortrait'
                        ? laserFlowConfig.size.tabletPortrait.width
                        : screenSize === 'tablet'
                          ? laserFlowConfig.size.tablet.width
                          : screenSize === 'laptop'
                            ? laserFlowConfig.size.laptop.width
                            : laserFlowConfig.size.desktop.width,
                height:
                  screenSize === 'mobile'
                    ? laserFlowConfig.size.mobile.height
                    : screenSize === 'largeMobile'
                      ? laserFlowConfig.size.largeMobile.height
                      : screenSize === 'tabletPortrait'
                        ? laserFlowConfig.size.tabletPortrait.height
                        : screenSize === 'tablet'
                          ? laserFlowConfig.size.tablet.height
                          : screenSize === 'laptop'
                            ? laserFlowConfig.size.laptop.height
                            : laserFlowConfig.size.desktop.height,
                position: 'relative',
                transform: `scale(${screenSize === 'mobile' ? '1.9' :
                  screenSize === 'largeMobile' ? '1.5' :
                    screenSize === 'tabletPortrait' ? '0.85' :
                      screenSize === 'tablet' ? '0.9' :
                        screenSize === 'laptop' ? '1' :
                          '1'
                  })`,
              }}
            >
              <LaserFlow
                {...laserFlowConfig.laserFlowProps}
                decay={
                  screenSize === 'mobile'
                    ? laserFlowConfig.beamOffsets.mobile.decay
                    : screenSize === 'largeMobile'
                      ? laserFlowConfig.beamOffsets.largeMobile.decay
                      : screenSize === 'tabletPortrait'
                        ? laserFlowConfig.beamOffsets.tabletPortrait.decay
                        : screenSize === 'tablet'
                          ? laserFlowConfig.beamOffsets.tablet.decay
                          : screenSize === 'laptop'
                            ? laserFlowConfig.beamOffsets.laptop.decay
                            : laserFlowConfig.beamOffsets.desktop.decay
                }
                verticalSizing={
                  screenSize === 'mobile'
                    ? laserFlowConfig.beamOffsets.mobile.verticalSizing
                    : screenSize === 'largeMobile'
                      ? laserFlowConfig.beamOffsets.largeMobile.verticalSizing
                      : screenSize === 'tabletPortrait'
                        ? laserFlowConfig.beamOffsets.tabletPortrait.verticalSizing
                        : screenSize === 'tablet'
                          ? laserFlowConfig.beamOffsets.tablet.verticalSizing
                          : screenSize === 'laptop'
                            ? laserFlowConfig.beamOffsets.laptop.verticalSizing
                            : laserFlowConfig.beamOffsets.desktop.verticalSizing
                }
                horizontalBeamOffset={
                  screenSize === 'mobile'
                    ? laserFlowConfig.beamOffsets.mobile.horizontalBeamOffset
                    : screenSize === 'largeMobile'
                      ? laserFlowConfig.beamOffsets.largeMobile.horizontalBeamOffset
                      : screenSize === 'tabletPortrait'
                        ? laserFlowConfig.beamOffsets.tabletPortrait.horizontalBeamOffset
                        : screenSize === 'tablet'
                          ? laserFlowConfig.beamOffsets.tablet.horizontalBeamOffset
                          : screenSize === 'laptop'
                            ? laserFlowConfig.beamOffsets.laptop.horizontalBeamOffset
                            : laserFlowConfig.beamOffsets.desktop.horizontalBeamOffset
                }
                verticalBeamOffset={
                  screenSize === 'mobile'
                    ? laserFlowConfig.beamOffsets.mobile.verticalBeamOffset
                    : screenSize === 'largeMobile'
                      ? laserFlowConfig.beamOffsets.largeMobile.verticalBeamOffset
                      : screenSize === 'tabletPortrait'
                        ? laserFlowConfig.beamOffsets.tabletPortrait.verticalBeamOffset
                        : screenSize === 'tablet'
                          ? laserFlowConfig.beamOffsets.tablet.verticalBeamOffset
                          : screenSize === 'laptop'
                            ? laserFlowConfig.beamOffsets.laptop.verticalBeamOffset
                            : laserFlowConfig.beamOffsets.desktop.verticalBeamOffset
                }
              />
            </div>
          )}
        </div>
      )}

      {/* Main Content Wrapper - Increased padding for mobile */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center pt-12 sm:pt-16 md:pt-20 pb-0 relative z-10">

        {/* 1. Top Badge / Notification */}
        <div className="mb-4 sm:mb-6">
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#FF8D00]/50 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8D00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8D00]"></span>
            </span>
            <span className="text-sm text-white/90 font-medium flex items-center gap-2">
              ThumbnailGPT
              <span className="px-1.5 py-[1px] rounded bg-[#FF8D00] text-[10px] font-bold text-black uppercase tracking-wide leading-tight shadow-[0_0_10px_rgba(255,141,0,0.3)]">
                V2
              </span>
              Live
              <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FF8D00] group-hover:translate-x-0.5 transition-all ml-0.5" />
            </span>
          </a>
        </div>

        {/* 2. Headline - Responsive sizing */}
        <div className="text-center mb-5 sm:mb-6 max-w-5xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.1] text-white">
            Your
            <span className="inline-flex items-center justify-center align-middle mx-1.5 sm:mx-2.5 md:mx-3 relative -top-0.5 sm:-top-1">
              {/* YouTube Icon - Scaled for responsive */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-11 sm:h-11 md:w-[52px] md:h-[52px] lg:w-16 lg:h-16 text-[#FF0000] drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </span>
            Videos Deserve to <br className="hidden md:block" />
            Be Clicked, Let's Make It Happen
          </h1>
        </div>

        {/* 3. Subheading - Responsive sizing and width */}
        <div className="text-center mb-4 sm:mb-6 max-w-sm sm:max-w-lg md:max-w-xl mx-auto">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
            Custom-designed thumbnails that make your <br className="hidden sm:block" />
            content impossible to ignore.
          </p>
        </div>

        {/* 4. Input Area - Responsive width and padding */}
        <div className="mt-0 sm:mt-2 w-full max-w-lg sm:max-w-xl md:max-w-4xl mx-auto relative z-[3]">
          {/* Glassmorphism border wrapper - stroke only */}
          <div
            className="rounded-2xl p-[3px] transition-all duration-200"
            style={{
              background: isFocused
                ? 'linear-gradient(135deg, rgba(255, 141, 0, 0.4), rgba(255, 141, 0, 0.2))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
              backdropFilter: 'blur(10px) saturate(180%)',
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              boxShadow: isFocused
                ? '0 0 20px rgba(255, 141, 0, 0.1)'
                : 'none',
            }}
          >
            <div
              className="rounded-2xl p-3 sm:p-4 w-full bg-[#111] transition-all duration-200"
            >
              <div className="flex flex-col gap-3">
                <div className="w-full min-h-[50px] relative flex items-start">

                  {/* Animated Placeholder Overlay - Responsive Text Size */}
                  {!message && (
                    <div
                      className="absolute top-0 left-0 w-full h-full pointer-events-none text-white/40 leading-relaxed text-sm sm:text-base transition-opacity duration-500 flex items-start"
                      style={{
                        padding: '2px 0px 2px 2px',
                        opacity: fadeOpacity
                      }}
                    >
                      {placeholders[currentPlaceholder]}
                    </div>
                  )}

                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    // placeholder removed to allow animated overlay
                    className="w-full bg-transparent resize-none focus:outline-none leading-relaxed text-sm sm:text-base placeholder-transparent custom-scrollbar"
                    rows={1}
                    spellCheck={false}
                    data-lenis-prevent
                    style={{
                      minHeight: '24px',
                      maxHeight: '120px',
                      overflowY: 'hidden',
                      whiteSpace: 'pre-wrap',
                      color: '#eee',
                      caretColor: '#FF8D00',
                      padding: '2px 0px 2px 2px',
                      height: 'auto'
                    }}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    className="btn-generate rounded-full flex items-center justify-center gap-2 px-4 py-2 min-w-[100px] text-sm sm:text-base"
                    title="Generate thumbnail"
                  >
                    <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
