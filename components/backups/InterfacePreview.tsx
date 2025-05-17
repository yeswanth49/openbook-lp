import React from 'react'
import AnimateInView from '@/components/animate-in-view'

/**
 * OpenBook Interface Preview Component
 * 
 * This component shows a mockup of the OpenBook interface with a sample question about photosynthesis.
 * It was originally part of the landing page and has been saved as a backup component.
 */
export function InterfacePreview() {
  return (
    <div className="mt-12 mb-16">
      <AnimateInView>
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="aspect-video bg-gradient-to-br from-black to-gray-900 p-6 md:p-8">
            <div className="flex flex-col h-full">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-sm text-white/60">OpenBook Interface</div>
                </div>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-1/3 pr-4">
                      <div className="h-8 bg-white/5 rounded"></div>
                      <div className="mt-2 space-y-2">
                        <div className="h-6 bg-white/5 rounded w-3/4"></div>
                        <div className="h-6 bg-white/5 rounded"></div>
                        <div className="h-6 bg-white/5 rounded w-5/6"></div>
                      </div>
                    </div>
                    <div className="w-2/3 pl-4 border-l border-white/10">
                      <div className="h-8 bg-white/5 rounded mb-4"></div>
                      <div className="relative bg-white/5 rounded-lg p-4">
                        <div className="text-sm text-white/80">How does photosynthesis work?</div>
                        <div className="mt-3 space-y-2">
                          <div className="h-4 bg-white/10 rounded w-full"></div>
                          <div className="h-4 bg-white/10 rounded w-11/12"></div>
                          <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">Detailed</div>
                          <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">Simple</div>
                          <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">Visual</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateInView>
    </div>
  )
}

export default InterfacePreview 