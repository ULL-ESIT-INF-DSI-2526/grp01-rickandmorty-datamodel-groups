import { describe, it, expect, vi, beforeEach } from "vitest";
import { DimensionManager } from "../src/managers/DimensionManager.js";
import { Dimension } from "../src/models/Dimension.js";
import { DataManager } from "../src/database/DataManager.js";
import { IDimension } from "../src/interfaces/IDimension.js";

// Mock del DataManager
vi.mock("../src/database/DataManager.js");
const mockedDM = vi.mocked(DataManager);

describe("DimensionManager - Suite de Pruebas", () => {
  let manager: DimensionManager;
  let dimBase: Dimension;
  let jsonBase: IDimension;

  // Definimos el mock de la instancia fuera para poder acceder a sus métodos
  const mockDMInstance = {
    leerBaseDatos: vi.fn(),
    guardarBaseDatos: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Datos de prueba
    dimBase = new Dimension("C-137", "Earth", "activa", 5, "Dimensión de Rick");
    jsonBase = {
      id: "C-137",
      nombre: "Earth",
      estado: "activa",
      nivelTecnologico: 5,
      descripcion: "Dimensión de Rick",
    };

    // Configuramos el comportamiento por defecto de los mocks
    mockDMInstance.leerBaseDatos.mockReturnValue([jsonBase]);
    mockedDM.getInstance.mockResolvedValue(
      mockDMInstance as unknown as DataManager,
    );

    manager = new DimensionManager();
  });

  describe("Carga de datos", () => {
    it("Debe convertir correctamente los datos desde el JSON a la clase Dimension", async () => {
      await manager.cargar();

      const lista = manager.getAll();
      expect(lista).toHaveLength(1);
      expect(lista[0]).toBeInstanceOf(Dimension);
      expect(lista[0].id).toBe("C-137");
      expect(mockDMInstance.leerBaseDatos).toHaveBeenCalledWith("dimensiones");
    });
  });

  describe("Persistencia (Escritura)", () => {
    it("Debe llamar a guardarBaseDatos cuando se añade una dimensión", async () => {
      manager.add(dimBase); // Solo lo añade a la lista interna
      await manager.guardar(); // <--- Tienes que llamar a guardar explícitamente

      expect(mockDMInstance.guardarBaseDatos).toHaveBeenCalledWith(
        "dimensiones",
        expect.arrayContaining([expect.objectContaining({ id: "C-137" })]),
      );
    });
  });

  describe("Operaciones de búsqueda", () => {
    it("Debe encontrar una dimensión por ID después de cargar", async () => {
      await manager.cargar();

      const encontrada = manager.getById("C-137");
      expect(encontrada).toBeDefined();
      expect(encontrada?.nombre).toBe("Earth");
    });

    it("Debe devolver undefined si el ID no existe", async () => {
      await manager.cargar();
      expect(manager.getById("999")).toBeUndefined();
    });
  });
});
