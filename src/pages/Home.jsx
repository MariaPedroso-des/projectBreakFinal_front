import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="heroHome">
        <h1>TRAVIA</h1>
        <h3>rutas y paradas pet-friendly para viajar juntos</h3>
      </section>
      <section className='btnHome'>
        <Link to="/hikings">explorar rutas</Link>
        <Link to="/overnights">buscar pernoctas</Link>
      </section>
    </>
  )
}

export default Home