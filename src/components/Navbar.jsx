// =========================================================
// NAVBAR COMPONENT
// Sticky top navigation bar with the Prometheus logo,
// primary nav links, and a "Relocation" dropdown trigger.
// =========================================================

import React, { useState } from 'react'
import '../styles/Navbar.css'

// --- Logo Icon ---
// SVG representation of the Prometheus brand mark (pink square with
// a stylised lightning-bolt / "P" glyph).
function LogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rounded pink/red square background */}
      <rect width="32" height="32" rx="8" fill="#E8194B" />
      {/* Stylised lightning-bolt glyph in white */}
      <path
        d="M19 5L11 18h6l-2 9 10-14h-6l2-8z"
        fill="white"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// --- Chevron Icon ---
// Downward-pointing chevron used beside the "Relocation" nav link
// to signal a dropdown menu.
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
// Each entry has a label, href, and optional flags.
// "hasDropdown" renders the chevron icon next to the label.
// "active" applies the active indicator dot beneath the link.
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
  // Track which nav link is currently active (by label)
  const [activeLink, setActiveLink] = useState('Home')

  return (
    // Outer wrapper – sits above the hero and uses a dark
    // semi-transparent background so the hero image shows through.
    <nav className="navbar" role="navigation" aria-label="Main navigation">

      {/* ── Brand / Logo ── */}
      <a href="/" className="navbar__logo" aria-label="Prometheus home">
        <LogoIcon />
        <span className="navbar__logo-text">Prometheus</span>
      </a>

      {/* ── Nav Links ── */}
      <ul className="navbar__links" role="list">
        {NAV_LINKS.map(({ label, href, hasDropdown, active }) => (
          <li key={label} className="navbar__item">
            <a
              href={href}
              className={`navbar__link ${activeLink === label ? 'navbar__link--active' : ''}`}
              onClick={() => setActiveLink(label)}
              aria-current={activeLink === label ? 'page' : undefined}
            >
              {label}
              {/* Render dropdown chevron for links that have sub-menus */}
              {hasDropdown && (
                <span className="navbar__chevron">
                  <ChevronDown />
                </span>
              )}
            </a>

            {/* Active indicator dot rendered below the active link */}
            {activeLink === label && (
              <span className="navbar__active-dot" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
