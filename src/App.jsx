// =========================================================
// APP COMPONENT
// Root component that composes all page sections.
// As new sections are added (Services, Testimonials, Footer,
// etc.) they are imported and placed here in order.
// =========================================================

import React from 'react'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Services  from './components/Services'
import Features  from './components/Features'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Features />
    </>
  )
}
