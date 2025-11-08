
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToasts } from './Toasts'

export default function Navbar() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const { addToast } = useToasts()
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark' } catch { return false }
  })
  const [search, setSearch] = useState('')
  const location = useLocation()

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  const handleLogout = () => {
    logout()
    addToast('Logged out', 'info')
    nav('/login')
  }

  const quickSearch = (e) => {
    e.preventDefault()
    if (location.pathname !== '/jobs') nav('/jobs')
    window.dispatchEvent(new CustomEvent('quick-search', { detail: search }))
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">JobPortal</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
      <form className="nav-search" onSubmit={quickSearch}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." />
      </form>
      <div className="nav-right">
        <button className="btn secondary" onClick={() => setDark(d => !d)}>{dark ? 'Light' : 'Dark'}</button>
        {user ? (
          <>
            <span className="nav-user">{user.name} ({user.role})</span>
            {user.role === 'employer' && <Link to="/post-job">Post Job</Link>}
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}
