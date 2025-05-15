# Book Animation Implementation Plan

This document outlines a step-by-step plan to implement a book-opening animation that transitions smoothly into the landing page with a dynamic "zoom through pages" effect.

## Animation Sequence

1. **Closed Book (Initial State)**
   - Render the book covers and pages in a closed position using SVG elements
   - Black book covers with white borders
   - White pages with subtle text-like lines
   - All pages initially stacked and visible within the closed book

2. **Opening Animation**
   - After a brief delay of 500ms, transition to `opening` state
   - Animate both covers rotating outward in 3D space:
     - Left cover rotates with `perspective(1000px) rotateY(120deg)`
     - Right cover rotates with `perspective(1000px) rotateY(-120deg)`
   - Duration: 1500ms with cubic-bezier easing
   - Keep pages static during this phase

3. **Page Zoom-Through Effect**
   - On completion of cover opening, transition to `zooming` state
   - Implement multi-phase zooming:
     - Phase 1: Initial camera movement toward the pages (scale increase to 2.5)
     - Phase 2: "Travel" through the pages using:
       - Gradual opacity transitions between pages
       - Sequential reveal of content on each page as we zoom "through"
       - Use `transform-origin` set to page center (around 67% horizontally)
     - Fine-tune z-index and opacity of pages to create parallax-like depth
   - Duration: 2000ms for full zoom sequence
   - Visual cues like text lines should become visible during zoom

4. **Final Transition to Landing Page**
   - After zoom completes, transition to `complete` state
   - Fade out the entire book animation (opacity: 0)
   - Simultaneously fade in the landing page content
   - Duration: 500ms for fade transition

5. **User Controls**
   - Prominent "Skip" button in top right corner
   - Immediately transitions to landing page when clicked
   - Cleans up all animation timeouts to avoid memory leaks

## Technical Implementation

### Component Structure
```jsx
BookOpeningAnimation
  ├── SVG Container
  │   ├── Book Spine
  │   ├── Left Cover 
  │   ├── Right Cover
  │   ├── Pages (5 layers)
  │   │   ├── Page Content (lines)
  │   ├── Visual Effects (sparkles, etc.)
  └── Skip Button
```

### State Machine
```
initial → opening → zooming → complete
```

### CSS Modules Requirements
1. **Base Animations**
   - `.bookAnimationContainer`: Controls overall container, transitions
   - `.bookCover`, `.bookLeftCover`, `.bookRightCover`: Cover animations
   - `.bookPage`, `.bookPageInitial`: Page styling

2. **Zoom Effect Classes**
   - `.zoomActive`: For deep zoom effect (scale 4-6)
   - Set appropriate transform-origin (67% 50%)
   - Use long duration with proper easing

3. **Page-Specific Classes**
   - `.pageLines`: Text representation on pages
   - Control visibility during zoom through/between pages
   - Subtle opacity transitions between pages

### Animation Timing
- Initial delay: 500ms
- Cover opening: 1500ms
- Zoom through pages: 2000ms
- Final transition: 500ms

## Implementation Steps

1. **Refine SVG Structure**
   - Ensure all pages are properly layered
   - Adjust stroke, fill, and position for consistency

2. **Enhance CSS Module**
   - Add zoom animations with optimal transform-origin
   - Create keyframes for page transitions
   - Implement sequential text visibility

3. **Update State Management**
   - Refine state transitions in useEffect
   - Add logic to adjust page visibility during zoom
   - Clean up all listeners/timeouts

4. **Optimize Performance**
   - Use will-change for elements with transitions
   - Ensure hardware acceleration with transform properties
   - Test across devices for smooth animation

5. **Final Integration**
   - Connect with landing page visibility toggle
   - Add session storage option to skip on repeat visits
   - Ensure responsive behavior at different viewport sizes 