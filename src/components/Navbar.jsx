import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">Leaf &amp; Living</NavLink>
      <nav className="navbar__links" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/admin">Admin Portal</NavLink>
      </nav>
    </header>
  )
}