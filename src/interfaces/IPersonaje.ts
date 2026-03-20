import { Dimension } from "../models/Dimension.js"
import { Especie } from "../models/Especie.js"
import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js"
import { EstadoPersonajes } from "../types/EstadoPersonajes.js"

/**
 * contrato que deben seguir las estructuras de datos que representen personajes
 */
export interface IPersonaje {
  id: number,
  nombre: string,
  especie: Especie          
  dimensionOrigen: Dimension   
  estado: EstadoPersonajes
  afiliacion: AfiliacionPersonajes
  nivelInteligencia: number
  descripcion: string
}