# Book Animation Implementation Plan

This document outlines a step-by-step plan to implement a book-opening animation that transitions smoothly into the landing page.

## Animation Sequence

1. Closed Book (Initial State)
   - Render the book covers and pages in a closed position using SVG or HTML elements.
   - Ensure initial CSS classes represent a closed book (e.g., covers unrotated, pages hidden).

2. Opening Animation
   - After a short delay, trigger a state change to `opening`.
   - Animate the right cover rotating open from right to left (e.g., `rotateY(-120deg)`).
   - Optionally animate the left cover for a 3D effect using CSS transforms.
   - Use CSS transitions or keyframe animations with defined durations and easing.

3. Zoom into Pages
   - On completion of the opening animation, change state to `zooming`.
   - Scale and translate the animation container (SVG or wrapper) to focus on the pages.
   - Set `transform-origin` on the center of the page area for a smooth zoom.
   - Animate the scale (e.g., `scale(1)` to `scale(1.5)`) and translate over a defined duration.

4. Page Flutter / Transition Overlay (Optional)
   - Add subtle page flutter or overlay elements to emphasize the zoom.
   - Sequence page flutter animations using staggered keyframes for multiple pages.
   - Maintain zoomed-in focus during this stage.

5. Transition to Landing Page
   - After zoom and flutter animations complete, switch state to `complete`.
   - Fade out or scale down the animation overlay.
   - Reveal landing page content with a fade-in or slide-up animation.
   - Use React state (e.g., `showAnimation = false`, `showLandingContent = true`).

6. Skip / User Control
   - Provide a "Skip" button that sets state to `complete` immediately.
   - Ensure any pending timeouts or animations are cleared on skip.

7. Integration & Cleanup
   - Integrate `BookOpeningAnimation` into the main page layout.
   - Define an `animationState` enum: `initial`, `opening`, `zooming`, `complete`.
   - Use `useEffect` to sequence state transitions and clean up timeouts.
   - Ensure responsiveness and accessibility across devices.
   - Optionally, use session storage to prevent replaying the animation on repeat visits.

## Implementation Notes

- Use React functional components with `useState` and `useEffect`.
- Leverage CSS Modules or Tailwind for styling keyframes and transforms.
- Clean up timeouts in `useEffect` cleanup functions to avoid memory leaks.
- Test durations, easing functions, and transform origins for the best UX. 