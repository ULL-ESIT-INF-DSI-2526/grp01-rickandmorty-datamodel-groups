import { describe, expect, it } from "vitest";
import { Specie } from "../src/models/Especie";

describe("Specie", function () {
  it("crea una especie válida", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(specie.id).toBe("sp-001");
    expect(specie.name).toBe("Human");
    expect(specie.origin).toBe("Earth C-137");
    expect(specie.type).toBe("Humanoid");
    expect(specie.averageLifeExpectancy).toBe(80);
    expect(specie.description).toBe("Especie común");
  });

  it("lanza error si el id está vacío", function () {
    expect(function () {
      new Specie("", "Human", "Earth C-137", "Humanoid", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si el nombre está vacío", function () {
    expect(function () {
      new Specie("sp-001", "", "Earth C-137", "Humanoid", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si el origen está vacío", function () {
    expect(function () {
      new Specie("sp-001", "Human", "", "Humanoid", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si el tipo está vacío", function () {
    expect(function () {
      new Specie("sp-001", "Human", "Earth C-137", "", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si la esperanza de vida es negativa", function () {
    expect(function () {
      new Specie("sp-001", "Human", "Earth C-137", "Humanoid", -1, "Especie común");
    }).toThrow();
  });

  it("lanza error si la descripción está vacía", function () {
    expect(function () {
      new Specie("sp-001", "Human", "Earth C-137", "Humanoid", 80, "");
    }).toThrow();
  });

  it("modifica el nombre", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    specie.name = "Cronenberg Human";

    expect(specie.name).toBe("Cronenberg Human");
  });

  it("modifica el origen", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    specie.origin = "Gazorpazorp";

    expect(specie.origin).toBe("Gazorpazorp");
  });

  it("modifica el tipo", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    specie.type = "Alien";

    expect(specie.type).toBe("Alien");
  });

  it("modifica la esperanza de vida", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    specie.averageLifeExpectancy = 90;

    expect(specie.averageLifeExpectancy).toBe(90);
  });

  it("modifica la descripción", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    specie.description = "Nueva descripción";

    expect(specie.description).toBe("Nueva descripción");
  });

  it("lanza error si modifica el nombre con cadena vacía", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(function () {
      specie.name = "";
    }).toThrow();
  });

  it("lanza error si modifica el origen con cadena vacía", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(function () {
      specie.origin = "";
    }).toThrow();
  });

  it("lanza error si modifica el tipo con cadena vacía", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(function () {
      specie.type = "";
    }).toThrow();
  });

  it("lanza error si modifica la esperanza de vida con valor negativo", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(function () {
      specie.averageLifeExpectancy = -10;
    }).toThrow();
  });

  it("lanza error si modifica la descripción con cadena vacía", function () {
    const specie = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(function () {
      specie.description = "";
    }).toThrow();
  });
});