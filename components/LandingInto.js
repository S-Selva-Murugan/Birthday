import { useState } from "react"

export default function LandingIntro({ name, onStart }) {
  const lines = [
    `Hey ${name}...`,
    "Before anything else, I want you to slow down for a moment.",
    "This isn't just a website I randomly made.",
    "It's a small piece of my heart in a form you can click through.",
    "Some memories, some truths, and something I've been wanting to say.",
    "So... ready?"
  ]

  const [visibleLines, setVisibleLines] = useState([lines[0]])
  const [index, setIndex] = useState(0)

  const nextLine = () => {
    if (index < lines.length - 1) {
      const next = index + 1
      setVisibleLines(prev => [...prev, lines[next]])
      setIndex(next)
    } else {
      onStart && onStart()
    }
  }

  return (
    <div
      style={{
        // minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px"
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          background: "white",
          padding: "2.5rem",
          borderRadius: "24px",
        //   boxShadow: "0 10px 40px rgba(0,0,0,0.12)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {visibleLines.map((line, i) => (
            <p
              key={i}
              style={{
                fontSize: "1rem",
                lineHeight: "1.7",
                opacity: 0,
                animation: "fadeIn 0.6s ease forwards"
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <button
          onClick={nextLine}
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            borderRadius: "28px",
            border: "none",
            background: "#ff4d6d",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          {index === lines.length - 1 ? "start" : "next"}
        </button>

        {/* simple fade animation */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  )
}
