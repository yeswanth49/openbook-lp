# Footer Background Integration Tasks

## Action Plan

### 1. Improve CombinedFooter structure

1. Rename `CombinedFooter.tsx` to use a `<footer>` root element instead of a `<div>`.
2. Merge the CSS module class (`.footer`) with the original footer Tailwind classes (`border-t border-border/40 bg-background`) on the root `<footer>`.
3. Inline the content of `components/footer.tsx` (links, sections, contact info, copyright notice) directly into `CombinedFooter.tsx`:
   - Remove the nested `<Footer />` import and component call.
   - Copy the JSX from `components/footer.tsx` into `CombinedFooter.tsx` under the background layers.
4. Ensure the background text (`<span className={css['footer-text']}>OpenBook</span>`), grid, and gradient overlays remain at the bottom of the markup, with the inlined footer content layered on top (using `relative z-10`).
5. Refactor CSS module if necessary to adjust positioning and spacing so the large background text does not overlap or clip the normal footer content in undesirable ways.

### 2. Update `app/layout.tsx`

1. Import the improved `CombinedFooter` from its updated path.
2. Remove any residual import or reference to the old `FooterText` or standalone `Footer` component.
3. Place `<CombinedFooter />` as the last child inside `<body>`.

### 3. Plan CSS enhancements for `footer.module.css`

1. Revisit the `.footer-text` rules to create an even more visually appealing background text style:
   - Experiment with blend modes (e.g., `mix-blend-mode: overlay`), additional text shadows, or subtle animations.
   - Consider using a contrasting font, varying opacity stops, or a multi-color gradient.
   - Ensure the text remains responsive (using CSS custom properties for size) and accessible (sufficient contrast).
2. Update or add new CSS custom properties (e.g., `--footer-text-opacity`, `--footer-text-blur`) to allow fine-tuning without editing the core rules.
3. Test across multiple screen sizes to verify the effect.

### 4. Testing & Cleanup

1. Run the Next.js development server and test the footer on all pages.
2. Verify semantic markup, layering, and visual fidelity.
3. Remove deprecated components (`footer-text.tsx`, original `Footer.tsx`) once the combined version is fully functional.

## Next Steps

Before implementation, could you clarify:

- Which specific aspects of the combined footer need to be improved? (e.g., semantics, layering, spacing, responsiveness).
- Do you have any examples or inspiration for the new background text style? (gradient colors, animations, blend modes). 