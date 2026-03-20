import { DataManager } from "../database/DataManager.js";
import { IPlanetaJSON } from "../interfaces/IPlanetaJSON.js";
import { Planetas } from "../models/Planetas.js";
import { DimensionManager } from "./DimensionManager.js";
import { GestionManager } from "./GestionManager.js";

/** Clase que representa un gestor específico para la colección de Planetass */
export class PlanetaManager extends GestionManager<Planetas, "planetas", IPlanetaJSON> {
  /** Identificador de la colección en el almacenamiento JSON */
  protected _coleccion: "planetas" = "planetas" as const;

  /**
   * Carga los planetas y las localizaciones desde la base de datos
   * Transforma los objetos planos del JSON en instancias de la clase Planetas
   * @param dimensionManager - Instancia cargada de DimensionManager para buscar las dimensiones por ID
   * @throws Error si un planeta hace referencia a una dimensión que no existe
   */
  public async cargar(dimensionManager: DimensionManager): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datos = dataManager.leerBaseDatos(this._coleccion);

    this._lista = datos.map(p => {
      const dimension = dimensionManager.getById(p.dimension);
      if (!dimension) {
        throw new Error(`Inconsistencia: La dimensión ${p.dimension} no existe para el planeta ${p.nombre}`);
      }
      return new Planetas(p.id, p.nombre, p.tipo, dimension, p.poblacion, p.descripcion);
    });
  }

  /**
   * Convierte una instancia de Planetas en un objeto plano IPlanetasJSON
   * @param planeta - Instancia de Planetas a convertir
   * @returns Objeto que cumple con la interfaz IPlanetasJSON
   */
  protected mapearAJSON(planeta: Planetas): IPlanetaJSON {
    return {
      id: planeta.id as string,
      nombre: planeta.nombre,
      tipo: planeta.tipo,
      dimension: planeta.dimension.id, 
      poblacion: planeta.poblacion,
      descripcion: planeta.descripcion
    };
  }
}