import React from 'react'
import AnimateInView from '@/components/animate-in-view'
import { Brain, Lightbulb, Edit } from 'lucide-react'

/**
 * OpenBook Interface Grid Preview Component
 * 
 * This component shows a detailed layout of the OpenBook interface with various features.
 * It was originally part of the landing page and has been saved as a backup component.
 */
export function InterfaceGrid() {
  return (
    <div className="mt-12">
      <AnimateInView>
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="bg-gradient-to-br from-black to-gray-900 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white/70 mb-2">Smart Organization</h4>
                  <div className="space-y-2">
                    <div className="h-6 bg-white/10 rounded w-full"></div>
                    <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white/70 mb-2">Flexible Note-Taking</h4>
                  <div className="space-y-2">
                    <div className="h-6 bg-white/10 rounded w-full"></div>
                    <div className="h-6 bg-white/10 rounded w-5/6"></div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white/70 mb-2">Resource Management</h4>
                  <div className="space-y-2">
                    <div className="h-6 bg-white/10 rounded w-full"></div>
                    <div className="h-6 bg-white/10 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 h-full">
                <h4 className="text-sm font-medium text-white/70 mb-4">Interactive Learning Experience</h4>
                <div className="space-y-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <Brain className="h-4 w-4 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/15 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <Lightbulb className="h-4 w-4 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/15 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <Edit className="h-4 w-4 text-white/60" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/15 rounded w-5/6"></div>
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

export default InterfaceGrid 