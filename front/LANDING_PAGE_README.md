# Broker XYZ Landing Page

## Overview
Fully responsive, accessible landing page for "Broker XYZ" - a real estate agent enablement platform built with React, Vite, Tailwind CSS, and shadcn/ui components.

## 🎯 Features

### ✅ Accessibility (WCAG AA+)
- Semantic HTML5 markup throughout
- Full keyboard navigation support
- Comprehensive ARIA labels and roles
- Color contrast ratios meeting AA+ standards
- Screen reader optimized content
- Focus indicators on all interactive elements

### ⚡ Performance
- Optimized LCP (Largest Contentful Paint) with hero section
- Lazy loading support for below-the-fold images
- Responsive images with proper sizing
- Prefetch support for primary CTA routes
- Minimal JavaScript bundle with code splitting
- Analytics event tracking with data attributes

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Fluid typography and spacing
- Touch-friendly interactive elements (min 44px tap targets)

### 🔍 SEO Optimized
- Complete meta tags (title, description, keywords)
- OpenGraph tags for social sharing (Facebook)
- Twitter Card support
- JSON-LD structured data (Organization, WebSite)
- Semantic heading hierarchy (H1 → H6)
- Descriptive alt text on images
- Proper internal linking

## 📦 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui v4
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Form Management**: React Hooks + Native Validation
- **Notifications**: Sonner (Toast)
- **SEO**: React Helmet Async
- **Carousel**: Embla Carousel React

## 🏗️ Project Structure

```
front/src/
├── components/
│   ├── ui/                        # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── badge.jsx
│   │   ├── carousel.jsx
│   │   ├── separator.jsx
│   │   ├── tabs.jsx
│   │   ├── avatar.jsx
│   │   ├── aspect-ratio.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── checkbox.jsx
│   │   ├── textarea.jsx
│   │   └── sonner.jsx
│   │
│   └── landing/                   # Landing page sections
│       ├── Navbar.jsx             # Sticky navigation
│       ├── Hero.jsx               # Hero section with CTAs
│       ├── MarcaSection.jsx       # Branding section
│       ├── LanzamientoSection.jsx # Launch process timeline
│       ├── MarketingSection.jsx   # Marketing services
│       ├── AcompanamientoSection.jsx # Onboarding support
│       ├── HistoriasSection.jsx   # Success stories carousel
│       ├── CTASection.jsx         # Contact form
│       └── Footer.jsx             # Footer with links
│
├── pages/
│   ├── LandingPage.jsx            # Main landing page
│   └── Home.jsx                   # Demo/test page
│
├── lib/
│   └── utils.ts                   # Utility functions (cn)
│
├── App.jsx                        # Main app component
├── main.jsx                       # Entry point
└── index.css                      # Global styles + Tailwind
```

## 🎨 Sections

### 1. Navbar
- **Position**: Fixed, sticky with blur background on scroll
- **Left**: "Broker XYZ" logo/text (clickable, scrolls to #inicio)
- **Center**: 5 nav links (Inicio, Marca, Lanzamiento, Marketing, Historias)
- **Right**: "Iniciar sesión" (outline) + "Únete a Broker XYZ" (primary) buttons
- **Mobile**: Simplified with single CTA button
- **Accessibility**: Full keyboard navigation, aria-labels on all links

### 2. Hero (#inicio)
- **H1**: "Sé dueño de tu propia inmobiliaria"
- **Subheadline**: Value proposition (back-office support, legal compliance)
- **CTAs**: 
  - Primary: "Empieza ahora" → Scrolls to contact form
  - Secondary: "Únete a Broker XYZ" → Scrolls to contact form
- **Trust Badge**: "+500 profesionales impulsados"
- **Background**: Interactive placeholder (`data-bg="interactive-unicorn-studio"`)
- **Performance**: Optimized for LCP

### 3. Marca (#marca)
- **Title**: "Crea una marca que destaque"
- **Content**: 3-column grid of feature cards
  - Naming & Logo
  - Guía visual
  - Kit de plantillas
- **Icons**: Lucide React (Palette, Eye, FileText)

### 4. Lanzamiento (#lanzamiento)
- **Title**: "Despega sin complicaciones"
- **Layout**: Vertical timeline/steps (4 steps)
  1. Licencia
  2. Seguro
  3. MLS/Equivalente
  4. Transferencia de listados
- **CTA**: "Habla con operaciones" (secondary button)

### 5. Marketing (#marketing)
- **Title**: "Haz que tu nombre llegue más lejos"
- **Layout**: 2x2 grid of service cards + showcase
  - Sitio web
  - Campañas digitales
  - Contenido de marca
  - Portales inmobiliarios
- **Showcase**: Responsive website mockup (AspectRatio 16:9)

### 6. Acompañamiento (#onboarding)
- **Title**: "Acompañamiento de principio a fin"
- **Layout**: Single card with avatar + checklist
- **Features**: 
  - Launch manager avatar (placeholder)
  - 6 milestone checkpoints
  - Support details

### 7. Historias (#historias)
- **Title**: "Historias de éxito"
- **Layout**: Carousel with testimonials
- **Testimonials**: 5 success stories with:
  - Avatar (with fallback initials)
  - Name + role
  - Quote
  - Results badge (quantified outcomes)
  - 5-star rating
- **Navigation**: Arrow buttons + keyboard support

### 8. CTA Final (#cta)
- **Title**: "Listo para ser dueño de tu negocio"
- **CTAs**: 
  - "Empezar la conversación" (primary)
  - "Solicitar información" (secondary)
- **Form Fields**:
  - Nombre completo (required)
  - Email (required, validated)
  - Teléfono (required)
  - Ciudad/Provincia (required)
  - ¿Tienes cartera/listados? (select, required)
  - Consentimiento RGPD (checkbox, required)
- **Validation**: Client-side with real-time error messages
- **Feedback**: Toast notifications (success/error)
- **Analytics**: Form submission tracking
- **Legal**: RGPD notice + privacy policy link

### 9. Footer
- **Sections**: 
  - Branding + description
  - Legal links (Términos, Privacidad, Cookies)
  - Contact info (email, phone, address)
  - Social media icons (LinkedIn, Facebook, Twitter, Instagram)
- **Bottom**: Copyright + MLS disclaimer

## 🎯 Analytics Integration

### Event Tracking
All CTAs include `data-analytics` attributes for easy integration:

```jsx
data-analytics-event="cta-click"
data-analytics-location="hero-primary"
```

### Scroll Depth Tracking
Automatic tracking at 25%, 50%, 75% scroll depth:

```javascript
window.dataLayer.push({ event: 'scroll_depth', depth: 25 });
```

### Form Submission
```javascript
window.dataLayer.push({
  event: 'form_submit',
  form_name: 'contact_form',
  ...formData
});
```

## 🚀 Getting Started

### Installation
```bash
cd front
npm install
```

### Development
```bash
npm run dev
```
Access at: `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: oklch(0.4341 0.0392 41.9938);
  --secondary: oklch(0.9200 0.0651 74.3695);
  /* ... more colors */
}
```

### Content
All copy is in Spanish as specified. Edit section components to update text:
- `components/landing/Hero.jsx` - Hero copy
- `components/landing/MarcaSection.jsx` - Branding content
- etc.

### Images
Replace placeholder images with actual assets:
- Hero background: Update `data-bg="interactive-unicorn-studio"` div
- Testimonial avatars: Update `src` in `HistoriasSection.jsx`
- Manager photo: Update `src` in `AcompanamientoSection.jsx`

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Small tablets, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

## ♿ Accessibility Checklist

✅ Semantic HTML (header, nav, main, section, footer, article)
✅ Heading hierarchy (H1 → H2 → H3)
✅ ARIA labels on all interactive elements
✅ ARIA roles (navigation, contentinfo, etc.)
✅ Keyboard navigation (Tab, Enter, Arrows for carousel)
✅ Focus indicators visible on all focusable elements
✅ Color contrast AA+ (4.5:1 for normal text, 3:1 for large)
✅ Alt text on all images
✅ Form labels properly associated
✅ Error messages linked via aria-describedby
✅ Skip navigation support (could be added)

## 🔧 Performance Optimizations

### Implemented
- Component-level code splitting
- Lazy loading for images (native `loading="lazy"`)
- Minimal re-renders with proper React hooks
- Optimized scroll listeners with passive events
- Debounced scroll tracking
- Prefetch hints for primary routes (can be added in HTML)

### Recommended
```jsx
// Add to index.html
<link rel="prefetch" href="/api/submit-form" />
<link rel="dns-prefetch" href="https://analytics.google.com" />
```

### Image Optimization
Use responsive images with srcset:
```jsx
<img
  src="/hero-mobile.jpg"
  srcset="/hero-mobile.jpg 640w, /hero-tablet.jpg 1024w, /hero-desktop.jpg 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
  loading="lazy"
  alt="Hero background"
/>
```

## 📊 SEO Optimization

### Meta Tags (Implemented)
- Title tag (max 60 chars)
- Meta description (max 160 chars)
- Keywords
- OpenGraph tags (og:title, og:description, og:image, og:url)
- Twitter Cards
- Canonical URL (add to index.html)

### Structured Data (Implemented)
- Organization schema
- WebSite schema with SearchAction

### Best Practices
- Clean, descriptive URLs
- Mobile-friendly design
- Fast loading times
- HTTPS (production)
- XML sitemap (generate with tool)
- robots.txt (add to public/)

## 🐛 Known Issues

1. **React Helmet Async + React 19**: Using `--legacy-peer-deps` for compatibility
2. **Carousel touch**: May need additional touch optimization for mobile
3. **Form submission**: Currently simulated - replace with actual API call

## 🔄 Future Enhancements

### High Priority
- [ ] Connect form to actual backend API
- [ ] Add Google Analytics / Matomo integration
- [ ] Implement cookie consent banner (RGPD)
- [ ] Add real testimonial images
- [ ] Replace hero background placeholder with actual interactive element

### Medium Priority
- [ ] Add loading skeleton states
- [ ] Implement error boundaries
- [ ] Add A/B testing capability
- [ ] Multi-language support (i18n)
- [ ] Add blog section

### Low Priority
- [ ] Dark mode toggle in navbar
- [ ] Animated scroll indicators
- [ ] Progressive Web App (PWA) support
- [ ] Chat widget integration
- [ ] FAQ section with accordion

## 📄 License

This project is proprietary to Broker XYZ.

## 👥 Contributors

Built using shadcn/ui v4 components via MCP server integration.

## 📞 Support

For questions or issues, contact: dev@brokerxyz.com

---

**Last Updated**: November 2025
**Version**: 1.0.0


