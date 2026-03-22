// =========================================================
// BLOG PAGE
// Main blog listing — featured first post (horizontal card),
// then remaining posts in a 3-column grid.
// Props:
//   onPost(id) — navigate to a specific post
// =========================================================

import React from 'react'
import { BLOG_POSTS, CATEGORY_COLORS } from '../data/blogPosts'
import Footer from './Footer'
import '../styles/Blog.css'

// Arrow icon used in cards
function ArrowIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Featured card (first post, horizontal layout) ────────
function FeaturedCard({ post, onPost }) {
  return (
    <div
      className="blog-featured"
      onClick={() => onPost(post.id)}
      role="article"
      tabIndex={0}
      aria-label={`Read article: ${post.title}`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onPost(post.id)}
    >
      <div className="blog-featured__image">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
      </div>
      <div className="blog-featured__content">
        <span
  className="blog-category"
  style={{ '--cat-color': CATEGORY_COLORS[post.category] ?? '#6C737F' }}
>{post.category}</span>
        <h2 className="blog-featured__title">{post.title}</h2>
        <p className="blog-featured__excerpt">{post.excerpt}</p>
        <div className="blog-featured__footer">
          <span className="blog-featured__meta">
            {post.date} &middot; {post.readTime}
          </span>
          <button
            className="blog-featured__cta"
            onClick={e => { e.stopPropagation(); onPost(post.id) }}
            aria-label={`Read full article: ${post.title}`}
          >
            Read Article <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Regular grid card ────────────────────────────────────
function BlogCard({ post, onPost }) {
  return (
    <article
      className="blog-card"
      onClick={() => onPost(post.id)}
      tabIndex={0}
      aria-label={`Read article: ${post.title}`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onPost(post.id)}
    >
      <div className="blog-card__image">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
      </div>
      <div className="blog-card__body">
        <span
  className="blog-category"
  style={{ '--cat-color': CATEGORY_COLORS[post.category] ?? '#6C737F' }}
>{post.category}</span>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__footer">
          <span className="blog-card__meta">
            {post.date} &middot; {post.readTime}
          </span>
          <span
            className="blog-card__arrow"
            aria-hidden="true"
          >
            <ArrowIcon />
          </span>
        </div>
      </div>
    </article>
  )
}

// =========================================================
// BlogPage
// =========================================================
export default function BlogPage({ onPost }) {
  const [featured, ...rest] = BLOG_POSTS

  return (
    <div className="blog-page">

      {/* ── Page header ── */}
      <div className="blog-header">
        <div className="container">
          <span className="blog-eyebrow">Our Blog</span>
          <h1 className="blog-heading">Moving tips, tricks &amp; insights</h1>
          <p className="blog-subheading">
            Practical advice for Nigerians planning a home or office relocation —
            from choosing the right mover to packing your first box.
          </p>
        </div>
      </div>

      {/* ── Posts ── */}
      <section className="blog-section" aria-label="Blog posts">
        <div className="container">

          {/* Featured post */}
          <FeaturedCard post={featured} onPost={onPost} />

          {/* Grid of remaining posts */}
          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map(post => (
                <BlogCard key={post.id} post={post} onPost={onPost} />
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  )
}
