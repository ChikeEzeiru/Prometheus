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

// ── Dropdown icons — stroke="currentColor" so the parent's color prop drives them ──
function DropdownHomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.5 7.5L10 2.5l7.5 5V17.5a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V7.5z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7.5 18.5v-6h5v6"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function DropdownBuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="10" height="15" rx="1"
        stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 7h4a1 1 0 0 1 1 1v10H12V7z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 7h4M5 10h4M5 13h4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DropdownGlassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6 2h8l-2 7H8L6 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 9c0 2 2 4 2 4s2-2 2-4"
        stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 13v4M7.5 17h5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DropdownTruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1" y="5" width="12" height="9" rx="1"
        stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13 8h4l2 4v2h-6V8z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="4.5" cy="15.5" r="1.5"
        stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="15.5" cy="15.5" r="1.5"
        stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

// ── Relocation dropdown items ───────────────────────────────────────
// tabId must match the `id` values in Services.jsx TABS array
const RELOCATION_ITEMS = [
  {
    tabId:       'home-relocation',
    label:       'Full Home Relocation',
    description: 'Move your entire home without lifting a finger',
    icon:        <DropdownHomeIcon />,
    image:       '/images/services-home-relocation.avif',
    imageAlt:    'Woman sitting happily among moving boxes',
  },
  {
    tabId:       'commercial-relocation',
    label:       'Commercial Relocation',
    description: 'Move in one weekend, open fully on Monday',
    icon:        <DropdownBuildingIcon />,
    image:       '/images/services-commercial-relocation.avif',
    imageAlt:    'Worker moving boxes with a dolly at a warehouse',
  },
  {
    tabId:       'fragile-packaging',
    label:       'Fragile Items Packaging',
    description: "Priceless family heirlooms? We've got them covered",
    icon:        <DropdownGlassIcon />,
    image:       '/images/services-fragile-packaging.avif',
    imageAlt:    'Person carefully packing fragile glassware',
  },
  {
    tabId:       'truck-rentals',
    label:       'Moving Truck Rentals',
    description: 'Need just wheels and muscle?',
    icon:        <DropdownTruckIcon />,
    image:       '/images/services-truck-rentals.avif',
    imageAlt:    'Two movers sitting in the back of a moving truck',
  },
]

// ── Nav link definitions ────────────────────────────────────────────
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
export default function Navbar({ solid = false, onHome, onContact, onBlog, onStorage, onRelocationClick }) {
  const [activeLink,   setActiveLink]   = useState('Home')
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen,          setDropdownOpen]          = useState(false)
  const [dropdownIdx,           setDropdownIdx]           = useState(null)
  const [mobileRelocationOpen,  setMobileRelocationOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when mobile menu is open; collapse sub-menu on close
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) setMobileRelocationOpen(false)
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

              /* ── Relocation: wraps the dropdown panel ── */
              if (hasDropdown) {
                return (
                  <li
                    key={label}
                    className="navbar__item navbar__item--has-dropdown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => { setDropdownOpen(false); setDropdownIdx(null) }}
                  >
                    <button
                      type="button"
                      className={`navbar__link navbar__link--trigger`}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      <span className="navbar__link-label">
                        {label}
                        <span className={`navbar__chevron${dropdownOpen ? ' navbar__chevron--open' : ''}`}>
                          <ChevronDown />
                        </span>
                      </span>
                    </button>

                    {/* ── Mega dropdown ── */}
                    <div
                      className={`navbar__dropdown${dropdownOpen ? ' navbar__dropdown--open' : ''}`}
                      role="menu"
                    >
                      {/* Left — items list */}
                      <div className="navbar__dropdown-items">
                        {RELOCATION_ITEMS.map((item, i) => (
                          <button
                            key={item.label}
                            className={`navbar__dropdown-item${dropdownIdx === i ? ' navbar__dropdown-item--active' : ''}`}
                            onMouseEnter={() => setDropdownIdx(i)}
                            onClick={() => {
                              setDropdownOpen(false)
                              setDropdownIdx(null)
                              onRelocationClick?.(item.tabId)
                            }}
                            role="menuitem"
                          >
                            <span className="navbar__dropdown-icon">{item.icon}</span>
                            <span className="navbar__dropdown-text">
                              <span className="navbar__dropdown-item-label">{item.label}</span>
                              <span className="navbar__dropdown-item-desc">{item.description}</span>
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Right — animated image panel */}
                      <div className="navbar__dropdown-images" aria-hidden="true">
                        {RELOCATION_ITEMS.map((item, i) => {
                          // Fallback to first image when nothing has been hovered yet
                          const activeIdx = dropdownIdx ?? 0
                          // Images above active → slide up (-10px), below → slide down (+10px)
                          const offset    = i < activeIdx ? -10 : i > activeIdx ? 10 : 0
                          return (
                            <div
                              key={i}
                              className="navbar__dropdown-frame"
                              style={{
                                opacity:   i === activeIdx ? 1 : 0,
                                transform: `translateY(${offset}px)`,
                              }}
                            >
                              <img src={item.image} alt={item.imageAlt} loading="lazy" />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </li>
                )
              }

              /* ── Normal link ── */
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
                      {badge && (
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
        {NAV_LINKS.map(({ label, href, badge, hasDropdown }) => {
          if (hasDropdown) {
            return (
              <div key={label} className="navbar__mobile-accordion">
                <button
                  type="button"
                  className="navbar__mobile-link navbar__mobile-link--accordion"
                  onClick={() => setMobileRelocationOpen(o => !o)}
                  aria-expanded={mobileRelocationOpen}
                >
                  <span>{label}</span>
                  <span className={`navbar__chevron${mobileRelocationOpen ? ' navbar__chevron--open' : ''}`}>
                    <ChevronDown />
                  </span>
                </button>

                <div
                  className={`navbar__mobile-submenu${mobileRelocationOpen ? ' navbar__mobile-submenu--open' : ''}`}
                  aria-hidden={!mobileRelocationOpen}
                >
                  {RELOCATION_ITEMS.map(item => (
                    <button
                      key={item.tabId}
                      type="button"
                      className="navbar__mobile-subitem"
                      onClick={() => {
                        setMenuOpen(false)
                        setMobileRelocationOpen(false)
                        onRelocationClick?.(item.tabId)
                      }}
                    >
                      <span className="navbar__mobile-subitem__icon">{item.icon}</span>
                      <span className="navbar__mobile-subitem__label">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <a
              key={label}
              href={href}
              className={`navbar__mobile-link${activeLink === label ? ' navbar__mobile-link--active' : ''}`}
              onClick={e => handleLinkClick(e, label)}
            >
              {label}
              {badge && (
                <span className="navbar__new-badge">{badge}</span>
              )}
            </a>
          )
        })}
      </div>
    </>
  )
}
