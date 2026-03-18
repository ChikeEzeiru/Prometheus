// =========================================================
// HERO COMPONENT
// Full-viewport-height section with:
//   • Background photo (movers helping a family)
//   • Dark gradient overlay for text legibility
//   • Headline + sub-headline copy
//   • Social proof row (avatar stack + star rating)
//   • "Get a Quote" quick-form (location inputs + relocation type)
// =========================================================

import React, { useState } from 'react'
import '../styles/Hero.css'

// --- Location Pin Icon ---
// Rendered inside each location text input as a visual hint.
function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3 4.5 8.5 4.5 8.5S12.5 9 12.5 6A4.5 4.5 0 0 0 8 1.5z"
        stroke="#9ca3af"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6" r="1.5" stroke="#9ca3af" strokeWidth="1.25" />
    </svg>
  )
}

// --- Question-mark (Help) Icon ---
// Displayed beside each form field label to hint that a tooltip
// or help popover is available.
function HelpIcon() {
  return (
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
  )
}

// --- Star Rating display ---
// Renders filled, half, or empty stars based on a numeric rating.
// `rating` is a float (e.g. 4.52); `max` is the total star count.
function StarRating({ rating = 4.52, max = 5 }) {
  return (
    <div className="star-rating" aria-label={`Rating: ${rating} out of ${max}`}>
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
    <div className="avatar-stack" aria-label="Customer avatars">
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

// --- Relocation type options for the dropdown ---
const RELOCATION_TYPES = [
  'Home Relocation',
  'Office Relocation',
  'Inter-state Relocation',
  'Furniture Delivery',
  'Item Storage',
]

// =========================================================
// Hero
// =========================================================
export default function Hero() {
  // Controlled state for each form field
  const [currentLocation, setCurrentLocation] = useState('')
  const [newLocation, setNewLocation]         = useState('')
  const [relocationType, setRelocationType]   = useState('')

  // Handle quote form submission
  function handleGetQuote(e) {
    e.preventDefault()
    // TODO: wire up to backend / booking flow
    console.log({ currentLocation, newLocation, relocationType })
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">

      {/* ── Background video ── */}
      <video
        className="hero__video"
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* ── Dark gradient overlay ──
          Improves text contrast over the video background. */}
      <div className="hero__overlay" aria-hidden="true" />

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
          <div className="hero__field">
            <label className="hero__field-label" htmlFor="current-location">
              Current Location <HelpIcon />
            </label>
            <div className="hero__input-wrapper">
              <PinIcon />
              <input
                id="current-location"
                type="text"
                className="hero__input"
                placeholder="e.g. Mafoluku, Oshodi"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                aria-required="true"
              />
            </div>
          </div>

          {/* New Location */}
          <div className="hero__field">
            <label className="hero__field-label" htmlFor="new-location">
              New Location <HelpIcon />
            </label>
            <div className="hero__input-wrapper">
              <PinIcon />
              <input
                id="new-location"
                type="text"
                className="hero__input"
                placeholder="e.g. Gbagada"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                aria-required="true"
              />
            </div>
          </div>

          {/* Type of Relocation – dropdown */}
          <div className="hero__field">
            <label className="hero__field-label" htmlFor="relocation-type">
              Type of Relocation <HelpIcon />
            </label>
            <div className="hero__input-wrapper hero__input-wrapper--select">
              <select
                id="relocation-type"
                className="hero__select"
                value={relocationType}
                onChange={(e) => setRelocationType(e.target.value)}
                aria-required="true"
              >
                <option value="" disabled>e.g. Home Relocation</option>
                {RELOCATION_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CTA Button */}
          <button type="submit" className="hero__cta">
            Get a Quote
          </button>

        </form>
      </div>
    </section>
  )
}
