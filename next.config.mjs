/** @type {import('next').NextConfig} */
import withMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  env: {
    SITE_URL: process.env.SITE_URL || 'https://openbook.ai',
  },
}

const mdx = withMDX({
  extension: /\\.mdx?$/,
  options: { remarkPlugins: [remarkGfm] },
})

export default mdx(nextConfig)
