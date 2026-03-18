import { Personaje } from "./Personaje.js";
import { TipoInvento } from "../types/TipoInventos.js";
import { IInvento } from "../interfaces/IInvento.js";
import { IValidarNivel } from "../interfaces/IValidarNivel.js";

export class Invento implements IInvento, IValidarNivel {
  
  /**
   * 
   * @param _id - identificador unico del invento
   * @param _nombre - nombre del invento
   * @param _inventor - Personaje que lo invento
   * @param _tipo - tipo de artefacto
   * @param _nivelPeligrosidad - nivel de peligrosidad del 1 al 10
   * @param _descripcion - descripcion del invento y sus efectos
   */
  constructor(
    private _id: number,
    private _nombre: string,
    private _inventor: Personaje,
    private _tipo: TipoInvento,
    private _nivelPeligrosidad: number,
    private _descripcion: string,
  ) {
    this.validarNivel(_nivelPeligrosidad);
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

  /** getter del atributo privado inventor */
  get inventor(): Personaje {
    return this._inventor;
  }

  /**
   * setter del atributo privado inventor
   * @param inventor - Personaje nuevo
   */
  set inventor(inventor: Personaje) {
    this._inventor = inventor;
  }
  
  /** getter del atributo privado tipo de invento */
  get tipo(): TipoInvento {
    return this._tipo
  }

  /**
   * setter del atributo privado nombre
   * @param tipoInvento - TipoInvento nuevo
   */
  set tipo(tipoInvento: TipoInvento) {
    this._tipo = tipoInvento
  }

  /** getter del atributo privado nivel de peligrosidad del invento */
  get nivelPeligrosidad(): number {
    return this._nivelPeligrosidad;
  }

  /**
   * setter del atributo privado nivel de peligrosidad del invento
   * @param nivel - number nivel nuevo
   */
  set nivelPeligrosidad(nivel: number) {
    this.validarNivel(nivel);
    this._nivelPeligrosidad = nivel;
  }

  /** getter del atributo privado descripcion del invento */
  get descripcion(): string {
    return this._descripcion;
  }

  /**
   * setter del atributo privado descripcion del invento
   * @param descripcion - string descripcion nueva
   */
  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /**
   * validacion del nivel de peligrosidad, debe ser un numero entero entre 1 y 10
   * @param nivel - nivel que comprobar integridad
   */
  validarNivel(nivel: number): void {
    if (!Number.isInteger(nivel) || nivel < 1 || nivel > 10) {
      throw new Error(
        `[Invento Error]: el nivel de peligrosidad debe estar entre 1 y 10, se recibió: ${nivel}`,
      );
    }
  }
}
