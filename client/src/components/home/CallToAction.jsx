// src/components/CallToAction.jsx

import React from 'react'

const CallToAction = () => {
  return (
    <div id="cta" className="w-full bg-[#05050a] py-20 border-t border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 bg-[#0f0f17] border border-gray-700 rounded-3xl px-8 md:px-16 py-16 text-center md:text-left">
          
          <div className="max-w-md">
            <p className="text-2xl md:text-3xl font-semibold text-white leading-tight">
              Build a professional Resume That Helps You Stand Out and Get Hired.
            </p>
          </div>

          <a 
            href="/app" 
            className="group flex items-center gap-3 px-10 py-4 bg-linear-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-black font-semibold rounded-full text-lg transition-all shadow-lg shadow-cyan-500/30 active:scale-95"
          >
            Get Started
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="size-5 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </a>

        </div>
      </div>
    </div>
  )
}

export default CallToAction