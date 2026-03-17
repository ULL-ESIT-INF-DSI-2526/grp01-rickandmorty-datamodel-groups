import { SpeciesData } from "../interfaces/species-data.js";
import { Species } from "../models/species.js";

/**
 * Gestor de especies.
 */
export class SpeciesManager {
  /**
   * Lista de especies.
   */
  private speciesCollection: Species[] = [];

  /**
   * Añade una especie.
   * @param species Especie.
   */
  addSpecies(species: Species): void {
    const foundSpecies = this.speciesCollection.find(function (item) {
      return item.getId() === species.getId();
    });

    if (foundSpecies) {
      throw new Error("Ya existe una especie con ese id");
    }

    this.speciesCollection.push(species);
  }

  /**
   * Elimina una especie.
   * @param id ID.
   */
  removeSpecies(id: string): void {
    const initialLength = this.speciesCollection.length;

    this.speciesCollection = this.speciesCollection.filter(function (species) {
      return species.getId() !== id;
    });

    if (this.speciesCollection.length === initialLength) {
      throw new Error("No existe una especie con ese id");
    }
  }

  /**
   * Busca por id.
   * @param id ID.
   * @returns Especie o undefined.
   */
  findById(id: string): Species | undefined {
    return this.speciesCollection.find(function (species) {
      return species.getId() === id;
    });
  }

  /**
   * Busca por nombre.
   * @param name Nombre.
   * @returns Lista de especies.
   */
  findByName(name: string): Species[] {
    return this.speciesCollection.filter(function (species) {
      return species.getName().toLowerCase().includes(name.toLowerCase());
    });
  }

  /**
   * Busca por origen.
   * @param origin Origen.
   * @returns Lista de especies.
   */
  findByOrigin(origin: string): Species[] {
    return this.speciesCollection.filter(function (species) {
      return species.getOrigin().toLowerCase().includes(origin.toLowerCase());
    });
  }

  /**
   * Busca por tipo.
   * @param type Tipo.
   * @returns Lista de especies.
   */
  findByType(type: string): Species[] {
    return this.speciesCollection.filter(function (species) {
      return species.getType().toLowerCase().includes(type.toLowerCase());
    });
  }

  /**
   * Modifica una especie.
   * @param id ID.
   * @param updates Cambios.
   */
  updateSpecies(id: string, updates: Partial<SpeciesData>): void {
    const species = this.findById(id);

    if (!species) {
      throw new Error("No existe una especie con ese id");
    }

    species.update(updates);
  }

  /**
   * Devuelve todas las especies.
   * @returns Lista de especies.
   */
  getAllSpecies(): Species[] {
    return [...this.speciesCollection];
  }

  /**
   * Ordena por nombre.
   * @param ascending Si es ascendente.
   * @returns Lista ordenada.
   */
  sortByName(ascending: boolean = true): Species[] {
    return [...this.speciesCollection].sort(function (a, b) {
      if (ascending) {
        return a.getName().localeCompare(b.getName());
      }

      return b.getName().localeCompare(a.getName());
    });
  }

  /**
   * Ordena por esperanza de vida.
   * @param ascending Si es ascendente.
   * @returns Lista ordenada.
   */
  sortByLifeExpectancy(ascending: boolean = true): Species[] {
    return [...this.speciesCollection].sort(function (a, b) {
      if (ascending) {
        return a.getAverageLifeExpectancy() - b.getAverageLifeExpectancy();
      }

      return b.getAverageLifeExpectancy() - a.getAverageLifeExpectancy();
    });
  }
}