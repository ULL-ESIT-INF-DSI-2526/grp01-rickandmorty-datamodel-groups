/**
 * Interfaz JSON de una especie.
 */
export interface IEspecieJSON {
  /**
   * ID.
   */
  id: string;

  /**
   * Nombre.
   */
  nombre: string;

  /**
   * Origen.
   */
  origen: string;

  /**
   * Tipo.
   */
  tipo: string;

  /**
   * Esperanza de vida media.
   */
  esperanzaVidaMedia: number;

  /**
   * Descripción.
   */
  descripcion: string;
}