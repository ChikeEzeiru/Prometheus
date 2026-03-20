// =========================================================
// LOCATION COMBOBOX
// Autocomplete text input that matches Lagos, Nigeria
// locations as the user types, showing the top 3 results.
// Supports click-to-select, keyboard navigation (↑ ↓ Enter
// Escape), and closes when clicking outside.
// =========================================================

import React, { useState, useRef, useEffect } from 'react'

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3 4.5 8.5 4.5 8.5S12.5 9 12.5 6A4.5 4.5 0 0 0 8 1.5z"
        stroke="#9ca3af" strokeWidth="1.25" strokeLinejoin="round"/>
      <circle cx="8" cy="6" r="1.5" stroke="#9ca3af" strokeWidth="1.25"/>
    </svg>
  )
}

// ── Curated list of Lagos neighbourhoods & areas ──────────
const LAGOS_LOCATIONS = [
  'Abraham Adesanya Estate', 'Abule-Ado', 'Abule-Egba', 'Agbado',
  'Agege', 'Ajegunle', 'Ajah', 'Ajao Estate', 'Akowonjo',
  'Alapere', 'Alaka Estate', 'Alagbado', 'Alagomeji', 'Alimosho',
  'Allen Avenue', 'Amukoko', 'Amuwo-Odofin', 'Anthony Village', 'Apapa',
  'Awoyaya', 'Ayobo', 'Badagry', 'Banana Island', 'Bariga',
  'Berger', 'Bode Thomas', 'Bourdillon', 'Cement Bus Stop', 'Cele',
  'Chevron Drive', 'Costain', 'Dolphin Estate', 'Dopemu', 'Ebute Metta',
  'Egbeda', 'Ejigbo', 'Eleganza', 'Eleko', 'Epe',
  'Epetedo', 'Fadeyi', 'Festac Town', 'GRA Ikeja', 'Gbagada',
  'Idimu', 'Igando', 'Igbo Efon', 'Igbobi', 'Iganmu',
  'Ijaye', 'Ijesha', 'Ikoyi', 'Ikorodu', 'Ikosi-Ketu',
  'Ikeja', 'Ilasamaja', 'Ilupeju', 'Ipaja', 'Isale Eko',
  'Isolo', 'Itire', 'Iwaya', 'Iyana-Ipaja', 'Jakande Estate',
  'Jibowu', 'Ketu', 'Kosofe', 'Ladipo', 'Lagos Island',
  'Lagos Mainland', 'Lawanson', 'Lekki Phase 1', 'Lekki Phase 2',
  'Magodo', 'Mafoluku', 'Makoko', 'Maryland', 'Meiran',
  'Mende', 'Mile 2', 'Mile 12', 'Mosan-Okunola', 'Mushin',
  'New GRA', 'Obele', 'Ogba', 'Ogudu', 'Ojodu Berger',
  'Ojokoro', 'Ojota', 'Ojuelegba', 'Ojuwoye', 'Okota',
  'Old GRA', 'Omole Phase 1', 'Omole Phase 2', 'Onipanu', 'Oregun',
  'Orile', 'Osapa London', 'Osborne', 'Oshodi', 'Owode-Onirin',
  'Oworonsoki', 'Palm Grove', 'Parkview Estate', 'Pen Cinema',
  'Redemption Camp', 'Sagamu Road', 'Sangotedo', 'Satellite Town',
  'Shomolu', 'Soluyi', 'Surulere', 'Tejuosho', 'Thomas Estate',
  'Tolu', 'Trade Fair Complex', 'VGC', 'Victoria Garden City',
  'Victoria Island', 'Yaba', 'Ifako-Ijaiye',
]

// Prioritise entries that start with the query over ones that
// merely contain it, then cap at 3 results.
function getSuggestions(query) {
  if (query.trim().length < 2) return []
  const lower = query.toLowerCase()
  const startsWith = LAGOS_LOCATIONS.filter(l => l.toLowerCase().startsWith(lower))
  const contains   = LAGOS_LOCATIONS.filter(l =>
    !l.toLowerCase().startsWith(lower) && l.toLowerCase().includes(lower)
  )
  return [...startsWith, ...contains].slice(0, 3)
}

// =========================================================
// Component
// Props:
//   id          – ties to the <label htmlFor> in the parent
//   placeholder – input placeholder text
//   value       – controlled value from parent state
//   onChange    – called with the new string on every change
// =========================================================
export default function LocationCombobox({ id, placeholder, value, onChange }) {
  const [query,      setQuery]      = useState(value ?? '')
  const [suggestions, setSuggestions] = useState([])
  const [open,       setOpen]       = useState(false)
  const [activeIdx,  setActiveIdx]  = useState(-1)

  const wrapperRef = useRef(null)
  const inputRef   = useRef(null)

  // ── Sync internal query when the parent programmatically sets a value ──
  // (e.g. when the QuoteModal pre-fills from the hero form on open)
  useEffect(() => {
    setQuery(value ?? '')
  }, [value])

  // ── Close when user clicks outside ──
  useEffect(() => {
    function onPointerDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // ── Handle keystroke in the text input ──
  function handleChange(e) {
    const q = e.target.value
    setQuery(q)
    onChange(q)
    const matches = getSuggestions(q)
    setSuggestions(matches)
    setOpen(matches.length > 0)
    setActiveIdx(-1)
  }

  // ── Pick a suggestion ──
  function pick(location) {
    setQuery(location)
    onChange(location)
    setSuggestions([])
    setOpen(false)
    inputRef.current?.focus()
  }

  // ── Keyboard navigation ──
  function handleKeyDown(e) {
    if (!open) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIdx(i => Math.max(i - 1, -1))
        break
      case 'Enter':
        if (activeIdx >= 0) {
          e.preventDefault()
          pick(suggestions[activeIdx])
        }
        break
      case 'Escape':
        setOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div className="location-combobox" ref={wrapperRef}>
      {/* ── Input row (matches hero__input-wrapper visually) ── */}
      <div className="hero__input-wrapper location-combobox__trigger">
        <PinIcon />
        <input
          ref={inputRef}
          id={id}
          type="text"
          className="hero__input"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck="false"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-required="true"
        />
      </div>

      {/* ── Suggestions dropdown ── */}
      {open && (
        <ul className="location-combobox__suggestions" role="listbox">
          {suggestions.map((loc, i) => (
            <li
              key={loc}
              role="option"
              aria-selected={i === activeIdx}
              className={
                'location-combobox__option' +
                (i === activeIdx ? ' location-combobox__option--active' : '')
              }
              onMouseDown={() => pick(loc)}
            >
              <span className="location-combobox__option-pin" aria-hidden="true">
                <PinIcon />
              </span>
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
