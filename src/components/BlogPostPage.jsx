// =========================================================
// BLOG POST PAGE
// Renders a single blog post by postId.
// Props:
//   postId  — id string matching a post in BLOG_POSTS
//   onBack  — navigates back to the blog listing
// =========================================================

import React from 'react'
import { BLOG_POSTS, CATEGORY_COLORS } from '../data/blogPosts'
import Footer from './Footer'
import '../styles/Blog.css'

// ── Content block renderer ────────────────────────────────
function renderBlock(block, i) {
  switch (block.type) {
    case 'lead':
      return <p key={i} className="post-lead">{block.text}</p>

    case 'p':
      return <p key={i} className="post-p">{block.text}</p>

    case 'h2':
      return <h2 key={i} className="post-h2">{block.text}</h2>

    case 'ul':
      return (
        <ul key={i} className="post-ul">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol key={i} className="post-ol">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      )

    case 'callout':
      return (
        <div key={i} className="post-callout">
          <p>{block.text}</p>
        </div>
      )

    default:
      return null
  }
}

// ── Back chevron icon ─────────────────────────────────────
function ChevronLeftIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// =========================================================
// BlogPostPage
// =========================================================
export default function BlogPostPage({ postId, onBack }) {
  const post = BLOG_POSTS.find(p => p.id === postId)

  // Fallback if post not found
  if (!post) {
    return (
      <div className="post-page">
        <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
            Post not found.{' '}
            <button
              onClick={onBack}
              style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', textDecoration: 'underline' }}
            >
              Back to blog
            </button>
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  // Truncate title for breadcrumb
  const shortTitle = post.title.length > 48
    ? post.title.slice(0, 48).trimEnd() + '…'
    : post.title

  return (
    <div className="post-page">

      {/* ── Breadcrumb ── */}
      <div className="container">
        <nav className="post-breadcrumb" aria-label="Breadcrumb">
          <button
            className="post-breadcrumb__link"
            onClick={onBack}
          >
            Blog
          </button>
          <span className="post-breadcrumb__sep" aria-hidden="true">/</span>
          <span className="post-breadcrumb__current" aria-current="page">
            {shortTitle}
          </span>
        </nav>
      </div>

      {/* ── Post header ── */}
      <div className="container">
        <header className="post-header">
          <span
            className="blog-category"
            style={{ '--cat-color': CATEGORY_COLORS[post.category] ?? '#6C737F' }}
          >{post.category}</span>
          <h1>{post.title}</h1>
          <div className="post-meta" aria-label="Post metadata">
            <span>{post.date}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </header>
      </div>

      {/* ── Cover image ── */}
      <div className="post-cover">
        <img src={post.coverImage} alt={post.title} />
      </div>

      {/* ── Article body ── */}
      <div className="post-layout">
        <article className="post-article">
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* ── CTA card ── */}
        <div className="post-cta-card">
          <h3>Ready for a stress-free move?</h3>
          <p>
            Get a free, no-obligation quote from Lagos's most trusted moving team.
            We'll handle everything — from packing to reassembly.
          </p>
          <button
            onClick={onBack}
            aria-label="Get a free moving quote"
          >
            Get My Free Quote
          </button>
        </div>

        {/* ── Bottom back link ── */}
        <div className="post-back-bottom">
          <button
            className="post-back-btn"
            onClick={onBack}
            aria-label="Back to blog"
          >
            <ChevronLeftIcon />
            Back to all articles
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
