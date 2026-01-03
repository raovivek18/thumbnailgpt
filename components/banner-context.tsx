"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type BannerContextType = {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
}

const BannerContext = createContext<BannerContextType | undefined>(undefined)

export function BannerProvider({ 
  children, 
  initialVisible = false 
}: { 
  children: React.ReactNode
  initialVisible?: boolean 
}) {
  const [isVisible, setIsVisible] = useState(initialVisible)

  return (
    <BannerContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </BannerContext.Provider>
  )
}

export function useBanner() {
  const context = useContext(BannerContext)
  if (context === undefined) {
    throw new Error("useBanner must be used within a BannerProvider")
  }
  return context
}

