import { useState } from "react"

export default function MemorySection({ title, img, caption, joke, children }) {

  const [loaded, setLoaded] = useState(false)

  // Normalize caption → always array
  const paragraphs =
    Array.isArray(caption)
      ? caption
      : typeof caption === "string"
        ? [caption]
        : []

  const isVideo = img?.endsWith(".mp4") || img?.endsWith(".webm")

  return (
    <section className="snap-section memory-section" aria-label={title}>
      <div className="memory-card">

        {/* Media */}
        <div className="photo" style={{ position: "relative" }}>

          {!loaded && (
            <div className="media-loader">
              <div className="spinner" />
            </div>
          )}

          {isVideo ? (
            <video
              src={img}
              autoPlay
              loop
              muted
              playsInline
              className="memory-video"
              onLoadedData={() => setLoaded(true)}
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity .45s ease"
              }}
            />
          ) : (
            <img
              src={img}
              alt={title}
              loading="lazy"
              className="memory-img"
              onLoad={() => setLoaded(true)}
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity .45s ease"
              }}
            />
          )}
        </div>

        {/* Text */}
        <div className="meta">
          <h3 className="memory-title">{title}</h3>

          <div className="caption">
            {paragraphs.map((para, i) => (
              <p key={i} className="caption-para">{para}</p>
            ))}
          </div>

          {joke && <p className="joke">{joke}</p>}
        </div>
      </div>

      {children}
    </section>
  )
}
