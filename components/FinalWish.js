import { useRouter } from 'next/router'

export default function FinalWish({ name }) {
  const router = useRouter()

  return (
    <div className="final-card">
      <h2>Happy Birthday, {name} 🎂</h2>

      <div className="wish">
        <p>
          May your days be filled with light, laughter, and everything you dream of.
          Thank you for being you — my favorite person.
        </p>

        <p className="from">— All my love, always</p>
      </div>

      <button
        className="reveal-btn"
        style={{ marginTop: "30px" }}
        onClick={() => window.location.href = window.location.origin}
      >
        Go to home
      </button>
    </div>
  )
}