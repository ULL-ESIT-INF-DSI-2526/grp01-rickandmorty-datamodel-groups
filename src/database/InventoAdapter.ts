import { IInventoJSON } from "../interfaces/IInventoJSON.js";
import { Invento } from "../models/Invento.js";
import { Personaje } from "../models/Personaje.js";

export class InventoAdapter {
  /**
   * De JSON a Clase 
   * @param raw - El objeto plano que viene de la base de datos
   * @param inventor - El objeto Personaje real (ya hidratado previamente)
   */
  public static toDomain(raw: IInventoJSON, inventor: Personaje): Invento {
    return new Invento(
      raw.id,
      raw.nombre,
      inventor, 
      raw.tipo,
      raw.nivelPeligrosidad,
      raw.descripcion
    );
  }

  /**
   * De Clase a JSON 
   * @param i - La instancia de la clase Invento
   */
  public static toPersistence(i: Invento): IInventoJSON {
    return {
      id: i.id,
      nombre: i.nombre,
      inventor: i.inventor.nombre,
      tipo: i.tipo,
      nivelPeligrosidad: i.nivelPeligrosidad,
      descripcion: i.descripcion
    };
  }
}