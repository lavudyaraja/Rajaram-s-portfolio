"use client";

import React from 'react';

const EducationalJourney = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
        
        {/* Top Visual Section (SVG) */}
        <div className="relative w-full h-[450px] bg-[#fdfdfd] flex items-center justify-center pt-10">
          <svg
            viewBox="0 0 600 450"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connecting Lines - Exact Match to Reference */}
            {/* Center Vertical Line (2023) */}
            <path
              d="M300 130 C300 200 300 350 300 450"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Left Curve (2019) */}
            <path
              d="M170 200 C170 250 300 280 300 450"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Right Curve (2021) */}
            <path
              d="M430 200 C430 250 300 280 300 450"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Nodes / Double Circles */}
            
            {/* 2019 Node (SSC) */}
            <g>
              <circle cx="170" cy="200" r="42" stroke="black" strokeWidth="1.5" fill="white" />
              <circle cx="170" cy="200" r="35" stroke="black" strokeWidth="1" fill="white" />
              <text x="170" y="205" textAnchor="middle" className="text-sm font-bold fill-black font-sans">2019</text>
              <text x="170" y="265" textAnchor="middle" className="text-xs font-semibold fill-gray-600">SSC</text>
            </g>

            {/* 2023 Node (BTech) - Top Center */}
            <g>
              <circle cx="300" cy="80" r="48" stroke="black" strokeWidth="1.5" fill="white" />
              <circle cx="300" cy="80" r="40" stroke="black" strokeWidth="1" fill="white" />
              <text x="300" y="85" textAnchor="middle" className="text-sm font-bold fill-black font-sans">2023</text>
              <text x="300" y="150" textAnchor="middle" className="text-xs font-semibold fill-gray-600">BTech</text>
            </g>

            {/* 2021 Node (Intermediate) */}
            <g>
              <circle cx="430" cy="200" r="42" stroke="black" strokeWidth="1.5" fill="white" />
              <circle cx="430" cy="200" r="35" stroke="black" strokeWidth="1" fill="white" />
              <text x="430" y="205" textAnchor="middle" className="text-sm font-bold fill-black font-sans">2021</text>
              <text x="430" y="265" textAnchor="middle" className="text-xs font-semibold fill-gray-600">Intermediate</text>
            </g>
          </svg>
        </div>

        {/* Bottom Content Section */}
        <div className="p-8 text-center bg-white border-t border-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Educational Journey</h2>
          
          <div className="mt-6 flex items-center justify-center gap-4">
            <button className="bg-[#3b82f6] text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-all active:scale-95 shadow-sm">
              View Details
            </button>
            <button className="flex items-center gap-2 border border-gray-300 px-8 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-95">
              Share
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalJourney;