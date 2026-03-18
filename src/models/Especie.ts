import { IEspecie } from "../interfaces/IEspecie.js";

/**
 * Clase de especie.
 */
export class Especie {
  /**
   * Crea una especie.
   * @param data - Datos de la especie.
   */
  constructor(private data: IEspecie) {
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
    return this.data.nombre;
  }

  /**
   * Devuelve el origen.
   * @returns Origen.
   */
  getOrigin(): string {
    return this.data.origen;
  }

  /**
   * Devuelve el tipo.
   * @returns Tipo.
   */
  getType(): string {
    return this.data.tipo;
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
    return this.data.descripcion;
  }

  /**
   * Modifica la especie.
   * @param updates - Cambios.
   */
  update(updates: Partial<IEspecie>): void {
    const updatedData: IEspecie = {
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
  toJSON(): IEspecie {
    return { ...this.data };
  }

  /**
   * Valida los datos.
   * @param data - Datos a validar.
   */
  private validate(data: IEspecie): void {
    if (data.id.trim() === "") {
      throw new Error("El id no puede estar vacío");
    }

    if (data.nombre.trim() === "") {
      throw new Error("El nombre no puede estar vacío");
    }

    if (data.origen.trim() === "") {
      throw new Error("El origen no puede estar vacío");
    }

    if (data.tipo.trim() === "") {
      throw new Error("El tipo no puede estar vacío");
    }

    if (data.averageLifeExpectancy < 0) {
      throw new Error("La esperanza de vida no puede ser negativa");
    }

    if (data.descripcion.trim() === "") {
      throw new Error("La descripción no puede estar vacía");
    }
  }
}