// =========================================================
// CONTACT PAGE
// Standalone page: contact info panel + enquiry form.
// Navigated to from the "Contact Us" nav link.
// =========================================================

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import Footer from './Footer'
import Toast  from './Toast'
import '../styles/Contact.css'

// ── EmailJS config ────────────────────────────────────────
const EJS_SERVICE  = 'service_gf2gome'
const EJS_TEMPLATE = 'template_contact'   // create this template in your EmailJS dashboard
const EJS_KEY      = 'cg9OTYK9yGg73ksYv'

// ── Icons ─────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.5 4.5C3.5 3.95 3.95 3.5 4.5 3.5H6.5L8 7.5L6.5 8.5C7.328 10.172 9.328 12.172 11 13L12 11.5L16 13V15C16 15.55 15.55 16 15 16C8.925 16 4 11.075 4 5C4 4.725 4.225 4.5 4.5 4.5H3.5Z"
        stroke="#F63D68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="4.5" width="16" height="11" rx="1.5"
        stroke="#F63D68" strokeWidth="1.5"/>
      <path d="M2 7l8 5 8-5"
        stroke="#F63D68" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 2C7.239 2 5 4.239 5 7c0 4 5 11 5 11s5-7 5-11c0-2.761-2.239-5-5-5z"
        stroke="#F63D68" strokeWidth="1.5"/>
      <circle cx="10" cy="7" r="1.5"
        stroke="#F63D68" strokeWidth="1.5"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5"
        stroke="#F63D68" strokeWidth="1.5"/>
      <path d="M10 6.5V10.5L13 12"
        stroke="#F63D68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Contact info items ────────────────────────────────────
const INFO_ITEMS = [
  {
    icon:    <PhoneIcon />,
    label:   'Phone',
    value:   '+234 800 000 0000',
    href:    'tel:+2348000000000',
  },
  {
    icon:    <MailIcon />,
    label:   'Email',
    value:   'hello@prometheus-moving.com',
    href:    'mailto:hello@prometheus-moving.com',
  },
  {
    icon:    <MapPinIcon />,
    label:   'Location',
    value:   'Lagos, Nigeria',
    href:    null,
  },
  {
    icon:    <ClockIcon />,
    label:   'Working Hours',
    value:   'Mon – Sat, 8 am – 6 pm',
    href:    null,
  },
]

// ── Reusable field wrapper ────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="cp-field">
      <label className="cp-label">
        {label}
        {required && <span className="cp-required" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  )
}

// =========================================================
// ContactPage
// =========================================================
export default function ContactPage() {
  const [form, setForm] = useState({
    name:    '',
    email:   '',
    phone:   '',
    subject: '',
    message: '',
  })
  const [sending,   setSending]   = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error,     setError]     = useState('')

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:    form.name,
          from_email:   form.email,
          from_phone:   form.phone,
          subject:      form.subject,
          message:      form.message,
        },
        EJS_KEY,
      )
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setShowToast(true)
    } catch {
      setError("We couldn't send your message right now. Please try again or reach us directly by phone.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="cp-page">
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Message received!"
        message="Thanks for reaching out — our team will get back to you within a few hours."
      />

      {/* ── Page header ── */}
      <div className="cp-header">
        <div className="container">
          <span className="cp-eyebrow">Get In Touch</span>
          <h1 className="cp-heading">We'd love to hear from you</h1>
          <p className="cp-subheading">
            Have a question, need a quote, or just want to say hello?
            Our team is ready to help — usually within a few hours.
          </p>
        </div>
      </div>

      {/* ── Body: info + form ── */}
      <section className="cp-body">
        <div className="container cp-body__inner">

          {/* ── Left: contact info ── */}
          <aside className="cp-info" aria-label="Contact information">
            {INFO_ITEMS.map(({ icon, label, value, href }) => (
              <div key={label} className="cp-info__item">
                <div className="cp-info__icon" aria-hidden="true">{icon}</div>
                <div className="cp-info__text">
                  <p className="cp-info__label">{label}</p>
                  {href ? (
                    <a className="cp-info__value cp-info__value--link" href={href}>{value}</a>
                  ) : (
                    <p className="cp-info__value">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </aside>

          {/* ── Right: enquiry form ── */}
          <div className="cp-form-wrap">
            <form className="cp-form" onSubmit={handleSubmit} noValidate>

                {/* Row 1: Name + Email */}
                <div className="cp-form-row">
                  <Field label="Full Name" required>
                    <input
                      className="cp-input"
                      type="text"
                      placeholder="e.g. Chidi Okafor"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email Address" required>
                    <input
                      className="cp-input"
                      type="email"
                      placeholder="e.g. chidi@email.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </Field>
                </div>

                {/* Row 2: Phone + Subject */}
                <div className="cp-form-row">
                  <Field label="Phone Number">
                    <input
                      className="cp-input"
                      type="tel"
                      placeholder="e.g. +234 800 000 0000"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Subject">
                    <input
                      className="cp-input"
                      type="text"
                      placeholder="e.g. Moving quote inquiry"
                      value={form.subject}
                      onChange={e => set('subject', e.target.value)}
                    />
                  </Field>
                </div>

                {/* Message */}
                <Field label="Message" required>
                  <textarea
                    className="cp-textarea"
                    placeholder="Tell us about your move, any questions you have, or how we can help…"
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    required
                    rows={6}
                  />
                </Field>

                {/* Error */}
                {error && <p className="cp-error" role="alert">{error}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  className="cp-submit"
                  disabled={sending}
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </button>

            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
