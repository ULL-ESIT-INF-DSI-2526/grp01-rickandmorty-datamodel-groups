/**
 * Interfaz de una especie.
 */
export interface SpeciesData {
  /**
   * ID.
   */
  readonly id: string;

  /**
   * Nombre.
   */
  readonly name: string;

  /**
   * Origen.
   */
  readonly origin: string;

  /**
   * Tipo.
   */
  readonly type: string;

  /**
   * Esperanza de vida media.
   */
  readonly averageLifeExpectancy: number;

  /**
   * Descripción.
   */
  readonly description: string;
}