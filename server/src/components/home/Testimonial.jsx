// src/components/Testimonial.jsx (or wherever you placed it)

import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@neilstellar',
      date: 'April 20, 2025',
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025',
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@jordantalks',
      date: 'June 5, 2025',
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025',
    },
  ]

  const CreateCard = ({ card }) => (
    <div className="group relative p-6 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 w-80 sm:w-96 shrink-0 overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative flex gap-4 items-start">
        <img
          className="size-14 rounded-full ring-2 ring-gray-800/80 group-hover:ring-indigo-500/60 transition-all duration-300 object-cover"
          src={card.image}
          alt={card.name}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-50 group-hover:text-indigo-300 transition-colors">{card.name}</p>
            <svg
              className="mt-0.5 fill-indigo-500"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
              />
            </svg>
          </div>
          <span className="text-xs text-gray-500 mt-0.5">{card.handle}</span>
        </div>
      </div>

      <p className="relative text-sm py-5 text-gray-300 leading-relaxed z-10">
        "This resume builder completely changed the game — ATS-friendly format, smart keyword suggestions, and I started getting callbacks within days. 10/10 recommend!"
      </p>

      <div className="flex items-center justify-between text-gray-500 text-xs mt-3">
        <div className="flex items-center gap-2">
          <span>Posted on</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            <svg width="12" height="11" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  )

  return (
    <>
      <div id="testimonials" className="flex flex-col items-center my-20 md:my-28 scroll-mt-20 px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex items-center gap-3 text-sm font-medium text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 rounded-full px-7 py-2 backdrop-blur-md shadow-sm mb-10">
          <BookUserIcon className="size-5 text-indigo-400" />
          <span>Real User Stories</span>
        </div>

        <Title
          title="What Our Users Are Saying"
          description="Hear directly from job seekers who landed more interviews and dream roles faster using our AI-powered resume builder."
        />
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden py-12 bg-linear-to-b from-transparent via-gray-950/50 to-transparent">
        {/* Dark fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none bg-linear-to-r from-gray-950 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none bg-linear-to-l from-gray-950 to-transparent"></div>

        {/* Row 1 */}
        <div className="flex animate-marquee gap-6 md:gap-10 pb-6">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={`row1-${index}`} card={card} />
          ))}
        </div>

        {/* Row 2 - reverse */}
        <div className="flex animate-marquee-reverse gap-6 md:gap-10">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={`row2-${index}`} card={card} />
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee 55s linear infinite reverse;
          will-change: transform;
        }
      `}</style>
    </>
  )
}

export default Testimonial