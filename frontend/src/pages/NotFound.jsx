
import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="card empty">
      <h2>404 — Page not found</h2>
      <p>Let’s get you back on track.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  )
}
