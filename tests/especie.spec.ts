import { describe, expect, it } from "vitest";
import { Dimension } from "../src/models/Dimension.js";
import { Especie } from "../src/models/Especie.js";
import { Planetas } from "../src/models/Planetas.js";

describe("Especie", function () {
  it("crea una especie válida con origen dimensión", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(especie.id).toBe("sp-001");
    expect(especie.name).toBe("Human");
    expect(especie.origin).toBe(dimension);
    expect(especie.type).toBe("Humanoide");
    expect(especie.averageLifeExpectancy).toBe(80);
    expect(especie.description).toBe("Especie común");
  });

  it("crea una especie válida con origen planeta", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const planeta = new Planetas(
      "p-001",
      "Tierra C-137",
      "Planeta",
      dimension,
      8000000000,
      "Planeta de origen",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      planeta,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(especie.origin).toBe(planeta);
  });

  it("lanza error si el id está vacío", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    expect(function () {
      new Especie("", "Human", dimension, "Humanoide", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si el nombre está vacío", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    expect(function () {
      new Especie("sp-001", "", dimension, "Humanoide", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si el origen está vacío", function () {
    expect(function () {
      new Especie(
        "sp-001",
        "Human",
        undefined as unknown as Dimension,
        "Humanoide",
        80,
        "Especie común",
      );
    }).toThrow();
  });

  it("lanza error si el tipo está vacío", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    expect(function () {
      new Especie("sp-001", "Human", dimension, "", 80, "Especie común");
    }).toThrow();
  });

  it("lanza error si la esperanza de vida es negativa", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    expect(function () {
      new Especie("sp-001", "Human", dimension, "Humanoide", -1, "Especie común");
    }).toThrow();
  });

  it("lanza error si la descripción está vacía", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    expect(function () {
      new Especie("sp-001", "Human", dimension, "Humanoide", 80, "");
    }).toThrow();
  });

  it("modifica el nombre", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    especie.name = "Cronenberg Human";

    expect(especie.name).toBe("Cronenberg Human");
  });

  it("modifica el origen", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const otraDimension = new Dimension(
      "C-500A",
      "Dimensión alternativa",
      "activa",
      8,
      "Otra dimensión",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    especie.origin = otraDimension;

    expect(especie.origin).toBe(otraDimension);
  });

  it("modifica el tipo", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    especie.type = "Parásito";

    expect(especie.type).toBe("Parásito");
  });

  it("modifica la esperanza de vida", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    especie.averageLifeExpectancy = 90;

    expect(especie.averageLifeExpectancy).toBe(90);
  });

  it("modifica la descripción", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    especie.description = "Nueva descripción";

    expect(especie.description).toBe("Nueva descripción");
  });

  it("lanza error si modifica el nombre con cadena vacía", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(function () {
      especie.name = "";
    }).toThrow();
  });

  it("lanza error si modifica el origen con valor vacío", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(function () {
      especie.origin = null as unknown as Dimension;
    }).toThrow();
  });

  it("lanza error si modifica el tipo con cadena vacía", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(function () {
      especie.type = "";
    }).toThrow();
  });

  it("lanza error si modifica la esperanza de vida con valor negativo", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(function () {
      especie.averageLifeExpectancy = -10;
    }).toThrow();
  });

  it("lanza error si modifica la descripción con cadena vacía", function () {
    const dimension = new Dimension(
      "C-137",
      "Dimensión C-137",
      "activa",
      10,
      "Dimensión principal",
    );

    const especie = new Especie(
      "sp-001",
      "Human",
      dimension,
      "Humanoide",
      80,
      "Especie común",
    );

    expect(function () {
      especie.description = "";
    }).toThrow();
  });
});