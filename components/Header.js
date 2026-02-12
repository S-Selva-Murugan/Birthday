export default function Header({ name = 'Namitha' }) {
  return (
    <header className="site-header">
      <div className="logo">
        {/* <span className="logo-badge" aria-hidden /> */}
        <h1>For {name}</h1>
      </div>
      <p className="sub">With all my love ❤️</p>
    </header>
  )
}
