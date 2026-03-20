import { TipoEvento } from "../types/TipoEvento.js";

/**
 * interfaz que define el contrato que debe seguir un evento del multiverso
 */
export interface IEvento {
  id: string,
  fecha: string,
  tipo: TipoEvento,
  descripcion: string,

  /** contrato para informes */
  idPersonaje?: string,
  idOrigen?: string,
  idDestino?: string,
  idArtefacto?: string
}