import { IDimension } from "./IDimension.js";
import { IEspecieJSON } from "./IEspecieJSON.js";
import { IEvento } from "./IEvento.js";
import { IInventoJSON } from "./IInventoJSON.js";
import { IPersonajeJSON } from "./IPersonajeJSON.js";
import { IPlanetaJSON } from "./IPlanetaJSON.js";

/** Interfaz que define el esquema que aceptará el JSON */
export interface IEsquema {
  personajes: IPersonajeJSON[];
  dimensiones: IDimension[];
  especies: IEspecieJSON[];
  inventos: IInventoJSON[];
  planetas: IPlanetaJSON[];
  eventos: IEvento[];
}