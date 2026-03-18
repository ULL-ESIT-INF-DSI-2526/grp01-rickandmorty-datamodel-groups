import { IPlanetaJSON } from "../interfaces/IPlanetaJSON.js";
import { Planetas } from "../models/Planetas.js"; // Asumiendo que tu clase se llama Planetas
import { Dimension } from "../models/Dimension.js";

export class PlanetaAdapter {
  /**
   * De JSON a Clase 
   * @param raw - Datos planos del JSON
   * @param dimension - El objeto Dimension real ya instanciado
   */
  public static toDomain(raw: IPlanetaJSON, dimension: Dimension): Planetas {
    return new Planetas(
      raw.id,
      raw.nombre,
      raw.tipo,
      dimension,
      raw.poblacion,
      raw.descripcion
    );
  }

  /**
   * De Clase a JSON 
   * @param p - Instancia de la clase Planetas
   */
  public static toPersistence(p: Planetas): IPlanetaJSON {
    return {
      id: p.id,
      nombre: p.nombre,
      tipo: p.tipo,
      dimension: p.dimension.id, 
      poblacion: p.poblacion,
      descripcion: p.descripcion
    };
  }
}