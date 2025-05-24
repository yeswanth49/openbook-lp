/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import withBundleAnalyzer from '@next/bundle-analyzer'

// Create the bundle analyzer wrapper
const withBundleAnalyzerWrapper = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  // Generate HTML and JSON reports
  openAnalyzer: true
})

const nextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during builds until all issues are fixed
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
    domains: ['images.unsplash.com'],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://openbook.ai',
  },
  // Telemetry is controlled through Vercel's settings, not needed here
}

// Compose the MDX and Bundle Analyzer wrappers
const mdx = withMDX({
  extension: /\\.mdx?$/,
  options: { remarkPlugins: [remarkGfm] },
})

// Apply both wrappers to the Next.js config
export default withBundleAnalyzerWrapper(mdx(nextConfig))
