
import React from 'react'

export default function JobCard({ job, children }) {
  return (
    <div className="card job-card">
      <div className="job-header">
        <img className="logo" src={job.logoUrl || 'https://dummyimage.com/60x60/ddd/aaa.png&text=🏢'} alt="logo" />
        <div>
          <h3>{job.title}</h3>
          <p className="muted">{job.company} · {job.location}</p>
        </div>
      </div>
      <p className="desc">{job.description}</p>
      <div className="tags">
        {(job.tags || []).map((t, i) => <span key={i} className="tag">#{t}</span>)}
      </div>
      <div className="job-actions">{children}</div>
    </div>
  )
}
