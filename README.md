# Dale's Staycation

A luxury rental showcase website for a premium condo at Tambuli Seaside Living, Lapu-Lapu City, Cebu, Philippines.

## 🏖️ About

Dale's Staycation is a single-page luxury rental website that showcases a one-bedroom condo unit with world-class resort amenities. The site directs interested visitors to Airbnb for bookings.

## ✨ Features

- **Animated Landing Section** - Staggered title animation with hero background
- **Experience Section** - Bento grid showcasing 8 amenities + photo gallery carousel
- **Host Section** - Profile with trust indicators and booking CTAs
- **Responsive Design** - Mobile-first with smooth animations
- **SEO Optimized** - Meta tags, Open Graph, and semantic HTML

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Playfair Display + Inter (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Nacar11/dalestaycation.git

# Navigate to project directory
cd dalestaycation

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dalestaycation/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main single-page entry
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── sections/
│   │   ├── landing-section.tsx
│   │   ├── experience-section.tsx
│   │   └── host-section.tsx
│   └── shared/
│       └── navbar.tsx
├── public/                 # Static assets
└── dalestaycation.md      # Product Requirements Document
```

## 🎨 Design System

- **Colors:** Sand, Ocean, Coral palette
- **Typography:** Playfair Display (headings) + Inter (body)
- **Animations:** Fade-in, slide-up, stagger, parallax effects

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

```bash
npm run build
```

## 📄 License

© 2026 Dale's Staycation. All rights reserved.

## 👤 Author

**Dale Nacario**
- Property Owner & Frontend Engineer
- Based in Cebu, Philippines

---

Made with ❤️ in Cebu
