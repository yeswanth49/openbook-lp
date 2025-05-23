import { type NextWebVitalsMetric } from 'next/app'

/**
 * Report web vitals to analytics provider
 * This is a wrapper around the built-in Next.js reporting
 * More info: https://nextjs.org/docs/app/api-reference/functions/reporting-web-vitals
 */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { id, name, label, value } = metric

  // Use 'console.info' during development to avoid console.log warnings in ESLint
  if (process.env.NODE_ENV !== 'production') {
    console.info('Web Vitals:', { id, name, label, value })
    return
  }

  // Send to analytics in production
  // This can be extended to send data to any analytics provider
  // like Google Analytics, Mixpanel, etc.
  try {
    // Example: send to custom endpoint
    // const body = JSON.stringify({ id, name, label, value });
    // navigator.sendBeacon('/api/vitals', body);

    // The data is automatically collected by Vercel Analytics and Speed Insights
    // This function provides a hook for additional custom reporting if needed
  } catch (err) {
    console.error('Error reporting web vitals:', err)
  }
} 