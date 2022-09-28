import { selectRegiones } from "@assets/select-regiones"

export const obtenerComunas = (regionActual = '') => {
  if(regionActual === '') {
    return null
  }

  const region = selectRegiones.find(region => region.value === regionActual)
  return region.comunas
}