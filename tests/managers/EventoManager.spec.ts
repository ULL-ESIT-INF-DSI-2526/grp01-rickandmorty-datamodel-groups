import { describe, it, expect, beforeEach, vi } from "vitest";
import { EventoManager } from "../../src/managers/EventoManager";
import { DataManager } from "../../src/database/DataManager";
import { IEvento } from "../../src/interfaces/IEvento";

describe("EventoManager", () => {
  let manager: EventoManager;

  // Mock de un evento para reutilizar
  const mockEvento: IEvento = {
    id: "EV-1",
    fecha: "2026-03-20",
    tipo: "viaje interdimensional",
    descripcion: "Rick viaja a la Dimensión C-137",
    idPersonaje: "RICK-001",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new EventoManager();
  });

  it("debería empezar con una lista vacía", () => {
    expect(manager.getAll()).toEqual([]);
  });

  it("debería registrar un nuevo evento en memoria", () => {
    manager.registrar(mockEvento);
    const eventos = manager.getAll();

    expect(eventos).toHaveLength(1);
    expect(eventos[0]).toEqual(mockEvento);
  });

  it("debería cargar eventos desde el DataManager", async () => {
    const mockLeer = vi.fn().mockReturnValue([mockEvento]);
    vi.spyOn(DataManager, "getInstance").mockResolvedValue({
      leerBaseDatos: mockLeer,
    } as unknown as DataManager);

    await manager.cargar();

    expect(mockLeer).toHaveBeenCalledWith("eventos");
    expect(manager.getAll()).toHaveLength(1);
    expect(manager.getAll()[0].id).toBe("EV-1");
  });

  it("debería manejar el caso donde DataManager devuelve datos nulos al cargar", async () => {
    vi.spyOn(DataManager, "getInstance").mockResolvedValue({
      leerBaseDatos: vi.fn().mockReturnValue(null),
    } as unknown as DataManager);

    await manager.cargar();

    expect(manager.getAll()).toEqual([]);
  });

  it("debería guardar los eventos usando el DataManager", async () => {
    const mockGuardar = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(DataManager, "getInstance").mockResolvedValue({
      guardarBaseDatos: mockGuardar,
    } as unknown as DataManager);

    manager.registrar(mockEvento);
    await manager.guardar();

    expect(mockGuardar).toHaveBeenCalledWith("eventos", [mockEvento]);
  });

  it("debería filtrar eventos por id de personaje (getById)", () => {
    const evento2: IEvento = {
      ...mockEvento,
      id: "EV-2",
      idPersonaje: "MORTY-001",
    };

    manager.registrar(mockEvento);
    manager.registrar(evento2);

    const resultados = manager.getById("RICK-001");

    expect(resultados).toHaveLength(1);
    expect(resultados[0].idPersonaje).toBe("RICK-001");
    expect(resultados[0].id).toBe("EV-1");
  });

  it("debería devolver un array vacío si no hay eventos para ese personaje", () => {
    manager.registrar(mockEvento);
    const resultados = manager.getById("personaje inexistente");

    expect(resultados).toEqual([]);
  });
});
