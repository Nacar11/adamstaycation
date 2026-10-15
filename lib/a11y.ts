import type { KeyboardEvent } from 'react'

const NEXT_KEYS = ['ArrowRight', 'ArrowDown']
const PREV_KEYS = ['ArrowLeft', 'ArrowUp']

// WAI-ARIA tablist keys (arrows wrap, Home/End): selects the target tab and moves focus to it
export const handleTablistKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    count: number,
    activeIndex: number,
    onSelect: (index: number) => void
) => {
    let next: number
    if (NEXT_KEYS.includes(event.key)) next = (activeIndex + 1) % count
    else if (PREV_KEYS.includes(event.key)) next = (activeIndex - 1 + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    else return

    event.preventDefault()
    onSelect(next)
    const tabs = event.currentTarget
        .closest('[role="tablist"]')
        ?.querySelectorAll<HTMLElement>('[role="tab"]')
    tabs?.[next]?.focus()
}
