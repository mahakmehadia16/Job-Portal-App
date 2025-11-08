
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="hero card">
      <h1>Find your next opportunity</h1>
      <p>Search jobs, apply with your resume, and land your dream role.</p>
      <div className="hero-actions">
        <Link to="/jobs" className="btn">Browse Jobs</Link>
        <Link to="/signup" className="btn secondary">Create Account</Link>
      </div>
    </div>
  )
}
