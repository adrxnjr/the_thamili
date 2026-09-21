import React from 'react'

/**
 * Hardware-accelerated ambient aurora background mesh with zero banding.
 */
export function BackgroundWaves() {
  return (
    <div className="ambient-waves-layer" aria-hidden="true">
      <div className="ambient-aurora-container">
        <div className="aurora-orb aurora-orb-1" />
        <div className="aurora-orb aurora-orb-2" />
        <div className="aurora-orb aurora-orb-3" />
        <div className="aurora-orb aurora-orb-4" />
        <div className="aurora-orb aurora-orb-5" />
      </div>
      <div className="ambient-dither-grain" />
    </div>
  )
}

export default BackgroundWaves
