import { IEntity } from "./IEntity.js";

export interface IEsquema {
  personajes: IEntity[];
  dimensiones: IEntity[];
  especies: IEntity[];
  inventos: IEntity[];
  planetas: IEntity[];
}