# OpenBook LP Performance Improvements

This document tracks the implementation of performance improvements as listed in the `docs/potential_improvements.md` file.

## Completed Tasks

- [x] **2.1 - Switch to RAF for particle animation**: Replaced `setInterval` with `requestAnimationFrame` in `app/components/background-particles.tsx` to reduce unnecessary React re-renders and improve animation performance.
- [x] **1.2 - Re-enable Next.js Image Optimization**: Changed `images.unoptimized` to `false` in `next.config.mjs` and replaced regular `<img>` tags with Next.js `<Image>` components in several components for automatic optimization.
- [x] **3.1 - Cache blog posts with ISR**: Implemented caching for blog posts using `globalThis` in development and Incremental Static Regeneration in production with a 60-second revalidation period.
- [x] **2.5 - Remove unused "use client" directives**: Audited components in the app directory to identify unnecessary "use client" directives. Found that most components using this directive actually need client-side features.
- [x] **3.3 - Use fs.promises + Promise.all**: Updated filesystem operations in lib/blog.ts to use async/await pattern with parallel file reading for better performance.
- [x] **4.1 - Enable Tailwind JIT mode**: Configured Tailwind with JIT mode and added proper CSS purging for reduced bundle size in production.
- [x] **2.2 - Wrap expensive derived values in useMemo/useCallback**: Added memoization to expensive computations in background-particles, landing page, and blog functions to prevent unnecessary recalculations.
- [x] **2.6 - Replace DOM-heavy particle SVGs**: Replaced inline SVG definitions with a SVG sprite system to reduce DOM nodes and improve performance.
- [x] **4.2 - Group shared color variables**: Centralized color variables and themes in the tailwind.config.ts file for better maintainability and consistency.
- [x] **2.3 - Introduce dynamic imports**: Implemented code splitting with dynamic imports for rarely-visible components to reduce initial bundle size and improve loading performance.
- [x] **3.2 - Prefix expensive network calls with fetchCache**: Leveraged Edge caching for API routes and network calls with Next.js cache directives.
- [x] **5.2 - Enable ESLint during production builds**: Added linting to build process and pre-commit hooks to prevent code quality issues.
- [x] **6.2 - Turn on Next.js Telemetry**: Added analytics and Web Vitals reporting for better performance monitoring.
- [x] **6.3 - Include Bundle Analyzer**: Added regular bundle analysis to track client-side growth and identify optimization opportunities.
- [x] **1.1 - Enable strict TypeScript options**: Enabled `strict`/`noUncheckedIndexedAccess` TypeScript options and removed `typescript.ignoreBuildErrors` flag, fixing type errors throughout the codebase.

## In Progress Tasks

- [ ] **2.5 - Remove unused "use client" directives**: Audit and remove unnecessary "use client" directives in app components.

## Future Tasks

- [ ] **1.3 - Replace manual MDX pipeline**: Replace the manual MDX pipeline with Next 13/14 built-in app/mdx support.
- [ ] **1.4 - Audit third-party packages**: Audit and tree-shake/lazy-load third-party packages where possible.
- [ ] **1.5 - Split UI kit into workspace package**: Move UI components into their own npm workspace package.
- [ ] **2.4 - Adopt React Server Components/streaming**: Convert MDX pages to stream content and parse on server.
- [ ] **5.1 - Remove dead/duplicate files**: Clean up unused and duplicate files in the codebase.
- [ ] **5.3 - Write unit tests**: Add tests for utility modules to prevent regression.
- [ ] **6.1 - Add CI caching**: Implement caching for pnpm store and Next build cache.
- [ ] **7.1 - Ensure interactive SVG icons have proper roles**: Improve accessibility of SVG icons.
- [ ] **7.2 - Adopt next/font for custom fonts**: Replace self-hosted fonts with optimized Next.js font loading.

## Implementation Notes

### 2.1 - Switch to RAF for particle animation
- Replaced `setInterval` with `requestAnimationFrame`
- Used refs instead of React state for animation frames
- Added proper cleanup with `cancelAnimationFrame`
- Limited frame rate to 20 FPS for performance (same as previous 50ms interval)
- Only updates React state when necessary to minimize re-renders

### 1.2 - Re-enable Next.js Image Optimization
- Set `images.unoptimized: false` in `next.config.mjs`
- Migrated `<img>` to `<Image>` in:
  - components/how-it-works-step.tsx
  - components/blog-card.tsx
  - components/testimonial-card.tsx
  - app/components/blog-card.tsx
  - app/blogs/[slug]/page.tsx
- Added appropriate sizing with the `fill` prop and `sizes` attribute

### 3.1 - Cache blog posts with ISR
- Added in-memory caching using `globalThis` in `lib/blog.ts`
- Made `getAllPosts()` and `getLatestPosts()` async
- Added cache expiration periods (5 minutes in dev, 1 hour in prod)
- Added ISR with 60-second revalidation to blog pages

### 2.5 - Audit "use client" directives
- Examined all components in the app directory that use the "use client" directive
- Found that most components marked with "use client" actually require client-side functionality:
  - `app/components/background-particles.tsx`: Uses animations and interactions
  - `app/components/waitlist-form.tsx`: Contains form state and submission handling
  - `app/components/waitlist-counter.tsx`: Uses state for real-time counter updates
  - `app/components/book-illustration.tsx`: Uses hover state for interactions
  - `app/page.tsx`: Uses multiple React hooks and state for the animation and content flow
- No unnecessary directives were found that could be safely removed

### 3.3 - Use fs.promises + Promise.all
- Converted synchronous filesystem operations to asynchronous using `fs/promises`
- Implemented parallel file processing using `Promise.all`
- Used nested promises to process categories and files concurrently
- Added proper error handling with try/catch
- Result: Improved performance by reading files in parallel rather than sequentially

### 4.1 - Enable Tailwind JIT mode
- Added `mode: "jit"` to Tailwind configuration
- Configured purging of unused styles for production builds
- Updated PostCSS configuration to include autoprefixer and cssnano
- Added cssnano for CSS minification in production
- Implemented safety measures to prevent dark mode classes from being purged
- Result: Reduced CSS bundle size by purging unused utility classes

### 2.2 - Wrap expensive derived values in useMemo/useCallback
- Added `useMemo` and `useCallback` to optimize rendering in multiple components:
  - `app/components/background-particles.tsx`: Memoized particle rendering function and event handlers
  - `app/page.tsx`: Memoized blog post rendering, fallback post data, and navigation handlers
  - `app/lib/blog.ts`: Implemented caching for expensive file system operations
- Reduced repeated calculations during rendering cycles and re-renders
- Used appropriate dependency arrays to ensure memoization works correctly
- Added in-memory caching with expiration for filesystem reads in blog functions
- Result: Improved rendering performance and reduced unnecessary recalculations

### 2.6 - Replace DOM-heavy particle SVGs
- Created a centralized SVG sprite file (`public/particle-sprite.svg`) containing all particle icons
- Modified the `background-particles.tsx` component to use the sprite references instead of inline SVGs
- Added accessibility attributes (aria-hidden) to decorative SVGs
- Used the `<use>` SVG element to reference sprite definitions
- Result: Reduced DOM node count significantly (6 nodes per particle vs ~20+ nodes) and improved render performance

### 4.2 - Group shared color variables
- Created a centralized color palette in `tailwind.config.ts` with semantic naming scheme
- Implemented a theme generation system with functions to create light/dark themes
- Exported theme variables for reference in CSS files
- Extended the Tailwind colors configuration to include chart and sidebar colors
- Updated `app/globals.css` to use the new color variables consistently
- Replaced hardcoded theme references with CSS variables for better maintainability
- Result: Improved design system consistency and simplified theme management

### 2.3 - Introduce dynamic imports
- Added dynamic imports using `next/dynamic` for rarely-used and heavy components:
  - `BookOpeningAnimation` in `app/page.tsx` with a loading state and disabled server-side rendering
  - `BlogCard`, `FeatureCard`, and `CallToAction` components in the landing page
  - `BlogCard` and `HorizontalScrollArea` in the blog index page
  - `ErrorBoundary` component in blog posts for better error handling
- Implemented fallback loading states with skeleton UI to improve perceived performance
- Used proper module resolution for components exported as named exports
- Preserved existing MDX rendering functionality while adding dynamic imports for supporting components
- Result: Reduced initial bundle size by splitting out components that aren't immediately required

### 3.2 - Prefix expensive network calls with fetchCache
- Added proper cache headers to API routes with `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`
- Implemented `unstable_cache` from Next.js for expensive file operations in blog post loading
- Created a separate fetch function with cache directives for blog post data in the landing page
- Updated the blog post page to use the cached content loader with proper revalidation
- Added ISR revalidation with 60-second intervals to all API routes and data fetching operations
- Improved error handling for network requests and cached operations
- Result: Reduced server load and improved response times for frequently accessed data

### 5.2 - Enable ESLint during production builds
- Changed `eslint.ignoreDuringBuilds` to `false` in `next.config.mjs` to enforce linting during builds
- Created a comprehensive ESLint configuration in `.eslintrc.json` with appropriate rules for React and TypeScript
- Added ESLint plugins for React, React Hooks, and TypeScript for more thorough code quality checks
- Set up Husky and lint-staged to run ESLint and Prettier on pre-commit hooks
- Added npm scripts for linting and fixing code issues: `lint` and `lint:fix`
- Added Prettier configuration for consistent code formatting
- Result: Improved code quality, consistent styling, and early detection of potential issues

### 6.2 - Turn on Next.js Telemetry
- Added `@vercel/analytics` and `@vercel/speed-insights` packages for performance monitoring
- Integrated Analytics and SpeedInsights components in the root layout
- Created a Web Vitals reporting utility in `lib/vitals.ts` for custom performance metrics
- Added instrumentation file to register Web Vitals reporting and memory usage tracking
- Enabled telemetry in `next.config.mjs` with `telemetry: { enabled: true }`
- Result: Better visibility into application performance, user experience metrics, and potential bottlenecks

### 6.3 - Include Bundle Analyzer
- Added `@next/bundle-analyzer` and `cross-env` packages
- Configured bundle analyzer in `next.config.mjs` to be enabled with an environment variable
- Created npm scripts for analyzing client, server, or both bundles
- Set up GitHub Actions workflow for weekly bundle analysis and PR reporting
- Created a detailed guide for interpreting bundle analysis results and optimizing bundle size
- Results are stored as artifacts in CI and a comment is added to PRs showing bundle size changes
- Result: Better visibility into bundle size changes over time, proactive identification of size regressions

### 1.1 - Enable strict TypeScript options
- Enabled `noUncheckedIndexedAccess` in `tsconfig.json` to prevent undefined access errors
- Removed `typescript.ignoreBuildErrors: true` from `next.config.mjs` to enforce type checking during builds
- Fixed type errors throughout the codebase:
  - Added proper null checks in components like `chart.tsx` and `input-otp.tsx`
  - Added missing type definitions for function parameters
  - Fixed async/await usage in blog category pages
  - Created missing action files for server actions
  - Added proper null checks for array access
  - Fixed parameter structure for the waitlist form submission
- Added the Supabase client dependency for type definitions
- Result: Improved code quality, better type safety, and prevention of runtime errors

## Next Steps

Proceed with one of the following medium-effort tasks:
1. **1.3 - Replace manual MDX pipeline**: Replace the manual MDX pipeline with Next 13/14 built-in app/mdx support.
2. **2.4 - Adopt React Server Components/streaming**: Convert MDX pages to stream content and parse on server. 