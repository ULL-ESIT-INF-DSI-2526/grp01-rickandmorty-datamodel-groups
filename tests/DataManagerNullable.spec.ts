import { describe, it, expect, vi } from "vitest";
import { DataManager } from "../src/database/DataManager.js";

vi.mock("lowdb", () => {
  return {
    Low: class {
      public data: unknown = null; 
      public read = vi.fn().mockResolvedValue(undefined);
      public write = vi.fn().mockResolvedValue(undefined);
      constructor(public adapter: unknown, public defaultData: unknown) {
      }
    }
  };
});

vi.mock("lowdb/node", () => ({
  JSONFile: vi.fn()
}));

describe("DataManager - Cobertura de Inicialización", () => {
  it("debe asignar datos iniciales cuando la base de datos está vacía (data es null)", async () => {

    const instance = await DataManager.getInstance();
    const personajes = instance.leerBaseDatos("personajes");
    
    expect(personajes).toEqual([]);
    expect(Array.isArray(personajes)).toBe(true);
  });
});