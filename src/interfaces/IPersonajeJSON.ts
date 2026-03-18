import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js"
import { EstadoPersonajes } from "../types/EstadoPersonajes.js"

/**
 * contrato que deben seguir las estructuras de datos que representen personajes
 */
export interface IPersonajeJSON {
  id: number,
  nombre: string,
  especie: string          
  dimensionOrigen: string
  estado: EstadoPersonajes
  afiliacion: AfiliacionPersonajes
  nivelInteligencia: number
  descripcion: string
}