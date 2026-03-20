// =========================================================
// BOOKING PAGE
// Pre-fills from sessionStorage quote, lets users review &
// edit each section before confirming the booking.
//
// Sections: Locations | Move Details | Contact Info | Extras
// Flow: brief loading screen → editable summary → confirm
// =========================================================

import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import LocationCombobox from './LocationCombobox'
import '../styles/BookingPage.css'

// ── EmailJS config ────────────────────────────────────────────────────────────
const EJS_SERVICE          = 'service_gf2gome'
const EJS_BOOKING_TEMPLATE = 'template_booking'   // create this in your EmailJS dashboard
const EJS_KEY              = 'cg9OTYK9yGg73ksYv'

// ── Label maps (mirrors QuoteModal) ──────────────────────────────────────────
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

const TIME_SLOTS = [
  '7 am – 10 am',
  '10 am – 1 pm',
  '1 pm – 4 pm',
  '4 pm – 7 pm',
]

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M13 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7L13 2z"
        stroke="#1F2A37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 2v5h5M9 13h4M9 9h4"
        stroke="#1F2A37" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M10.5 2a1.414 1.414 0 0 1 2 2L4.5 12H2.5v-2L10.5 2z"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SaveIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 1.5v4h6v-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="4.5" y="8.5" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M11.5 3.5l-8 8M3.5 3.5l8 8"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg className="bp-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#9CA3AF" strokeWidth="1.25" />
      <path d="M1.5 6l6.5 4 6.5-4" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="bp-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="#9CA3AF" strokeWidth="1.2" />
      <text x="7" y="10.5" textAnchor="middle" fontSize="8"
        fill="#9CA3AF" fontFamily="Inter, sans-serif" fontWeight="600">?</text>
    </svg>
  )
}

function LoadingSpinner() {
  return (
    <svg className="bp-spinner" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Loading">
      <circle cx="14" cy="14" r="11" stroke="#E5E7EB" strokeWidth="3" />
      <path d="M14 3a11 11 0 0 1 11 11" stroke="#1F2A37" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, editing, onEdit, onSave, onCancel, children }) {
  return (
    <div className={`bp-section${editing ? ' bp-section--editing' : ''}`}>
      <div className="bp-section__head">
        <h2 className="bp-section__title">{title}</h2>
        <div className="bp-section__actions">
          {editing ? (
            <>
              <button className="bp-icon-btn" onClick={onCancel} aria-label="Cancel">
                <XIcon />
              </button>
              <button className="bp-icon-btn bp-icon-btn--save" onClick={onSave} aria-label="Save">
                <SaveIcon />
              </button>
            </>
          ) : (
            <button className="bp-icon-btn" onClick={onEdit} aria-label={`Edit ${title}`}>
              <PencilIcon />
            </button>
          )}
        </div>
      </div>
      <div className="bp-section__body">{children}</div>
    </div>
  )
}

// ── View row ──────────────────────────────────────────────────────────────────
function ViewRow({ label, value, required }) {
  return (
    <div className="bp-view-row">
      <p className="bp-view-row__label">
        {label}
        {required && <span className="bp-req" aria-hidden="true"> *</span>}
      </p>
      <p className="bp-view-row__value">{value}</p>
    </div>
  )
}

// ── Finds the first section that still has an empty required field ────────────
function firstIncompleteSection(d) {
  if (!d.fromLocation || !d.toLocation)     return 'locations'
  if (!d.moveType || !d.spaceType || !d.moveDate) return 'move'
  if (!d.name || !d.phone || !d.email)      return 'contact'
  if (!d.needsPackaging || !d.fragileItems) return 'extras'
  return null
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BookingPage({ onBack }) {
  const [ready,    setReady]    = useState(false)   // false = loading screen
  const [info,     setInfo]     = useState(null)    // committed data
  const [draft,    setDraft]    = useState({})      // in-progress edits
  const [editing,  setEditing]  = useState(null)    // 'locations'|'move'|'contact'|'extras'
  const [booked,   setBooked]   = useState(false)
  const [sending,  setSending]  = useState(false)
  const [bookErr,  setBookErr]  = useState('')

  useEffect(() => {
    const raw  = sessionStorage.getItem('prometheus_quote')
    const base = raw ? JSON.parse(raw) : {}
    const full = {
      fromLocation:   base.fromLocation   ?? '',
      toLocation:     base.toLocation     ?? '',
      moveType:       base.moveType       ?? '',
      spaceType:      base.spaceType      ?? '',
      moveDate:       base.moveDate       ?? '',
      timeSlot:       '',
      name:           base.name           ?? '',
      phone:          base.phone          ?? '',
      email:          base.email          ?? '',
      needsPackaging: base.needsPackaging ?? '',
      fragileItems:   base.fragileItems   ?? '',
      specialNotes:   '',
      quoteRef:       base.quoteRef       ?? '',
    }
    setInfo(full)
    setDraft(full)
    // Brief loading screen then open the first section that needs filling
    const t = setTimeout(() => {
      setReady(true)
      setEditing(firstIncompleteSection(full))
    }, 1600)
    return () => clearTimeout(t)
  }, [])

  function startEdit(section) {
    setDraft({ ...info })
    setEditing(section)
  }
  function saveEdit() {
    const saved = { ...draft }
    setInfo(saved)
    // Auto-advance to the next section that still needs filling
    const next = firstIncompleteSection(saved)
    setEditing(next)
  }
  function cancelEdit() { setDraft({ ...info }); setEditing(null) }
  function set(key, val) { setDraft(d => ({ ...d, [key]: val })) }

  // ── Book handler – sends confirmation email then shows success ───────────
  async function handleBook() {
    setSending(true)
    setBookErr('')
    try {
      const moveDateDisplay = [formatDate(info.moveDate), info.timeSlot]
        .filter(Boolean).join(',  ')

      await emailjs.send(
        EJS_SERVICE,
        EJS_BOOKING_TEMPLATE,
        {
          to_name:        info.name,
          to_email:       info.email,
          from_location:  info.fromLocation || '—',
          to_location:    info.toLocation   || '—',
          move_type:      MOVE_LABELS[info.moveType]   ?? info.moveType   ?? '—',
          space_type:     SPACE_LABELS[info.spaceType] ?? info.spaceType  ?? '—',
          move_date:      moveDateDisplay || '—',
          packaging:      info.needsPackaging === 'yes' ? 'Yes'
                          : info.needsPackaging === 'no' ? 'No'
                          : info.needsPackaging || '—',
          fragile_items:  info.fragileItems  || 'None',
          special_notes:  info.specialNotes  || 'None',
          phone:          info.phone         || '—',
          quote_ref:      info.quoteRef      || '—',
        },
        { publicKey: EJS_KEY },
      )
      setBooked(true)
    } catch {
      setBookErr("We couldn't send your confirmation right now. Please try again.")
    } finally {
      setSending(false)
    }
  }

  // ── Booked confirmation ──────────────────────────────────────────────────
  if (booked) {
    return (
      <div className="bp-page">
        <div className="bp-container bp-container--center">
          <span className="bp-done__emoji" aria-hidden="true">🎉</span>
          <h2 className="bp-done__title">Booking request sent!</h2>
          <p className="bp-done__sub">
            {"We'll be in touch shortly to confirm your move details."}
          </p>
          <button className="bp-cta" onClick={onBack}>Back to home</button>
        </div>
      </div>
    )
  }

  // ── Loading screen ───────────────────────────────────────────────────────
  if (!ready) {
    return (
      <div className="bp-page">
        <div className="bp-container bp-container--center">
          <div className="bp-loading__icon">
            <LoadingSpinner />
          </div>
          <p className="bp-loading__title">Setting up your booking details…</p>
          <p className="bp-loading__sub">This will only take a minute or two</p>
        </div>
      </div>
    )
  }

  // ── No data fallback ─────────────────────────────────────────────────────
  if (!info) {
    return (
      <div className="bp-page">
        <div className="bp-container bp-container--center">
          <p className="bp-done__sub">No booking details found.</p>
          <button className="bp-cta" onClick={onBack}>Return home</button>
        </div>
      </div>
    )
  }

  const moveDateDisplay = [formatDate(info.moveDate), info.timeSlot]
    .filter(Boolean).join(',  ')

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div className="bp-page">
      <div className="bp-container">

        {/* Page header */}
        <div className="bp-page-header">
          <div className="bp-page-header__icon" aria-hidden="true">
            <DocIcon />
          </div>
          <div>
            <h1 className="bp-page-header__title">Booking details</h1>
            <p className="bp-page-header__sub">
              Confirm the details below or make final changes to book your move
            </p>
          </div>
        </div>

        <hr className="bp-hr" />

        {/* ── Locations ──────────────────────────────────────────────── */}
        <Section
          title="Locations"
          editing={editing === 'locations'}
          onEdit={() => startEdit('locations')}
          onSave={saveEdit}
          onCancel={cancelEdit}
        >
          {editing === 'locations' ? (
            <div className="bp-fields">
              <div className="bp-field">
                <label className="bp-label">Moving from</label>
                <LocationCombobox
                  placeholder="e.g. Gbagada"
                  value={draft.fromLocation}
                  onChange={v => set('fromLocation', v)}
                />
              </div>
              <div className="bp-field">
                <label className="bp-label">Moving to</label>
                <LocationCombobox
                  placeholder="e.g. Victoria Island"
                  value={draft.toLocation}
                  onChange={v => set('toLocation', v)}
                />
              </div>
            </div>
          ) : (
            <div className="bp-view">
              <ViewRow label="You are moving from:" value={info.fromLocation || '—'} required />
              <ViewRow label="You are moving to:"   value={info.toLocation   || '—'} required />
            </div>
          )}
        </Section>

        {/* ── Move details ───────────────────────────────────────────── */}
        <Section
          title="Move details"
          editing={editing === 'move'}
          onEdit={() => startEdit('move')}
          onSave={saveEdit}
          onCancel={cancelEdit}
        >
          {editing === 'move' ? (
            <div className="bp-fields">
              <div className="bp-field">
                <label className="bp-label">Type of move <span className="bp-req">*</span></label>
                <div className="bp-sel-wrap">
                  <select
                    className={`bp-sel${!draft.moveType ? ' bp-sel--empty' : ''}`}
                    value={draft.moveType}
                    onChange={e => set('moveType', e.target.value)}
                  >
                    <option value="" disabled>Select move type</option>
                    <option value="home-relocation">Home Relocation</option>
                    <option value="office-relocation">Office Relocation</option>
                    <option value="fragile-items">Fragile Items</option>
                    <option value="truck-rentals">Truck Rentals</option>
                  </select>
                  <ChevronIcon />
                </div>
              </div>
              <div className="bp-field">
                <label className="bp-label">Space type <span className="bp-req">*</span></label>
                <div className="bp-sel-wrap">
                  <select
                    className={`bp-sel${!draft.spaceType ? ' bp-sel--empty' : ''}`}
                    value={draft.spaceType}
                    onChange={e => set('spaceType', e.target.value)}
                  >
                    <option value="" disabled>Select space type</option>
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
              <div className="bp-field">
                <label className="bp-label">Move date <span className="bp-req">*</span></label>
                <input
                  type="date"
                  className={`bp-sel${!draft.moveDate ? ' bp-sel--empty' : ''}`}
                  value={draft.moveDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => set('moveDate', e.target.value)}
                />
              </div>
              <div className="bp-field">
                <label className="bp-label">Preferred time slot</label>
                <div className="bp-sel-wrap">
                  <select
                    className={`bp-sel${!draft.timeSlot ? ' bp-sel--empty' : ''}`}
                    value={draft.timeSlot}
                    onChange={e => set('timeSlot', e.target.value)}
                  >
                    <option value="">Select a time slot (optional)</option>
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className="bp-view">
              <ViewRow
                label="The move is a:"
                value={MOVE_LABELS[info.moveType] ?? info.moveType ?? '—'}
                required
              />
              <ViewRow
                label="You are moving to a:"
                value={SPACE_LABELS[info.spaceType] ?? info.spaceType ?? '—'}
                required
              />
              <ViewRow
                label="You are moving on:"
                value={moveDateDisplay || '—'}
                required
              />
            </div>
          )}
        </Section>

        {/* ── Contact info ───────────────────────────────────────────── */}
        <Section
          title="Contact Info"
          editing={editing === 'contact'}
          onEdit={() => startEdit('contact')}
          onSave={saveEdit}
          onCancel={cancelEdit}
        >
          {editing === 'contact' ? (
            <div className="bp-fields">
              <div className="bp-field">
                <label className="bp-label">Full name <span className="bp-req">*</span></label>
                <input
                  type="text"
                  className="bp-input"
                  placeholder="e.g. Ciroma Adekunle"
                  value={draft.name}
                  onChange={e => set('name', e.target.value)}
                />
              </div>
              <div className="bp-field">
                <label className="bp-label">
                  Phone number <span className="bp-req">*</span>
                </label>
                <div className="bp-input-wrap">
                  <MessageIcon />
                  <input
                    type="tel"
                    className="bp-input bp-input--icon"
                    placeholder="e.g. +234 801 234 5678"
                    value={draft.phone}
                    onChange={e => set('phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="bp-field">
                <label className="bp-label">
                  Email address <span className="bp-req">*</span>
                </label>
                <div className="bp-input-wrap">
                  <MessageIcon />
                  <input
                    type="email"
                    className="bp-input bp-input--icon"
                    placeholder="e.g. you@example.com"
                    value={draft.email}
                    onChange={e => set('email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bp-view">
              <ViewRow label="Contact person is:" value={info.name  || '—'} required />
              <ViewRow label="Your phone number is:" value={info.phone || '—'} required />
              <ViewRow label="Your email is:" value={info.email || '—'} required />
            </div>
          )}
        </Section>

        {/* ── Extras ─────────────────────────────────────────────────── */}
        <Section
          title="Extras"
          editing={editing === 'extras'}
          onEdit={() => startEdit('extras')}
          onSave={saveEdit}
          onCancel={cancelEdit}
        >
          {editing === 'extras' ? (
            <div className="bp-fields">
              <div className="bp-field">
                <label className="bp-label">
                  Do you need extra packaging for the items to be moved?{' '}
                  <span className="bp-req">*</span>
                </label>
                <div className="bp-input-wrap">
                  <MessageIcon />
                  <input
                    type="text"
                    className="bp-input bp-input--icon"
                    placeholder="Please answer yes or no"
                    value={
                      draft.needsPackaging === 'yes' ? 'Yes'
                      : draft.needsPackaging === 'no'  ? 'No'
                      : draft.needsPackaging
                    }
                    onChange={e => set('needsPackaging', e.target.value.toLowerCase())}
                  />
                </div>
              </div>
              <div className="bp-field">
                <label className="bp-label">
                  Any fragile items we should know about?{' '}
                  <span className="bp-req">*</span>
                </label>
                <div className="bp-input-wrap">
                  <MessageIcon />
                  <input
                    type="text"
                    className="bp-input bp-input--icon"
                    placeholder="e.g. heirlooms, glass objects"
                    value={draft.fragileItems}
                    onChange={e => set('fragileItems', e.target.value)}
                  />
                </div>
              </div>
              <div className="bp-field">
                <label className="bp-label">
                  Anything special we should know?{' '}
                  <span className="bp-req">*</span>
                  <span
                    className="bp-tooltip"
                    tabIndex={0}
                    aria-label="E.g. narrow stairs, no elevator, or parking restrictions"
                  >
                    <QuestionIcon />
                    <span className="bp-tooltip__bubble" role="tooltip">
                      E.g. narrow stairs, no elevator, or parking restrictions
                    </span>
                  </span>
                </label>
                <textarea
                  className="bp-textarea"
                  placeholder="e.g. narrow stairs, parking restrictions"
                  value={draft.specialNotes}
                  onChange={e => set('specialNotes', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="bp-view">
              <ViewRow
                label="Extra packaging:"
                value={
                  info.needsPackaging === 'yes' ? 'Yes'
                  : info.needsPackaging === 'no'  ? 'No'
                  : info.needsPackaging || '—'
                }
              />
              <ViewRow label="Fragile items:"   value={info.fragileItems  || 'None'} />
              <ViewRow label="Special notes:"   value={info.specialNotes  || 'None'} />
            </div>
          )}
        </Section>

        {/* Book CTA */}
        <div className="bp-footer">
          {bookErr && <p className="bp-book-err">{bookErr}</p>}
          <button className="bp-cta" onClick={handleBook} disabled={sending}>
            {sending ? 'Sending…' : 'Book My Move'}
          </button>
        </div>

      </div>
    </div>
  )
}
