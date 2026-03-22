import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import prompts from "prompts";
import { MultiverseManager } from "../../src/managers/MultiverseManager.js";
import { Personaje } from "../../src/models/Personaje.js";
import { Planetas } from "../../src/models/Planetas.js";
import { Invento } from "../../src/models/Invento.js";
import { Menu } from "../../src/ui/Menu.js";
import { ServicioConsultas } from "../../src/ui/ServicioConsultas.js";

vi.mock("prompts", () => ({
  default: vi.fn(),
}));

vi.mock("../../src/ui/ServicioConsultas.js", () => ({
  ServicioConsultas: {
    buscarPersonajes: vi.fn(),
    buscarLocalizaciones: vi.fn(),
    buscarInventos: vi.fn(),
  },
}));

describe("Menu Tests", () => {
  let menu: Menu;

  const mockManager = {
    inicializar: vi.fn(),
    persistirMultiverso: vi.fn(),
    buscarAnomalias: vi.fn(() => []),
    informeNivelTecnologico: vi.fn(() => 8.5),
    informeVersionesAlternativas: vi.fn(() => [["Rick Sanchez", 4]]),
    informeInventosCriticos: vi.fn(() => [
      {
        nombre: "Portal Gun",
        peligro: 10,
        inventor: "Rick Sanchez",
        localizacion: "Dimensión C-137",
      },
    ]),
    historialViajes: vi.fn(() => []),
    registrarViaje: vi.fn(),
    registrarSucesoDimension: vi.fn(),
    registrarAccionArtefacto: vi.fn(),
    dimensiones: {
      getAll: vi.fn(() => []),
      delete: vi.fn(),
      getById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
    },
    personajes: {
      getAll: vi.fn(() => []),
      delete: vi.fn(),
      getById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
    },
    especies: {
      getAll: vi.fn(() => []),
      delete: vi.fn(),
      getById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
    },
    planetas: {
      getAll: vi.fn(() => []),
      delete: vi.fn(),
      getById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
    },
    inventos: {
      getAll: vi.fn(() => []),
      delete: vi.fn(),
      getById: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
    },
  } as unknown as MultiverseManager;

  beforeEach(() => {
    vi.mocked(prompts).mockReset();
    vi.clearAllMocks();
    vi.spyOn(MultiverseManager, "getInstance").mockReturnValue(mockManager);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "clear").mockImplementation(() => {});
    vi.spyOn(console, "table").mockImplementation(() => {});
    menu = new Menu();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Flujo básico del menú", () => {
    it("Debe ejecutar el flujo de salir guardando", async () => {
      vi.mocked(prompts).mockResolvedValue({ accion: "salir_guardar" });
      await menu.iniciar();
      expect(mockManager.inicializar).toHaveBeenCalled();
      expect(mockManager.persistirMultiverso).toHaveBeenCalled();
    });

    it("Debe ejecutar el flujo de salir sin guardar", async () => {
      vi.mocked(prompts).mockResolvedValue({ accion: "salir_sin_guardar" });
      await menu.iniciar();
      expect(mockManager.inicializar).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Cerrando sin guardar...");
    });
  });

  describe("Búsquedas de elementos del multiverso", () => {
    it("Debe ejecutar el flujo de consulta de personajes", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "c_personaje" })
        .mockResolvedValueOnce({
          filtro: "Rick",
          campo: "nombre",
          orden: "asc",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      vi.mocked(ServicioConsultas.buscarPersonajes).mockReturnValue([]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarPersonajes).toHaveBeenCalledWith(
        expect.any(Array),
        "Rick",
        "nombre",
        "asc",
      );
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe renderizar la tabla de consulta de personajes con datos reales", async () => {
      const mockResultado = [
        {
          nombre: "Rick",
          especie: { name: "Humano" },
          dimensionOrigen: { nombre: "C-137" },
          nivelInteligencia: 10,
        },
      ];

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "c_personaje" })
        .mockResolvedValueOnce({
          filtro: "Rick",
          campo: "nombre",
          orden: "asc",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      vi.mocked(ServicioConsultas.buscarPersonajes).mockReturnValue(
        mockResultado as unknown as Personaje[],
      );

      await menu.iniciar();
      expect(ServicioConsultas.buscarPersonajes).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe ejecutar el flujo de consulta de localizaciones", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "c_localizacion" })
        .mockResolvedValueOnce({ filtro: "Earth" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      vi.mocked(ServicioConsultas.buscarLocalizaciones).mockReturnValue([]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarLocalizaciones).toHaveBeenCalledWith(
        expect.any(Array),
        "Earth",
      );
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe renderizar la tabla de consulta de localizaciones", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "c_localizacion" })
        .mockResolvedValueOnce({ filtro: "Earth" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      vi.mocked(ServicioConsultas.buscarLocalizaciones).mockReturnValue([
        {
          nombre: "Tierra",
          tipo: "Planeta",
          dimension: { nombre: "C-137" },
        },
      ] as unknown as Planetas[]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarLocalizaciones).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe ejecutar el flujo de consulta de inventos", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "c_inventos" })
        .mockResolvedValueOnce({ filtro: "Portal" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      vi.mocked(ServicioConsultas.buscarInventos).mockReturnValue([]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarInventos).toHaveBeenCalledWith(
        expect.any(Array),
        "Portal",
      );
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe renderizar la tabla de consulta de inventos", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "c_inventos" })
        .mockResolvedValueOnce({ filtro: "Portal" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      vi.mocked(ServicioConsultas.buscarInventos).mockReturnValue([
        {
          nombre: "Pistola",
          inventor: { nombre: "Rick" },
          nivelPeligrosidad: 9,
        },
      ] as unknown as Invento[]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarInventos).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });
  });

  describe("Búsqueda de versiones alternativas", () => {
    it("Debe filtrar versiones alternativas correctamente", async () => {
      const listaPersonajes = [
        {
          id: "1",
          nombre: "Rick",
          dimensionOrigen: { nombre: "C-137" },
          estado: "Vivo",
        },
      ];

      vi.mocked(mockManager.personajes.getAll).mockReturnValue(
        listaPersonajes as unknown as Personaje[],
      );

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "versiones" })
        .mockResolvedValueOnce({ nombre: "Rick" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe mostrar un mensaje si no hay versiones alternativas", async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([]);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "versiones" })
        .mockResolvedValueOnce({ nombre: "Inexistente" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.log).toHaveBeenCalledWith(
        "No se encontraron versiones alternativas de este personaje",
      );
    });
  });

  describe("Menú principal extendido", () => {
    it("Debe entrar en eventos y volver", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "eventos" })
        .mockResolvedValueOnce({ tipo: "volver" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.registrarViaje).not.toHaveBeenCalled();
    });

    it("Debe registrar un viaje interdimensional", async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([
        { id: 1, nombre: "Rick" },
      ] as unknown as Personaje[]);

      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([
        { id: "C-137", nombre: "Dim C-137" },
        { id: "A-001", nombre: "Dim A-001" },
      ] as never);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "eventos" })
        .mockResolvedValueOnce({ tipo: "viaje" })
        .mockResolvedValueOnce({
          pIdx: 0,
          oIdx: 0,
          dIdx: 1,
          motivo: "Prueba",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.registrarViaje).toHaveBeenCalledWith(
        "1",
        "C-137",
        "A-001",
        "Prueba",
      );
    });

    it("Debe registrar un suceso en dimensión", async () => {
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([
        { id: "C-137", nombre: "Dim C-137" },
      ] as never);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "eventos" })
        .mockResolvedValueOnce({ tipo: "dimension" })
        .mockResolvedValueOnce({
          dIdx: 0,
          estado: "destruida",
          motivo: "Colapso",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.registrarSucesoDimension).toHaveBeenCalledWith(
        "C-137",
        "destruida",
        "Colapso",
      );
    });

    it("Debe registrar una acción con artefacto", async () => {
      vi.mocked(mockManager.inventos.getAll).mockReturnValue([
        { id: 9, nombre: "Portal Gun" },
      ] as unknown as Invento[]);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "eventos" })
        .mockResolvedValueOnce({ tipo: "artefacto" })
        .mockResolvedValueOnce({
          iIdx: 0,
          accion: "despliegue",
          desc: "Uso de prueba",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.registrarAccionArtefacto).toHaveBeenCalledWith(
        "9",
        "despliegue",
        "Uso de prueba",
      );
    });

    it("Debe mostrar informe tecnológico", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "informes" })
        .mockResolvedValueOnce({ tipo: "tec" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.informeNivelTecnologico).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(
        "🦾 El nivel tecnológico medio de las dimensiones activas es: 8.50",
      );
    });

    it("Debe mostrar informe de versiones", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "informes" })
        .mockResolvedValueOnce({ tipo: "versiones" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.informeVersionesAlternativas).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe mostrar informe de inventos críticos", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "informes" })
        .mockResolvedValueOnce({ tipo: "inventos" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.informeInventosCriticos).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe mostrar historial vacío de viajes", async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([
        { id: 1, nombre: "Rick" },
      ] as unknown as Personaje[]);

      vi.mocked(mockManager.historialViajes).mockReturnValue([]);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "informes" })
        .mockResolvedValueOnce({ tipo: "historial" })
        .mockResolvedValueOnce({ pIdx: 0 })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.historialViajes).toHaveBeenCalledWith("1");
      expect(console.log).toHaveBeenCalledWith(
        "No hay viajes registrados para este personaje.",
      );
    });

    it("Debe mostrar historial con datos", async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([
        { id: 1, nombre: "Rick" },
      ] as unknown as Personaje[]);

      vi.mocked(mockManager.historialViajes).mockReturnValue([
        {
          fecha: "2026-01-01",
          descripcion: "Viaje de prueba",
          idDestino: "A-001",
        },
      ] as never);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "informes" })
        .mockResolvedValueOnce({ tipo: "historial" })
        .mockResolvedValueOnce({ pIdx: 0 })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe detectar ausencia de anomalías", async () => {
      vi.mocked(mockManager.buscarAnomalias).mockReturnValue([]);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "anomalias" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.log).toHaveBeenCalledWith(
        "✅ No se detectan anomalías en el multiverso.",
      );
    });

    it("Debe detectar anomalías y mostrarlas", async () => {
      vi.mocked(mockManager.buscarAnomalias).mockReturnValue([
        {
          nombre: "Rick",
          dimensionOrigen: { nombre: "C-500A" },
        },
      ] as unknown as Personaje[]);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "anomalias" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.warn).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });
  });

  describe("Menú CRUD", () => {
    it("Debe entrar en CRUD y volver sin hacer nada", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "personajes", operacion: "volver" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.personajes.delete).not.toHaveBeenCalled();
    });

    it("Debe eliminar una entidad en el menú CRUD", async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "personajes", operacion: "borrar" })
        .mockResolvedValueOnce({ id: "123" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.personajes.delete).toHaveBeenCalledWith("123");
      expect(console.log).toHaveBeenCalledWith("✅ Elemento eliminado.");
    });

    it("Debe fallar al actualizar si el ID no existe", async () => {
      vi.mocked(mockManager.especies.getById).mockReturnValue(undefined);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "especies", operacion: "actualizar" })
        .mockResolvedValueOnce({ id: "invalid-id" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.error).toHaveBeenCalledWith("❌ El ID no existe.");
    });

    it("Debe listar especies", async () => {
      vi.mocked(mockManager.especies.getAll).mockReturnValue([
        {
          id: "E-1",
          name: "Humano",
          origin: { nombre: "Tierra" },
          type: "Humanoide",
          averageLifeExpectancy: 80,
          description: "Base",
        },
      ] as unknown as never);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "especies", operacion: "listar" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe listar inventos", async () => {
      vi.mocked(mockManager.inventos.getAll).mockReturnValue([
        {
          id: 1,
          nombre: "Portal Gun",
          inventor: { nombre: "Rick" },
          tipo: "Arma",
          nivelPeligrosidad: 10,
          descripcion: "Base",
        },
      ] as unknown as never);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "inventos", operacion: "listar" })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(console.table).toHaveBeenCalled();
    });

    it("Debe añadir especie con origen dimensión", async () => {
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([
        { nombre: "C-137" },
      ] as never);
      vi.mocked(mockManager.planetas.getAll).mockReturnValue([]);
      vi.mocked(mockManager.especies.add).mockImplementation(() => {});

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "especies", operacion: "anadir" })
        .mockResolvedValueOnce({
          id: "E-100",
          name: "Nueva",
          originType: "dimension",
          dimensionIdx: 0,
          type: "Humanoide",
          life: 50,
          desc: "Desc",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.especies.add).toHaveBeenCalled();
    });

    it("Debe añadir especie con origen planeta", async () => {
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([]);
      vi.mocked(mockManager.planetas.getAll).mockReturnValue([
        { nombre: "Tierra" },
      ] as never);
      vi.mocked(mockManager.especies.add).mockImplementation(() => {});

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "especies", operacion: "anadir" })
        .mockResolvedValueOnce({
          id: "E-101",
          name: "Nueva2",
          originType: "planeta",
          planetaIdx: 0,
          type: "Artificial",
          life: 10,
          desc: "Desc",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.especies.add).toHaveBeenCalled();
    });

    it("Debe añadir invento", async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([
        { nombre: "Rick" },
      ] as never);
      vi.mocked(mockManager.inventos.add).mockImplementation(() => {});

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: "crud" })
        .mockResolvedValueOnce({ entidad: "inventos", operacion: "anadir" })
        .mockResolvedValueOnce({
          id: 15,
          nombre: "Nuevo Invento",
          pIdx: 0,
          tipo: "Arma",
          peligro: 9,
          desc: "Desc",
        })
        .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

      await menu.iniciar();
      expect(mockManager.inventos.add).toHaveBeenCalled();
    });
  });
  describe("Cobertura de callbacks internos de prompts", () => {
    it("debe cubrir los validate y type del formulario de especies", async () => {
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([
        { nombre: "C-137" },
      ] as never);
      vi.mocked(mockManager.planetas.getAll).mockReturnValue([
        { nombre: "Tierra" },
      ] as never);
      vi.mocked(mockManager.especies.add).mockImplementation(() => {});

      vi.mocked(prompts).mockResolvedValueOnce({
        id: "E-200",
        name: "Specie Test",
        originType: "dimension",
        dimensionIdx: 0,
        type: "Humanoide",
        life: 20,
        desc: "Descripción test",
      });

      await (
        menu as unknown as {
          procesarFormulario: (
            entidad: "especies",
            operacion: "anadir" | "actualizar",
          ) => Promise<void>;
        }
      ).procesarFormulario("especies", "anadir");

      const config = vi.mocked(prompts).mock.calls[0][0] as Array<{
        name: string;
        validate?: (value: string | number) => boolean | string;
        type?: (
          prev: string,
          values?: { originType?: string },
        ) => string | null;
      }>;

      const nameField = config.find((c) => c.name === "name");
      const originTypeField = config.find((c) => c.name === "originType");
      const dimensionIdxField = config.find((c) => c.name === "dimensionIdx");
      const planetaIdxField = config.find((c) => c.name === "planetaIdx");
      const typeField = config.find((c) => c.name === "type");
      const lifeField = config.find((c) => c.name === "life");
      const descField = config.find((c) => c.name === "desc");

      expect(nameField?.validate?.("")).toBe("Obligatorio");
      expect(nameField?.validate?.("Hola")).toBe(true);

      expect(originTypeField).toBeDefined();

      expect(dimensionIdxField?.type?.("dimension")).toBe("select");
      expect(dimensionIdxField?.type?.("planeta")).toBeNull();

      expect(planetaIdxField?.type?.("", { originType: "planeta" })).toBe(
        "select",
      );
      expect(
        planetaIdxField?.type?.("", { originType: "dimension" }),
      ).toBeNull();

      expect(typeField?.validate?.("")).toBe("Obligatorio");
      expect(typeField?.validate?.("Alien")).toBe(true);

      expect(lifeField?.validate?.(-1)).toBe("No negativa");
      expect(lifeField?.validate?.(0)).toBe(true);

      expect(descField?.validate?.("")).toBe("Obligatorio");
      expect(descField?.validate?.("Descripción")).toBe(true);
    });

    it("debe cubrir el validate del formulario de inventos", async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([
        { nombre: "Rick" },
      ] as never);
      vi.mocked(mockManager.inventos.add).mockImplementation(() => {});

      vi.mocked(prompts).mockResolvedValueOnce({
        id: 999,
        nombre: "Invento Test",
        pIdx: 0,
        tipo: "Arma",
        peligro: 8,
        desc: "Descripción invento",
      });

      await (
        menu as unknown as {
          procesarFormulario: (
            entidad: "inventos",
            operacion: "anadir" | "actualizar",
          ) => Promise<void>;
        }
      ).procesarFormulario("inventos", "anadir");

      const config = vi.mocked(prompts).mock.calls[0][0] as Array<{
        name: string;
        validate?: (value: number) => boolean | string;
      }>;

      const peligroField = config.find((c) => c.name === "peligro");

      expect(peligroField?.validate?.(0)).toBe("Debe ser 1-10");
      expect(peligroField?.validate?.(11)).toBe("Debe ser 1-10");
      expect(peligroField?.validate?.(5)).toBe(true);
    });
    it("debe cubrir el validate del formulario de personajes", async () => {
      vi.mocked(mockManager.especies.getAll).mockReturnValue([
        { name: "Humano" },
      ] as never);
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([
        { nombre: "C-137" },
      ] as never);
      vi.mocked(mockManager.personajes.add).mockImplementation(() => {});

      vi.mocked(prompts).mockResolvedValueOnce({
        id: 500,
        nombre: "Personaje Test",
        eIdx: 0,
        dIdx: 0,
        afiliacion: "Independiente",
        iq: 8,
        desc: "Descripción test",
      });

      await (
        menu as unknown as {
          procesarFormulario: (
            entidad: "personajes",
            operacion: "anadir" | "actualizar",
          ) => Promise<void>;
        }
      ).procesarFormulario("personajes", "anadir");

      const config = vi.mocked(prompts).mock.calls[0][0] as Array<{
        name: string;
        validate?: (value: number) => boolean | string;
      }>;

      const iqField = config.find((c) => c.name === "iq");

      expect(iqField?.validate?.(0)).toBe("Debe ser 1-10");
      expect(iqField?.validate?.(11)).toBe("Debe ser 1-10");
      expect(iqField?.validate?.(5)).toBe(true);
    });
  });
  it("Debe entrar en la rama artefacto de menuEventos", async () => {
    vi.mocked(mockManager.inventos.getAll).mockReturnValue([
      { id: 7, nombre: "Portal Gun" },
    ] as unknown as Invento[]);

    vi.mocked(prompts)
      .mockResolvedValueOnce({ accion: "eventos" })
      .mockResolvedValueOnce({ tipo: "artefacto" })
      .mockResolvedValueOnce({
        iIdx: 0,
        accion: "despliegue",
        desc: "Prueba artefacto",
      })
      .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

    await menu.iniciar();

    expect(mockManager.registrarAccionArtefacto).toHaveBeenCalledWith(
      "7",
      "despliegue",
      "Prueba artefacto",
    );
  });

  it("Debe listar inventos en el CRUD", async () => {
    vi.mocked(mockManager.inventos.getAll).mockReturnValue([
      {
        id: 1,
        nombre: "Portal Gun",
        inventor: { nombre: "Rick" },
        tipo: "Arma",
        nivelPeligrosidad: 10,
        descripcion: "Base",
      },
    ] as unknown as Invento[]);

    vi.mocked(prompts)
      .mockResolvedValueOnce({ accion: "crud" })
      .mockResolvedValueOnce({ entidad: "inventos", operacion: "listar" })
      .mockResolvedValueOnce({ accion: "salir_sin_guardar" });

    await menu.iniciar();

    expect(console.table).toHaveBeenCalled();
  });

  it("Debe entrar en procesarFormulario para inventos", async () => {
    vi.mocked(mockManager.personajes.getAll).mockReturnValue([
      { nombre: "Rick" },
    ] as never);
    vi.mocked(mockManager.inventos.add).mockImplementation(() => {});

    vi.mocked(prompts).mockResolvedValueOnce({
      id: 99,
      nombre: "Invento Branch",
      pIdx: 0,
      tipo: "Arma",
      peligro: 9,
      desc: "Desc",
    });

    await (
      menu as unknown as {
        procesarFormulario: (
          entidad: "inventos",
          operacion: "anadir" | "actualizar",
        ) => Promise<void>;
      }
    ).procesarFormulario("inventos", "anadir");

    expect(mockManager.inventos.add).toHaveBeenCalled();
  });
  it("Debe cubrir la rama falsa final de menuEventos", async () => {
    vi.mocked(prompts).mockResolvedValueOnce({ tipo: "otro" });

    await (
      menu as unknown as {
        menuEventos: () => Promise<void>;
      }
    ).menuEventos();

    expect(mockManager.registrarViaje).not.toHaveBeenCalled();
    expect(mockManager.registrarSucesoDimension).not.toHaveBeenCalled();
    expect(mockManager.registrarAccionArtefacto).not.toHaveBeenCalled();
  });

  it("Debe cubrir la rama falsa final de listar en menuCRUD", async () => {
    vi.mocked(prompts).mockResolvedValueOnce({
      entidad: "otra",
      operacion: "listar",
    });

    await (
      menu as unknown as {
        menuCRUD: () => Promise<void>;
      }
    ).menuCRUD();

    expect(console.table).not.toHaveBeenCalled();
  });

  it("Debe cubrir la rama falsa final de procesarFormulario", async () => {
    await (
      menu as unknown as {
        procesarFormulario: (
          entidad:
            | "personajes"
            | "dimensiones"
            | "planetas"
            | "especies"
            | "inventos",
          operacion: "anadir" | "actualizar",
        ) => Promise<void>;
      }
    ).procesarFormulario("otra" as never, "anadir");

    expect(console.log).toHaveBeenCalledWith("✅ otra añadido con éxito.");
  });
});