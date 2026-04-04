import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import OvernightsFilters from '../components/OvernightsFilters.jsx'

const OvernightsPage = () => {
  const urlAPI = import.meta.env.VITE_APP_API_URL

  const [overnights, setOvernights] = useState([])

  const [filtersOptions, setFiltersOptions] = useState({
    province: [],
    services: [],
    proximity: [],
    signal: [],
    stay: [],
    limitations: []
  })

  const [filters, setFilters] = useState({
    province: '',
    services: '',
    capacity: 1,
    proximity: '',
    signal: '',
    stay: '',
    limitations: ''
  })
  
  const [loading, setLoading] =useState(true)
  const [error, setError] = useState(null)
  
  const capacity = Math.max(...overnights.map((e) => e.capacity || 1))
  
  useEffect(() => {
    const fetchFiltersOvernightsOptions = async () => {
      try {
        const [
          overnightsResponse,
          provinceResponse,
          servicesResponse,
          proximityResponse,
          signalResponse,
          stayResponse,
          limitationsResponse
        ] = await Promise.all([
          fetch(`${urlAPI}/api/overnights`),
          fetch(`${urlAPI}/api/utils/province`),
          fetch(`${urlAPI}/api/utils/services`),
          fetch(`${urlAPI}/api/utils/proximity`),
          fetch(`${urlAPI}/api/utils/signal`),
          fetch(`${urlAPI}/api/utils/stay`),
          fetch(`${urlAPI}/api/utils/limitations`)
        ])
        if (
          !overnightsResponse.ok ||
          !provinceResponse.ok ||
          !servicesResponse.ok ||
          !proximityResponse.ok ||
          !signalResponse.ok ||
          !stayResponse.ok ||
          !limitationsResponse.ok
        ) {
          setError('Error al cargar datos')
          return
        }

        const overnightsData = await overnightsResponse.json()
        const provinceData = await provinceResponse.json()
        const servicesData = await servicesResponse.json()
        const proximityData = await proximityResponse.json()
        const signalData = await signalResponse.json()
        const stayData = await stayResponse.json()
        const limitationsData = await limitationsResponse.json()

        const overnightsArray = overnightsData.overnights || []
        setOvernights(overnightsArray)

        setFiltersOptions({
          province: provinceData,
          services: servicesData,
          proximity: proximityData,
          signal: signalData,
          stay: stayData,
          limitations: limitationsData
        })

        const maxCapacity = overnightsArray.length > 0 ? Math.max(...overnightsArray.map((overnight) => overnight.capacity || 1)) : 1
      
        setFilters({
          province: '',
          services:'',
          capacity: maxCapacity,
          proximity: '',
          signal: '',
          stay: '',
          limitations: ''

        })
      
      } catch (error) {
        console.log(error)
        setError('Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }
    fetchFiltersOvernightsOptions()
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
      services: '',
      capacity: capacity,
      proximity: '',
      signal: '',
      stay: '',
      limitations: ''
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
      name: 'services',
      label: 'Servicios',
      type: 'select',
      options: filtersOptions.services,
      defaultOption: 'Servicios'
    },
    {
      name: 'proximity',
      label: 'Próximos',
      type: 'select',
      options: filtersOptions.proximity,
      defaultOption: 'Elementos cercanos'
    },
    {
      name: 'signal',
      label: 'Señal telefónica',
      type: 'select',
      options: filtersOptions.signal,
      defaultOption: 'Tipo de señal telefónica'
    },
    {
      name: 'stay',
      label: 'Estancia',
      type: 'select',
      options: filtersOptions.stay,
      defaultOption: 'Estancia'
    },
    {
      name: 'capacity',
      label: 'Capacidad del aparcamiento',
      type: 'range',
      min: 1,
      max: capacity
    },
    {
      name: 'limitations',
      label: 'Limitaciones',
      type: 'select',
      options: filtersOptions.limitations,
      defaultOption: 'Limitaciones'
    }
  ]

  const filteredOvernights = overnights.filter((e) => {
    const chosenProvince = 
      filters.province === '' || e.province === filters.province
    
    const chosenServices = 
      filters.services === '' ||
      (Array.isArray(e.services)
      ? e.services.includes(filters.services)
      : e.services === filters.services)
  
    const chosenCapacity = 
      e.capacity <= Number(filters.capacity)
  
    const chosenProximity = 
      filters.proximity === '' || 
      (Array.isArray(e.proximity) 
      ? e.proximity.includes(filters.proximity) 
      : e.proximity === filters.proximity)
  
    const chosenSignal = 
      filters.signal === '' || e.signal === filters.signal
  
    const chosenStay = 
      filters.stay === '' || e.stay === filters.stay

    const chosenLimitations = 
      filters.limitations === '' || 
      (Array.isArray(e.limitations) 
      ? e.limitations.includes(filters.limitations)
      : e.limitations === filters.limitations)

    return (
      chosenProvince &&
      chosenServices &&
      chosenCapacity &&
      chosenProximity &&
      chosenSignal &&
      chosenStay &&
      chosenLimitations
    )
  })

  if (loading) return <p>Cargando rutas...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <Navbar />
      <h1>zonas de pernocta para descansar</h1>
      <OvernightsFilters 
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        filtersConfig={filtersConfig}
        resetFilters={resetFilters}
      />
      <section>
        {filteredOvernights.length === 0 ? (
          <p>Aún no existen rutas que coincidan con tu búsqueda</p>
        ) : (
          filteredOvernights.map((e) => (
            <div key={e._id}>
              <Link to={`/overnights/${e._id}`}>{e.name} - {e.province} - {e.limitations}</Link>
            </div>
          ))
        )}
      </section>
    </>
  )
}

export default OvernightsPage