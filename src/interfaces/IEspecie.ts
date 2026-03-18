/**
 * Interfaz de una especie.
 */
export interface IEspecie {
  /**
   * ID de la especie.
   */
  id: string;

  /**
   * Nombre de la especie.
   */
  nombre: string;

  /**
   * Origen de la especie.
   */
  origen: string;

  /**
   * Tipo de especie.
   */
  tipo: string;

  /**
   * Esperanza de vida media.
   */
  averageLifeExpectancy: number;

  /**
   * Descripción de la especie.
   */
  descripcion: string;
}