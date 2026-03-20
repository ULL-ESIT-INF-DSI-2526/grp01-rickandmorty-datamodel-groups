/**
 * contrato que debe seguir un informe de inventos
 */
export interface IInformeInvento {
  nombre: string;
  peligro: number;
  inventor: string;
  localizacion: string;
}