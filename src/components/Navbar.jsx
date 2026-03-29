//navabar porque va a ser común a todas las páginas
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
    </nav>
  )
}

export default Navbar