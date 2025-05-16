# Plan: Replace Book Animation Visuals

This document outlines the step-by-step plan to modify the existing `BookOpeningAnimation.tsx` and its associated CSS module (`BookOpeningAnimation.module.css`) to replace the current book visuals with a style inspired by `app/components/book-illustration.tsx`. The core animation logic, sequencing, and existing SVG-based particle effects will be preserved.

## 1. Goal

-   Retain the complex multi-stage intro animation (opening, page rolling, zoom-through) from `components/animations/BookOpeningAnimation.tsx`.
-   Replace the SVG visual elements of the book (covers, spine, pages) within this animation to match the black and white, illustrative style of `app/components/book-illustration.tsx`.
-   Preserve the existing SVG "swirling particle" effects from `BookOpeningAnimation.tsx`.
-   Do NOT use the `background-particles.tsx` from `app/components`.
-   Ensure the `onAnimationComplete` callback and skip/pause functionality remain intact.

## 2. Backup Important Files

Before starting, create backups of the following files:

-   `components/animations/BookOpeningAnimation.tsx`
-   `components/animations/BookOpeningAnimation.module.css`

## 3. Step-by-Step Implementation

### 3.1. Modify `BookOpeningAnimation.tsx` (SVG Structure and Styling)

The goal here is to rebuild the SVG structure within the `render` method of `BookOpeningAnimation.tsx` to reflect the new visual style while ensuring all necessary dynamic classes for animation are still applied.

1.  **Adjust SVG ViewBox (if needed):**
    *   Evaluate if the existing `viewBox="0 0 300 300"` is still appropriate for the new illustration style. Aim to keep it if possible to minimize coordinate system changes, but adjust if the new design has significantly different proportions.
    *   Current SVG in `BookOpeningAnimation.tsx` uses `width="360" height="360"`. This mapping to the `viewBox` should be considered.

2.  **Rebuild Book Spine:**
    *   Locate the `<g className={styles.bookSpine}>` and its `<rect>`.
    *   Replace the existing `<rect>` with a new one styled like the spine in `book-illustration.tsx`.
        *   Example style: `fill="black"`.
        *   Adjust `x`, `y`, `width`, `height` to correctly position it between the covers. The old spine was `x="145" y="75" width="10" height="150"`.

3.  **Rebuild Book Covers (Left & Right):**
    *   Locate the groups and `<rect>` elements for the left and right covers.
    *   **Left Cover:**
        *   Replace its `<rect>` with one styled like the book base in `book-illustration.tsx`.
        *   Style: `fill="white"`, `stroke="black"`, `strokeWidth="2"` (or similar, adjust stroke width as needed for visual balance). Add `rx="2"` for rounded corners if desired.
        *   Ensure it continues to receive the classes: `${styles.bookCover} ${styles.bookLeftCover}` and conditionally `${styles.bookLeftCoverOpen}`.
        *   Adjust `x`, `y`, `width`, `height`. The old left cover was `x="50" y="75" width="95" height="150"`.
    *   **Right Cover (Front Cover):**
        *   Replace its `<rect>` similarly.
        *   Style: `fill="white"`, `stroke="black"`, `strokeWidth="2"`, `rx="2"`.
        *   Ensure it continues to receive the classes: `${styles.bookCover} ${styles.bookRightCover}` and conditionally `${styles.bookRightCoverOpen}`.
        *   Adjust `x`, `y`, `width`, `height`. The old right cover was `x="155" y="75" width="95" height="150"`.
        *   (Optional) Consider adding the "Book title" rect from `book-illustration.tsx` (`<rect x="35" y="35" width="30" height="5" fill="black" />`) as a static element on this front cover, adjusting its coordinates to fit.

4.  **Rebuild Pages:**
    *   Locate the `<g className={styles.pagesContainer}>` and the loop that generates page `<rect>` elements.
    *   For each of the `NUM_PAGES` (currently 5) pages:
        *   **Page Rectangle:**
            *   Modify the `<rect>` for each page.
            *   Style: `fill="white"`, `stroke="#CCC"` (or a very light gray like `#EEE`, or even `stroke="black" strokeWidth="0.5"` if a thin black line is preferred for page edges). `strokeWidth` should be minimal.
            *   Adjust `x`, `y`, `width`, `height` for each page to create the stacked effect. The old pages had slightly decreasing width/height and increasing x/y. This logic can be adapted.
            *   Ensure each page `<rect>` still receives `${styles.bookPage}` and the dynamic class from `getPageAnimationClass(pageOrder)`.
        *   **Page Lines (Content):**
            *   Within each page's SVG group/structure, add a series of `<line>` elements to represent text, styled like those in `book-illustration.tsx`.
            *   Example for one line: `<line x1="..." y1="..." x2="..." y2="..." stroke="black" strokeWidth="0.3" />`.
            *   Replicate 3-4 such lines per page.
            *   These lines will need to be grouped or classed such that the `.pageLines` and `.pageLinesZoomThrough` CSS animations can target them effectively. The `BookOpeningAnimation.tsx` had a `<g className={styles.pageLines} ...>` that contained these lines. This structure should be replicated for *each page* if individual page content needs to animate during zoom, or applied to a common group if all page lines appear simultaneously. The current `BookOpeningAnimation.tsx` has one common group for page lines. This might need to be rethought if pages reveal content as they are zoomed through. For simplicity, initially assume lines are part of each page but might be animated together.

5.  **Preserve SVG Swirling Particles:**
    *   Ensure the existing `<g className={styles.swirlParticlesContainer} ...>` and all its child `<circle>` elements are kept as-is within the main SVG.
    *   Verify its rendering order so particles appear correctly layered with the new book visuals (e.g., typically behind the book or appearing to emanate from it).

### 3.2. Modify `BookOpeningAnimation.module.css` (Styling Adjustments)

1.  **Global Color Palette Update:**
    *   Search for the old primary dark color (e.g., `#2D2D2D` used for spine and pages) and replace it with appropriate new colors (e.g., `black` for spine, `white` for pages, potentially light grays for page strokes if not handled in SVG).

2.  **Cover Styles:**
    *   `.bookCover`, `.bookLeftCover`, `.bookRightCover`:
        *   Verify `transform-origin` is still correct for the new cover dimensions. (Left: `100% 50%`, Right: `0% 50%`).
        *   Adjust `fill`, `stroke`, `stroke-width` if these are being controlled by CSS rather than directly in the SVG attributes. Prefer setting them in the SVG for simplicity if they are static.

3.  **Page Styles:**
    *   `.bookPage`:
        *   Set `fill: white;`.
        *   Set `stroke: #ccc;` (or desired light page edge color) and `stroke-width` if not set in SVG.
        *   **Crucial:** Adjust `transform-origin`. This was `155px 150px;`. This value is relative to the SVG coordinate space and represents the "hinge" of the pages. It *must* be updated based on the new x-coordinate of the page's spine-side edge and its vertical center.
        *   The `filter: drop-shadow(...)` can be kept or removed based on desired visual style.
    *   `.bookPageInitial`: Ensure `opacity` and initial `transform` are still appropriate.

4.  **Page Line Styles:**
    *   `.pageLines`:
        *   Ensure this class correctly targets the new page line elements.
        *   The `animation: fadeInAndSkewLines ...` should make these lines `stroke: black;` (or a visible color against the white page).
    *   `.pageLinesZoomThrough`:
        *   Ensure this targets the lines effectively during the zoom phase.

5.  **Page Flutter & Zoom Animations:**
    *   `@keyframes flutter1` to `flutter5` and `.bookPageFlutterN` classes: The `transform` values (rotateY, translateX) define the motion. These might largely work as-is, provided the `transform-origin` on `.bookPage` is correct and the pages are structured as individual elements. Visual tweaking of `translateX` might be needed if page widths change significantly.
    *   `.pageZoomThrough1` to `.pageZoomThrough5`: The `translateZ` and `opacity` values should still provide the zoom effect.

6.  **Particle Styles (`.swirlParticlesContainer`, `.swirlParticleN`, `@keyframes swirlOut`, etc.):**
    *   These should not require changes as the particle SVG elements themselves are not changing.

7.  **Cleanup Old/Unused Styles:**
    *   After visual changes are confirmed, review the CSS file for any classes that are no longer applied or selectors that target non-existent parts of the old SVG, and remove them.

## 4. Testing

-   Render `app/page.tsx` where `BookOpeningAnimation` is used.
-   Verify all stages of the animation:
    -   Initial closed book appearance.
    -   Cover opening sequence (correct hinging, speed, visual style).
    -   Page rolling/fluttering (correct number of pages, motion, style).
    -   Particle effects (presence, timing, layering).
    *   Zoom-through sequence (smoothness, page content reveal).
    *   Transition to white flash and completion.
-   Test interactive controls:
    -   Skip button.
    -   Pause/Resume functionality.
-   Check for any visual glitches, layering issues, or elements not appearing as intended.
-   Verify the `onAnimationComplete` callback is still triggered correctly.

## 5. Final Review and Refinement

-   Review the code in `BookOpeningAnimation.tsx` and `BookOpeningAnimation.module.css` for clarity and remove any commented-out old code or temporary debug styles.
-   Ensure the visual style is consistent with `book-illustration.tsx`.

This plan provides a detailed roadmap. Some values (especially SVG coordinates and CSS `transform-origin`) will require careful calculation and potential iteration during implementation. 