// =========================================================
// APP COMPONENT
// Root component that composes all page sections.
// As new sections are added (Services, Testimonials, Footer,
// etc.) they are imported and placed here in order.
// =========================================================

import React from 'react'
import Navbar from './components/Navbar'
import Hero   from './components/Hero'

export default function App() {
  return (
    <>
      {/* ── Navigation ──
          Absolutely positioned over the Hero so it floats
          on top of the background image.                   */}
      <Navbar />

      {/* ── Hero / Landing Section ── */}
      <Hero />

      {/* Additional sections (Services, About, Testimonials,
          Blog, Footer) will be added here as designs come in. */}
    </>
  )
}
