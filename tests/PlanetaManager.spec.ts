import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlanetaManager } from "../src/managers/PlanetaManager.js";
import { DimensionManager } from "../src/managers/DimensionManager.js";
import { DataManager } from "../src/database/DataManager.js";
import { Planetas } from "../src/models/Planetas.js";
import { Dimension } from "../src/models/Dimension.js";

vi.mock("../src/database/DataManager.js");
const mockedDM = vi.mocked(DataManager);

describe("PlanetaManager", () => {
  let manager: PlanetaManager;
  let dimManager: DimensionManager;
  let planetaBase: Planetas;
  let dimBase: Dimension;
  let mockDMInstance: { leerBaseDatos: unknown; guardarBaseDatos: unknown };

  beforeEach(() => {
    vi.clearAllMocks();

    dimBase = new Dimension(
      "D-1",
      "Cronenberg World",
      "activa",
      1,
      "Mundo mutante",
    );
    planetaBase = new Planetas(
      "P1",
      "Tierra",
      "Planeta",
      dimBase,
      7000,
      "Hogar",
    );



    /** Objeto que imita los métodos de DataManager */
    mockDMInstance = {
      leerBaseDatos: vi.fn().mockReturnValue([
        {
          id: "P1",
          nombre: "Tierra",
          tipo: "Terrestre",
          dimension: "Cronenberg Worlds",
          poblacion: 7000,
          descripcion: "Hogar",
        },
      ]),
      guardarBaseDatos: vi.fn().mockResolvedValue(undefined),
    };

    mockedDM.getInstance.mockResolvedValue(
      mockDMInstance as unknown as DataManager,
    );

    manager = new PlanetaManager();
    dimManager = new DimensionManager();
  });

  it("Debe convertir correctamente los datos desde el JSON a la clase Planetas", async () => {
    vi.spyOn(dimManager, "getById").mockReturnValue(dimBase);

    await manager.cargar(dimManager);
    const lista = manager.getAll();

    expect(lista).toHaveLength(1);
    expect(lista[0]).toBeInstanceOf(Planetas);
    expect(lista[0].dimension.nombre).toBe("Cronenberg World");
    expect(mockDMInstance.leerBaseDatos).toHaveBeenCalledWith("planetas");
  });

  it("Debe lanzar un error si la dimensión asociada no existe (Cobertura Branch)", async () => {
    vi.spyOn(dimManager, "getById").mockReturnValue(undefined);

    await expect(manager.cargar(dimManager)).rejects.toThrow(/Inconsistencia/);
  });

  it("Debe convertir la clase a un objeto plano con el nombre de la dimensión", async () => {
    manager.add(planetaBase);
    await manager.guardar();

    expect(mockDMInstance.guardarBaseDatos).toHaveBeenCalledWith(
      "planetas",
      expect.arrayContaining([
        expect.objectContaining({
          id: "P1",
          nombre: "Tierra",
          dimension: "D-1",
          poblacion: 7000,
          tipo: "Planeta",
        }),
      ]),
    );
  });

  it("Debe heredar y funcionar correctamente con getById", async () => {
    vi.spyOn(dimManager, "getById").mockReturnValue(dimBase);
    await manager.cargar(dimManager);

    expect(manager.getById("P1")).toBeDefined();
    expect(manager.getById("999")).toBeUndefined();
  });
});
