/**
 * Interfaz de una especie.
 */
export interface SpecieData {
  /**
   * ID.
   */
  id: string;

  /**
   * Nombre.
   */
  name: string;

  /**
   * Origen.
   */
  origin: string;

  /**
   * Tipo.
   */
  type: string;

  /**
   * Esperanza de vida media.
   */
  averageLifeExpectancy: number;

  /**
   * Descripción.
   */
  description: string;
}