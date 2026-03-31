import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import HikingFilters from '../components/HikingsFilters.jsx'

const HikingsPage = ({ data }) => {
  const urlAPI = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'
  
  const [filtersOptions, setFiltersOptions] = useState({
    province: [],
    difficulty: [],
    typeTerrain: [],
    approvedFEDME: [],
    accessWater: []
  })

  const distanceKm = Math.max(...data?.hikings?.map((e) => e.distanceKm || 1))
    const [filters, setFilters] = useState({
    province: '',
    difficulty: '',
    distanceKm: distanceKm,
    typeTerrain: '',
    approvedFEDME: '',
    accessWater: ''
  })

  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFiltersOptions = async () => {
      try {
        const [
          provinceResponse,
          difficultyResponse,
          terrainResponse,
          approvedResponse,
          waterResponse,
        ] = await Promise.all([
          fetch(`${urlAPI}/api/utils/province`),
          fetch(`${urlAPI}/api/utils/difficulty`),
          fetch(`${urlAPI}/api/utils/terrain`),
          fetch(`${urlAPI}/api/utils/approved`),
          fetch(`${urlAPI}/api/utils/water`),
        ])
        if (
          !provinceResponse.ok ||
          !difficultyResponse.ok ||
          !terrainResponse.ok ||
          !approvedResponse.ok ||
          !waterResponse.ok
        ) {
          setError('Error al cargar filtros')
          return
        }

        const provinceData = await provinceResponse.json()
        const difficultyData = await difficultyResponse.json()
        const terrainData = await terrainResponse.json()
        const approvedData = await approvedResponse.json()
        const waterData = await waterResponse.json()

        setFiltersOptions({
          province: provinceData,
          difficulty: difficultyData,
          typeTerrain: terrainData,
          approvedFEDME: approvedData,
          accessWater: waterData
        })
      } catch (error) {
        console.log(error)
        setError('Error al cargar los filtros')
      } finally {
        setLoading(false)
      }
    }
    fetchFiltersOptions()
  }, [urlAPI])

  const handleFiltersChange = (e) => {
    const { name, value } =e.target
    setFilters((preFilter) => ({
      ...preFilter,
      [name]: value,
    }))
  }

  const resetfilters = () => {
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

  const filteredHikings = data.hikings.filter((e) => {
    const chosenProvince = filters.province === '' || e.province === filters.province
    const chosenDifficulty = filters.difficulty === '' || e.difficulty === filters.difficulty
    const chosenDistance = e.distanceKm <= Number(filters.distanceKm)
    const chosenTerrain = filters.typeTerrain === '' || e.typeTerrain === filters.typeTerrain
    const chosenApproved = filters.approvedFEDME === '' || e.approvedFEDME === filters.approvedFEDME
    const chosenWater = filters.accessWater === '' || e.accessWater === filters.accessWater

    return (
      chosenProvince &&
      chosenDifficulty &&
      chosenDistance &&
      chosenTerrain &&
      chosenApproved &&
      chosenWater
    )
  })

  if (loading) return <p>cargando rutas...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <Navbar />
      <h1>rutas para moverse juntos</h1>
      <HikingFilters 
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        filtersConfig={filtersConfig}
        resetfilters={resetfilters}
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