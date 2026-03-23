// =========================================================
// STORAGE PAGE
// Full-page service overview for Prometheus storage offering.
// Sections: header, how it works, unit sizes/pricing,
//           features, FAQ (accordion), CTA.
// =========================================================

import React, { useState } from 'react'
import Footer from './Footer'
import Toast  from './Toast'
import '../styles/Storage.css'

// ── Feature icons ─────────────────────────────────────────

function IconCCTV() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 6.5L14 4l2 7-12 2.5L2 6.5Z"
        stroke="#344054" strokeWidth="1.5"
        strokeLinejoin="round"/>
      <circle cx="17" cy="15" r="2"
        stroke="#344054" strokeWidth="1.5"/>
      <path d="M16 7.5l3-1.5"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round"/>
      <path d="M8 17.5v-3"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round"/>
    </svg>
  )
}

function IconClimate() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 3v16M11 3l-3 3M11 3l3 3"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 7l10 10M5.5 7l-.5 4M5.5 7l3.5 1"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 7l-10 10M16.5 7l.5 4M16.5 7l-3.5 1"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconAccess() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="9" width="16" height="10" rx="1.5"
        stroke="#344054" strokeWidth="1.5"/>
      <path d="M7 9V6.5a4 4 0 0 1 8 0V9"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round"/>
      <circle cx="11" cy="14" r="1.5"
        fill="#344054"/>
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 2L3.5 5v6c0 4.4 3.1 8.5 7.5 9.5C15.4 19.5 18.5 15.4 18.5 11V5L11 2Z"
        stroke="#344054" strokeWidth="1.5"
        strokeLinejoin="round"/>
      <path d="M8 11l2 2 4-4"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconClean() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 18h14"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round"/>
      <path d="M6 18V9l5-5 5 5v9"
        stroke="#344054" strokeWidth="1.5"
        strokeLinejoin="round"/>
      <rect x="9" y="13" width="4" height="5"
        stroke="#344054" strokeWidth="1.5"
        strokeLinejoin="round"/>
      <path d="M9 10h4"
        stroke="#344054" strokeWidth="1.5"
        strokeLinecap="round"/>
    </svg>
  )
}

function IconTag() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 11.5L3 4.5C3 3.95 3.45 3.5 4 3.5H11L19 11.5L12.5 18L3 11.5Z"
        stroke="#344054" strokeWidth="1.5"
        strokeLinejoin="round"/>
      <circle cx="7.5" cy="7.5" r="1.25"
        fill="#344054"/>
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────

const STEPS = [
  {
    image:    '/images/storage-step-1.avif',
    imageAlt: 'Storage unit booking form',
    title:    'Tell us what you need',
    body:     'Get a free quote based on the size and duration you need. No commitment required.',
  },
  {
    image:    '/images/storage-step-2.avif',
    imageAlt: 'Two Prometheus movers loading boxes into a van',
    title:    'We collect from your door',
    body:     'Our crew picks up your items and transports them safely to our facility — fully documented.',
  },
  {
    image:    '/images/storage-step-3.avif',
    imageAlt: 'Prometheus crew member at a customer\'s front door',
    title:    "Retrieve whenever you're ready",
    body:     'Request a full delivery or specific items with 48 hours notice. We bring everything to you.',
  },
]

const UNITS = [
  {
    name:        'Mini',
    sqm:         'Up to 5 m²',
    description: 'Perfect for a studio or a room\'s worth of items — boxes, small appliances, seasonal items.',
    price:       '₦25,000',
    popular:     false,
  },
  {
    name:        'Standard',
    sqm:         'Up to 15 m²',
    description: 'Fits the contents of a 2-bedroom apartment comfortably, including furniture.',
    price:       '₦55,000',
    popular:     true,
  },
  {
    name:        'Large',
    sqm:         'Up to 30 m²',
    description: 'Full home or office contents. Ideal for major relocations or extended travel.',
    price:       '₦95,000',
    popular:     false,
  },
]

const FEATURES = [
  {
    icon:  <IconCCTV />,
    title: '24/7 CCTV & Security',
    body:  'Armed guards, CCTV throughout, and individual unit alarms — your items are watched around the clock.',
  },
  {
    icon:  <IconClimate />,
    title: 'Climate-Controlled Units',
    body:  'Protects your electronics, fabric, and wood from Lagos humidity and heat year-round.',
  },
  {
    icon:  <IconAccess />,
    title: 'Flexible Access',
    body:  'Request your items with 48-hour notice. We deliver directly to your door — no trips needed.',
  },
  {
    icon:  <IconShield />,
    title: 'Insurance Included',
    body:  'All stored items are covered against fire, theft, and water damage at no extra cost.',
  },
  {
    icon:  <IconClean />,
    title: 'Clean, Pest-Free Facility',
    body:  'Monthly fumigation and regular facility inspections keep your items in pristine condition.',
  },
  {
    icon:  <IconTag />,
    title: 'No Hidden Fees',
    body:  'Your quote includes collection, storage, and one free delivery. What you see is what you pay.',
  },
]

const FAQS = [
  {
    q: 'Is there a minimum storage period?',
    a: 'Our minimum storage period is one month. After that, you can stay month-to-month or commit to a longer term for a discount.',
  },
  {
    q: 'Can I access my unit directly?',
    a: 'We operate a managed-access model — our team retrieves and delivers your items rather than giving direct unit access. This keeps your items safer and our facility more secure.',
  },
  {
    q: 'Are all item types accepted?',
    a: 'We accept household furniture, electronics, appliances, boxes, and office equipment. We do not accept hazardous materials, food items, live plants, or animals.',
  },
  {
    q: 'How do I know my items are safe?',
    a: 'Each intake is documented with a full photographic inventory. You receive a copy before we take possession of your items, so there\'s a clear record from day one.',
  },
  {
    q: 'Do you offer long-term discounts?',
    a: 'Yes — committing to 3 months or more earns you a 10% discount. 6 months or more earns 15% off the monthly rate.',
  },
]

// ── StoragePage ───────────────────────────────────────────
export default function StoragePage() {
  const [openFaq,   setOpenFaq]   = useState(null)
  const [showToast, setShowToast] = useState(false)

  function handleComingSoon() {
    setShowToast(true)
  }

  function toggleFaq(index) {
    setOpenFaq(prev => (prev === index ? null : index))
  }

  return (
    <div className="storage-page">

      {/* ── Page header ── */}
      <div className="storage-header">
        <div className="container">
          <span className="storage-eyebrow">Storage Solutions</span>
          <h1 className="storage-heading">Safe, secure storage — right in Lagos</h1>
          <p className="storage-subheading">
            Short-term between moves or long-term when you need breathing room.
            Your items stay in clean, monitored units until you need them back.
          </p>
        </div>
      </div>

      {/* ── How it works ── */}
      <section className="storage-how">
        <div className="container">
          <div className="storage-how__header">
            <div className="storage-how__header-left">
              <h2 className="storage-how__heading">How it works.</h2>
              <p className="storage-how__sub">
                From pickup to safe storage — we handle every step so your items
                are exactly where you need them, exactly when you need them back.
              </p>
            </div>
            <button
              type="button"
              className="storage-how__cta"
              onClick={handleComingSoon}
            >
              Reserve a Unit <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="storage-steps">
            {STEPS.map((step) => (
              <div key={step.title} className="storage-step">
                <div className="storage-step__image-wrap">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="storage-step__image"
                    loading="lazy"
                  />
                </div>
                <h3 className="storage-step__title">{step.title}</h3>
                <p className="storage-step__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Unit sizes / pricing ── */}
      <section className="storage-units">
        <div className="container">
          <h2 className="storage-section-heading">Choose your unit size</h2>
          <p className="storage-section-sub">All units include insurance, 24/7 CCTV, and climate control.</p>
          <div className="storage-units__grid">
            {UNITS.map((unit) => (
              <div
                key={unit.name}
                className={`storage-unit${unit.popular ? ' storage-unit--popular' : ''}`}
              >
                {unit.popular && (
                  <span className="storage-unit__badge">Most Popular</span>
                )}
                <p className="storage-unit__name">{unit.name}</p>
                <p className="storage-unit__sqm">{unit.sqm}</p>
                <p className="storage-unit__description">{unit.description}</p>
                <div className="storage-unit__price-row">
                  <span className="storage-unit__price-from">from </span>
                  <span className="storage-unit__price">{unit.price}</span>
                  <span className="storage-unit__price-per">/mo</span>
                </div>
                <button
                  className={`storage-unit__cta${unit.popular ? ' storage-unit__cta--popular' : ''}`}
                  type="button"
                  onClick={handleComingSoon}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
          <p className="storage-units__note">
            Prices are indicative. Final quote based on exact inventory and duration.
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="storage-features">
        <div className="container">
          <h2 className="storage-section-heading">Why store with Prometheus?</h2>
          <div className="storage-features__grid">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="storage-feature">
                <div className="storage-feature__icon" aria-hidden="true">
                  {feat.icon}
                </div>
                <h3 className="storage-feature__title">{feat.title}</h3>
                <p className="storage-feature__body">{feat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="storage-faq">
        <div className="container">
          <h2 className="storage-section-heading">Frequently asked questions</h2>
          <div className="storage-faq__list" role="list">
            {FAQS.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className={`storage-faq__item${isOpen ? ' storage-faq__item--open' : ''}`}
                  role="listitem"
                >
                  <button
                    className="storage-faq__question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    type="button"
                  >
                    <span className="storage-faq__question-text">{item.q}</span>
                    <span className="storage-faq__toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className="storage-faq__answer"
                    hidden={!isOpen}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="storage-cta-section">
        <div className="container">
          <div className="storage-cta-card">
            <h2>Ready to store?</h2>
            <p>Pick a plan above and reserve your unit today. Prices start from ₦25,000/month — no hidden fees.</p>
            <button className="storage-cta-btn" type="button" onClick={handleComingSoon}>
              Reserve Your Unit
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Coming soon!"
        message="Storage booking isn't live yet. We'll let you know as soon as it's ready."
      />
    </div>
  )
}
