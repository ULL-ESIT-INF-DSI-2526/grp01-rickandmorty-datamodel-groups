/**
 * Interfaz base para todas las entidades del multiverso.
 * Permite que DataManager y Managers solo acepten objetos que tengan ID
 */
export interface IEntity {
  /** Identificador único */
  id: string | number;
}