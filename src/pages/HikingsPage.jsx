import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const HikingsPage = ({ data }) => {
  const [provinces, setProvinces] = useState([''])
  const [filters, setFilters] = useState({
    province: '',
    difficulty: '',
    distanceKm: '',
  })

  const urlAPI = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
      const response = await fetch(`${urlAPI}/api/utils/provinces`)
      const resData = await response.json()
      setProvinces(resData)
    } catch (error) {
      console.log(error)
    }
  }
  fetchProvinces()
  }, [urlAPI])

  if(!data?.hikings) {
    return <p>cargando rutas...</p>
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    setFilters((preFilters) => ({
      ...preFilters,
      [name]: value,
    }))
  }

  return (
    <>
      <Navbar />
      <h1>Tu listado de rutas</h1>

      <div>
        <select  />
      </div>
      
      {data.hikings.map((item) => (
        <div key={item._id}>
          <Link to={`/hikings/${item._id}`}>{item.name} - {item.distanceKm} km</Link>
        </div>
      ))}
    </>
  )
}

export default HikingsPage