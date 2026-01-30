"use client"

import React from 'react'
import { Paperclip, RectangleHorizontal, RectangleVertical, Sparkles } from 'lucide-react'

const MAX_CHARS = 10000
const THEME_ORANGE = '#FF8D00'

type TextToThumbnailInputProps = {
  onGenerate?: (aspectRatio: string, apiCall: (thumbnailId?: string | null) => Promise<any>) => void
  onError?: (error: string) => void
  credits?: number | null
  toasterRef?: React.RefObject<any>
  isSidebarCollapsed?: boolean
  isFreeUser?: boolean
}

export default function TextToThumbnailInput({
  onGenerate,
  onError,
  credits,
  toasterRef,
  isSidebarCollapsed = false,
  isFreeUser = false,
}: TextToThumbnailInputProps) {
  // Dummy component - no logic, just UI
  const prompt = ''
  const aspectRatio: '16:9' | '9:16' = '16:9'
  const referenceImage = null
  const error = null

  // Dummy handlers
  const handleTextChange = (_e: React.ChangeEvent<HTMLTextAreaElement>) => {}
  const handleFileSelect = (_e?: React.ChangeEvent<HTMLInputElement>) => {}
  const removeImage = () => {}
  const handleFocus = () => {}
  const handleBlur = () => {}
  const handleKeyDown = (_e: React.KeyboardEvent<HTMLTextAreaElement>) => {}
  const handleSubmit = () => {}
  const setAspectRatio = (_ratio: '16:9' | '9:16') => {}

  return (
    <div className="w-full max-w-2xl mx-auto">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 141, 0, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 141, 0, 0.6);
        }
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
      `}</style>

      {/* Main Component Wrapper */}
      <div 
        className="relative rounded-3xl p-3 sm:p-5 w-full cursor-text transition-all duration-300 backdrop-blur-xl bg-black/40 border border-[#FF8D00]/20 shadow-2xl"
      >
        <div className="flex flex-col gap-4">
          
          {/* Top Section: Text Input & Image Preview */}
          <div className="w-full relative flex flex-col items-start cursor-text gap-3">
            
            {/* Reference Image Preview Bubble */}
            {referenceImage && (
              <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 pl-2 pr-2 py-1.5 rounded-xl border border-[#FF8D00]/20 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-full">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-black/20 flex items-center justify-center shrink-0">
                  <img 
                    src="" 
                    alt="Ref" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-xs text-gray-300 max-w-[120px] sm:max-w-[150px] truncate">
                  Image
                </span>
                <button 
                  onClick={removeImage}
                  className="p-1 hover:bg-[#FF8D00]/20 hover:text-[#FF8D00] rounded-full text-gray-400 transition-colors shrink-0 backdrop-blur-sm"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="w-full text-xs text-red-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* Main Textarea */}
            <div className={`w-full rounded-xl border transition-all duration-200 backdrop-blur-md ${
              error 
                ? 'border-red-500/60 bg-red-500/10' 
                : 'border-[#FF8D00]/30 bg-white/5 focus-within:border-[#FF8D00]/60 focus-within:bg-white/10 focus-within:shadow-[0_0_0_1px_rgba(255,141,0,0.2)]'
            }`}>
              <textarea
                id="message-textarea"
                value={prompt}
                onChange={handleTextChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Describe your thumbnail..."
                className="w-full bg-transparent resize-none focus:outline-none text-sm sm:text-base leading-relaxed selection:bg-[#FF8D00]/30 custom-scrollbar"
                rows={1}
                maxLength={MAX_CHARS}
                spellCheck={false}
                style={{
                  minHeight: '50px',
                  maxHeight: '220px',
                  overflow: 'hidden auto',
                  whiteSpace: 'pre-wrap',
                  color: prompt ? 'white' : 'rgb(139, 141, 144)',
                  caretColor: THEME_ORANGE,
                  padding: '12px 14px',
                }}
              />
            </div>
          </div>

          {/* Bottom Section: Controls & Send */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 pt-2">
            
            {/* Left Controls */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 flex-wrap">
              
               {/* Aspect Ratio Selector */}
               <div className="flex items-center backdrop-blur-md bg-white/5 rounded-full p-1 border border-[#FF8D00]/20">
                <button
                  onClick={() => setAspectRatio('16:9')}
                  type="button"
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-[#FF8D00] text-black shadow-sm shadow-[#FF8D00]/30"
                >
                  <RectangleHorizontal size={14} strokeWidth={2.5} />
                  <span>16:9</span>
                </button>
                <button
                  onClick={() => setAspectRatio('9:16')}
                  type="button"
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <RectangleVertical size={14} strokeWidth={2.5} />
                  <span>9:16</span>
                </button>
              </div>

              {/* Separator (Hidden on mobile) */}
              <div className="w-px h-6 bg-[#FF8D00]/20 hidden sm:block" />

              {/* Reference Image Button */}
              <div className="relative">
                <button 
                  type="button" 
                  onClick={() => handleFileSelect()}
                  className="flex items-center gap-2 h-9 px-2 sm:px-3 rounded-full transition-all text-sm outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 backdrop-blur-md bg-white/5 hover:bg-white/10 active:scale-95 group border border-transparent hover:border-[#FF8D00]/30"
                  style={{ color: 'rgb(255, 255, 255)', cursor: 'pointer' }}
                >
                  <span className="font-medium flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0 text-[#FF8D00]">
                       <Paperclip size={16} />
                    </span>
                    <span className="hidden sm:flex items-baseline gap-1.5">
                      <span className="group-hover:text-white transition-colors">Reference Image</span>
                      <span className="text-[10px] opacity-60">Optional</span>
                    </span>
                  </span>
                </button>
                <input 
                  type="file" 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

            </div>

            {/* Right Controls: Counter & Send Button */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              
              {/* Character Counter */}
              <span className="text-[10px] sm:text-xs font-sans text-[rgb(80,80,80)] select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
                {prompt.length}/{MAX_CHARS}
              </span>

              {/* Send Button */}
              <button
                onClick={handleSubmit}
                disabled={false}
                className="btn-generate rounded-full flex items-center justify-center gap-2 px-3 py-2 min-w-[100px]"
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
  )
}
