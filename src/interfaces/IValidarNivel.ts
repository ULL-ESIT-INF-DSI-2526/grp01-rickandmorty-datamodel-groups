/** Interfaz que define un contrato, para proporcionar un método que valide niveles entre 1-10 */
export interface IValidarNivel {
  /**
   * Método que valida niveles cuyo rango es del 1 al 10
   * @param nivel - Nivel a ser validado
   */
  validarNivel(nivel: number): void
}