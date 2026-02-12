import { useMemo } from 'react'

export default function Confetti({ show = false }) {
  const pieces = useMemo(() => {
    const cols = ['#FF5D8F', '#FFD166', '#6EE7B7', '#7AD3FF', '#B39CFF']
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.round(Math.random() * 94) + '%',
      delay: (Math.random() * 0.8).toFixed(2) + 's',
      rot: Math.round(Math.random() * 360),
      color: cols[i % cols.length],
      size: Math.round(6 + Math.random() * 12),
    }))
  }, [])

  if (!show) return null

  return (
    <div className="confetti" aria-hidden>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{ left: p.left, background: p.color, width: p.size + 'px', height: p.size + 'px', transform: `rotate(${p.rot}deg)`, animationDelay: p.delay }}
        />
      ))}
    </div>
  )
}
