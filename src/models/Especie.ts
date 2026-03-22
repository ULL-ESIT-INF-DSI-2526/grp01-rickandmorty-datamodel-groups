import { SpecieData } from "../interfaces/IEspecie.js";
import { IValidar } from "../interfaces/IValidar.js";
import { Dimension } from "./Dimension.js";
import { Planetas } from "./Planetas.js";

/**
 * Clase de especie.
 */
export class Especie implements SpecieData, IValidar {
  /**
   * Crea una especie.
   * @param id - Identificador único
   * @param name - Nombre
   * @param origin - Origen
   * @param type - Tipo
   * @param averageLifeExpectancy - Esperanza de vida media
   * @param description - Descripción
   */
  constructor(
    private readonly _id: string,
    private _name: string,
    private _origin: Dimension | Planetas,
    private _type: string,
    private _averageLifeExpectancy: number,
    private _description: string,
  ) {
    this.validar();
  }

  /** Permite acceder al atributo privado _id */
  get id(): string { return this._id; }

  /** Permite acceder al atributo privado _name */
  get name(): string { return this._name; }

  /** Permite acceder al atributo privado _origin */
  get origin(): Dimension | Planetas { return this._origin; }

  /** Permite aceder al atributo privado _type */
  get type(): string { return this._type; }

  /** Permite acceder al atributo privado _averageLifeExpectancy */
  get averageLifeExpectancy(): number { return this._averageLifeExpectancy; }

  /** Permite aceder al atributo privado _description */
  get description(): string { return this._description; }

  /**
   * Modifica el atributo privado _naverageLifeExpectancy
   * @param averageLifeExpectancy - Nueva esperanza de vida
   */
  set averageLifeExpectancy(averageLifeExpectancy: number) {
    if (averageLifeExpectancy < 0) {
      throw new Error("La esperanza de vida no puede ser negativa");
    }
    this._averageLifeExpectancy = averageLifeExpectancy;
  }

  /**
   * Modifica el atributo privado _description
   * @param description - Nueva descripción
   */
  set description(description: string) {
    if (description.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }
    this._description = description;
  }

  /** Comprueba que los atributos pasados al constructor sean válidos */
  validar(): void {
    if (this._id.trim() === "") {
      throw new Error("El id no puede estar vacío");
    }
    if (this._name.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }
    if (!this._origin) {
      throw new Error("El origen no puede estar vacío");
    }
    if (this._type.trim() === "") {
      throw new Error("El tipo no puede estar vacío");
    }
    if (this._averageLifeExpectancy < 0) {
      throw new Error("La esperanza de vida no puede ser negativa");
    }
    if (this._description.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }
  }
}