// =========================================================
// NAVBAR COMPONENT
// Fixed top navigation. Transparent over hero; switches to
// a frosted light background once the user scrolls down.
// =========================================================

import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'

// --- Chevron Icon ---
function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 5l4.5 4.5L11.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// --- Navigation link definitions ---
const NAV_LINKS = [
  { label: 'Home',        href: '#',           active: true  },
  { label: 'Relocation',  href: '#relocation', hasDropdown: true },
  { label: 'Storage',     href: '#storage'     },
  { label: 'Blog',        href: '#blog'        },
  { label: 'Contact Us',  href: '#contact'     },
]

// =========================================================
// Navbar
// =========================================================
export default function Navbar() {
  const [activeLink, setActiveLink] = useState('Home')
  const [scrolled, setScrolled]     = useState(false)

  // Switch to light background once the user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container navbar__inner">

        {/* ── Brand / Logo ── */}
        <a href="/" className="navbar__logo" aria-label="Prometheus home">
          <img src="/logomark.svg" width="38" height="38" alt="" aria-hidden="true" />
          <span className="navbar__logo-text">Prometheus</span>
        </a>

        {/* ── Nav Links ── */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href, hasDropdown }) => (
            <li key={label} className="navbar__item">
              <a
                href={href}
                className={`navbar__link ${activeLink === label ? 'navbar__link--active' : ''}`}
                onClick={() => setActiveLink(label)}
                aria-current={activeLink === label ? 'page' : undefined}
              >
                {label}
                {hasDropdown && (
                  <span className="navbar__chevron">
                    <ChevronDown />
                  </span>
                )}
              </a>

              {activeLink === label && (
                <span className="navbar__active-dot" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>

      </div>
    </nav>
  )
}
