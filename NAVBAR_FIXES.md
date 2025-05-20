# Navbar and Background Fixes

This document outlines step-by-step solutions for fixing the three reported issues with the landing page.

## Issue 1: Navbar Not Sticking When Scrolled

The header component has a `sticky top-0` class, but it needs additional configuration to ensure it properly sticks to the top of the viewport when scrolling.

### Solution Steps:

1. **Update the header component CSS**

```tsx
// components/header.tsx
<motion.header
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="fixed top-0 header-layer w-full" // Change from 'sticky' to 'fixed'
>
```

2. **Add padding to the top of the main content to compensate for the fixed header**

```tsx
// app/page.tsx - Update the landing-content div
<div className="landing-content animate-fadeIn pt-24"> {/* Add pt-24 for padding-top */}
```

3. **Add a background blur effect to enhance the header's visibility when scrolled**

```tsx
// components/header.tsx - Update the nav element
<nav className="border-input/50 bg-popover/95 backdrop-blur-lg flex w-full max-w-3xl mx-auto items-center justify-between gap-2 rounded-xl border p-2 px-4 mt-4 mb-2">
```

## Issue 2: Dropdown Menu Not Showing on Hover

The NavigationMenu components are imported correctly, but the dropdown functionality for hovering over "Company" and "Resources" isn't working properly.

### Solution Steps:

1. **Verify NavigationMenu component imports**

Ensure the NavigationMenu components are properly imported and working by checking browser console for any errors.

2. **Fix dropdown trigger styles**

```tsx
// components/header.tsx
<NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground bg-transparent hover:bg-accent/20 rounded-md">
  Company
</NavigationMenuTrigger>
```

3. **Add specific z-index values to ensure the dropdowns appear on top**

```css
/* app/globals.css - Add to the Z-index structure section */
.dropdown-layer { z-index: 25; }
```

4. **Update the NavigationMenuContent component**

```tsx
// components/header.tsx
<NavigationMenuContent className="dropdown-layer bg-popover/95 backdrop-blur-lg rounded-lg border shadow-lg">
```

## Issue 3: Dot Background Scrolling with Page

The ParticleBackground component is currently using a `fixed` positioning but is still scrolling with the page. We need to modify this component to ensure it stays fixed.

### Solution Steps:

1. **Update the ParticleBackground component's canvas element**

```tsx
// components/particle-background.tsx
<motion.canvas
  ref={canvasRef}
  className="fixed inset-0 w-full h-full pointer-events-none particle-layer" // Add pointer-events-none
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2 }}
/>
```

2. **Modify the useEffect to fix canvas position**

```tsx
// components/particle-background.tsx - Update setCanvasDimensions function
const setCanvasDimensions = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  
  // Ensure the canvas stays in a fixed position
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = '-10'
}
```

3. **Add CSS to ensure proper layering**

```css
/* app/globals.css - Update the Z-index structure */
.particle-layer { 
  z-index: -10; 
  position: fixed !important;
  top: 0;
  left: 0;
  pointer-events: none;
}
```

## Implementation Order

For the best results, implement these changes in the following order:

1. First, fix the dot background (Issue 3) as it's the most noticeable visual issue
2. Next, fix the navbar sticking (Issue 1) as it affects overall page usability
3. Finally, fix the dropdown menu functionality (Issue 2)

After implementing these changes, test the page by scrolling and hovering over the navbar items to ensure all issues are resolved. 