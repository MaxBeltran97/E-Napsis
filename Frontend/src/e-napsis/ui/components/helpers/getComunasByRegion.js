import { regiones } from "../../data/comunas-regiones";

export const getComunasByRegion = ( regionValue ) => {
    return regiones.find(region => region.value === regionValue)
}