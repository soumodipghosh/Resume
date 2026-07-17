// src/components/Footer.jsx

import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#05050a] border-t border-gray-800 pt-16 pb-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-wrap justify-between gap-12 lg:gap-20">
          
          {/* Left - Logo + Description */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">R</div>
              <span className="text-2xl font-semibold tracking-tighter text-white">resume.</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Making every customer feel valued — no matter the size of your audience.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            
            <div>
              <p className="text-white font-semibold mb-4">Product</p>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/" className="hover:text-white transition">Features</a></li>
                <li><a href="/" className="hover:text-white transition">Pricing</a></li>
                <li><a href="/" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold mb-4">Resources</p>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Blog</a></li>
                <li><a href="/" className="hover:text-white transition">Community</a></li>
                <li><a href="/" className="hover:text-white transition">Careers 
                  <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">We’re hiring!</span>
                </a></li>
                <li><a href="/" className="hover:text-white transition">About Us</a></li>
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold mb-4">Legal</p>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Right Side - Social + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                  <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                  <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              © 2026 Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer