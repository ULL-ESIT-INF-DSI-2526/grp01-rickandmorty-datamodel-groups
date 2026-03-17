import { beforeEach, describe, expect, it } from "vitest";
import { Species } from "../../src/models/species.js";
import { SpeciesManager } from "../../src/services/species-manager.js";

describe("SpeciesManager", function () {
  let manager: SpeciesManager;
  let human: Species;
  let meeseeks: Species;

  beforeEach(function () {
    manager = new SpeciesManager();

    human = new Species({
      id: "sp-001",
      name: "Human",
      origin: "Earth C-137",
      type: "Humanoid",
      averageLifeExpectancy: 80,
      description: "Especie común",
    });

    meeseeks = new Species({
      id: "sp-002",
      name: "Meeseeks",
      origin: "Mr. Meeseeks Box",
      type: "Artificial",
      averageLifeExpectancy: 1,
      description: "Cumplen tareas",
    });
  });

  it("añade especies correctamente", function () {
    manager.addSpecies(human);
    expect(manager.getAllSpecies()).toHaveLength(1);
  });

  it("lanza error si el id está repetido", function () {
    manager.addSpecies(human);

    expect(function () {
      manager.addSpecies(human);
    }).toThrow();
  });

  it("busca por id", function () {
    manager.addSpecies(human);
    expect(manager.findById("sp-001")).toBe(human);
  });

  it("busca por nombre", function () {
    manager.addSpecies(human);
    manager.addSpecies(meeseeks);

    const result = manager.findByName("human");
    expect(result).toHaveLength(1);
    expect(result[0]?.getName()).toBe("Human");
  });

  it("busca por origen", function () {
    manager.addSpecies(human);

    const result = manager.findByOrigin("earth");
    expect(result).toHaveLength(1);
  });

  it("busca por tipo", function () {
    manager.addSpecies(human);

    const result = manager.findByType("humanoid");
    expect(result).toHaveLength(1);
  });

  it("modifica una especie", function () {
    manager.addSpecies(human);
    manager.updateSpecies("sp-001", { averageLifeExpectancy: 90 });

    expect(manager.findById("sp-001")?.getAverageLifeExpectancy()).toBe(90);
  });

  it("lanza error si intenta modificar una especie que no existe", function () {
    expect(function () {
      manager.updateSpecies("sp-999", { name: "Alien" });
    }).toThrow();
  });

  it("elimina una especie", function () {
    manager.addSpecies(human);
    manager.removeSpecies("sp-001");

    expect(manager.getAllSpecies()).toHaveLength(0);
  });

  it("lanza error si intenta eliminar una especie que no existe", function () {
    expect(function () {
      manager.removeSpecies("sp-999");
    }).toThrow();
  });

  it("ordena por nombre ascendente", function () {
    manager.addSpecies(meeseeks);
    manager.addSpecies(human);

    const result = manager.sortByName(true);
    expect(result[0]?.getName()).toBe("Human");
    expect(result[1]?.getName()).toBe("Meeseeks");
  });

  it("ordena por esperanza de vida ascendente", function () {
    manager.addSpecies(human);
    manager.addSpecies(meeseeks);

    const result = manager.sortByLifeExpectancy(true);
    expect(result[0]?.getName()).toBe("Meeseeks");
    expect(result[1]?.getName()).toBe("Human");
  });
});