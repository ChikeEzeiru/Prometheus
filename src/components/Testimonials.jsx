// =========================================================
// TESTIMONIALS — auto-scrolling marquee carousel
// Smooth pause/resume via Web Animations API playbackRate ramp.
// Edge fade via CSS mask-image with clamp().
// =========================================================

import React, { useRef, useEffect, useCallback } from 'react'
import '../styles/Testimonials.css'

const TESTIMONIALS = [
  {
    id: 1,
    title: 'Made Moving with Kids Quite Easy',
    body: 'With two toddlers, I was dreading moving day. They kept everything organised so I could focus on my children. Truly lifesaving.',
    name: 'Mrs. Nafisa',
    location: 'moved from Surulere',
  },
  {
    id: 2,
    title: 'Handled My Fragile Items Perfectly',
    body: 'I was worried about my glassware, but not a single item was scratched. They clearly know how to move with care.',
    name: 'Chinedu',
    location: 'moved from Victoria Island',
  },
  {
    id: 3,
    title: 'Affordable and Worth Every Naira',
    body: 'The pricing was clear upfront, no hidden costs. Honestly, I would have paid more for this peace of mind.',
    name: 'Miss Bisi',
    location: 'moved from Yaba',
  },
  {
    id: 4,
    title: 'A Friendly and Very Efficient Team',
    body: 'The movers were polite, cheerful, and worked so fast. This made the moving day not feel like a stressful day at all.',
    name: 'Mr Segun',
    location: 'moved from Magodo',
  },
  {
    id: 5,
    title: 'Office Move Completed Over a Weekend',
    body: 'Our entire office was packed, moved and set up without a single thing going missing. Colleagues could not believe we were fully operational on Monday.',
    name: 'Mrs. Funke',
    location: 'moved from Ikoyi',
  },
  {
    id: 6,
    title: 'Stress-Free Interstate Move',
    body: 'Moving from Lagos to Abuja felt impossible until Prometheus handled it. Everything arrived in perfect condition and right on schedule.',
    name: 'Mr Tunde',
    location: 'moved from Lagos Island',
  },
]

const TRACK = [...TESTIMONIALS, ...TESTIMONIALS]

function QuoteMark() {
  return (
    <svg
      width="36" height="28" viewBox="0 0 36 28"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className="testimonials__quote-mark"
      aria-hidden="true"
    >
      <path
        d="M0 28V17.2C0 12.587 1.067 8.8 3.2 5.84C5.387 2.827 8.827 0.906667 13.52 0.08L14.96 2.96C12.347 3.573 10.347 4.8 8.96 6.64C7.627 8.427 6.96 10.507 6.96 12.88H13.52V28H0ZM21.52 28V17.2C21.52 12.587 22.587 8.8 24.72 5.84C26.907 2.827 30.347 0.906667 35.04 0.08L36.48 2.96C33.867 3.573 31.867 4.8 30.48 6.64C29.147 8.427 28.48 10.507 28.48 12.88H35.04V28H21.52Z"
        fill="currentColor"
      />
    </svg>
  )
}

// Ease-in-out curve for smooth acceleration / deceleration
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function Testimonials() {
  const trackRef = useRef(null)
  const animRef  = useRef(null)
  const rafRef   = useRef(null)

  // Grab the CSS animation once the track mounts
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    // Small delay lets the browser register the animation
    const id = requestAnimationFrame(() => {
      animRef.current = el.getAnimations()[0] ?? null
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // Gradually ramp the animation playbackRate to targetRate over durationMs
  const rampTo = useCallback((targetRate, durationMs) => {
    cancelAnimationFrame(rafRef.current)
    const anim = animRef.current
    if (!anim) return

    const startRate = anim.playbackRate
    const startTime = performance.now()

    const step = (now) => {
      const t = Math.min((now - startTime) / durationMs, 1)
      anim.playbackRate = startRate + (targetRate - startRate) * easeInOut(t)
      if (t < 1) rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
  }, [])

  const handleMouseEnter = useCallback(() => rampTo(0, 600), [rampTo])
  const handleMouseLeave = useCallback(() => rampTo(1, 400), [rampTo])

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">

      {/* ── Section header ── */}
      <div className="container">
        <div className="testimonials__header">
          <span className="testimonials__eyebrow">Client Feedback</span>
          <h2 id="testimonials-heading" className="testimonials__heading">
            Trusted by over 2 thousand movers and counting…
          </h2>
          <p className="testimonials__subheading">
            We love hearing from our clients. Here's what they've shared
          </p>
        </div>
      </div>

      {/* ── Full-width marquee ── */}
      <div
        className="testimonials__viewport"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Scrolling testimonials"
      >
        <div className="testimonials__track" ref={trackRef}>
          {TRACK.map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="testimonials__card"
              aria-label={`Testimonial from ${t.name}`}
            >
              <QuoteMark />
              <h3 className="testimonials__card-title">{t.title}</h3>
              <p className="testimonials__card-body">{t.body}</p>
              <footer className="testimonials__card-footer">
                <span className="testimonials__card-name">{t.name}</span>
                <span className="testimonials__card-location">{t.location}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>

    </section>
  )
}
