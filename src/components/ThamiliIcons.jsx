import React from 'react'

export function ThamiliLogoIcon({ className = 'logo-icon-svg' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="thamiliV2BodyGrad" x1="12%" y1="12%" x2="88%" y2="88%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="26%" stopColor="#0099ff" />
          <stop offset="52%" stopColor="#4f46e5" />
          <stop offset="78%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>

        <linearGradient id="thamiliV2RingBack" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="thamiliV2RingFront" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="75%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        <linearGradient id="thamiliV2Gloss" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="thamiliV2RingGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Orbit Ring (Back Segment) */}
      <path
        d="M 16 63 C 14 49, 36 34, 67 31 C 82 29, 93 33, 96 39"
        stroke="url(#thamiliV2RingBack)"
        strokeWidth="4.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3D Stylized 'A' Body */}
      <path
        d="M 50 13
           C 54.5 13, 58 16.5, 60 21
           L 86 76
           C 87.8 80, 85.5 85, 80.5 86
           C 75.8 87, 72 83.5, 70 79
           L 63.5 64
           L 36.5 64
           L 30 79
           C 28 83.5, 24.2 87, 19.5 86
           C 14.5 85, 12.2 80, 14 76
           L 40 21
           C 42 16.5, 45.5 13, 50 13 Z"
        fill="url(#thamiliV2BodyGrad)"
      />

      {/* Inner Triangular Depth Cutout */}
      <path
        d="M 50 33
           L 59 53
           L 41 53 Z"
        fill="#080b14"
        fillOpacity="0.38"
      />

      {/* Crossbar Glow */}
      <path
        d="M 36.5 63.5
           C 43 60, 57 60, 63.5 63.5
           L 60 55
           L 40 55 Z"
        fill="url(#thamiliV2RingFront)"
        fillOpacity="0.9"
      />

      {/* Gloss Highlight Reflection */}
      <path
        d="M 50 15
           C 52.5 15, 54.5 17, 55.5 20.5
           L 39 58
           C 37 55, 36 49, 37 45
           L 46 20
           C 47.2 16.5, 48.5 15, 50 15 Z"
        fill="url(#thamiliV2Gloss)"
      />

      {/* Orbit Ring (Front Segment) */}
      <path
        d="M 96 39
           C 98.5 44, 94 53, 79 62.5
           C 62.5 73.5, 38 78.5, 20.5 75
           C 14.5 73.8, 12.5 69.5, 16 63"
        stroke="url(#thamiliV2RingFront)"
        strokeWidth="4.6"
        strokeLinecap="round"
        fill="none"
        filter="url(#thamiliV2RingGlow)"
      />

      {/* Satellite Node */}
      <circle cx="86" cy="42" r="3.2" fill="#ffffff" />
      <circle cx="86" cy="42" r="5.2" stroke="#00f5ff" strokeWidth="1.4" fill="none" opacity="0.9" />
    </svg>
  )
}

export function ThamiliWordmark({ className = 'brand-title', isHero = false }) {
  return (
    <span className={`thamili-brand-text ${className} ${isHero ? 'hero-brand-text' : ''}`}>
      <span className="thamili-letters">THAM</span>
      <span className="thamili-i-wrap">
        <span className="thamili-i-glyph">I</span>
        <svg className="thamili-i-sparkle" viewBox="0 0 20 20" fill="none">
          <defs>
            <linearGradient id="thamiliISparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <path
            d="M 10 1 Q 10 10, 1 10 Q 10 10, 10 19 Q 10 10, 19 10 Q 10 10, 10 1 Z"
            fill="url(#thamiliISparkleGrad)"
          />
        </svg>
      </span>
      <span className="thamili-letters">LI</span>
    </span>
  )
}
