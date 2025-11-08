
import React, { useState } from 'react'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToasts } from '../components/Toasts'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker' })
  const [err, setErr] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()
  const { addToast } = useToasts()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || form.password.length < 6) {
      setErr('Fill all fields. Password min 6 chars.'); return
    }
    try {
      const { data } = await API.post('/auth/register', form)
      login(data); addToast('Welcome! Account created.')
      nav('/')
    } catch (err) {
      setErr(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="card">
      <h2>Create your account</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" placeholder="Password (min 6)" type="password" onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  )
}
