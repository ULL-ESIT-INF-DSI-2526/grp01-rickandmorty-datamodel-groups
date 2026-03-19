import { GestionManager } from "./GestionManager.js";
import { Invento } from "../models/Invento.js";
import { Personaje } from "../models/Personaje.js";
import { IInventoJSON } from "../interfaces/IInventoJSON.js";
import { DataManager } from "../database/DataManager.js";

/**
 * Gestor de Inventos y Artefactos
 * Maneja la relación entre un Invento y su Creador (Personaje)
 */
export class InventoManager extends GestionManager<Invento, "inventos", IInventoJSON> {
  
  /* Clave exacta del esquema para el contenedor json */
  protected _coleccion = "inventos" as const;

  /**
   * metodo que convierte de json a objetos, y en caso de referencias las busca por id y construye
   * @param personajes - lista de especies cargadas en memoria
   */
  async cargar(personajes: Personaje[]): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datosPlanos = dataManager.leerBaseDatos(this._coleccion);

    // conversion de json a instancia de personaje
    this._lista = datosPlanos.map(json => {
      // buscar las referencias por su id
      const inventorEncontrado = personajes.find(p => String(p.id) === String(json.inventorId));

      if (!inventorEncontrado) {
        console.warn(`Error: Referencias rotas para el invento`);
      }

      return new Invento(
        json.id,
        json.nombre,
        inventorEncontrado!,
        json.tipo,
        json.nivelPeligrosidad,
        json.descripcion
      );
    });
  }

  /**
   * metodo que aplana los atributos de instancia invento para guardar en JSON
   * extrae los id de las referencias
   */
  protected mapearAJSON(i: Invento): IInventoJSON {
    return {
      id: i.id,
      nombre: i.nombre,
      inventorId: i.inventor.id, 
      tipo: i.tipo,
      nivelPeligrosidad: i.nivelPeligrosidad,
      descripcion: i.descripcion
    };
  }
}