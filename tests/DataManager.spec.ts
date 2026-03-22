import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataManager } from "../src/database/DataManager.js";
import { Low } from "lowdb";
import { IEsquema } from "../src/interfaces/IEsquema.js";

/* Importamos datos reales para usarlos de base */
import datosReales from "../database.json";
import { IInventoJSON } from "../src/interfaces/IInventoJSON.js";

describe("DataManager (Tests de Integración Completos)", () => {
  let manager: DataManager;

  beforeEach(async () => {
    vi.restoreAllMocks();

    const spyWrite = vi.spyOn(Low.prototype, 'write').mockResolvedValue(undefined);
    manager = await DataManager.getInstance()
    for (const coleccion in datosReales) {
      const clave = coleccion as keyof IEsquema;
      await manager.guardarBaseDatos(clave, JSON.parse(JSON.stringify(datosReales[clave])));
    }
    
    spyWrite.mockClear();
  });

  describe("Lectura de colecciones reales", () => {
    it("debe leer personajes correctamente", () => {
      const personajes = manager.leerBaseDatos("personajes");
      expect(Array.isArray(personajes)).toBe(true);
      expect(personajes.length).toBeGreaterThan(0);
    });

    it("debe leer dimensiones correctamente", () => {
      const dimensiones = manager.leerBaseDatos("dimensiones");
      expect(Array.isArray(dimensiones)).toBe(true);
      expect(dimensiones.length).toBeGreaterThan(0);
    });

    it("debe leer inventos correctamente", () => {
      const inventos = manager.leerBaseDatos("inventos");
      expect(Array.isArray(inventos)).toBe(true);
      expect(inventos.length).toBeGreaterThan(0);
    });
  });

  describe("Escritura y persistencia en memoria", () => {
    
    it("debe permitir añadir un nuevo invento sin borrar el resto", async () => {
  const listaOriginal = manager.leerBaseDatos("inventos");
  const numAntes = listaOriginal.length;
  
  const nuevoInvento: IInventoJSON = { 
    ...listaOriginal[0], 
    id: 9999, 
    nombre: "Pistola de portales v2" 
  };
  
  await manager.guardarBaseDatos("inventos", [...listaOriginal, nuevoInvento]);

  expect(manager.leerBaseDatos("inventos")).toHaveLength(numAntes + 1);
  expect(Low.prototype.write).toHaveBeenCalled();
});

    it("debe permitir vaciar una colección en memoria sin afectar a las demás", async () => {
      await manager.guardarBaseDatos("eventos", []);
      
      expect(manager.leerBaseDatos("eventos")).toHaveLength(0);
      expect(manager.leerBaseDatos("planetas").length).toBeGreaterThan(0);
    });

    it("debe actualizar un personaje existente", async () => {
      const personajes = [...manager.leerBaseDatos("personajes")];
      const idModificar = personajes[0].id;
      
      personajes[0] = { ...personajes[0], nombre: "Rick Sanchez Editado" };
      
      await manager.guardarBaseDatos("personajes", personajes);
      
      const personajesPost = manager.leerBaseDatos("personajes");
      expect(personajesPost[0].id).toBe(idModificar);
      expect(personajesPost[0].nombre).toBe("Rick Sanchez Editado");
    });
  });

  it("debe cumplir el patrón Singleton (misma instancia en memoria)", async () => {
    const otraInstancia = await DataManager.getInstance();
    expect(manager).toBe(otraInstancia);
  });
  
});