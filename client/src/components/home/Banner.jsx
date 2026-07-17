// src/components/Banner.jsx

import React from 'react'

const Banner = () => {
  return (
    <div className="w-full overflow-hidden bg-linear-to-r from-gray-950 via-indigo-950/80 to-gray-950 border-b border-indigo-500/20 backdrop-blur-sm relative">

      {/* ✨ Gradient overlay for colorful effect */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

      {/* 🔥 Marquee Container */}
      <div className="relative py-3.5 text-sm font-medium whitespace-nowrap flex">

        {/* 🎯 Track (moves smoothly) */}
        <div className="flex animate-marquee gap-8">

          {/* 🔁 Content repeated multiple times for seamless loop */}
          {[...Array(3)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-10 text-indigo-200">

              <span className="px-4 py-1.5 text-xs font-bold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-full shadow-md animate-pulse">
                NEW
              </span>

              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold">
                AI-Powered Resume Optimization • ATS Keyword Matching • Smart Suggestions • Instant Score & Feedback • Land Interviews Faster
              </span>

              <span className="text-indigo-300 font-semibold">
                → Start Building Free Now !
              </span>

            </span>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Banner