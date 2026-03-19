import { beforeEach, describe, expect, it } from "vitest";
import { Specie } from "../../src/models/Especie.js";
import { EspecieManager } from "../../src/services/EspecieManager.js";

describe("EspecieManager", function () {
  let manager: EspecieManager;
  let humano: Specie;
  let meeseeks: Specie;

  beforeEach(function () {
    manager = new EspecieManager();

    humano = new Specie(
      "sp-001",
      "Human",
      "Earth C-137",
      "Humanoid",
      80,
      "Especie común",
    );

    meeseeks = new Specie(
      "sp-002",
      "Meeseeks",
      "Mr. Meeseeks Box",
      "Artificial",
      1,
      "Cumplen tareas",
    );
  });

  it("añade una especie", function () {
    manager.addItem(humano);
    expect(manager.getNumberOfItems()).toBe(1);
  });

  it("lanza error si el id está repetido", function () {
    manager.addItem(humano);

    expect(function () {
      manager.addItem(humano);
    }).toThrow();
  });

  it("devuelve una especie por índice", function () {
    manager.addItem(humano);
    expect(manager.getItem(0)).toBe(humano);
  });

  it("lanza error si el índice no es válido", function () {
    expect(function () {
      manager.getItem(0);
    }).toThrow();
  });

  it("busca por id", function () {
    manager.addItem(humano);
    expect(manager.searchById("sp-001")).toBe(humano);
  });

  it("busca por nombre", function () {
    manager.addItem(humano);
    manager.addItem(meeseeks);

    const resultado = manager.searchByName("human");
    expect(resultado).toHaveLength(1);
    expect(resultado[0]?.name).toBe("Human");
  });

  it("busca por origen", function () {
    manager.addItem(humano);

    const resultado = manager.searchByOrigin("earth");
    expect(resultado).toHaveLength(1);
    expect(resultado[0]?.name).toBe("Human");
  });

  it("busca por tipo", function () {
    manager.addItem(humano);

    const resultado = manager.searchByType("humanoid");
    expect(resultado).toHaveLength(1);
    expect(resultado[0]?.name).toBe("Human");
  });

  it("elimina una especie por id", function () {
    manager.addItem(humano);
    manager.removeById("sp-001");

    expect(manager.getNumberOfItems()).toBe(0);
  });

  it("lanza error si intenta eliminar una especie que no existe", function () {
    expect(function () {
      manager.removeById("sp-999");
    }).toThrow();
  });

  it("devuelve todas las especies", function () {
    manager.addItem(humano);
    manager.addItem(meeseeks);

    const resultado = manager.getItems();
    expect(resultado).toHaveLength(2);
  });
});