export default function Header({ name = 'Namitha' }) {
  return (
    <header className="site-header">
      <div className="logo">
        <img src="/heart.svg" alt="heart" className="logo-heart" />
        <h1>For {name}</h1>
      </div>
      <p className="sub">With all my love ❤️</p>
    </header>
  )
}
