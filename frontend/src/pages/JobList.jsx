
import React, { useEffect, useState } from 'react'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'
import JobCard from '../components/JobCard'
import SkeletonCard from '../components/SkeletonCard'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import { useToasts } from '../components/Toasts'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const [tag, setTag] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { user } = useAuth()
  const [resumeFiles, setResumeFiles] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [bookmarkIds, setBookmarkIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('bookmarks')||'[]')) } catch { return new Set() }
  })
  const { addToast } = useToasts()

  const persistBookmarks = (s) => {
    try { localStorage.setItem('bookmarks', JSON.stringify(Array.from(s))) } catch {}
  }

  const fetchJobs = async (p=1, opts={}) => {
    setLoading(true)
    try {
      const params = { q, location: loc, tag, page: p, limit: 9 }
      if (opts.quick) params.q = opts.quick
      const { data } = await API.get('/jobs', { params })
      setJobs(data.items)
      setPages(data.pages || 1)
      setPage(data.page || 1)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const handler = (e) => {
      fetchJobs(1, { quick: e.detail })
      setQ(e.detail)
    }
    window.addEventListener('quick-search', handler)
    fetchJobs(1)
    return () => window.removeEventListener('quick-search', handler)
  }, [])

  const search = async (e) => {
    e.preventDefault()
    await fetchJobs(1)
  }

  const apply = async (id) => {
    try {
      const fd = new FormData()
      const file = resumeFiles[id]
      if (file) fd.append('resume', file)
      await API.post(`/jobs/${id}/apply`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      addToast('Applied!')
    } catch (err) {
      setMsg(err.response?.data?.message || err.message)
    }
  }

  const removeJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`)
      await fetchJobs(page)
      addToast('Job deleted', 'info')
    } catch (err) {
      setMsg(err.response?.data?.message || err.message)
    }
  }

  const viewApplicants = async (id) => {
    try {
      const { data } = await API.get(`/jobs/${id}/applicants`)
      setModalContent(
        (data && data.length)
          ? <ul className="applicants">{data.map((a,i)=>(<li key={i}>
              <span>{a.user?.name} &lt;{a.user?.email}&gt;</span>
              {a.resumePath && <a href={`http://localhost:5000${a.resumePath}`} target="_blank">Resume</a>}
            </li>))}</ul>
          : <p>No applicants yet.</p>
      )
      setModalOpen(true)
    } catch (err) {
      setMsg(err.response?.data?.message || err.message)
    }
  }

  const onFileChange = (id, file) => setResumeFiles(prev => ({ ...prev, [id]: file }))

  const toggleBookmark = (id) => {
    const s = new Set(bookmarkIds)
    if (s.has(id)) { s.delete(id); addToast('Removed from Saved', 'info') }
    else { s.add(id); addToast('Saved') }
    setBookmarkIds(s); persistBookmarks(s)
  }

  return (
    <div>
      <div className="card filters-card">
        <form onSubmit={search} className="filters grid3">
          <input placeholder="Title or keyword" value={q} onChange={e => setQ(e.target.value)} />
          <input placeholder="Location" value={loc} onChange={e => setLoc(e.target.value)} />
          <input placeholder="Tag (e.g., React)" value={tag} onChange={e => setTag(e.target.value)} />
          <button className="btn" type="submit">Search</button>
        </form>
      </div>

      {msg && <div className="message">{msg}</div>}

      {loading ? (
        <div className="grid cards">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : jobs.length === 0 ? (
        <div className="card empty">
          <h3>No jobs found</h3>
          <p>Try removing filters or search with another keyword.</p>
        </div>
      ) : (
        <div className="grid cards">
          {jobs.map(job => (
            <JobCard key={job._id} job={job}>
              <div className="btn-row">
                <button className="btn secondary" onClick={() => toggleBookmark(job._id)}>
                  {bookmarkIds.has(job._id) ? '★ Saved' : '☆ Save'}
                </button>
                {user && user.role === 'seeker' && (
                  <div className="apply-box">
                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => onFileChange(job._id, e.target.files[0])} />
                    <button onClick={() => apply(job._id)} className="btn">Apply</button>
                  </div>
                )}
                {user && user.role === 'employer' && (
                  <>
                    <button onClick={() => viewApplicants(job._id)} className="btn secondary">Applicants</button>
                    {user._id === job.createdBy?._id && (
                      <button onClick={() => removeJob(job._id)} className="btn danger">Delete</button>
                    )}
                  </>
                )}
              </div>
            </JobCard>
          ))}
        </div>
      )}

      <div className="pagination">
        <button className="btn" disabled={page<=1} onClick={() => fetchJobs(page-1)}>Prev</button>
        <span>Page {page} of {pages}</span>
        <button className="btn" disabled={page>=pages} onClick={() => fetchJobs(page+1)}>Next</button>
      </div>

      <Modal open={modalOpen} title="Applicants" onClose={() => setModalOpen(false)}>
        {modalContent || <Spinner />}
      </Modal>
    </div>
  )
}
