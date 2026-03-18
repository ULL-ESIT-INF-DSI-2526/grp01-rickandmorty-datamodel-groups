import { IPersonajeJSON } from "../interfaces/IPersonajeJSON.js";
import { Dimension } from "../models/Dimension.js";
import { Especie } from "../models/Especie.js";
import { Personaje } from "../models/Personaje.js";

export class PersonajeAdapter {
  // De JSON a Clase 
  public static toDomain(
    raw: IPersonajeJSON, 
    especie: Especie, 
    dimension: Dimension
  ): Personaje {
    return new Personaje(
      raw.id,
      raw.nombre,
      especie,
      dimension,
      raw.estado,
      raw.afiliacion,
      raw.nivelInteligencia,
      raw.descripcion
    );
  }

  // De Clase a JSON
  public static toPersistence(p: Personaje): IPersonajeJSON {
    return {
      id: p.id,
      nombre: p.nombre,
      especieNombre: p.especie.nombre,
      dimensionOrigenID: p.dimensionOrigen.id,
      estado: p.estado,
      afiliacion: p.afiliacion,
      nivelInteligencia: p.nivelInteligencia,
      descripcion: p.descripcion
    };
  }
}