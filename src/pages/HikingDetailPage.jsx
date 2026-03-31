import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'


const HikingDetailPage = () => {
  const { id } = useParams()
  const urlAPI = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'
  
  const [hiking, setHiking] = useState(null)
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    const fetchHikingById = async () => {
      try {
        const response = await fetch(`${urlAPI}/api/hikings/${id}`)

        if(!response.ok) {
          throw new Error('No se puede cargar esa ruta')
        }
        const data = await response.json()
        setHiking(data)
      } catch (error) {
        console.log(error)
        setError('Error al cargar el detalle de esta ruta')
      } finally {
        setLoading(false)
      }
    }
    fetchHikingById()
  }, [id, urlAPI])

  if (loading) return <p>Cargando ruta...</p>
  if (error) return <p>{error}</p>
  if (!hiking) return <p>No se ha encontrado esta ruta. Comprueba que sigue estando disponible</p>
  
  return (
    <>
      <Navbar />
      <section>
        <Link to="/hikings">← volver a rutas</Link>
      </section>
      <div>
        <img src={hiking.image} alt={hiking.name} />
        <h1>{hiking.name}</h1>
      </div>
      <div>
        <div>
          <p><strong>Distancia en kilómetros:</strong> {hiking.distanceKm}</p>
          <p><strong>Provincia:</strong> {hiking.province}</p>
        </div>
        <p><strong>Dificultad:</strong> {hiking.difficulty}</p>
        <p><strong>Homologación:</strong> {hiking.approvedFEDME}</p>
        <p><strong>Ubicación del inicio de la ruta:</strong><a href={hiking.mapsLink} target="_blank"> Ver en Google Maps</a></p>
        <p><strong>Descripción:</strong> {hiking.description}</p>
        <p><strong>Descripción del terreno:</strong> {hiking.typeTerrain}</p>
        <p><strong>Acceso a agua durante la ruta:</strong> {hiking.accessWater}</p>
      </div>
    </>
  )
}

export default HikingDetailPage