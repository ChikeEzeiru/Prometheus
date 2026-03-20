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
  { label: 'Storage',    href: '#storage'    },
  { label: 'Blog',       href: '#blog'       },
  { label: 'Contact Us', href: '#contact'    },
]

// solid   — forces the scrolled (white/opaque) style regardless of scroll position
// onHome  — callback to navigate back to the index page
export default function Navbar({ solid = false, onHome }) {
  const [activeLink, setActiveLink] = useState('Home')
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSolid = solid || scrolled

  return (
    <nav
      className={`navbar${isSolid ? ' navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container navbar__inner">

        {/* ── Brand — logo mark + wordmark centred in their own flex box ── */}
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

        {/* ── Nav links ── */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href, hasDropdown }) => {
            const isActive = activeLink === label
            return (
              <li key={label} className="navbar__item">
                <a
                  href={href}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  onClick={e => {
                    setActiveLink(label)
                    if (label === 'Home' && onHome) {
                      e.preventDefault()
                      onHome()
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Top row: text + optional chevron */}
                  <span className="navbar__link-label">
                    {label}
                    {hasDropdown && (
                      <span className="navbar__chevron"><ChevronDown /></span>
                    )}
                  </span>

                  {/* Pill — always rendered; visible only when active */}
                  <span
                    className={`navbar__pill${isActive ? ' navbar__pill--visible' : ''}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>

      </div>
    </nav>
  )
}
