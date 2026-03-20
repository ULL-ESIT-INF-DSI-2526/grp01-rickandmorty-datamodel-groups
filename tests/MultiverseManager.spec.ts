import { describe, it, expect, beforeEach, vi } from "vitest";
import { MultiverseManager } from "../src/managers/MultiverseManager";
import { Dimension } from "../src/models/Dimension";
import { Personaje } from "../src/models/Personaje";
import { Invento } from "../src/models/Invento";
import { IEvento } from "../src/interfaces/IEvento";
import { EstadoPersonajes } from "../src/types/EstadoPersonajes";
import { Especie } from "../src/models/Especie";

describe("Pruebas de Integración: MultiverseManager", () => {
  let manager: MultiverseManager;

  // datos de prueba
  const mockDimensiones = [
    {
      id: "DIM-1",
      nombre: "Tierra C-137",
      estado: "activa",
      nivelTecnologico: 10,
    },
    {
      id: "DIM-2",
      nombre: "Dimensión Cronenberg",
      estado: "destruida",
      nivelTecnologico: 5,
    },
    {
      id: "DIM-3",
      nombre: "Tierra Prime",
      estado: "activa",
      nivelTecnologico: 20,
    },
  ];

  const mockPersonajes = [
    { id: "P1", nombre: "Rick Sanchez", dimensionOrigen: { id: "DIM-1" } },
    // crear anomalia dimension destruida
    { id: "P2", nombre: "Rick Sanchez", dimensionOrigen: { id: "DIM-2" } },
    { id: "P3", nombre: "Morty Smith", dimensionOrigen: { id: "DIM-1" } },
    // crear anomalia no existe dimension
    {
      id: "P4",
      nombre: "Personaje Perdido",
      dimensionOrigen: { id: "DIM-99" },
    },
  ];

  const mockInventos = [
    {
      id: "I1",
      nombre: "Pistola Portales",
      nivelPeligrosidad: 10,
      inventor: mockPersonajes[0],
    },
    {
      id: "I2",
      nombre: "Caja de Meeseeks",
      nivelPeligrosidad: 9,
      inventor: mockPersonajes[0],
    },
    {
      id: "I3",
      nombre: "Pasapurés",
      nivelPeligrosidad: 2,
      inventor: mockPersonajes[2],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    manager = MultiverseManager.getInstance();

    vi.spyOn(manager["_dimensiones"], "getAll").mockReturnValue(
      mockDimensiones as unknown as Dimension[],
    );
    vi.spyOn(manager["_personajes"], "getAll").mockReturnValue(
      mockPersonajes as unknown as Personaje[],
    );
    vi.spyOn(manager["_inventos"], "getAll").mockReturnValue(
      mockInventos as unknown as Invento[],
    );
  });

  it("debería detectar las 2 anomalías", () => {
    const anomalias = manager.buscarAnomalias();
    expect(anomalias).toHaveLength(2);
    const ids = anomalias.map((a) => a.id);
    expect(ids).toContain("P2");
    expect(ids).toContain("P4");
  });

  it("debería calcular el promedio tecnológico de dimensiones activas", () => {
    const promedio = manager.informeNivelTecnologico();
    expect(promedio).toBe(15);
  });

  it("debería encontrar personajes alternativos", () => {
    const versiones = manager.informeVersionesAlternativas();
    expect(versiones).toHaveLength(1);
    expect(versiones[0][0]).toBe("Rick Sanchez");
    expect(versiones[0][1]).toBe(2);
  });

  it("debería identificar los inventos peligrosos", () => {
    const peligros = manager.informeInventosCriticos();

    expect(peligros).toHaveLength(2);
    expect(peligros[0].nombre).toBe("Pistola Portales");
    expect(peligros[1].nombre).toBe("Caja de Meeseeks");
  });

  it("debería registrar un viaje y llamar manager de eventos", () => {
    const spyRegistrar = vi.spyOn(manager["_eventosMultiverso"], "registrar");

    manager.registrarViaje("P1", "DIM-1", "DIM-3", "evento test1");

    expect(spyRegistrar).toHaveBeenCalledWith(
      expect.objectContaining({
        tipo: "viaje interdimensional",
        idPersonaje: "P1",
      }),
    );
  });

  it("debería registrar la acción del artefacto cuando el invento EXISTE", () => {
    const mockInvento = {
      id: "I-1",
      nombre: "Pistola",
      inventor: {
        dimensionOrigen: { id: "DIM-C137" },
      },
    };

    vi.spyOn(manager["_inventos"], "getById").mockReturnValue(
      mockInvento as unknown as Invento,
    );
    const spyRegistrar = vi.spyOn(manager["_eventosMultiverso"], "registrar");

    manager.registrarAccionArtefacto(
      "I-100",
      "despliegue",
      "Prueba de cobertura",
    );
    expect(spyRegistrar).toHaveBeenCalled();
    expect(spyRegistrar).toHaveBeenCalledWith(
      expect.objectContaining({
        idArtefacto: "I-100",
        tipo: "despliegue artefacto",
      }),
    );
  });

  it("no debería registrar nada si el invento no existe", () => {
    vi.spyOn(manager["_inventos"], "getById").mockReturnValue(undefined);
    const spyRegistrar = vi.spyOn(manager["_eventosMultiverso"], "registrar");

    manager.registrarAccionArtefacto(
      "Id inexistente",
      "neutralizacion",
      "nada",
    );

    expect(spyRegistrar).not.toHaveBeenCalled();
  });

  it("debería actualizar estado de dimensión y registrar evento", () => {
    const mockDim = { id: "DIM-1", estado: "activa" };
    vi.spyOn(manager["_dimensiones"], "getById").mockReturnValue(
      mockDim as unknown as Dimension,
    );
    const spyReg = vi.spyOn(manager["_eventosMultiverso"], "registrar");

    manager.registrarSucesoDimension("DIM-1", "destruida", "suceso test");

    expect(mockDim.estado).toBe("destruida");
    expect(spyReg).toHaveBeenCalled();
  });

  it("debería mostrar error si la dimensión no existe", () => {
    vi.spyOn(manager["_dimensiones"], "getById").mockReturnValue(undefined);
    const spyConsole = vi.spyOn(console, "error").mockImplementation(() => {});

    manager.registrarSucesoDimension("Id inexistente", "activa", "nada");

    expect(spyConsole).toHaveBeenCalledWith(
      expect.stringContaining("no existe"),
    );
  });

  it("debería registrar la acción de un artefacto si el invento existe (con instancias reales)", () => {
    const dim = new Dimension("D-1", "Tierra C-137", "activa", 10, "Base");
    const esp = new Especie("E1", "Humano", "Tierra", "Mamífero", 80, "Base");

    const inventor = new Personaje(
      1,
      "Rick",
      esp,
      dim,
      EstadoPersonajes.Vivo,
      "Independiente",
      10,
      "Genio",
    );

    const mockInvento = new Invento(1, "Pistola", inventor, "arma", 9, "desc");

    vi.spyOn(manager["_inventos"], "getById").mockReturnValue(mockInvento);

    const spyReg = vi.spyOn(manager["_eventosMultiverso"], "registrar");

    manager.registrarAccionArtefacto("I1", "despliegue", "Ataque");

    expect(spyReg).toHaveBeenCalledWith(
      expect.objectContaining({
        idArtefacto: "I1",
        idOrigen: "D-1",
      }),
    );
  });

  it("debería devolver 0 si no hay dimensiones activas", () => {
    vi.spyOn(manager, "dimensionesPorEstado").mockReturnValue([]);
    const promedio = manager.informeNivelTecnologico();
    expect(promedio).toBe(0);
  });

  it("debería filtrar el historial de viajes", () => {
    // viaje de prueba
    const mockViaje = {
      id: "V1",
      idPersonaje: "P1",
      tipo: "viaje interdimensional",
      descripcion: "viaje prueba",
    };

    vi.spyOn(manager["_eventosMultiverso"], "getById").mockReturnValue([
      mockViaje,
    ] as IEvento[]);

    const historial = manager.historialViajes("P1");
    expect(historial).toHaveLength(1);
    expect(historial[0].tipo).toBe("viaje interdimensional");
  });

  it("debería inicializar y cargar todos los datos de los managers", async () => {
    const spyEventos = vi
      .spyOn(manager["_eventosMultiverso"], "cargar")
      .mockResolvedValue();
    const spyDimensiones = vi
      .spyOn(manager["_dimensiones"], "cargar")
      .mockResolvedValue();
    const spyPersonajes = vi
      .spyOn(manager["_personajes"], "cargar")
      .mockResolvedValue();
    const spyInventos = vi
      .spyOn(manager["_inventos"], "cargar")
      .mockResolvedValue();

    await manager.inicializar();
    expect(spyEventos).toHaveBeenCalled();
    expect(spyDimensiones).toHaveBeenCalled();
    expect(spyPersonajes).toHaveBeenCalled();
    expect(spyInventos).toHaveBeenCalled();
  });

  it("debería persistir los datos llamando a los métodos guardar de cada manager", async () => {
    const spyEventos = vi
      .spyOn(manager["_eventosMultiverso"], "guardar")
      .mockResolvedValue();
    const spyDimensiones = vi
      .spyOn(manager["_dimensiones"], "guardar")
      .mockResolvedValue();
    const spyPersonajes = vi
      .spyOn(manager["_personajes"], "guardar")
      .mockResolvedValue();
    const spyInventos = vi
      .spyOn(manager["_inventos"], "guardar")
      .mockResolvedValue();
    const spyPlanetas = vi
      .spyOn(manager["_planetas"], "guardar")
      .mockResolvedValue();
    const spyEspecies = vi
      .spyOn(manager["_especies"], "guardar")
      .mockResolvedValue();

    await manager.persistirMultiverso();

    expect(spyEventos).toHaveBeenCalled();
    expect(spyDimensiones).toHaveBeenCalled();
    expect(spyPersonajes).toHaveBeenCalled();
    expect(spyInventos).toHaveBeenCalled();
    expect(spyPlanetas).toHaveBeenCalled();
    expect(spyEspecies).toHaveBeenCalled();
  });
});
