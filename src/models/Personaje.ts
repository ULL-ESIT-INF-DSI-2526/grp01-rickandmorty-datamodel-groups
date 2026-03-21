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
   * Crea una nueva instancia de Personaje
   * @param _id - ID unico del personaje
   * @param _nombre - Nombre del personaje
   * @param _especie - Especie del personaje
   * @param _dimensionOrigen - Dimensión original del personaje
   * @param _estado - Estado del personaje actual
   * @param _afiliacion - Tipo de afiliación
   * @param _nivelInteligencia - Nivel de inteligencia entre 1 y 10
   * @param _descripcion - Breve descripción del personaje
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

  /** Permite acceder al atributo privado _id */
  get id(): number { return this._id; }

  /**
   * Permite modificar el atributo privado _id
   * @param id - Identificador nuevo
   */
  set id(id: number) { this._id = id; }

  /** Permite acceder al atributo privado _nombre */
  get nombre(): string { return this._nombre; }
  
  /**
   * Permite modificar el atributo privado _nombre
   * @param nombre - Nombre nuevo
   */
  set nombre(nombre: string) { this._nombre = nombre; }

  /** Permite acceder al atributo privado _especie */
  get especie(): Especie { return this._especie; }

  /**
   * Permite modificar el atributo privado _especie
   * @param especie - Instancia Especie nueva
   */
  set especie(especie: Especie) { this._especie = especie; }

  /** Permite acceder al atributo privado _dimensionOrigen */
  get dimensionOrigen(): Dimension { return this._dimensionOrigen; }

  /**
   * Permite modificar el atributo privado _dimensionOrigen
   * @param dimension - Instancia Dimension nueva
   */
  set dimensionOrigen(dimension: Dimension) { this._dimensionOrigen = dimension; }

  /** Permite acceder al atributo privado _estado */
  get estado(): EstadoPersonajes { return this._estado; }

  /**
   * Permite modificar el atributo privado _estado
   * @param estado - Tipo EstadoPersonaje nuevo
   */
  set estado(estado: EstadoPersonajes) { this._estado = estado; }

  /** Permite acceder al atributo privado _afiliacion */
  get afiliacion(): AfiliacionPersonajes { return this._afiliacion; }

  /**
   * Permite modificar el atributo privado _afiliacion
   * @param afiliacion - Tipo AfiliacionPersonajes nueva
   */
  set afiliacion(afiliacion: AfiliacionPersonajes) {
    this._afiliacion = afiliacion;
  }

  /** Permite acceder al atributo privado _nivelInteligencia*/
  get nivelInteligencia(): number {
    return this._nivelInteligencia;
  }

  /**
   * Permite modificar el atributo privado _nivelInteligencia
   * @param nivel - Nivel nuevo
   */
  set nivelInteligencia(nivel: number) {
    this.validarNivel(nivel);
    this._nivelInteligencia = nivel;
  }

  /** Permite acceder al atributo privado _descripcion */
  get descripcion(): string {
    return this._descripcion;
  }

  /**
   * Permite modificar el atributo privado _descripcion
   * @param descripcion - Descripción nueva
   */
  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /**
   * Validación del nivel de inteligencia, debe ser un número entero entre 1 y 10
   * @param nivel - Nivel que comprobar integridad
   */
  validarNivel(nivel: number): void {
    if (!Number.isInteger(nivel) || nivel < 1 || nivel > 10) {
      throw new Error(
        `[Personaje Error]: el nivel de inteligencia debe estar entre 1 y 10, se recibió: ${nivel}`,
      );
    }
  }
}
