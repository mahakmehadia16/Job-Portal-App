
import React, { useState } from 'react'
import API from '../services/api'
import { useToasts } from '../components/Toasts'

export default function PostJob() {
  const [form, setForm] = useState({ title: '', company: '', location: '', description: '', salary: '', minSalary: '', maxSalary: '', tags: '' })
  const [msg, setMsg] = useState('')
  const [logo, setLogo] = useState(null)
  const { addToast } = useToasts()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (logo) fd.append('logo', logo)
      await API.post('/jobs', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setMsg('Job posted successfully')
      addToast('Job posted!')
      setForm({ title: '', company: '', location: '', description: '', salary: '', minSalary: '', maxSalary: '', tags: '' })
      setLogo(null)
    } catch (err) {
      setMsg(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="card">
      <h2>Post Job</h2>
      {msg && <div className="message">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="salary" placeholder="Salary (text)" value={form.salary} onChange={handleChange} />
        <div className="grid2">
          <input name="minSalary" placeholder="Min salary (number)" value={form.minSalary} onChange={handleChange} />
          <input name="maxSalary" placeholder="Max salary (number)" value={form.maxSalary} onChange={handleChange} />
        </div>
        <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
        <div>Company Logo (optional): <input type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} /></div>
        <button className="btn" type="submit">Post</button>
      </form>
    </div>
  )
}
