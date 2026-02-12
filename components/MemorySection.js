export default function MemorySection({ title, img, caption, joke, children }) {
  return (
    <section className="snap-section memory-section" aria-label={title}>
      <div className="memory-card">
        <div className="photo">
          <img src={img} alt={title} loading="lazy" />
        </div>
        <div className="meta">
          <h3>{title}</h3>
          <p className="caption">{caption}</p>
          <p className="joke">{joke}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
