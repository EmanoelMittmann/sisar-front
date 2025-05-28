# PWA Frontend

A modern Progressive Web App (PWA) frontend built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This project is designed for scalable, maintainable, and secure web applications, featuring modular architecture and best practices for modern web development.

## Features

- **Next.js 15** with App Router and server/client components
- **React 19** for UI development
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible UI primitives
- **Axios** for HTTP requests with token-based authentication
- **PWA support** (manifest, service worker)
- **Modular context/controllers** for API, authentication, scheduling, services, plans, and organizations
- **Form validation** with React Hook Form and Zod
- **Date/time utilities** with date-fns
- **Custom hooks and UI components**
- **Strict security headers** and CORS configuration

## Project Structure

- `src/context/api/` — Axios instance and API config
- `src/context/controllers/` — Business logic for auth, schedules, services, plans, organizations
- `src/context/loader_request/` — Centralized request map for dynamic API calls
- `src/components/` — Custom and UI components (Radix, Tailwind)
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions
- `public/` — Static assets, icons, service worker
- `manifest.ts` — PWA manifest
- `next.config.ts` — Next.js and CORS/security config

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Environment Variables
Create a `.env` file with:
```
NEXT_PUBLIC_API_URL=https://your-api-url
```

## Security & CORS
- Security headers and CORS are configured in `next.config.ts`.
- API requests use Bearer tokens from `localStorage`.

## PWA
- Manifest and icons in `public/` and `manifest.ts`.
- Service worker at `public/sw.js`.

## Scripts
- `dev` — Start development server
- `build` — Build for production
- `start` — Start production server
- `lint` — Lint codebase

## License
This project is private. All rights reserved.
