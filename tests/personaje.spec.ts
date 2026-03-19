import { describe, it, expect, beforeEach } from "vitest";
import { DataManager } from "../src/database/DataManager.js";
import { IPersonajeJSON } from "../src/interfaces/IPersonajeJSON.js";
import { EstadoPersonajes } from "../src/types/EstadoPersonajes.js";


describe("DataManager Integration Tests", () => {
  let dataManager: DataManager;

  // personaje que cumple IPersonajeJSON
  const mockPersonaje: IPersonajeJSON = {
    id: 1,
    nombre: "Rick Sanchez",
    especie: "Humano",
    dimensionOrigen: "Tierra C-137",
    estado: EstadoPersonajes.Vivo,
    afiliacion: "Independiente",
    nivelInteligencia: 9,
    descripcion: "descripcion de prueba"
  };

  beforeEach(async () => {
    dataManager = await DataManager.getInstance();
    await dataManager.guardarBaseDatos("personajes", []);
  });

  describe("Patrón Singleton y Conexión", () => {
    it("Debe garantizar que múltiples llamadas devuelven la misma instancia", async () => {
      const instancia2 = await DataManager.getInstance();
      expect(dataManager).toBe(instancia2);
    });

    it("Debe inicializar las colecciones como arrays vacíos si no hay datos", () => {
      const especies = dataManager.leerBaseDatos("especies");
      expect(Array.isArray(especies)).toBe(true);
      expect(especies).toHaveLength(0);
    });
  });

  describe("Persistencia de Datos (Lectura y Escritura)", () => {
    it("Debe guardar un personaje y permitir su lectura posterior", async () => {
      // 1. Guardamos
      await dataManager.guardarBaseDatos("personajes", [mockPersonaje]);
      
      // 2. Leemos
      const personajes = dataManager.leerBaseDatos("personajes");
      
      expect(personajes).toHaveLength(1);
      expect(personajes[0].nombre).toBe("Rick Sanchez");
      expect(personajes[0].id).toBe(1);
    });

    it("Debe sobrescribir la colección completa al guardar", async () => {
      // Guardamos el primer personaje
      await dataManager.guardarBaseDatos("personajes", [mockPersonaje]);
      
      // Creamos un segundo estado con un personaje diferente
      const otroPersonaje = { ...mockPersonaje, id: 2, nombre: "Morty Smith" };
      await dataManager.guardarBaseDatos("personajes", [otroPersonaje]);
      
      const resultado = dataManager.leerBaseDatos("personajes");
      
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nombre).toBe("Morty Smith");
      expect(resultado[0].id).not.toBe(1);
    });

    it("Debe mantener la integridad de los tipos al recuperar datos", () => {
      // Al usar el genérico K, TypeScript sabe que esto es un IPersonajeJSON[]
      const lista = dataManager.leerBaseDatos("personajes");
      
      // Podemos acceder a propiedades específicas sin hacer casting
      lista.forEach(p => {
        expect(typeof p.nombre).toBe("string");
        expect(Object.values(EstadoPersonajes)).toContain(p.estado);
      });
    });
  });
});