import { IDimension } from "./IDimension.js";
import { IEntity } from "./IEntity.js";
import { IEspecie } from "./IEspecie.js";
import { IInventoJSON } from "./IInventoJSON.js";
import { IPersonajeJSON } from "./IPersonajeJSON.js";
import { IPlanetaJSON } from "./IPlanetaJSON.js";

export interface IEsquema {
  personajes: IPersonajeJSON[];
  dimensiones: IDimension[];
  especies: IEspecie[];
  inventos: IInventoJSON[];
  planetas: IPlanetaJSON[];
}