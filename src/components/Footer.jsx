// =========================================================
// FOOTER
// =========================================================

import React from 'react'
import '../styles/Footer.css'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1.5 4.5A1.5 1.5 0 0 1 3 3h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 15 15H3a1.5 1.5 0 0 1-1.5-1.5v-9z"
        stroke="#9DA4AE" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M1.5 4.5 9 10l7.5-5.5"
        stroke="#9DA4AE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const NAV_LINKS = [
  { href: '#relocation', label: 'Relocation' },
  { href: '#storage',    label: 'Storage'    },
  { href: '#blog',       label: 'Blog'       },
  { href: '#contact',    label: 'Contact Us' },
]

const SOCIAL_LINKS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Facebook'  },
  { href: '#', label: 'X'         },
]

const LEGAL_LINKS = [
  { href: '#', label: 'Terms of Use'   },
  { href: '#', label: 'Privacy Policy' },
]

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">

        {/* ── Top: logo left | tagline + form right ── */}
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" aria-label="Prometheus home">
              <img src="/footer-logomark.svg" className="footer__logomark" alt="Prometheus logomark" />
            </a>
          </div>

          <div className="footer__intro">
            <p className="footer__tagline">
              More than a moving service—we handle memories, businesses, and
              everything in between. From fragile items to truck rentals, we make
              every move secure and simple
            </p>

            <form className="footer__newsletter" onSubmit={e => e.preventDefault()}>
              <div className="footer__input-wrap">
                <MailIcon />
                <input
                  type="email"
                  className="footer__input"
                  placeholder="Get weekly moving tips from our newsletter"
                />
              </div>
              <button type="submit" className="footer__subscribe-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Nav columns (right-aligned) ── */}
        <div className="footer__nav-row">
          <div className="footer__nav-cols">
            <div className="footer__nav-group">
              <h4 className="footer__nav-heading">Navigation</h4>
              <ul>
                {NAV_LINKS.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="footer__nav-link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-heading">Socials</h4>
              <ul>
                {SOCIAL_LINKS.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="footer__nav-link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-heading">Legal</h4>
              <ul>
                {LEGAL_LINKS.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="footer__nav-link">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar: address left | copyright right ── */}
        <div className="footer__bottom">
          <div className="footer__address">
            <span className="footer__address-label">Address</span>
            <p>11 Joel Ogunnaike St, Ikeja,</p>
            <p>Lagos 100281</p>
          </div>
          <p className="footer__copyright">
            Copyright &copy; 2025 by Chike Ezeiru
          </p>
        </div>

      </div>
    </footer>
  )
}
