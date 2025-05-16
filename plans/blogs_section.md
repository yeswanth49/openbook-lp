# Blog Section Implementation Plan

This document outlines the step-by-step plan to implement a minimalist, aesthetic blog section for OpenBook, matching the design and technical conventions of the landing page and global styles.

---

## User Preferences & Requirements

- **Blog Data Source:** Blog posts are stored as Markdown (MDX) files in the repo.
- **Landing Page Blog Section:** Show the latest three posts (or allow selection of which three to display).
- **"View All Articles":** Links to a `/blog` main page listing all blogs.
- **Blog Categories:** Three sections on the main blog page: Personal Blogs, Weekly Blogs, Company Blogs.
- **Search:** Implement search on the blog main page (not first priority).
- **Individual Post Page:** Clicking a blog opens a dedicated post page, rendering the MDX file.
- **Content & Metadata:** All required info (title, excerpt, date, author, etc.) is in the MDX frontmatter.
- **Design Consistency:** Use AnimateInView for animations, glassmorphism for cards/sections, and keep the particle background visible.
- **Section Heading:** Use the same SectionHeading component for blog sections.
- **MDX Support:** Required for blog post rendering.
- **Future Features:** Comments, sharing, etc. to be implemented later.

---

## 1. Analysis of Existing Codebase

- **Landing Page (`page.tsx`):**
  - Uses glassmorphism, AnimateInView, SectionHeading, and a dark, particle/dot-pattern background.
  - Blog section is a grid of cards with animation and a "View All Articles" button.
- **Blog Card (`blog-card.tsx`):**
  - Card component with image, title, excerpt, date, read time, author, and link to post.
  - Glassmorphism and subtle hover/animation effects.
- **Global Styles (`globals.css`):**
  - Defines dark theme, gradient text, dot-pattern, and utility classes.
- **Layout (`layout.tsx`):**
  - Ensures particle background and consistent theme across all pages.

---

## 2. File & Directory Structure

```
content/
  personal/
    post-1.mdx
    ...
  weekly/
    post-2.mdx
    ...
  company/
    post-3.mdx
    ...
app/
  page.tsx                # Landing page (shows blog preview)
  blog/
    page.tsx              # Blog index page (all blogs, categories)
    [slug]/
      page.tsx            # Individual blog post page (MDX rendering)
components/
  blog-card.tsx           # Blog card UI (already exists)
  blog-list.tsx           # Blog list/grid for index page
  blog-category-tabs.tsx  # (Optional) Tabs or filters for categories
  mdx-components.tsx      # Custom MDX components/styles
```

---

## 3. Step-by-Step Implementation Plan

### A. **MDX Integration**
1. Install and configure `@next/mdx` for MDX support in the Next.js app directory.
2. Set up dynamic import of MDX files from the `content/` directory.
3. Parse frontmatter for metadata (title, excerpt, date, author, image, etc.).
4. Create a utility to fetch and sort posts by date/category.

### B. **Landing Page Blog Section**
1. Update the landing page (`page.tsx`) to import the latest three (or selected) blog posts from MDX content.
2. Use the existing `BlogCard` component inside an animated grid (with AnimateInView).
3. Add a "View All Articles" button linking to `/blog`.

### C. **Blog Index Page (`/blog`)**
1. Create `app/blog/page.tsx`:
   - Fetch all blog posts, grouped by category (personal, weekly, company).
   - Render each category in its own section with a heading.
   - Use `BlogCard` in a grid for each category.
   - Add AnimateInView for section and card animations.
   - Add a search bar (can be implemented later).
2. Ensure the particle background and dot-pattern are visible (inherited from layout).
3. Use `SectionHeading` for each category section.

### D. **Individual Blog Post Page**
1. Create dynamic route: `app/blog/[slug]/page.tsx`.
2. Fetch the correct MDX file by slug and render it using Next.js MDX components.
3. Display metadata (title, date, author, image) at the top of the post.
4. Use glassmorphism for the post container.
5. Animate the post content in with AnimateInView.
6. Ensure the particle background and dot-pattern are visible.

### E. **MDX Components & Styling**
1. Create `components/mdx-components.tsx` for custom-styled MDX elements (headings, images, code blocks, etc.) matching the site's aesthetic.
2. Apply global styles for MDX content (e.g., prose, glassmorphism backgrounds, gradient text for headings).

### F. **Blog Utilities**
1. Utility to read all MDX files, extract frontmatter, and sort/filter by date/category.
2. Optionally, allow manual selection of featured posts for the landing page.

### G. **Search (Future Enhancement)**
1. Plan for a search bar on the `/blog` page to filter posts by title, excerpt, or tags.
2. Implement client-side or static search (e.g., fuse.js) as a follow-up task.

### H. **Future Features (Not in Initial Scope)**
- Comments, social sharing, related posts, pagination, tag/category filters, etc.

---

## 4. Implementation Plan Example

### Blog Index Page (`/blog`)
- Section: Personal Blogs
  - Grid of BlogCards (AnimateInView)
- Section: Weekly Blogs
  - Grid of BlogCards (AnimateInView)
- Section: Company Blogs
  - Grid of BlogCards (AnimateInView)
- Search bar (future)

### Individual Blog Post Page
- Glassmorphic card/container
- Title, date, author, image at top
- MDX content rendered with custom styles
- AnimateInView for entrance

---

## 5. Relevant Files

- `app/page.tsx` – Landing page, blog preview section
- `app/blog/page.tsx` – Blog index page
- `app/blog/[slug]/page.tsx` – Individual post page
- `components/blog-card.tsx` – Blog card UI
- `components/mdx-components.tsx` – Custom MDX elements
- `content/` – MDX blog posts (organized by category)
- `globals.css` – Global styles, glassmorphism, dot-pattern, etc.

---

## 6. Notes
- All blog sections and cards should use AnimateInView for entrance animations.
- Glassmorphism and particle background must be consistent across all blog pages.
- Use SectionHeading for all blog section titles.
- All metadata is sourced from MDX frontmatter.
- MDX rendering is required for individual post pages.
- Search and advanced features are planned for future implementation. 