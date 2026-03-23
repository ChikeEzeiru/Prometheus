import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import '../styles/Services.css'

// ── Icons ──────────────────────────────────────────────────
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2.5 7.5L10 2.5l7.5 5V17.5a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V7.5z" stroke="#344054" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7.5 18.5v-6h5v6" stroke="#344054" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="3" width="10" height="15" rx="1" stroke="#344054" strokeWidth="1.5"/>
      <path d="M12 7h4a1 1 0 0 1 1 1v10H12V7z" stroke="#344054" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 7h4M5 10h4M5 13h4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function GlassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 2h8l-2 7H8L6 2z" stroke="#344054" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 9c0 2 2 4 2 4s2-2 2-4" stroke="#344054" strokeWidth="1.5"/>
      <path d="M10 13v4M7.5 17h5" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="5" width="12" height="9" rx="1" stroke="#344054" strokeWidth="1.5"/>
      <path d="M13 8h4l2 4v2h-6V8z" stroke="#344054" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="4.5" cy="15.5" r="1.5" stroke="#344054" strokeWidth="1.5"/>
      <circle cx="15.5" cy="15.5" r="1.5" stroke="#344054" strokeWidth="1.5"/>
    </svg>
  )
}

// ── Tab data ────────────────────────────────────────────────
const TABS = [
  {
    id: 'home-relocation',
    label: 'Full Home Relocation',
    shortLabel: 'Home',
    icon: <HomeIcon />,
    heading: 'Move your entire home without lifting a finger',
    body: "We are insured, and our crew handles beds, generators and large electronics with 'jaga-jaga road' proof packaging",
    cta: 'Start Your Move',
    image: '/images/services-home-relocation.avif',
    imageAlt: 'Woman sitting happily among moving boxes',
  },
  {
    id: 'commercial-relocation',
    label: 'Commercial Relocation',
    shortLabel: 'Office',
    icon: <BuildingIcon />,
    heading: 'Move in one weekend, open on Monday like nothing happened',
    body: 'We relocate offices, shops and warehouses, with specialized handling for furniture & equipment, sensitive documents, tech & delicate signage',
    cta: 'Book a Call',
    image: '/images/services-commercial-relocation.avif',
    imageAlt: 'Worker moving boxes with a dolly at a warehouse',
  },
  {
    id: 'fragile-packaging',
    label: 'Fragile Items Packaging',
    shortLabel: 'Fragile',
    icon: <GlassIcon />,
    heading: 'Priceless family heirlooms?',
    body: 'Our triple layer packaging ensures that your fragile items survive even the highest bumps and the deepest potholes',
    cta: 'Get a "No Break" Guarantee',
    image: '/images/services-fragile-packaging.avif',
    imageAlt: 'Person carefully packing fragile glassware',
  },
  {
    id: 'truck-rentals',
    label: 'Moving Truck Rentals',
    shortLabel: 'Trucks',
    icon: <TruckIcon />,
    heading: 'Need just wheels and muscle?',
    body: 'Our variety of trucks and veteran "Power Mike" crew are available for same state & Interstate runs, as well as "One-Load" moves',
    cta: 'Book a Truck',
    image: '/images/services-truck-rentals.avif',
    imageAlt: 'Two movers sitting in the back of a moving truck',
  },
]

// ── Component ───────────────────────────────────────────────
export default function Services({ pendingServiceTab, onTabActivated }) {
  const [activeId,  setActiveId]  = useState(TABS[0].id)
  const [direction, setDirection] = useState('next') // 'next' = slide from right, 'prev' = slide from left
  const active = TABS.find(t => t.id === activeId)

  // Sliding tab indicator
  const tabRefs  = useRef([])
  const [sliderStyle, setSliderStyle] = useState({})

  useLayoutEffect(() => {
    const idx = TABS.findIndex(t => t.id === activeId)
    const el  = tabRefs.current[idx]
    if (el) setSliderStyle({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeId])

  // Deep-link from the nav dropdown: activate the requested tab then scroll here
  useEffect(() => {
    if (!pendingServiceTab) return
    const oldIdx = TABS.findIndex(t => t.id === activeId)
    const newIdx = TABS.findIndex(t => t.id === pendingServiceTab)
    setDirection(newIdx >= oldIdx ? 'next' : 'prev')
    setActiveId(pendingServiceTab)
    // Small delay lets React paint the home page before we scroll
    setTimeout(() => {
      document.getElementById('services-section')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    onTabActivated?.()
  }, [pendingServiceTab])

  // Tab click: determine slide direction from relative position
  function selectTab(id) {
    if (id === activeId) return
    const oldIdx = TABS.findIndex(t => t.id === activeId)
    const newIdx = TABS.findIndex(t => t.id === id)
    setDirection(newIdx > oldIdx ? 'next' : 'prev')
    setActiveId(id)
  }

  return (
    <section id="services-section" className="section services" aria-labelledby="services-heading">
      <div className="container">

        {/* ── Section header ── */}
        <div className="services__header">
          <span className="services__eyebrow">Our Services</span>
          <h2 id="services-heading" className="services__heading">
            Trusted movers of Nigerian families &amp; businesses for a decade
          </h2>
          <p className="services__subheading">
            Join 2000+ smart movers who switched to stress-free relocations. Why us?
          </p>
        </div>

        {/* ── Tab bar ── */}
        <div className="services__tabs" role="tablist" aria-label="Service categories">
          {/* Sliding highlight — positioned behind tab text */}
          <div className="services__tab-slider" style={sliderStyle} aria-hidden="true" />

          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              role="tab"
              ref={el => tabRefs.current[i] = el}
              className={`services__tab ${activeId === tab.id ? 'services__tab--active' : ''}`}
              aria-selected={activeId === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => selectTab(tab.id)}
            >
              <span className="services__tab-label">{tab.label}</span>
              <span className="services__tab-label-short">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* ── Tab content — key forces remount on change so animation reruns ── */}
        <div
          key={activeId}
          id={`tabpanel-${active.id}`}
          role="tabpanel"
          className={`services__content services__content--${direction}`}
        >
          {/* Left card */}
          <div className="services__card">
            <div className="services__card-icon" aria-hidden="true">
              {active.icon}
            </div>
            <h3 className="services__card-heading">{active.heading}</h3>
            <p className="services__card-body">{active.body}</p>
            <button className="services__card-cta">{active.cta}</button>
          </div>

          {/* Right image */}
          <div className="services__image-wrap">
            <img
              src={active.image}
              alt={active.imageAlt}
              className="services__image"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
