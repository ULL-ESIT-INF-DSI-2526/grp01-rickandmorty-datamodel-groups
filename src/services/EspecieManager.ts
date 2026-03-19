import { Specie } from "../models/Especie.js";

/**
 * Gestor de especies.
 */
export class EspecieManager {
  /**
   * Lista de especies.
   */
  constructor(private especies: Specie[] = []) {
  }

  /**
   * Añade una especie.
   * @param nuevaEspecie Especie.
   */
  addItem(nuevaEspecie: Specie): void {
    const especieEncontrada = this.especies.find(function (especie) {
      return especie.id === nuevaEspecie.id;
    });

    if (especieEncontrada) {
      throw new Error("Ya existe una especie con ese id");
    }

    this.especies.push(nuevaEspecie);
  }

  /**
   * Devuelve una especie por posición.
   * @param index Posición.
   * @returns Especie.
   */
  getItem(index: number): Specie {
    if (index < 0 || index >= this.especies.length) {
      throw new Error("Índice fuera de rango");
    }

    return this.especies[index] as Specie;
  }

  /**
   * Devuelve el número de especies.
   * @returns Número de especies.
   */
  getNumberOfItems(): number {
    return this.especies.length;
  }

  /**
   * Busca por id.
   * @param id ID.
   * @returns Especie o undefined.
   */
  searchById(id: string): Specie | undefined {
    return this.especies.find(function (especie) {
      return especie.id === id;
    });
  }

  /**
   * Busca por nombre.
   * @param name Nombre.
   * @returns Lista de especies.
   */
  searchByName(name: string): Specie[] {
    return this.especies.filter(function (especie) {
      return especie.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  /**
   * Busca por origen.
   * @param origin Origen.
   * @returns Lista de especies.
   */
  searchByOrigin(origin: string): Specie[] {
    return this.especies.filter(function (especie) {
      return especie.origin.toLowerCase().includes(origin.toLowerCase());
    });
  }

  /**
   * Busca por tipo.
   * @param type Tipo.
   * @returns Lista de especies.
   */
  searchByType(type: string): Specie[] {
    return this.especies.filter(function (especie) {
      return especie.type.toLowerCase().includes(type.toLowerCase());
    });
  }

  /**
   * Elimina una especie por id.
   * @param id ID.
   */
  removeById(id: string): void {
    const longitudInicial = this.especies.length;

    this.especies = this.especies.filter(function (especie) {
      return especie.id !== id;
    });

    if (this.especies.length === longitudInicial) {
      throw new Error("No existe una especie con ese id");
    }
  }

  /**
   * Devuelve todas las especies.
   * @returns Lista de especies.
   */
  getItems(): Specie[] {
    return [...this.especies];
  }
}