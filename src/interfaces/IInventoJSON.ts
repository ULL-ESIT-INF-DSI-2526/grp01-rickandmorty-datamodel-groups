import { TipoInvento } from "../types/TipoInventos.js";

/** Representa la estructura basica de un invento o artefacto */
export interface IInventoJSON {
  id: number;
  nombre: string;
  
  /** Referencia a Inventor */
  inventorId: number;
  
  tipo: TipoInvento;
  nivelPeligrosidad: number;
  descripcion: string;
}