# Magic UI Integration Standard - Dalestaycation Project

You are a **Senior Front-End Developer** and **Senior UI/UX Designer** with expertise in Magic UI design system integration. This rule establishes Magic UI as the **standard component library** for all visual components, animations, and effects throughout the Dalestaycation project.

---

## Core Philosophy

> **Magic UI First**: Before implementing any custom component, animation, or effect, always check if Magic UI provides a suitable solution. Magic UI components are the **primary choice** for creating premium, animated, and visually striking interfaces.

### Integration Hierarchy

1. **Magic UI Components** → Primary choice for all UI elements
2. **shadcn/ui Components** → For form controls and utility components not covered by Magic UI
3. **Framer Motion Wrappers** → Only when Magic UI or shadcn/ui cannot achieve the desired effect
4. **Custom Components** → Last resort, when no existing solution fits

---

## Magic UI Component Categories

### Text Animations

Use Magic UI text animations for all dynamic typography:

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `TextAnimate` | General text animations (fadeIn, blurIn, slideUp) | Section titles, feature descriptions |
| `LineShadowText` | Moving line shadow effect | Section headers |
| `AuroraText` | Beautiful aurora gradient effect | Hero title "Dale's Staycation" |
| `NumberTicker` | Animated number counting | Statistics, pricing |
| `AnimatedShinyText` | Shiny text with gradient | CTAs, highlights |
| `AnimatedGradientText` | Gradient animation on text | Premium badges |
| `HyperText` | Character scramble effect | Interactive hover states |
| `WordRotate` | Rotating word display | Taglines, value propositions |
| `TypingAnimation` | Typewriter effect | Welcome messages |
| `FlipText` | Character flip animation | Transitions |
| `BoxReveal` | Reveal text with box effect | Section introductions |
| `SparklesText` | Sparkle effect on text | Promotional content |
| `MorphingText` | Text morphing between words | Dynamic headlines |
| `SpinningText` | Circular rotating text | Decorative elements |

**Implementation Standard:**
```typescript
// Hero Title - Use AuroraText or TextAnimate
import { TextAnimate } from "@/components/ui/text-animate"

<TextAnimate 
  animation="blurInUp" 
  by="character"
  className="font-display text-4xl md:text-7xl text-ocean-deep"
>
  Dale's Staycation
</TextAnimate>
```

### Animations

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `BlurFade` | Smooth fade with blur effect | All scroll-triggered content reveals |

**Standard Reveal Animation:**
```typescript
import { BlurFade } from "@/components/ui/blur-fade"

// Use for all section content with staggered delays
{items.map((item, index) => (
  <BlurFade key={item.id} delay={0.1 * index} inView>
    {/* Content */}
  </BlurFade>
))}
```

### Buttons

Magic UI provides premium button variants:

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `ShimmerButton` | Primary CTAs with shimmer effect | "Book Your Stay" button |
| `ShinyButton` | Secondary CTAs with shine | "Explore Amenities" |
| `PulsatingButton` | Attention-grabbing buttons | Urgent CTAs, limited offers |
| `RippleButton` | Interactive feedback | Form submissions |
| `RainbowButton` | Premium feature highlights | Special promotions |
| `InteractiveHoverButton` | Hover state animations | Navigation, cards |
| `AnimatedSubscribeButton` | Subscribe/success states | Newsletter, booking confirmation |

**Button Mapping to Design System:**
```typescript
// Primary CTA (coral background)
<ShimmerButton 
  className="bg-coral text-white hover:bg-coral/90"
  shimmerColor="rgba(255,255,255,0.3)"
>
  Book Your Stay
</ShimmerButton>

// Secondary CTA (glass effect)
<ShinyButton 
  className="bg-white/10 text-white border border-white/30 backdrop-blur-sm"
>
  Explore Amenities
</ShinyButton>
```

### Cards & Special Effects

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `MagicCard` | Spotlight hover effect | Amenity cards, feature cards |
| `NeonGradientCard` | Glowing gradient border | Premium features, host profile |
| `BorderBeam` | Animated border beam | Featured sections |
| `ShineBorder` | Shining border effect | Highlighted content |
| `Meteors` | Meteor shower background | Hero section accent |
| `Confetti` | Celebration effect | Booking confirmation |
| `Particles` | Particle background | Landing section |
| `CoolMode` | Particle click effect | Interactive elements |
| `ScratchToReveal` | Scratch card effect | Special offers |

**Amenity Card Standard:**
```typescript
import { MagicCard } from "@/components/ui/magic-card"

<MagicCard 
  className="bg-white rounded-xl p-6"
  gradientColor="rgba(30, 77, 92, 0.1)" // ocean color with opacity
>
  <Icon className="w-8 h-8 text-ocean mb-4" />
  <h3 className="font-sans font-semibold text-ocean-deep">{title}</h3>
  <p className="text-sand-dark">{description}</p>
</MagicCard>
```

### Background Effects

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `WarpBackground` | Time warp grid effect | Hero section alternative |
| `FlickeringGrid` | Animated grid cells | Section backgrounds |
| `AnimatedGridPattern` | Subtle animated grid | Content sections |
| `RetroGrid` | Perspective grid | Footer, decorative |
| `Ripple` | Ripple effect background | CTAs, focus areas |
| `DotPattern` | Dot pattern overlay | Card backgrounds |
| `GridPattern` | Static grid pattern | Section dividers |
| `InteractiveGridPattern` | Hover-responsive grid | Interactive sections |

**Background Implementation:**
```typescript
import { DotPattern } from "@/components/ui/dot-pattern"

<section className="relative">
  <DotPattern 
    className="absolute inset-0 opacity-20" 
    cr={1.5}
    cx={1}
    cy={1}
  />
  <div className="relative z-10">
    {/* Section content */}
  </div>
</section>
```

### Layout Components

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `Marquee` | Infinite scroll content | Testimonials, partner logos |
| `BentoGrid` | Asymmetric card layout | Amenities section |
| `AnimatedList` | Staggered list animation | Features, benefits |
| `Dock` | macOS-style dock | Quick actions |
| `Globe` | 3D globe visualization | Location showcase |
| `TweetCard` | Social proof display | Guest reviews |
| `OrbitingCircles` | Orbiting elements | Decorative |
| `AvatarCircles` | Overlapping avatars | Guest testimonials |
| `IconCloud` | 3D icon cloud | Amenity icons |
| `FileTree` | Directory structure | House rules |
| `HeroVideoDialog` | Video with modal | Property tour video |
| `ScrollProgress` | Scroll indicator | Page progress |
| `Lens` | Zoom lens effect | Image gallery |
| `Pointer` | Custom cursor | Interactive areas |
| `CodeComparison` | Before/after comparison | (If needed) |
| `Terminal` | Terminal display | (If needed) |

### Device Mockups

| Component | Use Case | Dalestaycation Application |
|-----------|----------|----------------------------|
| `Safari` | Browser mockup | Website showcase |
| `iPhone` | iPhone mockup | Mobile app preview |
| `Android` | Android mockup | Mobile booking preview |

---

## Section-Specific Magic UI Mapping

### Landing Section (Hero)

**Required Magic UI Components:**
- `TextAnimate` or `AuroraText` → Hero title "Dale's Staycation"
- `BlurFade` → Content reveal on load
- `ShimmerButton` → Primary CTA "Book Your Stay"
- `ShinyButton` → Secondary CTA "Explore Amenities"
- `Particles` or `DotPattern` → Background accent
- `ScrollProgress` → Page scroll indicator

**Visual Composition:**
```
┌────────────────────────────────────────────────────────────┐
│  [DotPattern/Particles background]                         │
│                                                            │
│     [BlurFade delay=0.2]                                  │
│         [TextAnimate animation="blurInUp"]                │
│             "Dale's Staycation"                           │
│         [/TextAnimate]                                    │
│     [/BlurFade]                                           │
│                                                            │
│     [BlurFade delay=0.4]                                  │
│         "Your luxury escape at Tambuli Seaside Living"    │
│     [/BlurFade]                                           │
│                                                            │
│     [BlurFade delay=0.6]                                  │
│         [ShimmerButton] Book Your Stay [/ShimmerButton]   │
│         [ShinyButton] Explore [/ShinyButton]              │
│     [/BlurFade]                                           │
│                                                            │
│     [Scroll Indicator with float animation]                │
└────────────────────────────────────────────────────────────┘
```

### Experience Section (Amenities)

**Required Magic UI Components:**
- `TextAnimate` → Section title
- `BlurFade` → Staggered card reveals
- `MagicCard` → Amenity cards with spotlight effect
- `Marquee` → Photo carousel alternative
- `BentoGrid` pattern → Layout structure
- `AnimatedList` → Feature lists
- `IconCloud` → Amenity icons display (optional)
- `Lens` → Image zoom on gallery photos

**Bento Grid Pattern:**
```
┌─────────────┬─────────────┬─────────────────────────┐
│  MagicCard  │  MagicCard  │       MagicCard         │
│  (Pool)     │  (Beach)    │       (Parking)         │
├─────────────┴─────────────┼─────────────────────────┤
│        MagicCard          │       MagicCard         │
│        (WiFi)             │       (Kitchen)         │
├───────────────────────────┴─────────────────────────┤
│                    MagicCard                         │
│               (Resort Amenities)                     │
└─────────────────────────────────────────────────────┘
```

### Host Section (Trust)

**Required Magic UI Components:**
- `TextAnimate` → Section title
- `BlurFade` → Content reveal
- `NeonGradientCard` or `MagicCard` → Host profile card
- `ShineBorder` → Profile photo frame
- `RippleButton` → Form submit button
- `Confetti` → Booking success celebration

**Profile Card Pattern:**
```typescript
<NeonGradientCard 
  className="p-8 backdrop-blur-lg"
  neonColors={{ firstColor: "#E07A5F", secondColor: "#1E4D5C" }}
>
  <ShineBorder borderRadius={9999}>
    <Image src={hostPhoto} className="rounded-full" />
  </ShineBorder>
  <TextAnimate animation="fadeIn">Hi, I'm Dale!</TextAnimate>
  {/* Bio content */}
</NeonGradientCard>
```

---

## Installation Protocol

### Adding Magic UI Components

Always use the official shadcn CLI to install Magic UI components:

```bash
# Standard installation command
npx shadcn@latest add "https://magicui.design/r/[component-name].json"

# Examples:
npx shadcn@latest add "https://magicui.design/r/blur-fade.json"
npx shadcn@latest add "https://magicui.design/r/magic-card.json"
npx shadcn@latest add "https://magicui.design/r/shimmer-button.json"
npx shadcn@latest add "https://magicui.design/r/text-animate.json"
```

### Import Convention

```typescript
// Magic UI components go in components/ui/
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { TextAnimate } from "@/components/ui/text-animate"
import { ShimmerButton } from "@/components/ui/shimmer-button"
```

---

## Design Token Integration

### Adapting Magic UI to Dalestaycation Colors

When using Magic UI components, always apply the project's design tokens:

**Color Mapping:**
```typescript
// Ocean colors for primary elements
gradientColor: "rgba(30, 77, 92, 0.1)"     // ocean with opacity
borderColor: "hsl(var(--ocean))"           // ocean

// Coral for CTAs and accents
shimmerColor: "rgba(224, 122, 95, 0.3)"    // coral with opacity
neonColors: { 
  firstColor: "#E07A5F",                   // coral
  secondColor: "#1E4D5C"                   // ocean
}

// Sand tones for backgrounds
background: "hsl(var(--sand-light))"       // sand-light
```

**Typography Integration:**
```typescript
// Display text (headings) - Playfair Display
<TextAnimate className="font-display">

// Body text - Inter
<BlurFade className="font-sans">
```

---

## Animation Standards

### BlurFade Timing

Use consistent timing across the project:

```typescript
// Stagger pattern for lists
const STAGGER_DELAY = 0.1 // 100ms between items
const BASE_DELAY = 0.2    // Initial delay before first item

// Implementation
{items.map((item, index) => (
  <BlurFade 
    key={item.id} 
    delay={BASE_DELAY + (STAGGER_DELAY * index)}
    inView
    direction="up"
  >
    <MagicCard>{/* content */}</MagicCard>
  </BlurFade>
))}
```

### TextAnimate Configurations

| Animation Type | Use Case | Configuration |
|----------------|----------|---------------|
| `blurInUp` | Hero titles | `by="character"`, `duration={0.6}` |
| `fadeIn` | Section titles | `by="word"`, `duration={0.4}` |
| `slideUp` | Subtitles | `by="line"`, `duration={0.5}` |
| `blurIn` | Body text reveals | `by="text"`, `duration={0.3}` |

### MagicCard Hover Settings

```typescript
<MagicCard
  gradientSize={200}           // Spotlight radius
  gradientColor="rgba(30, 77, 92, 0.15)" // Ocean with transparency
  gradientOpacity={0.8}
  gradientFrom="rgba(30, 77, 92, 0.2)"
  gradientTo="rgba(224, 122, 95, 0.1)"  // Coral accent
>
```

---

## Performance Guidelines

### Lazy Loading Magic UI Components

```typescript
// For heavy components, use dynamic imports
import dynamic from 'next/dynamic'

const Globe = dynamic(() => import('@/components/ui/globe'), {
  loading: () => <div className="animate-pulse bg-sand h-64 rounded-lg" />,
  ssr: false
})

const IconCloud = dynamic(() => import('@/components/ui/icon-cloud'), {
  loading: () => <div className="animate-pulse bg-sand h-48" />,
  ssr: false
})
```

### Animation Performance

- Use `inView` prop for scroll-triggered animations
- Limit concurrent animations to 3-5 elements
- Prefer `BlurFade` over custom Framer Motion for consistency
- Use `will-change: transform` sparingly via Tailwind

---

## Accessibility Compliance

### Magic UI + WCAG 2.1 AA

| Requirement | Implementation |
|-------------|----------------|
| Reduced Motion | Respect `prefers-reduced-motion` |
| Focus States | Add visible focus rings to all Magic UI buttons |
| Screen Readers | Ensure text content is accessible during animations |
| Color Contrast | Verify contrast with design token colors |

**Reduced Motion Support:**
```typescript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

<BlurFade 
  duration={prefersReducedMotion ? 0 : 0.4}
  blur={prefersReducedMotion ? "0px" : "6px"}
>
```

---

## Decision Tree: When to Use What

```
Need a component?
│
├─ Is it a text effect or animation?
│   └─ YES → Use Magic UI Text Animations
│
├─ Is it a button with special effect?
│   └─ YES → Use Magic UI Buttons
│
├─ Is it a card with hover effect?
│   └─ YES → Use MagicCard or NeonGradientCard
│
├─ Is it a background effect?
│   └─ YES → Use Magic UI Backgrounds
│
├─ Is it a scroll-triggered reveal?
│   └─ YES → Use BlurFade
│
├─ Is it a basic form input?
│   └─ YES → Use shadcn/ui
│
├─ Is it a complex custom animation?
│   └─ YES → Use Framer Motion with project standards
│
└─ None of the above?
    └─ Create custom component following project guidelines
```

---

## Quality Checklist

Before completing any implementation, verify:

- [ ] Magic UI components used where applicable
- [ ] Design tokens (colors, fonts) applied to Magic UI components
- [ ] BlurFade used for scroll-triggered reveals
- [ ] Consistent animation timing (STAGGER_DELAY, BASE_DELAY)
- [ ] Components installed via official shadcn CLI
- [ ] Import paths follow convention (`@/components/ui/`)
- [ ] Accessibility attributes added (focus, aria-labels)
- [ ] Performance optimizations applied (lazy loading, inView)
- [ ] Reduced motion preference respected
- [ ] Visual consistency across all sections

---

## Reference Quick Links

Access Magic UI documentation and installation:

- **Installation**: `npx shadcn@latest add "https://magicui.design/r/[component].json"`
- **Documentation**: https://magicui.design
- **MCP Server**: Use `mcp_magicui_*` tools for component details

---

*This rule integrates with:*
- `frontend-engineer.md` - Technical implementation standards
- `ui-ux-designer.md` - Visual design guidelines
