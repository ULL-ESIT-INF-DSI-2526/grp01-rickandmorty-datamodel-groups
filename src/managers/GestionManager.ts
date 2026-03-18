import { DataManager } from "../database/DataManager.js";
import { IEntity } from "../interfaces/IEntity.js";
import { IEsquema } from "../interfaces/IEsquema.js";

/**
 * Clase base abstracta para la gestión de las entidades del multiverso
 * Implementa un CRUD genérico
 * 
 * @param T - Clase del modelo que extiende de IEntity, obliga a que tenga ID
 * @param K - Identificador de la colección del IEsquema
 * @param J - Interfaz que define la estructura plana en el JSON
 */
export abstract class GestionManager<T extends IEntity, K extends keyof IEsquema, J> {
  /** Lista de objetos en memoria */
  protected _lista: T[] = [];

  /** Identificador de la colección del JSON donde trabaja el manager */
  protected abstract _coleccion: K;

  /**
   * Permite obtener todos los elementos de la colección
   * @returns Todos los elementos de tipo T
   */
  getAll(): T[] {
    return this._lista;
  }

  /**
   * Busca un elemento por su ID
   * @param id - Identificdor a buscar
   * @returns Elemento encontrado o undefined si no existe
   */
  getById(id: string | number): T | undefined {
    return this._lista.find(item => String(item.id) === String(id));
  }

  /**
   * Añade un nuevo elemento a la colección
   * @param item - Instancia del objeto a añadir
   * @throws Error si el ID ya existe en la colección
   */
  async add(item: T): Promise<void> {
    if (this.getById(item.id)) throw new Error("ID ya existente");
    this._lista.push(item);
    await this.guardar();
  }

  /**
   * Elimina un elemento de la colección
   * @param id - ID del elemento a eliminar
   */
  async delete(id: string): Promise<void> {
    this._lista = this._lista.filter(item => item.id !== id);
    await this.guardar();
  }

  /**
   * Actualiza un elemento de la colección
   * @param item - Instancia del elemento con los datos actualizados
   * @throws Error si el elemento no existe en la colección
   */
  async update(item: T): Promise<void> {
    const index = this._lista.findIndex(i => i.id === item.id);
    if (index === -1) throw new Error("Elemento no encontrado");
    this._lista[index] = item;
    await this.guardar();
  }

  /**
   * Método abstracto que convierte la clase modelo a su interfaz JSON
   * @param item - Instancia del elemento de clase T
   * @returns Instancia plana de tipo J
   */
  protected abstract mapearAJSON(item: T): J;

  /** Sincroniza la lista en memoria con el archivo físico usando el DataManager */
  async guardar(): Promise<void> {
    const dataManager = await DataManager.getInstance();
    const datos: J[] = this._lista.map(item => this.mapearAJSON(item));
    await dataManager.guardarBaseDatos(this._coleccion, datos as unknown as IEsquema[K]);
  }

  /**
   * Carga los datos desde el DataManager e inicializa la lista interna
   * @param args - Dependencias necesarias para la carga
   */
  abstract cargar(...args: unknown[]): Promise<void>;
}