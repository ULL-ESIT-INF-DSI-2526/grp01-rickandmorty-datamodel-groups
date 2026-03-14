import { IPersonaje } from "../interfaces/IPersonaje.js";
import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js";
import { EstadoPersonajes } from "../types/EstadoPersonajes.js";

export class Personaje implements IPersonaje {
  constructor(
    private readonly _id: number,
    private readonly _nombre: string,
    private readonly _especie: string,          // --> cambiar a tipo Especie
    private readonly _dimensionOrigen: string,   // --> cambiar a tipo Dimension
    private readonly _estado: EstadoPersonajes,
    private readonly _afiliacion: AfiliacionPersonajes,
    private readonly _nivelInteligencia: number,
    private readonly _descripcion: string
  ) {
    if(_nivelInteligencia < 1 || _nivelInteligencia > 10) {
      throw new Error(
        `[Personaje Error]: el nivel de inteligencia debe estar entre 1 y 10, se recibió: ${_nivelInteligencia}`
      )
    }
  }

  /**getters */
  get id(): number { return this._id }
  get nombre(): string { return this._nombre }
  get especie(): string { return this._especie }
  get dimensionOrigen(): string { return this._dimensionOrigen }
  get estado(): EstadoPersonajes { return this._estado }
  get afiliacion(): AfiliacionPersonajes { return this._afiliacion }
  get nivelInteligencia(): number { return this._nivelInteligencia }
  get descripcion(): string { return this._descripcion }

  
}