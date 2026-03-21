import { DataManager } from "../database/DataManager.js";
import { IEspecieJSON } from "../interfaces/IEspecieJSON.js";
import { Dimension } from "../models/Dimension.js";
import { Especie } from "../models/Especie.js";
import { Planetas } from "../models/Planetas.js";
import { GestionManager } from "./GestionManager.js";

/** Clase que representa un gestor específico para la colección de especies */
export class EspecieManager extends GestionManager<Especie, "especies", IEspecieJSON> {
  /** Identificador de la colección en el almacenamiento JSON */
  protected _coleccion: "especies" = "especies" as const;

  /**
   * Carga las especies desde la base de datos
   * @param dimensiones - Lista de dimensiones cargadas
   * @param planetas - Lista de planetas cargados
   * @throws Error si el origen referenciado no existe
   */
  public async cargar(dimensiones: Dimension[], planetas: Planetas[]): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datos: IEspecieJSON[] = dataManager.leerBaseDatos(this._coleccion);

    this._lista = datos.map((e) => {
      let origen: Dimension | Planetas | undefined;

      if (e.origenTipo === "dimension") {
        origen = dimensiones.find((dimension) => String(dimension.id) === String(e.origenId));
      } else {
        origen = planetas.find((planeta) => String(planeta.id) === String(e.origenId));
      }

      if (!origen) {
        throw new Error(`Inconsistencia: El origen ${e.origenId} no existe para la especie ${e.nombre}`);
      }

      return new Especie(
        e.id,
        e.nombre,
        origen,
        e.tipo,
        e.esperanzaVidaMedia,
        e.descripcion,
      );
    });
  }

  /**
   * Convierte una instancia de Especie en un objeto plano JSON
   * @param especie - Instancia de Especie
   * @returns Objeto plano
   */
  protected mapearAJSON(especie: Especie): IEspecieJSON {
    return {
      id: especie.id,
      nombre: especie.name,
      origenId: String(especie.origin.id),
      origenTipo: especie.origin instanceof Dimension ? "dimension" : "planeta",
      tipo: especie.type,
      esperanzaVidaMedia: especie.averageLifeExpectancy,
      descripcion: especie.description,
    };
  }
}