import { Dimension } from "../models/Dimension.js";
import { Planetas } from "../models/Planetas.js";

/** Interfaz de una especie */
export interface SpecieData {
  /** Identificador único */
  id: string;
  /** Nombre */
  name: string;
  /** Origen */
  origin: Dimension | Planetas;
  /** Tipo */
  type: string;
  /** Esperanza de vida media */
  averageLifeExpectancy: number;
  /** Descripción */
  description: string;
}