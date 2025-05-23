# Bundle Analysis Guide

This document provides guidance on using the bundle analyzer and interpreting its results.

## Running Bundle Analysis

You can run bundle analysis locally using one of the following npm scripts:

```bash
# Analyze both client and server bundles
pnpm analyze

# Analyze only server bundle
pnpm analyze:server

# Analyze only client bundle
pnpm analyze:browser
```

The bundle analyzer will open automatically in your default browser.

## Interpreting Results

The bundle analyzer provides a visual representation of your application's bundle size:

- **Rectangles**: Each rectangle represents a module or package
- **Size**: The size of the rectangle indicates how much space it takes in your bundle
- **Color**: Colors help to visually distinguish between different modules

### Key Metrics

Pay attention to these key metrics when analyzing bundle size:

1. **Initial Load Size**: The size of your main chunks that load on the initial page visit
2. **Client vs. Server Bundles**: Distribution between code executed on client vs. server
3. **Individual Dependency Sizes**: Look for unusually large dependencies
4. **Code Splitting**: Check if routes and components are properly code-split
5. **Duplicate Modules**: Look for the same modules appearing in multiple chunks

## Optimization Strategies

When you identify large bundles, consider these optimization strategies:

### Large Dependencies

1. **Find alternatives**: For large libraries, look for smaller alternatives
2. **Tree-shaking**: Import only what you need: `import { Button } from 'ui-lib'` instead of `import UILib from 'ui-lib'`
3. **Code splitting**: Use dynamic imports to load heavy components only when needed
4. **Lazy loading**: Use `dynamic(() => import('...'))` for components below the fold

### Duplicate Modules

1. **Consolidate imports**: Use the same import style throughout your codebase
2. **Update dependencies**: Resolve version conflicts that cause duplicate installations
3. **Use module/nomodule pattern**: Serve modern bundles to modern browsers

### General Optimizations

1. **Remove unused code**: Delete code that's no longer used
2. **Use production builds**: Ensure you're analyzing production builds (`NODE_ENV=production`)
3. **Set performance budgets**: Establish size limits for your bundles
4. **Regular audits**: Run bundle analysis weekly to catch regressions

## CI Integration

A GitHub workflow runs bundle analysis:
- On pull requests (comments with bundle size)
- Weekly on the main branch
- Results are stored as artifacts

Use these reports to track bundle size changes over time and catch significant increases.

## Additional Resources

- [Next.js Documentation on Bundle Analysis](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [web.dev Guide to JavaScript Size Optimization](https://web.dev/articles/optimize-vitals-lighthouse) 