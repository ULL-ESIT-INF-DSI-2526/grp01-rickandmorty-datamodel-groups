/**
 * Interfaz de una especie.
 */
export interface SpeciesData {
  /**
   * ID de la especie.
   */
  id: string;

  /**
   * Nombre de la especie.
   */
  name: string;

  /**
   * Origen de la especie.
   */
  origin: string;

  /**
   * Tipo de especie.
   */
  type: string;

  /**
   * Esperanza de vida media.
   */
  averageLifeExpectancy: number;

  /**
   * Descripción de la especie.
   */
  description: string;
}