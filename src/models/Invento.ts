import { Personaje } from "./Personaje.js";
import { TipoInvento } from "../types/TipoInventos.js";
import { IInvento } from "../interfaces/IInvento.js";
import { IValidarNivel } from "../interfaces/IValidarNivel.js";

/** Clase que representa un invento del multiverso */
export class Invento implements IInvento, IValidarNivel {
  
  /**
   * Crea una nueva instancia de Invento
   * @param _id - Identificador único del invento
   * @param _nombre - Nombre del invento
   * @param _inventor - Personaje que lo invento
   * @param _tipo - Tipo de artefacto
   * @param _nivelPeligrosidad - Nivel de peligrosidad del 1 al 10
   * @param _descripcion - Descripción del invento y sus efectos
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

  /** Permite acceder al atributo privado _id */
  get id(): number {
    return this._id;
  }

  /**
   * Permite modificar el atributo privado _id
   * @param id - Identificador nuevo
   */
  set id(id: number) {
    this._id = id;
  }

  /** Permite acceder al atributo privado _nombre */
  get nombre(): string {
    return this._nombre;
  }

  /**
   * Permite modificar el atributo privado _nombre
   * @param nombre - Nombre nuevo
   */
  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /** Permite acceder al atributo privado _inventor */
  get inventor(): Personaje {
    return this._inventor;
  }

  /**
   * Permite modificar el atributo privado _inventor
   * @param inventor - Personaje nuevo
   */
  set inventor(inventor: Personaje) {
    this._inventor = inventor;
  }
  
  /** Permite acceder al atributo privado _tipo */
  get tipo(): TipoInvento {
    return this._tipo
  }

  /**
   * Permite modificar el atributo privado _tipo
   * @param tipoInvento - TipoInvento nuevo
   */
  set tipo(tipoInvento: TipoInvento) {
    this._tipo = tipoInvento
  }

  /** Permite acceder al atributo privado _nivelPeligrosidad */
  get nivelPeligrosidad(): number {
    return this._nivelPeligrosidad;
  }

  /**
   * Permite modificar el atributo privado _nivelPeligrosidad
   * @param nivel - Nivel de peligrosidad nuevo
   */
  set nivelPeligrosidad(nivel: number) {
    this.validarNivel(nivel);
    this._nivelPeligrosidad = nivel;
  }

  /** Permite acceder al atributo privado _description */
  get descripcion(): string {
    return this._descripcion;
  }

  /**
   * Permite modificar el atributo privado _description
   * @param descripcion - Descripción nueva
   */
  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /**
   * Validacion del nivel de peligrosidad, debe ser un número entero entre 1 y 10
   * @param nivel - Nivel que comprobar integridad
   */
  validarNivel(nivel: number): void {
    if (!Number.isInteger(nivel) || nivel < 1 || nivel > 10) {
      throw new Error(
        `[Invento Error]: el nivel de peligrosidad debe estar entre 1 y 10, se recibió: ${nivel}`,
      );
    }
  }
}
