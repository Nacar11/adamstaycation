'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { AIRBNB_LISTING_URL } from '@/lib/constants'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { cn } from '@/lib/utils'
import { scrollToTarget } from '@/lib/scroll'
import { CTA_GRADIENT, CTA_SHIMMER } from '@/lib/theme'

interface NavLink {
    href: string
    label: string
}

const navLinks: NavLink[] = [
    { href: '#home', label: 'Home' },
    { href: '#experience', label: 'Experience' },
    { href: '#host', label: 'Host' },
]

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        if (scrollToTarget(href)) setIsMobileMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
                        : "bg-transparent py-6"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className={cn(
                            "font-display text-2xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 rounded-lg px-2 py-1",
                            isScrolled ? "text-ocean-deep" : "text-white"
                        )}
                        aria-label="Adam's Staycation - Home"
                    >
                        Adam&apos;s Staycation
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={cn(
                                    "text-sm font-medium transition-colors duration-300 hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 rounded px-2 py-1",
                                    isScrolled ? "text-ocean-deep" : "text-white"
                                )}
                                aria-label={`Navigate to ${link.label} section`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={AIRBNB_LISTING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Book your stay on Airbnb (opens in new tab)"
                        >
                            <ShimmerButton
                                className="h-10 px-6 text-sm font-medium"
                                shimmerColor={CTA_SHIMMER}
                                shimmerSize="0.08em"
                                background={CTA_GRADIENT}
                            >
                                <span className="text-white">Book Now</span>
                            </ShimmerButton>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={cn(
                            "md:hidden p-3 transition-colors duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral",
                            isScrolled ? "text-ocean-deep" : "text-white"
                        )}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open navigation menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <Menu className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-ocean-deep/60 backdrop-blur-sm z-50 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <motion.div
                            id="mobile-menu"
                            className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 md:hidden shadow-2xl"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-display text-xl text-ocean-deep">Menu</span>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-ocean-deep rounded-lg transition-colors hover:bg-sand-light focus:outline-none focus:ring-2 focus:ring-ocean"
                                        aria-label="Close navigation menu"
                                    >
                                        <X className="w-6 h-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="text-lg font-medium text-ocean-deep py-3 px-2 border-b border-sand transition-colors hover:text-coral hover:bg-sand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean"
                                            aria-label={`Navigate to ${link.label} section`}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                    <a
                                        href={AIRBNB_LISTING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4"
                                        aria-label="Book your stay on Airbnb (opens in new tab)"
                                    >
                                        <ShimmerButton
                                            className="w-full h-14 text-base font-medium"
                                            shimmerColor={CTA_SHIMMER}
                                            shimmerSize="0.1em"
                                            background={CTA_GRADIENT}
                                        >
                                            <span className="text-white">Book on Airbnb</span>
                                        </ShimmerButton>
                                    </a>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
