import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import HikingsFilters from '../components/HikingsFilters.jsx'

const HikingsPage = () => {
  const urlAPI = import.meta.env.VITE_APP_API_URL

  const[hikings, setHikings] = useState([])

  const [filtersOptions, setFiltersOptions] = useState({
    province: [],
    difficulty: [],
    typeTerrain: [],
    approvedFEDME: [],
    accessWater: []
  })
  
  const [filters, setFilters] = useState({
    province: '',
    difficulty: '',
    distanceKm: 1,
    typeTerrain: '',
    approvedFEDME: '',
    accessWater: ''
  })
    
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)
  
  const distanceKm = hikings.length > 0 ? Math.max(...hikings.map((e) => e.distanceKm || 1)) : 1
  
  useEffect(() => {
    const fetchFiltersHikingsOptions = async () => {
      try {
        const [
          hikingsResponse,
          provinceResponse,
          difficultyResponse,
          terrainResponse,
          approvedResponse,
          waterResponse,
        ] = await Promise.all([
          fetch(`${urlAPI}/api/hikings`),
          fetch(`${urlAPI}/api/utils/province`),
          fetch(`${urlAPI}/api/utils/difficulty`),
          fetch(`${urlAPI}/api/utils/terrain`),
          fetch(`${urlAPI}/api/utils/approved`),
          fetch(`${urlAPI}/api/utils/water`),
        ])
        if (
          !hikingsResponse.ok ||
          !provinceResponse.ok ||
          !difficultyResponse.ok ||
          !terrainResponse.ok ||
          !approvedResponse.ok ||
          !waterResponse.ok
        ) {
          setError('Error al cargar datos')
          return
        }

        const hikingsData = await hikingsResponse.json()
        const provinceData = await provinceResponse.json()
        const difficultyData = await difficultyResponse.json()
        const terrainData = await terrainResponse.json()
        const approvedData = await approvedResponse.json()
        const waterData = await waterResponse.json()

        const hikingsArray = hikingsData.hikings || []
        setHikings(hikingsArray)

        setFiltersOptions({
          province: provinceData,
          difficulty: difficultyData,
          typeTerrain:terrainData,
          approvedFEDME: approvedData,
          accessWater: waterData
        })

        const maxDistance = hikingsArray.length > 0 ? Math.max(...hikingsArray.map((e) => e.distanceKm || 1)) : 1
        
        setFilters({
          province: '',
          difficulty: '',
          distanceKm: maxDistance,
          typeTerrain: '',
          approvedFEDME: '',
          accessWater: ''
        })
      
      } catch (error) {
        console.log(error)
        setError('Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }
    fetchFiltersHikingsOptions()
  }, [urlAPI])

  const handleFiltersChange = (e) => {
    const { name, value } =e.target
    setFilters((preFilter) => ({
      ...preFilter,
      [name]: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      province: '',
      difficulty: '',
      distanceKm: distanceKm,
      typeTerrain: '',
      approvedFEDME: '',
      accessWater: ''
    })
  }

  //configuración de los filtros por cada uno de ellos
  const filtersConfig = [
    {
      name: 'province',
      label: 'Provincia',
      type: 'select',
      options: filtersOptions.province,
      defaultOption: 'Todas las provincias'
    },
    {
      name: 'difficulty',
      label: 'Dificultad',
      type: 'select',
      options: filtersOptions.difficulty,
      defaultOption: 'Dificultad'
    },
    {
      name: 'typeTerrain',
      label: 'Tipo de terreno',
      type: 'select',
      options: filtersOptions.typeTerrain,
      defaultOption: 'Tipos de terreno'
    },
    {
      name: 'approvedFEDME',
      label: 'Homologación FEDME',
      type: 'select',
      options: filtersOptions.approvedFEDME,
      defaultOption: 'Tipo de homologación'
    },
    {
      name: 'accessWater',
      label: 'Acceso a agua',
      type: 'select',
      options: filtersOptions.accessWater,
      defaultOption: 'Acceso a agua'
    },
    {
      name: 'distanceKm',
      label: 'Distancia máxima',
      type: 'range',
      min: 1,
      max: distanceKm
    },
  ]

  const filteredHikings = hikings.filter((e) => {
    const chosenProvince = 
      filters.province === '' || e.province === filters.province
    
    const chosenDifficulty = 
      filters.difficulty === '' || e.difficulty === filters.difficulty
  
    const chosenDistance = 
      e.distanceKm <= Number(filters.distanceKm)
  
    const chosenTerrain = 
      filters.typeTerrain === '' || 
      (Array.isArray(e.typeTerrain) 
      ? e.typeTerrain.includes(filters.typeTerrain) 
      : e.typeTerrain === filters.typeTerrain)
  
    const chosenApproved = 
      filters.approvedFEDME === '' || e.approvedFEDME === filters.approvedFEDME
  
    const chosenWater = 
      filters.accessWater === '' || 
      (Array.isArray(e.accessWater) 
      ? e.accessWater.includes(filters.accessWater)
      : e.accessWater === filters.accessWater)

    return (
      chosenProvince &&
      chosenDifficulty &&
      chosenDistance &&
      chosenTerrain &&
      chosenApproved &&
      chosenWater
    )
  })

  if (loading) return <p>Cargando rutas...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <Navbar />
      <h1>Rutas para moverse juntos</h1>
      <HikingsFilters 
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        filtersConfig={filtersConfig}
        resetFilters={resetFilters}
      />
      <section>
        {filteredHikings.length === 0 ? (
          <p>Aún no existen rutas que coincidan con tu búsqueda</p>
        ) : (
          filteredHikings.map((e) => (
            <div key={e._id}>
              <Link to={`/hikings/${e._id}`}>{e.name} - {e.province} - {e.distanceKm} km</Link>
            </div>
          ))
        )}
      </section>
    </>
  )
}

export default HikingsPage