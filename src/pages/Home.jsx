import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const Home = () => {
  return (
    <>
      <h1>PATITA NÓMADA</h1>
      <div>
        <Link to="/hikings">Rutas</Link>
        <Link to="/overnights">Pernoctas</Link>
      </div>
    </>
  )
}

export default Home