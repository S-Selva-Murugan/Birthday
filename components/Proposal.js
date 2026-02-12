import { useState } from "react"

export default function ProposalSection({ img, successGif, onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [accepted, setAccepted] = useState(false)

  const moveNoButton = () => {
    const x = Math.random() * 220 - 110
    const y = Math.random() * 140 - 70
    setNoPos({ x, y })
  }

  const handleYes = () => {
    setAccepted(true)
  }

  return (
    <section
      style={{
        // minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "0.5rem",
          borderRadius: "24px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
          background: "white"
        }}
      >
        {!accepted ? (
          <>
            <img
              src={img}
              alt="proposal"
              style={{ width: "220px", marginBottom: "1.5rem" }}
            />

            <h2 style={{ marginBottom: "1.5rem" }}>
              Will you marry me?
            </h2>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <button
                onClick={handleYes}
                style={{
                  padding: "12px 26px",
                  borderRadius: "30px",
                  border: "none",
                  background: "#ff4d6d",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1.1rem"
                }}
              >
                Yes 💍
              </button>

              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={{
                  padding: "12px 26px",
                  borderRadius: "30px",
                  border: "none",
                  background: "#eee",
                  cursor: "pointer",
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                  transition: "transform 0.25s"
                }}
              >
                No 🙈
              </button>
            </div>
          </>
        ) : (
          <div>
            <img
              src={successGif}
              alt="she said yes"
              style={{
                width: "260px",
                maxWidth: "90%",
                borderRadius: "16px",
                marginBottom: "20px"
              }}
            />

            <h2 style={{ color: "#ff4d6d", marginBottom: "12px" }}>
              You said yes ❤️
            </h2>

            <button
              onClick={onYes}
              style={{
                padding: "10px 22px",
                borderRadius: "24px",
                border: "none",
                background: "#ff4d6d",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              continue →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
