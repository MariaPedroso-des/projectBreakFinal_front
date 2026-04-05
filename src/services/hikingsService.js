const getErrorMessage = async (response, defaultMessage) => {
  try {
    const data = await response.json()
    return data.message ||data.error || defaultMessage
  } catch {
    return defaultMessage
  }
}

export const getAllHikings = async (urlAPI) => {
  const response = await fetch(`${urlAPI}/api/hikings`)

  if (!response.ok) {
    const message = await getErrorMessage(response, 'No se ha podido cargar las rutas')
    throw new Error(message)
  }

  const data = await response.json()
  return data.hikings || []
}

export const getHikingById = async (urlAPI, id) => {
  const response = await fetch(`${urlAPI}/api/hikings/${id}`)

  if (!response.ok) {
    const message = await getErrorMessage(response, 'No se ha podido cargar la ruta')
    throw new Error(message)
  }

  return await response.json()
}

export const createHiking = async (urlAPI, payload) => {
  const response = await fetch(`${urlAPI}/api/hikings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })

  if(!response.ok) {
    const message = await getErrorMessage(response, 'Error al intentar crear la ruta')
    throw new Error(message)
  }

  return await response.json()
}

export const updateHiking = async (urlAPI, id, payload) => {
  const response = await fetch(`${urlAPI}/api/hikings/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })

  if(!response.ok) {
    const message = await getErrorMessage(response, 'Error al intentar editar la ruta')
    throw new Error(message)
  }

  return await response.json()
}

export const deleteHiking = async (urlAPI, id) => {
  const response = await fetch(`${urlAPI}/api/hikings/${id}`, {
    method: 'DELETE',
  })

  if(!response.ok) {
    const message = await getErrorMessage(response, 'Error al intentar eliminar la ruta')
    throw new Error(message)
  }

  return await response.json()
}