'use client'

import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise show default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-4 border border-red-500 rounded-md bg-red-100/10 text-red-500">
          <h3 className="text-lg font-semibold">Error rendering content</h3>
          <p>There was a problem rendering this content. Please try again later.</p>
          {this.state.error && (
            <p className="mt-2 text-sm opacity-80">
              {this.state.error.message}
            </p>
          )}
        </div>
      );
    }
    
    return this.props.children;
  }
} 