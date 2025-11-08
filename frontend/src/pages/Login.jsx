
import React, { useState } from 'react'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToasts } from '../components/Toasts'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()
  const { addToast } = useToasts()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await API.post('/auth/login', form)
      login(data); addToast('Logged in.')
      nav('/')
    } catch (err) {
      setErr(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  )
}
