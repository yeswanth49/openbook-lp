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
    // Enable ESLint checking during builds
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: false,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://openbook.ai',
  },
  // Enable Next.js telemetry for analytics
  telemetry: {
    enabled: true,
  }
}

// Compose the MDX and Bundle Analyzer wrappers
const mdx = withMDX({
  extension: /\\.mdx?$/,
  options: { remarkPlugins: [remarkGfm] },
})

// Apply both wrappers to the Next.js config
export default withBundleAnalyzerWrapper(mdx(nextConfig))
