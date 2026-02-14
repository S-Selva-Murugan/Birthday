import { useRouter } from 'next/router'
import { useState } from 'react'

export default function FinalWish({ name }) {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="final-card">

          <div
            style={{
              position: "relative",
              width: "220px",
              height: "220px",
              margin: "0 auto 20px auto"
            }}
          >
        {/* Loader */}
        {!loaded && (
          <div className="media-loader">
            <div className="spinner" />
          </div>
        )}

        {/* Image */}
        <img
          src="/photos/photo9.jpeg"
          alt="us"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
            opacity: loaded ? 1 : 0,
            transition: "opacity .35s ease"
          }}
        />
      </div>

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
