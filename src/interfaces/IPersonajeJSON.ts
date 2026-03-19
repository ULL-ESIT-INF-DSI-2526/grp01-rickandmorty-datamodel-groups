import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js"
import { EstadoPersonajes } from "../types/EstadoPersonajes.js"

/**
 * contrato que deben seguir las estructuras de datos que representen personajes
 */
export interface IPersonajeJSON {
  id: number;
  nombre: string;
  
  // Referencia a Especie
  especieId: string | number; 
  // Referencia a Dimension
  dimensionId: string | number;

  estado: EstadoPersonajes;
  afiliacion: AfiliacionPersonajes;
  nivelInteligencia: number;
  descripcion: string;
}