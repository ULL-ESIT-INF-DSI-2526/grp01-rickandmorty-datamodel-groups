import { SpeciesData } from "../interfaces/species-data.js";

/**
 * Clase de especie.
 */
export class Species {
  /**
   * Crea una especie.
   * @param data Datos de la especie.
   */
  constructor(private data: SpeciesData) {
    this.validate(data);
  }

  /**
   * Devuelve el id.
   * @returns ID.
   */
  getId(): string {
    return this.data.id;
  }

  /**
   * Devuelve el nombre.
   * @returns Nombre.
   */
  getName(): string {
    return this.data.name;
  }

  /**
   * Devuelve el origen.
   * @returns Origen.
   */
  getOrigin(): string {
    return this.data.origin;
  }

  /**
   * Devuelve el tipo.
   * @returns Tipo.
   */
  getType(): string {
    return this.data.type;
  }

  /**
   * Devuelve la esperanza de vida.
   * @returns Esperanza de vida.
   */
  getAverageLifeExpectancy(): number {
    return this.data.averageLifeExpectancy;
  }

  /**
   * Devuelve la descripción.
   * @returns Descripción.
   */
  getDescription(): string {
    return this.data.description;
  }

  /**
   * Modifica la especie.
   * @param updates Cambios.
   */
  update(updates: Partial<SpeciesData>): void {
    const updatedData: SpeciesData = {
      ...this.data,
      ...updates,
    };

    this.validate(updatedData);
    this.data = updatedData;
  }

  /**
   * Devuelve los datos.
   * @returns Datos de la especie.
   */
  toJSON(): SpeciesData {
    return { ...this.data };
  }

  /**
   * Valida los datos.
   * @param data Datos a validar.
   */
  private validate(data: SpeciesData): void {
    if (data.id.trim() === "") {
      throw new Error("El id no puede estar vacío");
    }

    if (data.name.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    if (data.origin.trim() === "") {
      throw new Error("El origen no puede estar vacío");
    }

    if (data.type.trim() === "") {
      throw new Error("El tipo no puede estar vacío");
    }

    if (data.averageLifeExpectancy < 0) {
      throw new Error("La esperanza de vida no puede ser negativa");
    }

    if (data.description.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }
  }
}