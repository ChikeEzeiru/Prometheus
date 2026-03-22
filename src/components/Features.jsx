import React from 'react'
import '../styles/Features.css'

import fragileIcon      from '../assets/icons/fragile.svg'
import usersCheckIcon   from '../assets/icons/users-check.svg'
import puzzleIcon       from '../assets/icons/puzzle-piece-01.svg'
import piggyBankIcon    from '../assets/icons/piggy-bank-01.svg'
import truckIcon        from '../assets/icons/truck-01.svg'
import phoneIcon        from '../assets/icons/phone.svg'

// ── Feature data ────────────────────────────────────────────
const FEATURES = [
  {
    id: 'care',
    icon: fragileIcon,
    title: 'Handled With Care',
    body: 'Every item is treated with the same attention — carefully packed with protective materials, secured in transit, and delivered safely to your new address.',
    shortBody: 'Packed carefully, secured in transit, and delivered safely to your door.',
  },
  {
    id: 'professionals',
    icon: usersCheckIcon,
    title: 'Trusted Professionals',
    body: 'Our movers are trained, experienced, & dedicated to making your move smooth. You can trust them with even the most delicate items.',
    shortBody: 'Trained, trusted movers you can rely on for even your most delicate items.',
  },
  {
    id: 'flexible',
    icon: puzzleIcon,
    title: 'Flexible Services',
    body: 'We understand no two moves are alike, so we offer solutions that range from quick, single-day jobs to full-service relocations with packing and setup.',
    shortBody: 'From a single-day pickup to a full-service relocation — we fit your move.',
  },
  {
    id: 'affordable',
    icon: piggyBankIcon,
    title: 'Affordable Rates',
    body: "Moving shouldn't break the bank. We provide competitive, transparent pricing that ensures you know exactly what you're paying for.",
    shortBody: "Transparent, competitive pricing. You always know exactly what you're paying.",
  },
  {
    id: 'delivery',
    icon: truckIcon,
    title: 'On-Time Delivery',
    body: "Time is valuable. We respect your schedule, arrive promptly, and complete moves within the agreed timeframe so you're never left waiting.",
    shortBody: 'We arrive on time and finish within your agreed window. Every time.',
  },
  {
    id: 'support',
    icon: phoneIcon,
    title: 'Responsive Support',
    body: 'Questions, changes, or special requests? Our team is always a call or message away, ready to guide you at every stage of your move.',
    shortBody: 'A call or message away at every stage of your move.',
  },
]

// ── Component ───────────────────────────────────────────────
export default function Features() {
  return (
    <section className="section features" aria-labelledby="features-heading">
      <div className="container">

        {/* ── Section header ── */}
        <div className="features__header">
          <span className="features__eyebrow">Why Move With Prometheus?</span>
          <h2 id="features-heading" className="features__heading">
            A move you can feel good about
          </h2>
          <p className="features__subheading">
            Every move is different, but peace of mind should always come standard.
            That's why our services focus on what matters most:
          </p>
        </div>

        {/* ── Feature grid ── */}
        <ul className="features__grid">
          {FEATURES.map(f => (
            <li key={f.id} className="features__item">
              <div className="features__icon">
                <img src={f.icon} alt="" aria-hidden="true" width="22" height="22" />
              </div>
              <h3 className="features__title">{f.title}</h3>
              <p className="features__body">
                <span className="feat-body-full">{f.body}</span>
                <span className="feat-body-short">{f.shortBody}</span>
              </p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
