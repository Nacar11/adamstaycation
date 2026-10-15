'use client'

import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { handleTablistKeyDown } from '@/lib/a11y'
import type { GalleryCategory, GalleryGroup } from './data'

export const GALLERY_PANEL_ID = 'gallery-panel'
export const GALLERY_CATEGORIES_ID = 'gallery-categories'
export const galleryTabId = (categoryId: string) => `gallery-tab-${categoryId}`

interface GalleryGroupTabsProps {
    groups: GalleryGroup[]
    activeGroupId: string
    onSelect: (groupId: string) => void
    onPrefetch: (groupId: string) => void
}

// "The Suite / The Resort" segmented tabs — switch which set of category pills is shown
export const GalleryGroupTabs = ({ groups, activeGroupId, onSelect, onPrefetch }: GalleryGroupTabsProps) => {
    const activeIndex = Math.max(0, groups.findIndex((group) => group.id === activeGroupId))

    return (
        <div
            className="inline-flex self-start sm:self-auto bg-white border border-sand-dark/15 rounded-xl p-1 shadow-sm flex-shrink-0"
            role="tablist"
            aria-label="Gallery groups"
        >
            {groups.map((group) => {
                const isActive = activeGroupId === group.id
                return (
                    <motion.button
                        key={group.id}
                        type="button"
                        onClick={() => onSelect(group.id)}
                        onKeyDown={(e) => handleTablistKeyDown(e, groups.length, activeIndex, (i) => onSelect(groups[i].id))}
                        onPointerEnter={() => onPrefetch(group.id)}
                        onFocus={() => onPrefetch(group.id)}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={GALLERY_CATEGORIES_ID}
                        tabIndex={isActive ? 0 : -1}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                        className={cn(
                            "px-5 py-2.5 min-h-[44px] flex items-center rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 focus-visible:ring-offset-1",
                            isActive
                                ? "bg-ocean-deep text-white shadow-md"
                                : "text-ocean/75 hover:text-ocean"
                        )}
                    >
                        {group.title}
                    </motion.button>
                )
            })}
        </div>
    )
}

interface GalleryCategoryPillsProps {
    categories: GalleryCategory[]
    activeCategoryId: string
    onSelect: (categoryId: string) => void
    onPrefetch: (category: GalleryCategory) => void
}

// Category pills — each is a tab controlling the photo panel
export const GalleryCategoryPills = ({ categories, activeCategoryId, onSelect, onPrefetch }: GalleryCategoryPillsProps) => {
    const activeIndex = Math.max(0, categories.findIndex((category) => category.id === activeCategoryId))

    return (
        <div
            id={GALLERY_CATEGORIES_ID}
            className="flex flex-wrap gap-2 mb-8"
            role="tablist"
            aria-label="Gallery categories"
        >
            <AnimatePresence mode="popLayout">
                {categories.map((category) => {
                    const isActive = activeCategoryId === category.id
                    return (
                        <motion.button
                            key={category.id}
                            id={galleryTabId(category.id)}
                            type="button"
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            onClick={() => onSelect(category.id)}
                            onKeyDown={(e) => handleTablistKeyDown(e, categories.length, activeIndex, (i) => onSelect(categories[i].id))}
                            onPointerEnter={() => onPrefetch(category)}
                            onFocus={() => onPrefetch(category)}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={GALLERY_PANEL_ID}
                            tabIndex={isActive ? 0 : -1}
                            className={cn(
                                "px-4 py-2.5 min-h-[44px] flex items-center rounded-full text-xs font-medium cursor-pointer transition-colors duration-200",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-rust/60 focus-visible:ring-offset-2",
                                isActive
                                    ? "bg-rust text-white shadow-sm shadow-rust/20"
                                    : "bg-white text-ocean/75 hover:text-ocean border border-sand-dark/15 hover:border-sand-dark/30"
                            )}
                        >
                            {category.title}
                        </motion.button>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
