import { IPlanetas } from "../interfaces/IPlanetas.js";
import { IValidar } from "../interfaces/IValidar.js";
import { TipoLocalizaciones } from "../types/Localizaciones.js";
import { Dimension } from "./Dimension.js";

/** Representa una instancia física de un planeta o localización */
export class Planetas implements IPlanetas, IValidar {
  /**
   * @param id - ID único
   * @param nombre - Nombre 
   * @param tipo - Tipo de localización
   * @param dimension - Dimensión en la que se encuentra
   * @param poblacion - Número aproximado de la población
   * @param descripcion - Características destacadas
   */
  constructor(
    private readonly _id: string,
    private readonly _nombre: string,
    private readonly _tipo: TipoLocalizaciones,
    private readonly _dimension: Dimension,
    private _poblacion: number,
    private _descripcion: string
  ) {
    this.validar();
  }

  /** Permite acceder al atributo privado ID */
  get id(): string { return this._id; }

  /** Permite acceder al atributo privado Nombre */
  get nombre(): string { return this._nombre; }

  /** Permite acceder al atributo privado Tipo */
  get tipo(): TipoLocalizaciones { return this._tipo; }

  /** Permite acceder al atributo privado Dimensión */
  get dimension(): Dimension { return this._dimension; }

  /** Permite acceder al atributo privado Población */
  get poblacion(): number { return this._poblacion; }

  /** Permite acceder al atributo privado Descrición */
  get descripcion(): string { return this._descripcion; }

  /**
   * Permite dar un nuevo valor al atributo privado Población
   * @param nuevoNumero - Nuevo número aproximado de la población
   */
  set poblacion(nuevoNumero: number) { this._poblacion = nuevoNumero; }

  /**
   * Permite dar un nuevo valor al atributo privado Descripción
   * @param nuevasCaracteristicas - Nuevas características destacadas
   */
  set descripcion(nuevasCaracteristicas: string) { this._descripcion = nuevasCaracteristicas; }

  /** Comprueba que los atributos pasados al constructor sean válidos */
  validar(): void {
    if (this._id.trim() === "") {
      throw new Error("El ID no puede estar vacío");
    }
    if (this._nombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }
    if (this._descripcion.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }
  }
}