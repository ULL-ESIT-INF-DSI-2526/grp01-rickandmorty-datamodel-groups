import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js"
import { EstadoPersonajes } from "../types/EstadoPersonajes.js"

/**
 * contrato que deben seguir las estructuras de datos que representen personajes
 */
export interface IPersonaje {
  id: number,
  nombre: string,
  especie: string           // --> Cambiar a tipo Especie 
  dimensionOrigen: string   // --> Cambiar a tipo Dimension 
  estado: EstadoPersonajes
  afiliacion: AfiliacionPersonajes
  nivelInteligencia: number
  descripcion: string
}