import { IEvento } from "../interfaces/IEvento.js";
import { DataManager } from "../database/DataManager.js";

export class EventoManager {
  private _lista: IEvento[] = [];
  private readonly _coleccion = "eventos";

  constructor() {}

  /** Carga los eventos desde el JSON a memoria */
  public async cargar(): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datos = dataManager.leerBaseDatos(this._coleccion);
    this._lista = datos || [];
  }

  /** Devuelve todos los eventos registrados */
  public getAll(): IEvento[] {
    return this._lista;
  }

  /** Añade un nuevo evento a la lista en memoria */
  public registrar(nuevoEvento: IEvento): void {
    this._lista.push(nuevoEvento);
  }

  /** Guarda la lista actual de eventos en el JSON */
  public async guardar(): Promise<void> {
    const dataManager = await DataManager.getInstance();
    await dataManager.guardarBaseDatos(this._coleccion, this._lista);
  }

  /** Filtra eventos por un ID de personaje */
  public getById(idPersonaje: string): IEvento[] {
    return this._lista.filter(e => e.idPersonaje === idPersonaje);
  }
}