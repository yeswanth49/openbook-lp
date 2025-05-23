export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation code
  }

  if (typeof window !== 'undefined') {
    // Browser-only instrumentation code
    const { reportWebVitals } = await import('./lib/vitals')
    
    // Register web vitals reporting for Next.js
    // Check for memory measurement API (only available in Chrome)
    if (typeof performance !== 'undefined' && 
        // @ts-ignore - measureUserAgentSpecificMemory is not in the TS types yet
        typeof performance.measureUserAgentSpecificMemory === 'function') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          // Report memory usage when page is hidden
          // @ts-ignore - TypeScript doesn't know about this API yet
          performance.measureUserAgentSpecificMemory()
            .then((memory: { bytes: number }) => {
              const memoryUsage = Math.round(memory.bytes / 1024 / 1024)
              console.info(`Page memory usage: ${memoryUsage} MB`)
            })
            .catch((error: Error) => console.error(error))
        }
      })
    }
    
    // Make reportWebVitals available globally for Next.js
    ;(window as any).reportWebVitals = reportWebVitals
  }
} 