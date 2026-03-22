import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataManager } from "../src/database/DataManager.js";
import { Low } from "lowdb";
import { IEsquema } from "../src/interfaces/IEsquema.js";

// 1. Importamos tus datos reales para usarlos de base
import datosReales from "../database.json";
import { IInventoJSON } from "../src/interfaces/IInventoJSON.js";

describe("DataManager (Tests de Integración Completos)", () => {
  let manager: DataManager;

  beforeEach(async () => {
    vi.restoreAllMocks();

    // BLOQUEO DE ESCRITURA: Evitamos que cualquier test toque el archivo físico
    const spyWrite = vi.spyOn(Low.prototype, 'write').mockResolvedValue(undefined);
    
    manager = await DataManager.getInstance();

    // INYECCIÓN DE DATOS: Cargamos el estado inicial del JSON real en la memoria del Singleton
    for (const coleccion in datosReales) {
      const clave = coleccion as keyof IEsquema;
      // Usamos JSON.parse/stringify para clonar y no mutar el objeto importado
      await manager.guardarBaseDatos(clave, JSON.parse(JSON.stringify(datosReales[clave])));
    }
    
    spyWrite.mockClear();
  });

  // --- GRUPO DE LECTURA ---
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

  // --- GRUPO DE ESCRITURA ---
  describe("Escritura y persistencia en memoria", () => {
    
    it("debe permitir añadir un nuevo invento sin borrar el resto", async () => {
  const listaOriginal = manager.leerBaseDatos("inventos");
  const numAntes = listaOriginal.length;
  
  // CORRECCIÓN: El ID ahora es un número (ej: 9999) para coincidir con la interfaz
  const nuevoInvento: IInventoJSON = { 
    ...listaOriginal[0], 
    id: 9999, // <--- Antes era "INV-TEST-999" (string), ahora es number
    nombre: "Pistola de portales v2" 
  };
  
  await manager.guardarBaseDatos("inventos", [...listaOriginal, nuevoInvento]);

  expect(manager.leerBaseDatos("inventos")).toHaveLength(numAntes + 1);
  expect(Low.prototype.write).toHaveBeenCalled();
});

    it("debe permitir vaciar una colección en memoria (ej. eventos) sin afectar a las demás", async () => {
      // Vaciamos eventos
      await manager.guardarBaseDatos("eventos", []);
      
      expect(manager.leerBaseDatos("eventos")).toHaveLength(0);
      // Verificamos que los planetas (u otra cosa) siguen ahí intactos
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