import { IPersonaje } from "../interfaces/IPersonaje.js";
import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js";
import { EstadoPersonajes } from "../types/EstadoPersonajes.js";
import { IValidarNivel } from "../interfaces/IValidarNivel.js";
import { Dimension } from "./Dimension.js";
import { Especie } from "./Especie.js";

/**
 * Clase Personaje que representa una instancia física de un Personaje
 * conteniendo validaciones de integridad de datos y referencias a
 * otras clases que representan otras estructuras de datos del universo
 */
export class Personaje implements IPersonaje, IValidarNivel {
  /**
   *
   * @param _id - id unico del personaje
   * @param _nombre - nombre del personaje
   * @param _especie - especie del personaje
   * @param _dimensionOrigen  - dimension original del personaje
   * @param _estado - estado del personaje actual
   * @param _afiliacion - tipo de afiliacion
   * @param _nivelInteligencia - nivel de inteligencia entre 1 y 10
   * @param _descripcion - breve descripcion del personaje
   */
  constructor(
    private _id: number,
    private _nombre: string,
    private _especie: Especie,
    private _dimensionOrigen: Dimension,
    private _estado: EstadoPersonajes,
    private _afiliacion: AfiliacionPersonajes,
    private _nivelInteligencia: number,
    private _descripcion: string,
  ) {
    this.validarNivel(_nivelInteligencia);
  }

  /** getter del atributo privado id */
  get id(): number {
    return this._id;
  }

  /**
   * setter del atributo privado id
   * @param id - number identificador nuevo
   */
  set id(id: number) {
    this._id = id;
  }

  /** getter del atributo privado nombre */
  get nombre(): string {
    return this._nombre;
  }
  
  /**
   * setter del atributo privado nombre
   * @param nombre - string nombre nuevo
   */
  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /** getter del atributo privado especie */
  get especie(): Especie {
    return this._especie;
  }

  /**
   * setter del atributo privado especie
   * @param especie - instancia Especie nueva
   */
  set especie(especie: Especie) {
    this._especie = especie;
  }

  /** getter del atributo privado dimension de origen */
  get dimensionOrigen(): string {
    return this._dimensionOrigen;
  }

  /**
   * setter del atributo privado dimension de origen
   * @param dimension - instancia Dimension nueva
   */
  set dimensionOrigen(dimension: Dimension) {
    this._dimensionOrigen = dimension;
  }

  /** getter del atributo privado estado del personaje */
  get estado(): EstadoPersonajes {
    return this._estado;
  }

  /**
   * setter del atributo privado estado del personaje
   * @param estado - tipo EstadoPersonaje nuevo
   */
  set estado(estado: EstadoPersonajes) {
    this._estado = estado;
  }

  /**
   * getter del atributo privado afiliacion del personaje
   */
  get afiliacion(): AfiliacionPersonajes {
    return this._afiliacion;
  }

  /**
   * setter del atributo privado afiliacion del personaje
   * @param afiliacion - tipo AfiliacionPersonajes nueva
   */
  set afiliacion(afiliacion: AfiliacionPersonajes) {
    this._afiliacion = afiliacion;
  }

  /** getter del atributo privado nivel de inteligencia del personaje */
  get nivelInteligencia(): number {
    return this._nivelInteligencia;
  }

  /**
   * setter del atributo privado nivel de inteligencia del personaje
   * @param nivel - number nivel nuevo
   */
  set nivelInteligencia(nivel: number) {
    this.validarNivel(nivel);
    this._nivelInteligencia = nivel;
  }

  /** getter del atributo privado nivel de inteligencia del personaje */
  get descripcion(): string {
    return this._descripcion;
  }

  /**
   * setter del atributo privado descripcion del personaje
   * @param descripcion - string descripcion nueva
   */
  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /**
   * validacion del nivel de inteligencia, debe ser un numero entero entre 1 y 10
   * @param nivel - nivel que comprobar integridad
   */
  validarNivel(nivel: number): void {
    if (!Number.isInteger(nivel) || nivel < 1 || nivel > 10) {
      throw new Error(
        `[Personaje Error]: el nivel de inteligencia debe estar entre 1 y 10, se recibió: ${nivel}`,
      );
    }
  }
}
