import { useState, useEffect } from 'react'
import Confetti from './Confetti'

export default function LoveMeter() {
  const [value, setValue] = useState(50)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (value > 100) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 1600)
      return () => clearTimeout(t)
    }
  }, [value])

  const emoji = value <= 20 ? '😢' : value <= 50 ? '🙂' : value <= 80 ? '😊' : value <= 100 ? '😍' : '🥳❤️'

  let response = ''
  if (value <= 20) response = "You're pretending."
  else if (value <= 50) response = "You're testing me."
  else if (value <= 80) response = "Okay that's believable."
  else if (value <= 100) response = "I knew it."
  else response = 'yayyyyy'

  const isOverflow = value > 100

  return (
    <div className={`love-meter-card ${isOverflow ? 'shake' : ''}`}>
      <Confetti show={showConfetti} />
      <h3>Lets see how much you love me...</h3>
      <p className="hint">Drag the meter</p>

      <div className="meter-row">
        <input
          type="range"
          min="0"
          max="999"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="love-slider"
        />
        <div className="meter-value">{value}</div>
      </div>

      <div className="emoji-row">{emoji}</div>

      {isOverflow && (
        <div className="error-box">Woooooooo. System not designed for this much.</div>
      )}

      <div className="love-response">{response}</div>
    </div>
  )
}
