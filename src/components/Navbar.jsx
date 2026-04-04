//navabar porque va a ser común a todas las páginas
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.navBrand}>TRAVIA</Link>

        <div className={styles.navLinks}>
          <Link to="/hikings" className={styles.navLink}>Rutas</Link>
          <Link to="/overnights" className={styles.navLink}>Pernoctas</Link>
          <Link to="/formchoice" className={styles.navLink}>Publicar</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar