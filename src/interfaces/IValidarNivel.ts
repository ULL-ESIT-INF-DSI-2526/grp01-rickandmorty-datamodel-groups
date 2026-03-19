/**
 * interfaz que define un contrato, para proporcionar un metodo que valide niveles entre 1-10
 */
export interface IValidarNivel {
  /**
   * 
   * @param nivel - numero que representa el nivel a ser validado
   */
  validarNivel(nivel: number): void
}