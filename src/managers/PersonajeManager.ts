import { GestionManager } from "./GestionManager.js";
import { Personaje } from "../models/Personaje.js";
import { Especie } from "../models/Especie.js";
import { Dimension } from "../models/Dimension.js";
import { IPersonajeJSON } from "../interfaces/IPersonajeJSON.js";
import { DataManager } from "../database/DataManager.js";

/**
 * Gestor de Personajes del Multiverso
 * Hereda el CRUD en memoria de GestionManager
 */
export class PersonajeManager extends GestionManager<Personaje, "personajes", IPersonajeJSON> {
  
  /* Clave exacta del esquema para el contenedor JSON */
  protected _coleccion = "personajes" as const;

  /**
   * Método que convierte de JSON a objetos, y en caso de referencias las busca por id y construye
   * @param especies - Lista de especies cargadas en memoria
   * @param dimensiones - Lista de dimensiones cargadas en memoria
   */
  async cargar(especies: Especie[], dimensiones: Dimension[]): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datosAplanados = dataManager.leerBaseDatos(this._coleccion);

    this._lista = datosAplanados.map(json => {
      const especieReferenciada = especies.find(e => String(e.id) === String(json.especieId));
      const dimensionReferenciada = dimensiones.find(d => String(d.id) === String(json.dimensionId));

      if (!especieReferenciada || !dimensionReferenciada) {
        console.warn(`Error: Referencias rotas para el personaje`);
      }

      return new Personaje(
        json.id,
        json.nombre,
        especieReferenciada!,
        dimensionReferenciada!,
        json.estado,
        json.afiliacion,
        json.nivelInteligencia,
        json.descripcion
      );
    });
  }

  /**
   * Método que aplana los atributos de instancia persona para guardar en JSON
   * extrae los id de las referencias
   */
  protected mapearAJSON(p: Personaje): IPersonajeJSON {
    return {
      id: p.id,
      nombre: p.nombre,
      especieId: p.especie.id,
      dimensionId: p.dimensionOrigen.id,
      estado: p.estado,
      afiliacion: p.afiliacion,
      nivelInteligencia: p.nivelInteligencia,
      descripcion: p.descripcion
    };
  }
}