import { IDimension } from "./IDimension.js";
import { SpecieData } from "./IEspecie.js";
import { IEvento } from "./IEvento.js";
import { IInventoJSON } from "./IInventoJSON.js";
import { IPersonajeJSON } from "./IPersonajeJSON.js";
import { IPlanetaJSON } from "./IPlanetaJSON.js";

/**
 * interfaz que define el esquema que aceotara el json
 */
export interface IEsquema {
  personajes: IPersonajeJSON[];
  dimensiones: IDimension[];
  especies: SpecieData[];
  inventos: IInventoJSON[];
  planetas: IPlanetaJSON[];
  eventos: IEvento[]
}