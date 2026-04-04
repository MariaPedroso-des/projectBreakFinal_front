const getJsonorError = async (response, defaultMessage) => {
  if(!response.ok) {
    throw new Error(defaultMessage)
  }

  return await response.json()
}

export const getHikingOptions = async (urlAPI) => {
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

  const province = await getJsonorError(provinceResponse, 'Error al cargar las provincias')
  const difficulty = await getJsonorError(difficultyResponse, 'Error al cargar la dificultad')
  const typeTerrain = await getJsonorError(terrainResponse, 'Error al cargar los tipos de terreno')
  const approvedFEDME = await getJsonorError(approvedResponse, 'Error al cargar las homologaciones')
  const accessWater = await getJsonorError(waterResponse, 'Error al cargar los accesos de agua')

  return {
    province,
    difficulty,
    typeTerrain,
    approvedFEDME,
    accessWater,
  }
}