import { describe, it, expect, beforeEach } from 'vitest';
import { DataManager } from "../src/database/DataManager.js";
import { IPlanetaJSON } from "../src/interfaces/IPlanetaJSON.js";

describe('clase DataManager', () => {

  // Limpiamos antes de cada test para que los resultados sean fiables
  beforeEach(async () => {
    const manager = await DataManager.getInstance();
    await manager.guardarBaseDatos('planetas', []);
  });

  it('debe cumplir el patrón Singleton', async () => {
    const manager1 = await DataManager.getInstance();
    const manager2 = await DataManager.getInstance();
    expect(manager1).toBe(manager2);
  });

  it('debe guardar y recuperar un planeta', async () => {
    const manager = await DataManager.getInstance();

    // Objeto que cumple estrictamente con IPlanetaJSON
    const planetaTest: IPlanetaJSON = {
      id: "P137",
      nombre: "Tierra C-137",
      tipo: "Planeta",
      dimension: "Dimensión C-137",
      poblacion: 1000,
      descripcion: "Hogar original de los protagonistas"
    };

    // guardar en planetas
    await manager.guardarBaseDatos('planetas', [planetaTest]);
    
    // obtener la colección de planetas
    const lista = manager.leerBaseDatos('planetas');

    expect(lista).toContainEqual(planetaTest);
    expect(lista[0].id).toBe("P137");
    expect(lista.length).toBe(1);
  });

  it('debe devolver un array vacío si la colección no tiene datos', async () => {
    const manager = await DataManager.getInstance();
    const especies = manager.leerBaseDatos('especies');
    
    expect(Array.isArray(especies)).toBe(true);
    expect(especies.length).toBe(0);
  });
});