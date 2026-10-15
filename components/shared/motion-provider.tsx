'use client'

import { MotionConfig } from 'motion/react'

interface MotionProviderProps {
    children: React.ReactNode
}

// All motion/react animations drop transform motion when the OS requests reduced motion
const MotionProvider = ({ children }: MotionProviderProps) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
)

export default MotionProvider
