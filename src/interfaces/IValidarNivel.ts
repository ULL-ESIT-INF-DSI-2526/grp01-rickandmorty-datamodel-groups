/**
 * interfaz que define un contrato, para proporcionar un metodo que valide niveles entre 1-10
 */
export interface IValidarNivel {
  validarNivel(nivel: number): void
}