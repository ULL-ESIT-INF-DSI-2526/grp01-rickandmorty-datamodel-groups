import { TipoInvento } from "../types/TipoInventos.js";

/** Representa la estructura basica de un invento o artefacto */
export interface IInventoJSON {
  /** Identificador único alfanumérico */
  id: number;
  /** Nombre del invento o artefacto */
  nombre: string;
  /**Referencia al personaje que lo creó */
  inventor: string;
  /** Tipo de invento o artefacto */
  tipo: TipoInvento;
  /** Nivel de peligrosidad del invento o artefacto */
  nivelPeligrosidad: number;
  /** Explicacion del funcionamiento y efectos conocidos o desconocidos */
  descripcion: string;
}
