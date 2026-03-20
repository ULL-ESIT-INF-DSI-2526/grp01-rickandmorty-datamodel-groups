import { beforeEach, describe, expect, it, vi } from "vitest";
import { Especie } from "../src/models/Especie.js";
import { EspecieManager } from "../src/managers/EspecieManager.js";
import { DataManager } from "../src/database/DataManager.js";

describe("EspecieManager", function () {
  let manager: EspecieManager;

  beforeEach(function () {
    manager = new EspecieManager();
    vi.restoreAllMocks();
  });

  it("añade una especie", function () {
    const especie = new Especie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    manager.add(especie);

    expect(manager.getAll()).toHaveLength(1);
    expect(manager.getById("sp-001")).toBe(especie);
  });

  it("lanza error si el id ya existe", function () {
    const especie1 = new Especie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    const especie2 = new Especie(
      "sp-001",
      "Cronenberg",
      "Cronenberg World",
      "Mutated",
      40,
      "Especie mutada",
    );

    manager.add(especie1);

    expect(function () {
      manager.add(especie2);
    }).toThrow();
  });

  it("devuelve undefined si no encuentra el id", function () {
    expect(manager.getById("sp-999")).toBeUndefined();
  });

  it("elimina una especie", function () {
    const especie = new Especie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    manager.add(especie);
    manager.delete("sp-001");

    expect(manager.getAll()).toHaveLength(0);
    expect(manager.getById("sp-001")).toBeUndefined();
  });

  it("actualiza una especie", function () {
    const especie1 = new Especie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    const especie2 = new Especie(
      "sp-001",
      "Advanced Human",
      "Earth Prime",
      "Humanoid",
      90,
      "Especie mejorada",
    );

    manager.add(especie1);
    manager.update(especie2);

    const resultado = manager.getById("sp-001");
    expect(resultado?.name).toBe("Advanced Human");
    expect(resultado?.origin).toBe("Earth Prime");
    expect(resultado?.averageLifeExpectancy).toBe(90);
  });

  it("lanza error si intenta actualizar una especie que no existe", function () {
    const especie = new Especie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    expect(function () {
      manager.update(especie);
    }).toThrow();
  });

  it("carga las especies desde DataManager", async function () {
    const mockDataManager = {
      leerBaseDatos: vi.fn().mockReturnValue([
        {
          id: "sp-001",
          nombre: "Human",
          origen: "Earth C-137",
          tipo: "Humanoid",
          esperanzaVidaMedia: 80,
          descripcion: "Especie común",
        },
        {
          id: "sp-002",
          nombre: "Meeseeks",
          origen: "Mr. Meeseeks Box",
          tipo: "Artificial",
          esperanzaVidaMedia: 1,
          descripcion: "Cumplen tareas",
        },
      ]),
      guardarBaseDatos: vi.fn(),
    };

    vi.spyOn(DataManager, "getInstance").mockResolvedValue(
      mockDataManager as unknown as DataManager,
    );

    await manager.cargar();

    expect(manager.getAll()).toHaveLength(2);
    expect(manager.getById("sp-001")?.name).toBe("Human");
    expect(manager.getById("sp-002")?.name).toBe("Meeseeks");
  });

  it("guarda las especies en DataManager", async function () {
    const mockDataManager = {
      leerBaseDatos: vi.fn(),
      guardarBaseDatos: vi.fn().mockResolvedValue(undefined),
    };

    vi.spyOn(DataManager, "getInstance").mockResolvedValue(
      mockDataManager as unknown as DataManager,
    );

    manager.add(
      new Especie(
        "sp-001",
        "Human",
        "Earth C-137",
        "Humanoid",
        80,
        "Especie común",
      ),
    );

    manager.add(
      new Especie(
        "sp-002",
        "Meeseeks",
        "Mr. Meeseeks Box",
        "Artificial",
        1,
        "Cumplen tareas",
      ),
    );

    await manager.guardar();

    expect(mockDataManager.guardarBaseDatos).toHaveBeenCalledTimes(1);
    expect(mockDataManager.guardarBaseDatos).toHaveBeenCalledWith("especies", [
      {
        id: "sp-001",
        nombre: "Human",
        origen: "Earth C-137",
        tipo: "Humanoid",
        esperanzaVidaMedia: 80,
        descripcion: "Especie común",
      },
      {
        id: "sp-002",
        nombre: "Meeseeks",
        origen: "Mr. Meeseeks Box",
        tipo: "Artificial",
        esperanzaVidaMedia: 1,
        descripcion: "Cumplen tareas",
      },
    ]);
  });
});