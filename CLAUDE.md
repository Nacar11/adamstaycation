# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Adamstaycation is a single-page marketing site for an Airbnb property listing. Built with Next.js 14 (App Router) and TypeScript.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm start` — Serve production build

## Architecture

**Single-page app** with three scrollable sections rendered in `app/page.tsx`:
1. **LandingSection** — Hero with property intro
2. **ExperienceSection** — Property gallery and highlights
3. **HostSection** — Host info and contact

**Component organization:**
- `components/sections/` — Page sections (landing, experience, host)
- `components/shared/` — Shared layout components (navbar)
- `components/ui/` — Reusable animated primitives (shimmer-button, blur-fade, magic-card, text-animate, etc.) — mostly from Magic UI / shadcn-style patterns

**Key patterns:**
- Section components use `'use client'` for Framer Motion scroll-triggered animations (`useInView`)
- Path alias `@/*` maps to project root
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging
- `lib/constants.ts` holds the Airbnb listing URL and contact email
- Static property images live in `public/` and are referenced directly

## Styling

- Tailwind CSS with a custom theme in `tailwind.config.js`
- Custom color tokens: `sand` (light/default/dark), `ocean` (light/default/deep), `coral`
- Glass morphism utilities (`glass-effect`, `glass-card`) and premium shadows defined in `app/globals.css`
- CSS keyframe animations (fade-in, slide-up, float, stagger) alongside Framer Motion
- Fonts: Playfair Display (headings) and Inter (body) via `next/font/google`

## Configuration

- `components.json` — shadcn/ui config (new-york style, RSC enabled, lucide icons)
- `next.config.js` — Allows images from `images.unsplash.com`
- TypeScript strict mode enabled
