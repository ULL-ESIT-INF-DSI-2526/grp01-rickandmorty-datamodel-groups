import { TipoEvento } from "../types/TipoEvento.js";

/** Interfaz que define el contrato que debe seguir un evento del multiverso */
export interface IEvento {
  id: string,
  fecha: string,
  tipo: TipoEvento,
  descripcion: string,

  /** Contrato para informes */
  idPersonaje?: string,
  idOrigen?: string,
  idDestino?: string,
  idArtefacto?: string
}