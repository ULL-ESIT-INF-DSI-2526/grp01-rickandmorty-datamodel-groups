import { IEspecie } from "../interfaces/IEspecie.js";

/**
 * Clase Especie con constructor de parámetros sueltos
 * Mantiene la coherencia con Personaje e Invento
 */
export class Especie implements IEspecie {
  constructor(
    private _id: string,
    private _nombre: string,
    private _origen: string,
    private _tipo: string,
    private _averageLifeExpectancy: number,
    private _descripcion: string
  ) {
    // Validamos al instanciar
    this.validate();
  }

  // Getters y Setters para que el test acceda a .id, .nombre, etc.
  get id(): string { return this._id; }
  set id(value: string) { this._id = value; this.validate(); }

  get nombre(): string { return this._nombre; }
  set nombre(value: string) { this._nombre = value; this.validate(); }

  get origen(): string { return this._origen; }
  set origen(value: string) { this._origen = value; this.validate(); }

  get tipo(): string { return this._tipo; }
  set tipo(value: string) { this._tipo = value; this.validate(); }

  get averageLifeExpectancy(): number { return this._averageLifeExpectancy; }
  set averageLifeExpectancy(value: number) { this._averageLifeExpectancy = value; this.validate(); }

  get descripcion(): string { return this._descripcion; }
  set descripcion(value: string) { this._descripcion = value; this.validate(); }

  /**
   * Método de validación interna
   * Lanza errores con los mensajes que esperan los tests
   */
  private validate(): void {
    if (!this._id || this._id.trim() === "") throw new Error("El id no puede estar vacío");
    if (!this._nombre || this._nombre.trim() === "") throw new Error("El nombre no puede estar vacío");
    if (!this._origen || this._origen.trim() === "") throw new Error("El origen no puede estar vacío");
    if (!this._tipo || this._tipo.trim() === "") throw new Error("El tipo no puede estar vacío");
    if (this._averageLifeExpectancy < 0) throw new Error("La esperanza de vida no puede ser negativa");
    if (!this._descripcion || this._descripcion.trim() === "") throw new Error("La descripción no puede estar vacía");
  }

  /**
   * Para compatibilidad con el DataManager al guardar
   */
  toJSON(): IEspecie {
    return {
      id: this._id,
      nombre: this._nombre,
      origen: this._origen,
      tipo: this._tipo,
      averageLifeExpectancy: this._averageLifeExpectancy,
      descripcion: this._descripcion
    };
  }
}