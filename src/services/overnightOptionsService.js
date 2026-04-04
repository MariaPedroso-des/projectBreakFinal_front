const getJsonorError = async (response, defaultMessage) => {
  if(!response.ok) {
    throw new Error(defaultMessage)
  }

  return await response.json()
}

export const getOvernightOptions = async (urlAPI) => {
  const [
    provinceResponse,
    servicesResponse,
    proximityResponse,
    signalResponse,
    stayResponse,
    limitationsResponse,
  ] = await Promise.all([
    fetch(`${urlAPI}/api/utils/province`),
    fetch(`${urlAPI}/api/utils/services`),
    fetch(`${urlAPI}/api/utils/proximity`),
    fetch(`${urlAPI}/api/utils/signal`),
    fetch(`${urlAPI}/api/utils/limitations`),
  ])

  const province = await getJsonorError(provinceResponse, 'Error al cargar las provincias')
  const services = await getJsonorError(servicesResponse, 'Error al cargar los servicios')
  const proximity = await getJsonorError(proximityResponse, 'Error al cargar los elementos próximos')
  const signal = await getJsonorError(signalResponse, 'Error al cargar el tipo de señal telefónica')
  const stay = await getJsonorError(stayResponse, 'Error al cargar la estancia')
  const limitations = await getJsonorError(limitationsResponse, 'Error al cargar las limitaciones')

  return ([
    province, 
    services,
    proximity,
    signal,
    stay,
    limitations,
  ])

}