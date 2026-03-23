// =========================================================
// HERO COMPONENT
// Full-viewport-height section with:
//   • Background photo (movers helping a family)
//   • Dark gradient overlay for text legibility
//   • Headline + sub-headline copy
//   • Social proof row (avatar stack + star rating)
//   • "Get a Quote" quick-form (location inputs + relocation type)
// =========================================================

import React, { useState, useRef, useEffect } from 'react'
import '../styles/Hero.css'
import LocationCombobox from './LocationCombobox'
import QuoteModal from './QuoteModal'

// --- Field Tooltip ---
// Wraps the "?" icon and shows a brief hint bubble on hover/focus.
// Pass a `tip` string for the tooltip copy.
function FieldTooltip({ tip }) {
  return (
    <span className="field-tooltip" tabIndex={0} aria-label={tip}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="6" stroke="#9ca3af" strokeWidth="1.2" />
        <text
          x="7"
          y="10.5"
          textAnchor="middle"
          fontSize="8"
          fill="#9ca3af"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          ?
        </text>
      </svg>
      <span className="field-tooltip__bubble" role="tooltip">{tip}</span>
    </span>
  )
}

// --- Star Rating display ---
// Renders filled, half, or empty stars based on a numeric rating.
// `rating` is a float (e.g. 4.52); `max` is the total star count.
function StarRating({ rating = 4.52, max = 5 }) {
  return (
    <div className="star-rating" role="img" aria-label={`Rating: ${rating} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        // Determine fill level: full (1), half (0.5), or empty (0)
        const fill = Math.min(Math.max(rating - i, 0), 1)
        const id = `star-grad-${i}`

        return (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Gradient allows partial (half) star fills */}
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="var(--color-star)" />
                <stop offset={`${fill * 100}%`} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              d="M9 1.5l2.1 4.3 4.7.7-3.4 3.3.8 4.7L9 12.1l-4.2 2.4.8-4.7L2.2 6.5l4.7-.7z"
              fill={`url(#${id})`}
            />
          </svg>
        )
      })}
    </div>
  )
}

// --- Avatar Stack ---
const AVATARS = [
  '/avatars/avatar-1.svg',
  '/avatars/avatar-2.svg',
  '/avatars/avatar-3.svg',
  '/avatars/avatar-4.svg',
  '/avatars/avatar-5.svg',
]

function AvatarStack() {
  return (
    <div className="avatar-stack" role="img" aria-label="Customer avatars">
      {AVATARS.map((src, i) => (
        <img
          key={i}
          src={src}
          className="avatar-stack__item"
          style={{ zIndex: AVATARS.length - i }}
          alt=""
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// --- Relocation type options ---
const RELOCATION_TYPES = [
  'Home Relocation',
  'Office Relocation',
  'Fragile Items',
  'Truck Rentals',
]

// --- Chevron icon for the custom select trigger ---
function ChevronIcon({ open }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease', flexShrink: 0 }}
    >
      <path d="M4 6l4 4 4-4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// --- Custom relocation-type select (matches location input card style) ---
function RelocationSelect({ id, value, onChange }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function onPointerDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  function pick(type) {
    onChange(type)
    setOpen(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) }
  }

  return (
    <div className="relocation-select" ref={wrapperRef}>
      {/* ── Trigger ── */}
      <div
        id={id}
        className="hero__input-wrapper relocation-select__trigger"
        role="combobox"
        aria-label="Type of Relocation"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required="true"
        tabIndex={0}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className={value ? 'relocation-select__value' : 'relocation-select__placeholder'}>
          {value || 'e.g. Home Relocation'}
        </span>
        <ChevronIcon open={open} />
      </div>

      {/* ── Options panel ── */}
      {open && (
        <ul className="relocation-select__options" role="listbox">
          {RELOCATION_TYPES.map(type => {
            const selected = type === value
            return (
              <li
                key={type}
                role="option"
                aria-selected={selected}
                className={
                  'relocation-select__option' +
                  (selected ? ' relocation-select__option--selected' : '')
                }
                onMouseDown={() => pick(type)}
              >
                <span className="relocation-select__option-label">{type}</span>
                {selected && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                    className="relocation-select__check">
                    <path d="M3 8l3.5 3.5L13 5"
                      stroke="var(--color-primary)" strokeWidth="1.75"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// =========================================================
// Hero
// =========================================================
export default function Hero({ onBook }) {
  // Controlled state for each form field
  const [currentLocation, setCurrentLocation] = useState('')
  const [newLocation, setNewLocation]         = useState('')
  const [relocationType, setRelocationType]   = useState('')

  // Quote modal visibility
  const [showQuote, setShowQuote] = useState(false)

  // Open the quote modal with the current hero field values pre-filled
  function handleGetQuote(e) {
    e.preventDefault()
    setShowQuote(true)
  }

  return (
    <>
    <section className="hero" aria-labelledby="hero-heading">

      {/* ── Background (video + overlay) ──
          Wrapped in its own div so overflow:hidden only clips
          the media, leaving form dropdowns free to overflow. */}
      <div className="hero__bg" aria-hidden="true">
        <video
          className="hero__video"
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero__overlay" />
      </div>

      {/* ── Main content column ──
          Positioned in the lower-left quadrant of the section. */}
      <div className="hero__content">

        {/* ── Headline ── */}
        <h1 id="hero-heading" className="hero__headline">
          Stress-free moving in Nigeria
        </h1>

        {/* ── Sub-headline ── */}
        <p className="hero__subheadline">
          Affordable, Insured &amp; Timely Relocations.
        </p>

        {/* ── Social proof row ──
            Avatar stack + star rating + review count copy */}
        <div className="hero__social-proof">
          <AvatarStack />

          <div className="hero__social-proof__meta">
            <div className="hero__rating">
              <StarRating rating={4.52} />
              <span className="hero__rating-score">4.52</span>
            </div>

            <p className="hero__review-copy">
              loved by over 300 customers
            </p>
          </div>
        </div>

        {/* ── Quote Form ──
            Three fields (current location, new location, relocation type)
            plus a CTA button. All sit on a single horizontal row. */}
        <form className="hero__form" onSubmit={handleGetQuote} noValidate>

          {/* Current Location */}
          <div className={`hero__field${currentLocation ? ' hero__field--has-value' : ''}`}>
            <label className="hero__field-label" htmlFor="current-location">
              Current Location <FieldTooltip tip="Your current address or area in Lagos" />
            </label>
            <LocationCombobox
              id="current-location"
              placeholder="e.g. Mafoluku, Oshodi"
              value={currentLocation}
              onChange={setCurrentLocation}
            />
          </div>

          {/* New Location */}
          <div className={`hero__field${newLocation ? ' hero__field--has-value' : ''}`}>
            <label className="hero__field-label" htmlFor="new-location">
              New Location <FieldTooltip tip="The area or address you are moving to in Lagos" />
            </label>
            <LocationCombobox
              id="new-location"
              placeholder="e.g. Gbagada"
              value={newLocation}
              onChange={setNewLocation}
            />
          </div>

          {/* Type of Relocation – custom select */}
          <div className={`hero__field${relocationType ? ' hero__field--has-value' : ''}`}>
            <label className="hero__field-label" htmlFor="relocation-type">
              Type of Relocation <FieldTooltip tip="Choose the kind of move — home, office, fragile items, or a truck rental" />
            </label>
            <RelocationSelect
              id="relocation-type"
              value={relocationType}
              onChange={setRelocationType}
            />
          </div>

          {/* CTA Button */}
          <button type="submit" className="hero__cta">
            Get a Quote
          </button>

        </form>
      </div>
    </section>

    {/* Quote wizard — rendered as a portal over the whole page */}
    <QuoteModal
      isOpen={showQuote}
      onClose={() => setShowQuote(false)}
      onBook={onBook}
      prefill={{
        from:      currentLocation,
        to:        newLocation,
        moveType:  relocationType,
      }}
    />
    </>
  )
}
