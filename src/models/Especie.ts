import { SpecieData } from "../interfaces/IEspecie.js";

/**
 * Clase de especie.
 */
export class Especie implements SpecieData {
  /**
   * Crea una especie.
   * @param id ID.
   * @param name Nombre.
   * @param origin Origen.
   * @param type Tipo.
   * @param averageLifeExpectancy Esperanza de vida media.
   * @param description Descripción.
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

  /**
   * Devuelve el id.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Devuelve el nombre.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Devuelve el origen.
   */
  get origin(): string {
    return this._origin;
  }

  /**
   * Devuelve el tipo.
   */
  get type(): string {
    return this._type;
  }

  /**
   * Devuelve la esperanza de vida.
   */
  get averageLifeExpectancy(): number {
    return this._averageLifeExpectancy;
  }

  /**
   * Devuelve la descripción.
   */
  get description(): string {
    return this._description;
  }

  /**
   * Modifica el nombre.
   * @param name Nombre.
   */
  set name(name: string) {
    if (name.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    this._name = name;
  }

  /**
   * Modifica el origen.
   * @param origin Origen.
   */
  set origin(origin: string) {
    if (origin.trim() === "") {
      throw new Error("El origen no puede estar vacío");
    }

    this._origin = origin;
  }

  /**
   * Modifica el tipo.
   * @param type Tipo.
   */
  set type(type: string) {
    if (type.trim() === "") {
      throw new Error("El tipo no puede estar vacío");
    }

    this._type = type;
  }

  /**
   * Modifica la esperanza de vida.
   * @param averageLifeExpectancy Esperanza de vida.
   */
  set averageLifeExpectancy(averageLifeExpectancy: number) {
    if (averageLifeExpectancy < 0) {
      throw new Error("La esperanza de vida no puede ser negativa");
    }

    this._averageLifeExpectancy = averageLifeExpectancy;
  }

  /**
   * Modifica la descripción.
   * @param description Descripción.
   */
  set description(description: string) {
    if (description.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }

    this._description = description;
  }

  /**
   * Valida la especie.
   */
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