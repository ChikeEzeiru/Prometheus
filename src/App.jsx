// =========================================================
// APP COMPONENT
// Root component that composes all page sections.
// As new sections are added (Services, Testimonials, Footer,
// etc.) they are imported and placed here in order.
// =========================================================

import React from 'react'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Services     from './components/Services'
import Features     from './components/Features'
import Testimonials from './components/Testimonials'
import HowItWorks   from './components/HowItWorks'
import CTABanner    from './components/CTABanner'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CTABanner />
      <Footer />
    </>
  )
}
