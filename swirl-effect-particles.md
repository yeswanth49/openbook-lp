# Swirl Effect of Particles in Book Animation

This document lists the files, code snippets, and line numbers responsible for the swirl effect of particles in the `BookOpeningAnimation`.

## CSS Module

**File:** `components/animations/BookOpeningAnimation.module.css`

### Keyframes Definition (Lines 158–162)
```css
158 @keyframes swirlAnim {
159   0% { opacity: 0; transform: translateY(5px) rotate(0deg); }
160   50% { opacity: 0.7; transform: translateY(0px) rotate(180deg); }
161   100% { opacity: 0; transform: translateY(-5px) rotate(360deg); }
162 }
```

### `.swirl` Class (Lines 184–186)
```css
184 .swirl {
185   animation: swirlAnim 2s ease-in-out infinite;
186 }
```

### `.swirl2` Class (Lines 204–207)
```css
204 .swirl2 {
205   animation: swirlAnim 2.5s ease-in-out infinite;
206   animation-delay: 0.4s;
207 }
```

### `.swirl3` Class (Lines 209–212)
```css
209 .swirl3 {
210   animation: swirlAnim 2.2s ease-in-out infinite;
211   animation-delay: 0.7s;
212 }
```

## React Component

**File:** `components/animations/BookOpeningAnimation.tsx`

### Swirl `<path>` Elements

**Line 154:**
```tsx
154 <path d="M 150 60 q 5 -10 10 0 t 10 0" stroke="white" strokeWidth="0.7" fill="none" className={styles.swirl} />
```

**Line 160:**
```tsx
160 <path d="M 70 80 C 75 70, 85 70, 90 80" stroke="white" strokeWidth="0.5" fill="none" className={styles.swirl2} />
```

**Line 161:**
```tsx
161 <path d="M 210 220 C 215 210, 225 210, 230 220 S 235 230, 230 240" stroke="white" strokeWidth="0.5" fill="none" className={styles.swirl3} />
``` 