import { useState } from 'react'

export default function Hero() {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="hero">
      <h2 className="greeting">Happy Birthday, Namitha!</h2>
      <p className="lead">You make every day brighter. Today is all about you.</p>

      <button className="reveal-btn" onClick={() => setRevealed(!revealed)}>
        {revealed ? 'Hide Surprise' : 'Reveal a Surprise'}
      </button>

      <div className={`surprise ${revealed ? 'show' : ''}`}>
        <p className="surprise-text">I love you — more than all the stars ✨</p>
        <div className="gift">🎁 A lovely day planned just for you</div>
      </div>

      <footer className="note">— With love, always</footer>
    </section>
  )
}
