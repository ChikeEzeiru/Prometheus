// =========================================================
// NAVBAR COMPONENT
// Fixed 4.5rem-tall bar. Transparent over hero; switches to
// frosted light background on scroll.
// =========================================================

import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'

function ChevronDown() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 5l4.5 4.5L11.5 5"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Home',       href: '#'           },
  { label: 'Relocation', href: '#relocation', hasDropdown: true },
  { label: 'Storage',    href: '#storage',    badge: 'New'      },
  { label: 'Blog',       href: '#blog'       },
  { label: 'Contact Us', href: '#contact'    },
]

// solid      — forces the scrolled (white/opaque) style regardless of scroll position
// onHome     — callback to navigate back to the index page
// onContact  — callback to navigate to the contact page
// onBlog     — callback to navigate to the blog listing page
// onStorage  — callback to navigate to the storage page
export default function Navbar({ solid = false, onHome, onContact, onBlog, onStorage }) {
  const [activeLink, setActiveLink] = useState('Home')
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleLinkClick(e, label) {
    setActiveLink(label)
    setMenuOpen(false)
    if (label === 'Home' && onHome) {
      e.preventDefault()
      onHome()
    }
    if (label === 'Contact Us' && onContact) {
      e.preventDefault()
      onContact()
    }
    if (label === 'Blog' && onBlog) {
      e.preventDefault()
      onBlog()
    }
    if (label === 'Storage' && onStorage) {
      e.preventDefault()
      onStorage()
    }
  }

  const isSolid = solid || scrolled

  return (
    <>
      <nav
        className={`navbar${isSolid ? ' navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar__inner">

          {/* ── Brand ── */}
          <div className="navbar__brand">
            <a
              href="/"
              className="navbar__logo"
              aria-label="Prometheus home"
              onClick={e => { if (onHome) { e.preventDefault(); onHome() } }}
            >
              <img src="/logomark.svg" width="32" height="32" alt="" aria-hidden="true" />
              <span className="navbar__logo-text">Prometheus</span>
            </a>
          </div>

          {/* ── Desktop nav links ── */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ label, href, hasDropdown, badge }) => {
              const isActive = activeLink === label
              return (
                <li key={label} className="navbar__item">
                  <a
                    href={href}
                    className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                    onClick={e => handleLinkClick(e, label)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="navbar__link-label">
                      {label}
                      {hasDropdown && (
                        <span className="navbar__chevron"><ChevronDown /></span>
                      )}
                      {badge && !isActive && (
                        <span className="navbar__new-badge">{badge}</span>
                      )}
                    </span>
                    <span
                      className={`navbar__pill${isActive ? ' navbar__pill--visible' : ''}`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* ── Hamburger (mobile only) ── */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>

        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ label, href, badge }) => (
          <a
            key={label}
            href={href}
            className={`navbar__mobile-link${activeLink === label ? ' navbar__mobile-link--active' : ''}`}
            onClick={e => handleLinkClick(e, label)}
          >
            {label}
            {badge && activeLink !== label && (
              <span className="navbar__new-badge">{badge}</span>
            )}
          </a>
        ))}
      </div>
    </>
  )
}
