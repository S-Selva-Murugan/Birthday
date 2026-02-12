import { useState } from 'react'

export default function FinalWish({ name }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="final-card">
      <h2>Happy Birthday, {name} 🎂</h2>

      {!open ? (
        <>
          <p className="tease">One last stop on our time-travel… a wish just for you.</p>
          <button className="reveal-btn" onClick={() => setOpen(true)}>Read my wish</button>
        </>
      ) : (
        <div className="wish">
          <p>May your days be filled with light, laughter, and everything you dream of. Thank you for being you — my favorite person.</p>
          <p className="from">— All my love, always</p>
        </div>
      )}
    </div>
  )
}
