import { DimensionStatus } from "../types/dimansion.types.js";

/** Representa la estructura básica de una dimensión del multiverso */
export interface IDimension {
  /** Identificador único alfanumérico */
  id: string;
  /** Nombre coloquial o descriptivo de la dimensión */
  nombre: string;
  /** Estado actual de la dimensión */
  estado: DimensionStatus;
  /** Nivel de avance científico */
  nivelTecnologico: number;
  /** Notas sobre leyes físicas, biología o hitos históricos */
  descripcion: string;
}