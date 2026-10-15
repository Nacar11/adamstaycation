import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'light' | 'dark'

const ACCENT_TEXT: Record<Tone, string> = { light: 'text-rust', dark: 'text-peach' }

interface SectionEyebrowProps {
    children: ReactNode
    tone?: Tone
    className?: string
}

// Small uppercase label above a section heading
export const SectionEyebrow = ({ children, tone = 'light', className }: SectionEyebrowProps) => (
    <p className={cn('text-xs uppercase tracking-[0.22em] font-semibold mb-5', ACCENT_TEXT[tone], className)}>{children}</p>
)

interface SectionHeadingProps {
    lead: ReactNode
    accent: ReactNode
    tone?: Tone
    accentOnNewLine?: boolean
    className?: string
    accentClassName?: string
}

// Display h2: plain lead followed by an italic accent (rust on light, peach on dark)
export const SectionHeading = ({
    lead,
    accent,
    tone = 'light',
    accentOnNewLine = false,
    className,
    accentClassName,
}: SectionHeadingProps) => (
    <h2
        className={cn(
            'font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight',
            tone === 'light' ? 'text-ocean-deep' : 'text-sand-light',
            className
        )}
    >
        {lead}
        {accentOnNewLine ? null : ' '}
        <em className={cn(ACCENT_TEXT[tone], accentOnNewLine && 'block', accentClassName)}>{accent}</em>
    </h2>
)
