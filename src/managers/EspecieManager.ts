import { DataManager } from "../database/DataManager.js";
import { IEspecieJSON } from "../interfaces/IEspecieJSON.js";
import { Especie } from "../models/Especie.js";
import { GestionManager } from "./GestionManager.js";

/**
 * Clase que representa un gestor específico para la colección de especies.
 */
export class EspecieManager extends GestionManager<Especie, "especies", IEspecieJSON> {
  /**
   * Identificador de la colección en el almacenamiento JSON.
   */
  protected _coleccion: "especies" = "especies" as const;

  /**
   * Carga las especies desde la base de datos.
   */
  public async cargar(): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datos = dataManager.leerBaseDatos(this._coleccion);

    this._lista = datos.map((e) => {
      return new Especie(
        e.id,
        e.nombre,
        e.origen,
        e.tipo,
        e.esperanzaVidaMedia,
        e.descripcion,
      );
    });
  }

  /**
   * Convierte una instancia de Especie en un objeto plano JSON.
   * @param especie - Instancia de Especie.
   * @returns Objeto plano.
   */
  protected mapearAJSON(especie: Especie): IEspecieJSON {
    return {
      id: especie.id,
      nombre: especie.name,
      origen: especie.origin,
      tipo: especie.type,
      esperanzaVidaMedia: especie.averageLifeExpectancy,
      descripcion: especie.description,
    };
  }
}