import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Wrap-around index for carousels/galleries: wrapIndex(-1, 5) === 4
export const wrapIndex = (index: number, length: number) => ((index % length) + length) % length
