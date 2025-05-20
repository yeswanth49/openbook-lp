# Dropdown Hover Issue Fix

When hovering over the "Company" or "Resources" items in the navbar, the dropdown appears correctly but disappears as soon as the cursor moves onto the dropdown options. The root cause is a brief loss of hover focus due to separate event regions for the trigger and the menu.

## Implementation Steps

1. Consolidate trigger and dropdown into a single container
   - In `components/header.tsx`, locate the `<div>` wrappers for the trigger button and its associated menu content.
   - Wrap both the trigger button and the dropdown content within one common parent `<div>` per menu (one for Company, one for Resources).

2. Attach hover handlers to the common parent
   - Add `onMouseEnter` and `onMouseLeave` to this parent to manage a shared hover region.
   - Remove individual hover handlers from the trigger and content elements.

3. Update state tracking logic
   - Use a single `activeItem: "company" | "resources" | null` state in the `Header` component.
   - On parent `onMouseEnter`, call `setActiveItem(<key>)`.
   - On parent `onMouseLeave`, call `setActiveItem(null)`.

4. Adjust positioning to eliminate gaps
   - Ensure the dropdown content is positioned immediately below its trigger (reduce or remove `margin-top` such as changing `mt-2` to `mt-1`).
   - Confirm there is no visual gap that could break hover.

5. Preserve arrow rotation on hover
   - Keep the `ChevronDown` icon rotation based on `activeItem === <key>`.
   - Only the arrow should animate; no other hover effects should be applied.

6. Remove obsolete imports and components
   - Remove any unused `NavigationMenu*` imports from `components/header.tsx`.
   - Delete any legacy dropdown code paths no longer used.

7. Test manually
   - Start the dev server (`npm run dev`).
   - Hover over Company: verify menu appears.
   - Move cursor into the menu content: verify the dropdown remains open.
   - Click each option: verify navigation.
   - Repeat for Resources.

8. Document and finalize
   - Update `NAVBAR_FIXES.md` to reference this dropdown fix step.
   - Optionally add automated tests for hover behavior if applicable.

## Relevant File

- `components/header.tsx` — Header and dropdown logic file. 