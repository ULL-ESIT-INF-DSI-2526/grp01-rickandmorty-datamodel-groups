import { Dimension } from "../models/Dimension.js";
import { TipoLocalizaciones } from "../types/Localizaciones.js"

/** Representa la estructura bñasica de un planeta o localización */
export interface IPlanetas {
  /** Identificador único alfanumérico */
  id: string;
  /** Nombre del planeta o localización */
  nombre: string;
  /** Tipo de localización */
  tipo: TipoLocalizaciones;
  /** Dimensión en la que se encuentra */
  dimension: Dimension;
  /** Número aproximado de población */
  poblacion: number;
  /** Características geográficas, políticas o históricas */
  descripcion: string;
}