// =========================================================
// TOAST — fixed upper-right notification
// Props:
//   show     : boolean — controls visibility
//   onClose  : () => void — called when dismissed
//   title    : string
//   message  : string
//   duration : number (ms) — auto-dismiss delay (default 5000)
// =========================================================

import React, { useEffect } from 'react'
import '../styles/Toast.css'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="9" r="8.25" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.25"/>
      <path d="M5.5 9l2.5 2.5L12.5 6"
        stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13"
        stroke="#9DA4AE" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function Toast({ show, onClose, title, message, duration = 5000 }) {
  // Auto-dismiss
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [show, duration, onClose])

  return (
    <div
      className={`toast${show ? ' toast--visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast__icon"><CheckIcon /></div>

      <div className="toast__body">
        <p className="toast__title">{title}</p>
        <p className="toast__message">{message}</p>
      </div>

      <button
        className="toast__close"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <CloseIcon />
      </button>
    </div>
  )
}
