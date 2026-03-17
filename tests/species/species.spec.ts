import { describe, expect, it } from "vitest";
import { Species } from "../../src/models/species";

describe("Species", () => {
  it("crea una especie válida", () => {
    const species = new Species({
      id: "sp-001",
      name: "Human",
      origin: "Earth C-137",
      type: "Humanoid",
      averageLifeExpectancy: 80,
      description: "Especie común",
    });

    expect(species.getId()).toBe("sp-001");
    expect(species.getName()).toBe("Human");
    expect(species.getOrigin()).toBe("Earth C-137");
    expect(species.getType()).toBe("Humanoid");
    expect(species.getAverageLifeExpectancy()).toBe(80);
    expect(species.getDescription()).toBe("Especie común");
  });

  it("lanza error si el id está vacío", () => {
    expect(() => {
      new Species({
        id: "",
        name: "Human",
        origin: "Earth C-137",
        type: "Humanoid",
        averageLifeExpectancy: 80,
        description: "Especie común",
      });
    }).toThrow();
  });

  it("lanza error si el nombre está vacío", () => {
    expect(() => {
      new Species({
        id: "sp-001",
        name: "",
        origin: "Earth C-137",
        type: "Humanoid",
        averageLifeExpectancy: 80,
        description: "Especie común",
      });
    }).toThrow();
  });

  it("lanza error si el origen está vacío", () => {
    expect(() => {
      new Species({
        id: "sp-001",
        name: "Human",
        origin: "",
        type: "Humanoid",
        averageLifeExpectancy: 80,
        description: "Especie común",
      });
    }).toThrow();
  });

  it("lanza error si el tipo está vacío", () => {
    expect(() => {
      new Species({
        id: "sp-001",
        name: "Human",
        origin: "Earth C-137",
        type: "",
        averageLifeExpectancy: 80,
        description: "Especie común",
      });
    }).toThrow();
  });

  it("lanza error si la esperanza de vida es negativa", () => {
    expect(() => {
      new Species({
        id: "sp-001",
        name: "Human",
        origin: "Earth C-137",
        type: "Humanoid",
        averageLifeExpectancy: -1,
        description: "Especie común",
      });
    }).toThrow();
  });

  it("lanza error si la descripción está vacía", () => {
    expect(() => {
      new Species({
        id: "sp-001",
        name: "Human",
        origin: "Earth C-137",
        type: "Humanoid",
        averageLifeExpectancy: 80,
        description: "",
      });
    }).toThrow();
  });

  it("modifica una especie correctamente", () => {
    const species = new Species({
      id: "sp-001",
      name: "Human",
      origin: "Earth C-137",
      type: "Humanoid",
      averageLifeExpectancy: 80,
      description: "Especie común",
    });

    species.update({
      averageLifeExpectancy: 90,
      description: "Especie muy común",
    });

    expect(species.getAverageLifeExpectancy()).toBe(90);
    expect(species.getDescription()).toBe("Especie muy común");
  });
});