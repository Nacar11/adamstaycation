'use client'

import { MotionConfig } from 'motion/react'

interface MotionProviderProps {
    children: React.ReactNode
}

// Every motion/react animation (incl. Magic UI) drops transform/layout motion when the OS asks for reduced motion
const MotionProvider = ({ children }: MotionProviderProps) => (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
)

export default MotionProvider
