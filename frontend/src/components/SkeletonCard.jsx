
import React from 'react'
export default function SkeletonCard() {
  return (
    <div className="card job skeleton">
      <div className="skeleton-line w-40" />
      <div className="skeleton-line w-60" />
      <div className="skeleton-line w-80" />
    </div>
  )
}
