"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const styles = `
  :root {
    --clr-font-main: hsla(0 0% 20% / 100);
    --btn-bg-1: hsla(35, 100%, 55%, 1);
    --btn-bg-2: hsla(25, 100%, 45%, 1);
    --btn-bg-color: hsla(360 100% 100% / 1);
    --radii: 16px;
  }

  .btn-animated {
    cursor: pointer;
    font-weight: 600;
    transition: 0.8s;
    background-size: 280% auto;
    background-image: linear-gradient(
      325deg,
      var(--btn-bg-2) 0%,
      var(--btn-bg-1) 55%,
      var(--btn-bg-2) 90%
    );
    border: none;
    color: white;
    box-shadow:
      0px 0px 20px rgba(255, 141, 0, 0.5),
      0px 5px 5px -1px rgba(200, 80, 0, 0.25),
      inset 4px 4px 8px rgba(255, 210, 150, 0.5),
      inset -4px -4px 8px rgba(180, 70, 0, 0.35);
  }

  .btn-animated:hover:not(:disabled) {
    background-position: right top;
  }

  .btn-animated:is(:focus, :focus-visible, :active):not(:disabled) {
    outline: none;
    box-shadow:
      0 0 0 3px var(--btn-bg-color),
      0 0 0 6px var(--btn-bg-2);
  }

  .btn-animated:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-image: linear-gradient(
      325deg,
      rgba(255, 141, 0, 0.2) 0%,
      rgba(255, 165, 0, 0.3) 55%,
      rgba(255, 141, 0, 0.2) 90%
    );
    color: #FF8D00;
    border: 2px solid rgba(255, 141, 0, 0.4);
    box-shadow:
      0px 0px 15px rgba(255, 141, 0, 0.3),
      0px 3px 3px -1px rgba(255, 141, 0, 0.2);
  }

  .btn-outline {
    background: transparent;
    color: #FF8D00;
    border: 2px solid rgba(255, 141, 0, 0.6);
    box-shadow: none;
  }

  .btn-outline:hover:not(:disabled) {
    background: rgba(255, 141, 0, 0.1);
    border-color: #FF8D00;
  }

  .btn-ghost {
    background: transparent;
    color: rgb(212 212 212);
    border: none;
    box-shadow: none;
  }

  .btn-ghost:hover:not(:disabled) {
    color: #FF8D00;
    background: rgba(255, 255, 255, 0.05);
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-animated {
      transition: linear;
    }
  }
`

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: AnimatedButtonProps) {
  const sizeStyles = {
    sm: "px-5 py-2 text-xs rounded-lg min-w-[100px] min-h-[36px]",
    md: "px-6 py-3 text-sm rounded-lg min-w-[120px] min-h-[44px]",
    lg: "px-7 py-3.5 text-base rounded-2xl min-w-[140px] min-h-[44px]",
  }

  const variantClass = {
    primary: "btn-animated",
    secondary: "btn-animated btn-secondary",
    outline: "btn-animated btn-outline",
    ghost: "btn-animated btn-ghost",
  }

  return (
    <>
      <style>{styles}</style>
      <button className={cn(variantClass[variant], sizeStyles[size], className)} disabled={disabled} {...props}>
        {children}
      </button>
    </>
  )
}

export default AnimatedButton
