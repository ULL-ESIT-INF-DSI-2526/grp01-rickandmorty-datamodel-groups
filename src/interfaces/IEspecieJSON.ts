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
   * ID del origen.
   */
  origenId: string;

  /**
   * Tipo del origen.
   */
  origenTipo: "dimension" | "planeta";

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