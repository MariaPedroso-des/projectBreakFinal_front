import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'


const OvernightDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const urlAPI = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'
  
  const [overnight, setOvernight] = useState(null)
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    const fetchOvernightById = async () => {
      try {
        const response = await fetch(`${urlAPI}/api/overnights/${id}`)

        if(!response.ok) {
          throw new Error('No se puede cargar esa zona')
        }
        const data = await response.json()
        setOvernight(data)
      } catch (error) {
        console.log(error)
        setError('Error al cargar el detalle de esta zona')
      } finally {
        setLoading(false)
      }
    }
    fetchOvernightById()
  }, [id, urlAPI])

  const handleDelete = async  () => {
    const confirmDlt = window.confirm('¿Seguro que quieres eliminar esta zona de pernocta?')

    if(!confirmDlt) return

    try {
      const response = await fetch(`${urlAPI}/api/overnights/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo eliminar la zona de pernocta')
      }

      alert('Zona de pernocta eliminada correctamente')
      navigate('/overnights')
    } catch(error) {
      console.log(error)
      setError(error.message || 'Error al eliminar la zona de pernocta')
    }
  }

  if (loading) return <p>Cargando zona de pernocta...</p>
  if (error) return <p>{error}</p>
  if (!overnight) return <p>No se ha encontrado esta zona de pernocta. Comprueba que sigue estando disponible</p>
  
  return (
    <>
      <Navbar />
      
      <section>
        <Link to="/overnights">← volver a pernoctas</Link>
      </section>

      <div>
        {/*SOLO RENDERIZA  SI VIENE IMG*/}
        {overnight.image && <img src={overnight.image} alt={overnight.name} />}
        <h1>{overnight.name}</h1>
      </div>

      <div>
        <div>
          <p><strong>Provincia: </strong> {overnight.province}</p>
          <p><strong>Servicios: </strong> {overnight.services?.join(', ')}</p>
        </div>

        <p><strong>Capacidad: </strong> {overnight.capacity}</p>
        <p><strong>Proximidad: </strong> {overnight.proximity}</p>
        <p><strong>Ubicación: </strong><a href={overnight.mapsLink} target="_blank"> Ver ubicación</a></p>
        <p><strong>Descripción: </strong> {overnight.description}</p>
        <p><strong>Estancia: </strong> {overnight.stay}</p>
        <p><strong>Limitaciones: </strong> {overnight.limitations?.join(', ')}</p>
      </div>

      <section>
        <Link to={`/overnights/edit/${overnight.id}`}>
          <button type="button">Editar</button>
        </Link>
        <button type="button" onClick={handleDelete}>Eliminar</button>
      </section>
    </>
  )
}

export default OvernightDetailPage