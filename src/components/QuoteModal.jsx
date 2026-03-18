// =========================================================
// QUOTE MODAL
// A 4-step wizard that:
//   1. Pre-fills locations from the hero form
//   2. Collects move details, personal info and extras
//   3. Calculates a Lagos-specific moving quote
//   4. Emails the result via EmailJS
//   5. Persists the quote to sessionStorage for the booking flow
// =========================================================

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import emailjs from '@emailjs/browser'
import '../styles/QuoteModal.css'
import LocationCombobox from './LocationCombobox'

// ── Lagos zone map (used for distance-based pricing) ─────────────────────
// Lagos is divided into 8 radial zones from the airport outward.
// Each location string is matched against lowercase keywords.
const ZONE_MAP = [
  { zone: 1, keys: ['ikeja', 'agege', 'ojodu', 'berger', 'ogba', 'ifako', 'alausa', 'allen avenue', 'maryland', 'isheri', 'ilupeju', 'oregun', 'omole', 'magodo', 'pen cinema', 'ojokoro', 'ifako-ijaiye'] },
  { zone: 2, keys: ['gbagada', 'ketu', 'ojota', 'anthony village', 'palmgrove', 'palm grove', 'bariga', 'shomolu', 'onipanu', 'ogudu', 'ikosi', 'alapere', 'owode', 'mile 12', 'kosofe'] },
  { zone: 3, keys: ['surulere', 'yaba', 'mushin', 'oshodi', 'isolo', 'eric moore', 'ijeshatedo', 'ojuelegba', 'fadeyi', 'jibowu', 'bode thomas', 'okota', 'ilasamaja', 'itire', 'lawanson', 'tejuosho', 'ejigbo'] },
  { zone: 4, keys: ['lagos island', 'cms', 'marina', 'apongbon', 'idumota', 'balogun', 'obalende', 'isale eko', 'epetedo', 'ebute metta', 'apapa', 'costain', 'orile', 'ajegunle', 'amukoko', 'iganmu'] },
  { zone: 5, keys: ['ikoyi', 'victoria island', ' vi ', 'oniru', 'falomo', 'banana island', 'osborne', 'parkview estate', 'dolphin estate', 'vgc', 'victoria garden'] },
  { zone: 6, keys: ['lekki phase 1', 'lekki phase 2', 'lekki', 'ajah', 'sangotedo', 'chevron', 'jakande', 'badore', 'abraham adesanya', 'thomas estate', 'orchid', 'osapa', 'igbo efon', 'awoyaya', 'eleko', 'ibeju'] },
  { zone: 7, keys: ['festac', 'amuwo', 'ojo', 'satellite town', 'mile 2', 'trade fair', 'abule-ado', 'abule egba', 'iyana-ipaja', 'ipaja', 'idimu', 'igando', 'ayobo', 'akowonjo', 'egbeda', 'dopemu', 'meiran'] },
  { zone: 8, keys: ['ikorodu', 'epe', 'badagry', 'agbowa', 'redemption camp', 'ibeju-lekki'] },
]

function getZone(loc) {
  const l = (loc ?? '').toLowerCase()
  for (const { zone, keys } of ZONE_MAP) {
    if (keys.some(k => l.includes(k))) return zone
  }
  return 4 // central fallback
}

// ── Pricing formula ───────────────────────────────────────────────────────
// Base: type of move  ×  space multiplier  +  distance tier
// + optional packaging & fragile addons + urgency modifier

const BASE_PRICE = {
  'home-relocation':   55_000,
  'office-relocation': 85_000,
  'fragile-items':     45_000,
  'truck-rentals':     40_000,
}

const SPACE_MULTIPLIER = {
  'bedsitter': 0.55,
  'mini-flat': 0.70,
  '1bed':      0.85,
  '2bed':      1.00,
  '3bed':      1.30,
  '4bed':      1.60,
  '5plus':     2.00,
  'duplex':    2.20,
  'office-sm': 1.00,
  'office-lg': 1.70,
}

// Distance price by zone difference (0 = same zone, capped at 4+)
const DISTANCE_PRICE = [20_000, 30_000, 45_000, 60_000, 75_000]

function calcQuote(d) {
  const base = BASE_PRICE[d.moveType] ?? 55_000
  const mult = SPACE_MULTIPLIER[d.spaceType] ?? 1.0
  const diff = Math.abs(getZone(d.fromLocation) - getZone(d.toLocation))
  let total  = base * mult + DISTANCE_PRICE[Math.min(diff, 4)]

  if (d.needsPackaging === 'yes')              total += 18_000
  if ((d.fragileItems ?? '').trim().length > 3) total += 12_000

  if (d.moveDate) {
    const days = (new Date(d.moveDate) - Date.now()) / 86_400_000
    if (days < 7)    total *= 1.20  // urgency surcharge
    else if (days > 30) total *= 0.95 // early-bird discount
  }

  return Math.round(total / 1_000) * 1_000  // round to nearest ₦1 000
}

// ── Helpers ───────────────────────────────────────────────────────────────
function genRef() {
  const C = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'PMR-' + Array.from({ length: 6 }, () => C[Math.floor(Math.random() * C.length)]).join('')
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

// ── EmailJS config ────────────────────────────────────────────────────────
const EJS_SERVICE  = 'service_p7ilyuf'
const EJS_TEMPLATE = 'template_gdr8rhc'
const EJS_KEY      = 'cg9OTYK9yGg73ksYv'

// ── Label maps ────────────────────────────────────────────────────────────
const MOVE_LABELS = {
  'home-relocation':   'Home Relocation',
  'office-relocation': 'Office Relocation',
  'fragile-items':     'Fragile Items',
  'truck-rentals':     'Truck Rentals',
}

const SPACE_LABELS = {
  'bedsitter': 'Bedsitter / Single Room',
  'mini-flat': 'Mini Flat',
  '1bed':      '1 Bedroom Apartment',
  '2bed':      '2 Bedroom Apartment',
  '3bed':      '3 Bedroom Apartment',
  '4bed':      '4 Bedroom Apartment',
  '5plus':     '5+ Bedroom Apartment',
  'duplex':    'Duplex / Maisonette',
  'office-sm': 'Office Space (Small)',
  'office-lg': 'Office Space (Large)',
}

// ── Sidebar step definitions ──────────────────────────────────────────────
const STEPS = [
  { label: 'Locations',    sub: 'Where you are moving from/to', emoji: '🗺️'  },
  { label: 'Move details', sub: 'What type of move?',           emoji: '🏠'  },
  { label: 'Your Info',    sub: 'To share your result(s)',      emoji: '🚐'  },
  { label: 'Extras',       sub: 'Any special requests?',        emoji: '📦'  },
]

// ── Icons ─────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="qm-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg className="qm-sel-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 6.5L8 2l6 4.5V14a.5.5 0 01-.5.5h-3.5V10H6v4.5H2.5A.5.5 0 012 14V6.5z"
        stroke="#9CA3AF" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="qm-sel-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="#9CA3AF" strokeWidth="1.25" />
      <path d="M5 1v3M11 1v3M1.5 6.5h13" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

// =========================================================
// Main component
// Props:
//   isOpen      – controls visibility
//   onClose     – called when user dismisses the modal
//   prefill     – { from, to, moveType } from the hero form
// =========================================================
export default function QuoteModal({ isOpen, onClose, prefill = {} }) {
  const [step,    setStep]    = useState(0)
  const [quote,   setQuote]   = useState(null)
  const [sending, setSending] = useState(false)
  const [error,   setError]   = useState('')

  // Build a fresh blank form state (merged with prefill)
  const blank = () => ({
    fromLocation:   prefill.from     ?? '',
    toLocation:     prefill.to       ?? '',
    moveType:       prefill.moveType ?? '',
    spaceType:      '',
    moveDate:       '',
    name:           '',
    phone:          '',
    email:          '',
    needsPackaging: '',
    fragileItems:   '',
  })

  const [data, setData] = useState(blank)
  const overlayRef      = useRef(null)

  // Re-initialise each time the modal opens
  useEffect(() => {
    if (!isOpen) return
    setStep(0)
    setQuote(null)
    setError('')
    setSending(false)
    setData(blank())
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Partial state updater
  function set(field, value) {
    setData(d => ({ ...d, [field]: value }))
  }

  // Per-step validation
  function canNext() {
    if (step === 0) return data.fromLocation.trim().length > 0 && data.toLocation.trim().length > 0
    if (step === 1) return !!data.moveType && !!data.spaceType && !!data.moveDate
    if (step === 2) return data.name.trim().length > 0 && isValidEmail(data.email)
    return true
  }

  // Final submission: calculate → email → persist → show result
  async function handleSubmit() {
    setSending(true)
    setError('')

    const amount    = calcQuote(data)
    const ref       = genRef()
    const formatted = `₦${amount.toLocaleString('en-NG')}`
    const dateLabel = data.moveDate
      ? new Date(data.moveDate + 'T00:00:00').toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : 'Not specified'

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          to_name:       data.name,
          to_email:      data.email,
          phone:         data.phone?.trim() || 'Not provided',
          quote_ref:     ref,
          from_location: data.fromLocation,
          to_location:   data.toLocation,
          move_type:     MOVE_LABELS[data.moveType]   ?? data.moveType,
          space_type:    SPACE_LABELS[data.spaceType]  ?? data.spaceType,
          move_date:     dateLabel,
          packaging:     data.needsPackaging === 'yes' ? 'Yes' : 'No',
          fragile_items: data.fragileItems?.trim() || 'None',
          quote_amount:  formatted,
        },
        EJS_KEY,
      )

      // Persist quote for the booking flow (session-only)
      sessionStorage.setItem('prometheus_quote', JSON.stringify({
        ...data,
        quoteAmount: amount,
        quoteRef:    ref,
        generatedAt: new Date().toISOString(),
      }))

      setQuote({ amount, formatted, ref, dateLabel })
    } catch {
      setError("We couldn't send your quote right now. Please try again.")
    } finally {
      setSending(false)
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className="qm-overlay"
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Get a free moving quote"
    >
      <div className="qm-dialog">

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside className="qm-sidebar">
          {STEPS.map((s, i) => {
            const done   = quote ? true : i < step
            const active = !quote && i === step
            return (
              <div
                key={s.label}
                className={[
                  'qm-step',
                  active ? 'qm-step--active' : '',
                  done   ? 'qm-step--done'   : '',
                ].filter(Boolean).join(' ')}
              >
                <span className="qm-step__dot">
                  {done && <CheckIcon />}
                </span>
                <div>
                  <p className="qm-step__label">{s.label}</p>
                  <p className="qm-step__sub">{s.sub}</p>
                </div>
              </div>
            )
          })}
        </aside>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="qm-content">

          {/* Close button */}
          <button className="qm-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>

          {quote ? (
            <Result quote={quote} data={data} onClose={onClose} />
          ) : (
            <>
              {/* Step header */}
              <div className="qm-header">
                <span className="qm-header__emoji" aria-hidden="true">
                  {STEPS[step].emoji}
                </span>
                <div>
                  <h2 className="qm-header__title">Free Quote</h2>
                  <p className="qm-header__sub">
                    Fill in the details below to get your moving quote
                  </p>
                </div>
              </div>

              {/* Form body */}
              <div className="qm-body">
                {step === 0 && <Step0 data={data} set={set} />}
                {step === 1 && <Step1 data={data} set={set} />}
                {step === 2 && <Step2 data={data} set={set} />}
                {step === 3 && <Step3 data={data} set={set} error={error} />}
              </div>

              {/* Navigation */}
              <div className="qm-nav">
                {step === 0
                  ? <button className="qm-btn qm-btn--ghost" onClick={onClose}>Cancel</button>
                  : <button className="qm-btn qm-btn--ghost" onClick={() => setStep(s => s - 1)}>Back</button>
                }
                {step < 3
                  ? (
                    <button
                      className="qm-btn qm-btn--next"
                      onClick={() => setStep(s => s + 1)}
                      disabled={!canNext()}
                    >
                      Next <ArrowIcon />
                    </button>
                  ) : (
                    <button
                      className="qm-btn qm-btn--submit"
                      onClick={handleSubmit}
                      disabled={sending}
                    >
                      {sending ? 'Calculating…' : 'Get My Free Quote'}
                    </button>
                  )
                }
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Step 0 – Locations ────────────────────────────────────────────────────
function Step0({ data, set }) {
  return (
    <div className="qm-fields">
      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-from">
          Where are you moving from?
        </label>
        <LocationCombobox
          id="qm-from"
          placeholder="e.g. Gbagada"
          value={data.fromLocation}
          onChange={v => set('fromLocation', v)}
        />
      </div>

      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-to">
          Where are you moving to?
        </label>
        <LocationCombobox
          id="qm-to"
          placeholder="e.g. Mafoluku, Oshodi"
          value={data.toLocation}
          onChange={v => set('toLocation', v)}
        />
      </div>

      <p className="qm-note">
        *We only use this to calculate distance &amp; give you an accurate
        quote. Your address is never shared.
      </p>
    </div>
  )
}

// ── Step 1 – Move details ─────────────────────────────────────────────────
function Step1({ data, set }) {
  const today = new Date().toISOString().split('T')[0]
  return (
    <div className="qm-fields">
      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-move-type">
          What type of move are you planning?
        </label>
        <div className="qm-sel-wrap">
          <select
            id="qm-move-type"
            className="qm-sel"
            value={data.moveType}
            onChange={e => set('moveType', e.target.value)}
          >
            <option value="" disabled>e.g. Home Relocation</option>
            <option value="home-relocation">Home Relocation</option>
            <option value="office-relocation">Office Relocation</option>
            <option value="fragile-items">Fragile Items</option>
            <option value="truck-rentals">Truck Rentals</option>
          </select>
          <ChevronIcon />
        </div>
      </div>

      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-space">
          What kind of space are you moving to?
        </label>
        <div className="qm-sel-wrap qm-sel-wrap--icon">
          <HomeIcon />
          <select
            id="qm-space"
            className="qm-sel qm-sel--icon"
            value={data.spaceType}
            onChange={e => set('spaceType', e.target.value)}
          >
            <option value="" disabled>Select an apartment or building type</option>
            <option value="bedsitter">Bedsitter / Single Room</option>
            <option value="mini-flat">Mini Flat</option>
            <option value="1bed">1 Bedroom Apartment</option>
            <option value="2bed">2 Bedroom Apartment</option>
            <option value="3bed">3 Bedroom Apartment</option>
            <option value="4bed">4 Bedroom Apartment</option>
            <option value="5plus">5+ Bedroom Apartment</option>
            <option value="duplex">Duplex / Maisonette</option>
            <option value="office-sm">Office Space (Small)</option>
            <option value="office-lg">Office Space (Large)</option>
          </select>
          <ChevronIcon />
        </div>
      </div>

      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-date">
          When do you want to move?
        </label>
        <div className="qm-sel-wrap qm-sel-wrap--icon">
          <CalendarIcon />
          <input
            id="qm-date"
            type="date"
            className="qm-sel qm-sel--icon"
            min={today}
            value={data.moveDate}
            onChange={e => set('moveDate', e.target.value)}
          />
          {/* Hide the native calendar picker; users click the whole field */}
        </div>
      </div>

      <p className="qm-note">
        *This helps us plan the right team and vehicle for your move.
      </p>
    </div>
  )
}

// ── Step 2 – Your info ────────────────────────────────────────────────────
function Step2({ data, set }) {
  return (
    <div className="qm-fields">
      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-name">Name of Person Moving</label>
        <input
          id="qm-name"
          type="text"
          className="qm-input"
          placeholder="e.g. John Smith"
          value={data.name}
          onChange={e => set('name', e.target.value)}
        />
      </div>

      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-phone">
          Phone number <span className="qm-optional">(optional)</span>
        </label>
        <input
          id="qm-phone"
          type="tel"
          className="qm-input"
          placeholder="e.g. +234 801 234 5678"
          value={data.phone}
          onChange={e => set('phone', e.target.value)}
        />
        <p className="qm-note">
          {"We'll only call if we need to confirm your move. No spam."}
        </p>
      </div>

      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-email">Email Address</label>
        <input
          id="qm-email"
          type="email"
          className="qm-input"
          placeholder="e.g. johnsmith@mail.com"
          value={data.email}
          onChange={e => set('email', e.target.value)}
        />
        <p className="qm-note">Only used to send your free quote. Not for marketing.</p>
      </div>
    </div>
  )
}

// ── Step 3 – Extras ───────────────────────────────────────────────────────
function Step3({ data, set, error }) {
  return (
    <div className="qm-fields">
      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-packaging">
          Do you need the items packaged?
        </label>
        <div className="qm-sel-wrap">
          <select
            id="qm-packaging"
            className="qm-sel"
            value={data.needsPackaging}
            onChange={e => set('needsPackaging', e.target.value)}
          >
            <option value="" disabled>Please select yes or no</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <ChevronIcon />
        </div>
      </div>

      <div className="qm-field">
        <label className="qm-label" htmlFor="qm-fragile">
          Any fragile/heavy items we should know about?
        </label>
        <input
          id="qm-fragile"
          type="text"
          className="qm-input"
          placeholder="e.g. Glass sculptures, fragile furniture pieces"
          value={data.fragileItems}
          onChange={e => set('fragileItems', e.target.value)}
        />
      </div>

      <p className="qm-note">
        *Share details so we can give you the most accurate quote.
      </p>
      {error && <p className="qm-error">{error}</p>}
    </div>
  )
}

// ── Result screen ─────────────────────────────────────────────────────────
function Result({ quote, data, onClose }) {
  return (
    <div className="qm-result">
      <span className="qm-result__emoji" aria-hidden="true">🎉</span>
      <p className="qm-result__ref">Quote {quote.ref}</p>
      <p className="qm-result__amount">{quote.formatted}</p>
      <p className="qm-result__est">Estimated cost for your move</p>

      <ul className="qm-result__list" aria-label="Move summary">
        <li><span>From</span><span>{data.fromLocation}</span></li>
        <li><span>To</span><span>{data.toLocation}</span></li>
        <li><span>Type</span><span>{MOVE_LABELS[data.moveType] ?? data.moveType}</span></li>
        <li><span>Date</span><span>{quote.dateLabel}</span></li>
      </ul>

      <p className="qm-result__mail">
        {"We've sent the full breakdown to "}
        <strong>{data.email}</strong>
      </p>

      <div className="qm-result__actions">
        <button className="qm-btn qm-btn--submit">Book This Move</button>
        <button className="qm-btn qm-btn--ghost" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
