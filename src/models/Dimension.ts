import { IDimension } from "../interfaces/IDimension.js";
import { DimensionStatus } from "../types/dimansion.types.js";

/**
 * Clase que representa una instancia física de una Dimensión.
 * Contiene validaciones de integridad de datos
 */
export class Dimension implements IDimension {
  /** 
   * Regex para validar la nomenclatura del Consejo de Ricks
   * Soporta formatos como C-137, J19ζ7, C-500A
   */
  private static readonly IdRegex = /^[A-Z](?:[0-9\-\u0370-\u03FF]+)[0-9A-Z\u0370-\u03FF]$/u;

  /**
   * 
   * @param id - ID único
   * @param nombre - Nombre descriptivo
   * @param estado - Estado actual
   * @param nivelTecnologico - Nivel entre 1 y 10
   * @param descripcion - Detalles adicionales
   * * @throws Error si el ID no sigue la nomenclatura del Consejo de Ricks
   * * @throws Error si el nivel tecnológico no es un entero entre 1 y 10
   */
  constructor(
    private _id: string,
    public nombre: string,
    private _estado: DimensionStatus,
    private _nivelTecnologico: number,
    public descripcion: string
  ) {
    this.validarID(_id);
    this.validarNivelTecnologico(_nivelTecnologico);
  }

  /** Permite acceder al atributo privado ID */
  get id(): string { return this._id; }

  /**
   * Permite dar un nuevo valor al atributo privado ID
   * @param nuevo - Nuevo identificador
   */
  set id(nuevo: string) {
    this.validarID(nuevo);
    this._id = nuevo;
  }

  /** Permite acceder al atributo privado Estado */
  get estado(): DimensionStatus { return this._estado; }

  /**
   * Permite dar un nuevo valor al atributo privado Estado
   * @param nuevo - Nuevo estado
   */
  set estado(nuevo: DimensionStatus) { this._estado = nuevo; }
  
  /** Permite acceder al atributo privado NivelTecnologico */
  get nivelTecnologico(): number { return this._nivelTecnologico; }

  /**
   * Permite dar un nuevo valor al atributo privado NivelTecnologico
   * @param nuevo - Nuevo nivel tecnológico
   */
  set nivelTecnologico(nuevo: number) {
    this.validarNivelTecnologico(nuevo);
    this._nivelTecnologico = nuevo;
  }

  /**
   * Valida que el ID siga el formato correcto
   * @param id - Identificador a validar
   */
  private validarID(id: string) {
    if(!Dimension.IdRegex.test(id)) {
      throw new Error(`Formato de ID inválido: "${id}" no sigue la nomenclatura del Consejo de Ricks.`);
    }
  }

  /**
   * Valida que el nivel tecnológico esté dentro del rango permitido
   * @param nivel - Valor numérico a evaluar
   */
  private validarNivelTecnologico(nivel: number) {
    if(!Number.isInteger(nivel) || nivel < 1 || nivel > 10) {
      throw new Error(`Nivel tecnológico inválido: "${nivel}" debe ser un número entero entre 1 y 10.`)
    }
  }
}