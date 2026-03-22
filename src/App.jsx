// =========================================================
// APP COMPONENT
// Root component — manages top-level page routing via state.
//   'home'      → full landing page
//   'booking'   → BookingPage (pre-filled from sessionStorage quote)
//   'contact'   → ContactPage
//   'blog'      → BlogPage (listing)
//   'blog-post' → BlogPostPage (single post)
//   'storage'   → StoragePage
// =========================================================

import React, { useState, useEffect } from 'react'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Services     from './components/Services'
import Features     from './components/Features'
import Testimonials from './components/Testimonials'
import HowItWorks   from './components/HowItWorks'
import CTABanner    from './components/CTABanner'
import Footer       from './components/Footer'
import BookingPage  from './components/BookingPage'
import ContactPage  from './components/ContactPage'
import BlogPage     from './components/BlogPage'
import BlogPostPage from './components/BlogPostPage'
import StoragePage  from './components/StoragePage'

// Reads ?book=true&... params set by the quote email CTA.
// Runs once at module evaluation so useState gets the right initial value
// with no flash of the home page.
function resolveInitialPage() {
  const p = new URLSearchParams(window.location.search)
  if (p.get('book') !== 'true') return 'home'

  // Persist quote data so BookingPage pre-fills normally
  sessionStorage.setItem('prometheus_quote', JSON.stringify({
    fromLocation:   p.get('from')  || '',
    toLocation:     p.get('to')    || '',
    moveType:       p.get('type')  || '',
    spaceType:      p.get('space') || '',
    moveDate:       p.get('date')  || '',
    needsPackaging: p.get('pkg')   || '',
    fragileItems:   p.get('frag')  || '',
    name:           p.get('name')  || '',
    phone:          p.get('phone') || '',
    email:          p.get('email') || '',
    quoteRef:       p.get('ref')   || '',
  }))

  // Strip the params from the address bar so sharing/refreshing stays clean
  window.history.replaceState({}, '', window.location.pathname)
  return 'booking'
}

export default function App() {
  const [page,          setPage]          = useState(resolveInitialPage)
  const [currentPostId, setCurrentPostId] = useState(null)

  // Called by QuoteModal — quote data already in sessionStorage
  function goToBooking() {
    setPage('booking')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Called by CTABanner — clears any stale quote so the form starts blank
  function goToBookingFresh() {
    sessionStorage.removeItem('prometheus_quote')
    setPage('booking')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goHome() {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goToContact() {
    setPage('contact')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goToBlog() {
    setCurrentPostId(null)
    setPage('blog')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goToStorage() {
    setPage('storage')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function goToPost(id) {
    setCurrentPostId(id)
    setPage('blog-post')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const onBooking  = page === 'booking'
  const onContact  = page === 'contact'
  const onBlog     = page === 'blog'
  const onBlogPost = page === 'blog-post'
  const onStorage  = page === 'storage'
  const isSolid    = onBooking || onContact || onBlog || onBlogPost || onStorage

  return (
    <>
      <Navbar
        solid={isSolid}
        onHome={goHome}
        onContact={goToContact}
        onBlog={goToBlog}
        onStorage={goToStorage}
      />
      {onBooking ? (
        <BookingPage onBack={goHome} />
      ) : onContact ? (
        <ContactPage />
      ) : onBlog ? (
        <BlogPage onPost={goToPost} />
      ) : onBlogPost ? (
        <BlogPostPage postId={currentPostId} onBack={goToBlog} />
      ) : onStorage ? (
        <StoragePage />
      ) : (
        <>
          <Hero onBook={goToBooking} />
          <Services />
          <Features />
          <Testimonials />
          <HowItWorks />
          <CTABanner onBook={goToBookingFresh} />
          <Footer />
        </>
      )}
    </>
  )
}
