// =========================================================
// CTA BANNER — full-bleed two-column: copy left, photo right
// =========================================================

import React from 'react'
import '../styles/CTABanner.css'

export default function CTABanner() {
  return (
    <section className="cta-banner" aria-label="Book your move">
      {/* ── Left: dark bg + copy ── */}
      <div className="cta-banner__content">
        <div className="cta-banner__inner">
          <h2 className="cta-banner__heading">
            Ready to move?<br />Let's make it easy
          </h2>
          <p className="cta-banner__body">
            Whether you're moving a home, an office, or just need a
            truck — we'll get your belongings there safely, on time,
            every time.
          </p>
          <a href="#contact" className="cta-banner__btn">
            Book Your Move Now
          </a>
        </div>
      </div>

      {/* ── Right: full-bleed video ── */}
      <div className="cta-banner__image-wrap">
        <video
          className="cta-banner__image"
          src="/images/cta-banner.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
