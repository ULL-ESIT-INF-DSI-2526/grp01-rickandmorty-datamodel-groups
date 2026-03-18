import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { IEsquema } from "../interfaces/IEsquema.js";

/**
 * clase DataManager, que se ocupa de manejar los datos de la base de datos, con patron singleton
 * para tener una sola instancia del gestor
 */
export class DataManager {
  /** instancia privada*/
  private static _instance: DataManager;
  /** base de datos de tipo Low pero que solo acepta contrato IEsquema */
  private _dataBase!: Low<IEsquema>;

  /** constructor privado requerido por singleton */
  private constructor() {}

  /**
   * metodo para obtener la instancia de la base de datos, o si ya existe, la crea,
   * siendo asincrona ya que debe esperar a que se lea del json
   * @returns Promise<DataManager> - devuelve la promesa de que tras la lectura se entregara un DataManager
   */
  public static async getInstance(): Promise<DataManager> {
    if (!DataManager._instance) {
      DataManager._instance = new DataManager();
      await DataManager._instance.conectar();
    }
    return DataManager._instance;
  }

  /**
   * metodo privado que inicia la conexion con el database.json y la crea
   */
  private async conectar() {
    const conector = new JSONFile<IEsquema>("./database.json");

    const datosIniciales: IEsquema = {
      personajes: [],
      dimensiones: [],
      especies: [],
      inventos: [],
      planetas: [],
    };

    this._dataBase = new Low(conector, datosIniciales);
    await this._dataBase.read();
    if (!this._dataBase.data) {
      this._dataBase.data = datosIniciales;
    }
  }

  /**
   * lee un cajon especifico del JSON, segun el nombre que le pasemos
   * usa K que está restringido a las llaves definidas en IEsquema(planetas, personajes...)
   * permite saber qué tipo de array devuelve, ejemplo para personajes devuelve IPersonajeJSON[]
   * IEsquema[K] se asegura de hacer un array con el contenido correcto evitando por ej planetas en personajes
   * * @param nombre - clave de la colección a leer
   * @returns array de objetos almacenados en ese cajon del json
   */
  public leerBaseDatos<K extends keyof IEsquema>(nombre: K): IEsquema[K] {
    return this._dataBase.data[nombre];
  }

  /**
   * actualiza una cajon en memoria y en el archivo fisico
   * usa K que está restringido a las llaves definidas en IEsquema(planetas, personajes...)
   * IEsquema[K] se asegura de hacer un array con el contenido correcto evitando por ej planetas en personajes
   * @param nombre - cajon a sobreescribir
   * @param datos - nuevo array de datos que guardar
   * @returns Promise<void>
   */
  public async guardarBaseDatos<K extends keyof IEsquema>(
    nombre: K,
    datos: IEsquema[K],
  ): Promise<void> {
    this._dataBase.data[nombre] = datos;
    await this._dataBase.write();
  }
}
