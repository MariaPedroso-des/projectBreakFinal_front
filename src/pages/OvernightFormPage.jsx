import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

  const initialFormData = {
    name: '',
    province: '',
    description: '',
    capacity: '',
    image: '',
    mapsLink: '',
    services: [],
    proximity: [],
    signal: 'sin definir',
    stay: 'sin definir',
    limitations: []
  }

const OvernightFormPage = () => {
  const navigate = useNavigate()
  const urlAPI = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'

  const [formData, setFormData] = useState(initialFormData)

  const [options, setOptions] = useState({
    province: [],
    services: [],
    proximity: [],
    signal: [],
    stay: [],
    limitations: []
  })

  const [loading, setLoading] = useState(false)
  const[loadingOptions, setLoadingOptions] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          provinceResponse,
          servicesResponse,
          proximityResponse,
          signalResponse,
          stayResponse,
          limitationsResponse
        ] = await Promise.all([
          fetch(`${urlAPI}/api/utils/province`),
          fetch(`${urlAPI}/api/utils/services`),
          fetch(`${urlAPI}/api/utils/proximity`),
          fetch(`${urlAPI}/api/utils/signal`),
          fetch(`${urlAPI}/api/utils/stay`),
          fetch(`${urlAPI}/api/utils/limitations`)
        ])
        if (
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

        const provinceData = await provinceResponse.json()
        const servicesData = await servicesResponse.json()
        const proximityData = await proximityResponse.json()
        const signalData = await signalResponse.json()
        const stayData = await stayResponse.json()
        const limitationsData = await limitationsResponse.json()


        setOptions({
          province: provinceData,
          services: servicesData,
          proximity: proximityData,
          signal: signalData,
          stay: stayData,
          limitations: limitationsData
        })

      } catch (error) {
        console.log(error)
        setError('Error al cargar los las pociones del formulario')
      } finally {
        setLoadingOptions(false)
      }
    }
    fetchOptions()
  }, [urlAPI])


  const handleChange = (e) => {

    const { name, value } = e.target
    
    setFormData((preFormData) => ({
    ...preFormData,
    [name]: value,
    }))
  }

  const handleArrayChange = (e) => {

    const { name, value, checked } = e.target
    console.log('name:', name, 'valor actual:', formData[name])

    
    setFormData((preFormData) => ({
      ...preFormData,
      [name]: checked ? [...preFormData[name], value] : preFormData[name].filter((e) => e !== value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const isValidUrl = (value) => {
      if (!value) return true

      try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch {
        return false
      }
    }

    if (!formData.name.trim() ||
        !formData.province ||
        !formData.description.trim() ||
        !formData.capacity  
    ) {
      setError('Hay campos obligatorios sin completar')
      return
    }
    if (formData.name.trim().length < 3) {
      setError('El campo nombre debe tener al menos 3 caracteres')
      return
    }
    
    if (!isValidUrl(formData.mapsLink) || !isValidUrl(formData.image)) {
      setError('La URL no tiene un formato válido')
      return
    }

    const payload = {
      name: formData.name,
      province: formData.province,
      description: formData.description,
      capacity: Number(formData.capacity),
      image: formData.image,
      mapsLink: formData.mapsLink,
      services: formData.services.length > 0 ? formData.services : ['sin definir'],
      proximity: formData.proximity.length > 0 ? formData.proximity : ['sin definir'],
      signal: formData.signal || 'sin definir',
      stay: formData.stay || 'sin definir',
      limitations: formData.limitations.length > 0 ? formData.limitations : ['sin definir']
    }

    try {
      setLoading(true)

      const  response =  await fetch(`${urlAPI}/api/overnights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la zona de pernocta')
      }

      alert('Zona de descanso creada!')
      navigate('/overnights')

    } catch (error) {
      console.log(error)
      setError(error.message || 'Error al crear la zona de pernocta')
    } finally {
      setLoading(false)
    }
  }
  if (loadingOptions) return <p>Cargango página...</p>

  return (
    <>
      <Navbar />
      <section>
        <h1>Publicar nueva pernocta</h1>
      </section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre </label>
          <input 
            id="name"
            name="name"
            type="text"
            placeholder='Nombre de la zona'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descripción </label>
          <textarea 
            id="description"
            name="description"
            placeholder='Descripción de la zona'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="province">Provincia </label>
          <select
            id="province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required 
          >
            <option value="">Selecciona la provincia</option>
              {options.province.map((province) => {
                return (
                <option key={province} value={province}>
                  {province}
                  </option>
                  )
              })}
          </select>
        </div>

        <div>
          <label htmlFor="capacity">Número aproximado de parcamientos </label>
          <input 
            id="capacity"
            name="capacity"
            placeholder="3"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
            max="50"
          />
        </div>

        <fieldset>
          <legend>Servicios </legend>
            {options.services.map((service) => {
              return (
                <label key={service}>
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleArrayChange}
                  />
                  {service}
                </label>
              )
            })}
        </fieldset>

        <fieldset>
          <legend>Proximidad </legend>
            {options.proximity.map((proximity) => {
              return (
                <label key={proximity}>
                  <input
                    type="checkbox"
                    name="proximity"
                    value={proximity}
                    checked={formData.proximity.includes(proximity)}
                    onChange={handleArrayChange}
                  />
                  {proximity}
                </label>
              )
            })}
        </fieldset>

        <div>
          <label htmlFor="signal">Señal telefónica </label>
          <select
            id="signal"
            name="signal"
            value={formData.signal}
            onChange={handleChange}
            required 
          >
            <option value="">Selecciona la señal telefónica disponible </option>
              {options.signal.map((signal) => {
                return (
                <option key={signal} value={signal}>
                  {signal}
                  </option>
                  )
              })}
          </select>
        </div>

        <div>
          <label htmlFor="stay">Limitación de estancia </label>
          <select
            id="stay"
            name="stay"
            value={formData.stay}
            onChange={handleChange}
            required 
          >
            <option value="">Selecciona la limitación de tiempo</option>
              {options.stay.map((stay) => {
                return (
                <option key={stay} value={stay}>
                  {stay}
                  </option>
                  )
              })}
          </select>
        </div>

        <fieldset>
          <legend>Limitaciones generales </legend>
            {options.limitations.map((limitation) => {
              return (
                <label key={limitation}>
                  <input
                    type="checkbox"
                    name="limitations"
                    value={limitation}
                    checked={formData.limitations.includes(limitation)}
                    onChange={handleArrayChange}
                  />
                  {limitation}
                </label>
              )
            })}
        </fieldset>

        <div>
          <label htmlFor="image">URL de la imagen </label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="mapsLink">URL de la ubicación </label>
          <input
            id="mapsLink"
            name="mapsLink"
            type="url"
            value={formData.mapsLink}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        {error && <p>{error}</p>}
        
        <button className='btnPublish' type='submit' disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar zona de pernocta'}
        </button>
      </form>
    </>
  )
}

export default OvernightFormPage