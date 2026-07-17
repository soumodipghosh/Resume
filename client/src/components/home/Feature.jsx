// src/components/Feature.jsx (or wherever it's located)

import React from 'react'
import { ZapIcon } from "lucide-react"
import Title from './Title'

const Feature = () => {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <div id="features" className="flex flex-col items-center my-20 md:my-28 scroll-mt-20 px-4 sm:px-6 lg:px-8">
      {/* Badge */}
      <div className="flex items-center gap-3 text-sm font-medium text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 rounded-full px-7 py-2 backdrop-blur-md shadow-sm">
        <ZapIcon width={16} className="text-indigo-400" />
        <span>Simple & Powerful Process</span>
      </div>

      {/* Title – assuming Title.jsx is already dark-friendly; if not, we can upgrade it later */}
      <Title
        title="Build Your Professional Resume"
        description="Our streamlined process helps you create ATS-optimized, modern resumes in minutes with intelligent AI-powered tools, smart suggestions, and customizable templates."
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-7xl mt-16 lg:mt-12">
        {/* Left Image – premium frame + glow */}
        <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/15 to-purple-500/15 rounded-3xl blur-3xl opacity-70 -z-10 animate-pulse-slow"></div>
          <img
            className="w-full rounded-3xl shadow-2xl shadow-black/50 border border-gray-800/60 object-cover transition-all duration-500 hover:scale-[1.03] hover:shadow-indigo-500/20"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt="Resume Builder Preview"
          />
        </div>

        {/* Right Features List */}
        <div
          className="space-y-8 w-full max-w-lg"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature 1 */}
          <div
            className={`group flex items-start gap-6 p-7 rounded-2xl border backdrop-blur-md transition-all duration-300
              ${isHover
                ? 'bg-gray-900/70 border-indigo-500/40 shadow-xl shadow-indigo-500/15'
                : 'bg-gray-900/50 border-gray-800/50 shadow-lg'}`}
          >
            <div className="p-4 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-50 group-hover:text-indigo-300 transition-colors">
                Real-Time Analytics
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get instant insights into your resume strength, ATS compatibility, keyword optimization scores, and improvement suggestions.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group flex items-start gap-6 p-7 rounded-2xl border backdrop-blur-md transition-all duration-300 bg-gray-900/50 border-gray-800/50 shadow-lg hover:bg-gray-900/70 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/15">
            <div className="p-4 bg-teal-500/10 rounded-xl text-teal-400 group-hover:bg-teal-500/20 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-50 group-hover:text-indigo-300 transition-colors">
                Enterprise-Grade Security
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                End-to-end encryption, secure cloud storage, and compliance with modern data protection standards.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group flex items-start gap-6 p-7 rounded-2xl border backdrop-blur-md transition-all duration-300 bg-gray-900/50 border-gray-800/50 shadow-lg hover:bg-gray-900/70 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/15">
            <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500/20 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-50 group-hover:text-indigo-300 transition-colors">
                Fully Customizable Designs
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Choose from modern templates, adjust colors, fonts, layouts, and sections to match your personal brand.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Font fallback – can be removed if already in global css */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');
      `}</style>
    </div>
  )
}

export default Feature