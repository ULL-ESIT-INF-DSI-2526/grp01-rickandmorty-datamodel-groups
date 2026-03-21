import { GestionManager } from "./GestionManager.js";
import { Dimension } from "../models/Dimension.js";
import { IDimension } from "../interfaces/IDimension.js";
import { DataManager } from "../database/DataManager.js";

/** Clase que representa un gestor específico para la colección de Dimensiones */
export class DimensionManager extends GestionManager<Dimension, "dimensiones", IDimension> {
  /** Identificador de la colección en el almacenamiento JSON */
  protected _coleccion: "dimensiones" = "dimensiones" as const;

  /**
   * Carga las dimensiones desde la base de datos
   * Transforma los objetos planos del JSON en instancias de la clase Dimension
   */
  public async cargar(): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datos = dataManager.leerBaseDatos(this._coleccion);
    this._lista = datos.map(d => new Dimension(d.id, d.nombre, d.estado, d.nivelTecnologico, d.descripcion));
  }

  /**
   * Convierte una instancia de Dimension en un objeto plano IDimension
   * @param dimension - Instancia de Dimension a convertir
   * @returns Objeto que cumple con la interfaz IDimension
   */
  protected mapearAJSON(dimension: Dimension): IDimension {
    return {
      id: dimension.id as string,
      nombre: dimension.nombre,
      estado: dimension.estado,
      nivelTecnologico: dimension.nivelTecnologico,
      descripcion: dimension.descripcion
    };
  }
}