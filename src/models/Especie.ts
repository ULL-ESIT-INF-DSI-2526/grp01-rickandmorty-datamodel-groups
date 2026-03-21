import { SpecieData } from "../interfaces/IEspecie.js";

/** Clase que representa una Especie del multiverso */
export class Especie implements SpecieData {
  /**
   * Crea una instancia de Especie
   * @param id - ID
   * @param name - Nombre
   * @param origin - Origen
   * @param type - Tipo
   * @param averageLifeExpectancy - Esperanza de vida media
   * @param description - Descripción
   */
  constructor(
    private readonly _id: string,
    private _name: string,
    private _origin: string,
    private _type: string,
    private _averageLifeExpectancy: number,
    private _description: string,
  ) {
    this.validate();
  }

  /** Permite acceder al atributo privado _id */
  get id(): string { return this._id; }

  /** Permite acceder al atributo privado _name */
  get name(): string { return this._name; }

  /** Permite acceder al atributo privado _origin */
  get origin(): string { return this._origin; }

  /** Permite acceder al atributo privado _type */
  get type(): string { return this._type; }

  /** Permite acceder al atributo privado _averageLifeExpectancy */
  get averageLifeExpectancy(): number { return this._averageLifeExpectancy; }

  /** Permite acceder al atributo privado _description */
  get description(): string { return this._description; }

  /**
   * Modifica el atributo privado _name
   * @param name - Nuevo nombre
   */
  set name(name: string) {
    if (name.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }
    this._name = name;
  }

  /**
   * Modifica el atributo privado _origin
   * @param origin - Nuevo origen
   */
  set origin(origin: string) {
    if (origin.trim() === "") {
      throw new Error("El origen no puede estar vacío");
    }
    this._origin = origin;
  }

  /**
   * Modifica el atributo privado _type
   * @param type - Nuevo tipo
   */
  set type(type: string) {
    if (type.trim() === "") {
      throw new Error("El tipo no puede estar vacío");
    }
    this._type = type;
  }

  /**
   * Modifica el atributo privado _aberageLifeExpectancy
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

  /** Valida los valores de entrada */
  private validate(): void {
    if (this._id.trim() === "") {
      throw new Error("El id no puede estar vacío");
    }

    if (this._name.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    if (this._origin.trim() === "") {
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