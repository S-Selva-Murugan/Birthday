export default function MemorySection({ title, img, caption, joke, children }) {

  // Normalize caption → always array
  const paragraphs =
    Array.isArray(caption)
      ? caption
      : typeof caption === "string"
        ? [caption]
        : []

  return (
    <section
      className="snap-section memory-section"
      aria-label={title}
    >
      <div className="memory-card">

        {/* Photo */}
        <div className="photo">
          <img src={img} alt={title} loading="lazy" />
        </div>

        {/* Text Content */}
        <div className="meta">

          <h3 className="memory-title">{title}</h3>

          <div className="caption">
            {paragraphs.map((para, i) => (
              <p key={i} className="caption-para">
                {para}
              </p>
            ))}
          </div>

          {joke && (
            <p className="joke">
              {joke}
            </p>
          )}

        </div>
      </div>

      {children}
    </section>
  )
}
