import { IDimension } from "../interfaces/IDimension.js";
import { DimensionStatus } from "../types/Dimension.types.js";
import { IValidarNivel } from "../interfaces/IValidarNivel.js";
import { IValidar } from '../interfaces/IValidar.js';

/**
 * Clase que representa una instancia física de una Dimensión.
 * Contiene validaciones de integridad de datos
 */
export class Dimension implements IDimension, IValidarNivel, IValidar {
  /** 
   * Regex para validar la nomenclatura del Consejo de Ricks
   * Soporta formatos como C-137, J19ζ7, C-500A
   */
  private static readonly IdRegex = /^[A-Z](?:[0-9\-\u0370-\u03FF]+)[0-9A-Z\u0370-\u03FF]$/u;

  /**
   * Crea una nueva instancia de una Dimensión
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
    private _nombre: string,
    private _estado: DimensionStatus,
    private _nivelTecnologico: number,
    private _descripcion: string
  ) {
    this.validar();
    this.validarNivel(_nivelTecnologico);
  }

  /** Permite acceder al atributo privado ID */
  get id(): string { return this._id; }

  /** Permite acceder al atributo privado nombre */
  get nombre(): string { return this._nombre; }

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
    this.validarNivel(nuevo);
    this._nivelTecnologico = nuevo;
  }

  /** Permite acceder al atributo privado descripción */
  get descripcion(): string { return this._descripcion; }

  /**
   * Valida que el nivel tecnológico esté dentro del rango permitido
   * @param nivel - Valor numérico a evaluar
   */
  validarNivel(nivel: number) {
    if(!Number.isInteger(nivel) || nivel < 1 || nivel > 10) {
      throw new Error(`Nivel tecnológico inválido: "${nivel}" debe ser un número entero entre 1 y 10.`)
    }
  }

  /** Comprueba que los atributos pasados al constructor sean válidos */
  validar(): void {
    if(!Dimension.IdRegex.test(this._id)) {
      throw new Error(`Formato de ID inválido: "${this._id}" no sigue la nomenclatura del Consejo de Ricks.`);
    }
    if (this._nombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }
    if (this._descripcion.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }
  }
}