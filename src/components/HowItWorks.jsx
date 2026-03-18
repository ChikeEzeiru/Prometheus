// =========================================================
// HOW IT WORKS — two-column: steps left, photo right
// =========================================================

import React from 'react'
import '../styles/HowItWorks.css'

const STEPS = [
  {
    number: 1,
    title: 'Book Your Move',
    body: 'Schedule online or by phone in just minutes.',
  },
  {
    number: 2,
    title: 'We Pack & Load',
    body: 'Our team arrives on time & handles everything carefully.',
  },
  {
    number: 3,
    title: 'Safe & Reliable Transport',
    body: 'Your belongings are delivered securely and promptly.',
  },
  {
    number: 4,
    title: 'Settle In',
    body: 'We unload and place your items where you need them.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section how-it-works" aria-labelledby="hiw-heading">
      <div className="container">
        <div className="how-it-works__inner">

          {/* ── Left: header + steps ── */}
          <div className="how-it-works__content">
            <div className="how-it-works__header">
              <span className="how-it-works__eyebrow">Moving Made Simple</span>
              <h2 id="hiw-heading" className="how-it-works__heading">
                Here's how we take the stress out of moving
              </h2>
              <p className="how-it-works__subheading">
                4 simple steps to a stress-free move
              </p>
            </div>

            <ol className="how-it-works__steps">
              {STEPS.map(step => (
                <li key={step.number} className="how-it-works__step">
                  <span className="how-it-works__step-number" aria-hidden="true">
                    {step.number}
                  </span>
                  <div className="how-it-works__step-text">
                    <h3 className="how-it-works__step-title">{step.title}</h3>
                    <p className="how-it-works__step-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Right: photo ── */}
          <div className="how-it-works__image-wrap">
            <img
              src="/images/how-it-works.avif"
              alt="Prometheus movers unloading boxes at a home"
              className="how-it-works__image"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
