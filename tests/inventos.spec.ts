import { describe, it, expect, beforeEach } from "vitest";
import { Invento } from "../src/models/Invento.js";
import { Personaje } from "../src/models/Personaje.js";
import { Dimension } from "../src/models/Dimension.js";
import { Especie } from "../src/models/Especie.js";
import { EstadoPersonajes } from "../src/types/EstadoPersonajes.js";
import { TipoInvento } from "../src/types/TipoInventos.js";

describe("Invento Model tests", () => {
  let dimensionBase: Dimension;
  let especieBase: Especie;
  let inventorBase: Personaje;
  let inventoBase: Invento;

  beforeEach(() => {
    dimensionBase = new Dimension("C-137", "Tierra", "activa", 5, "Dimensión original");
    especieBase = new Especie("E1", "Humano", dimensionBase, "Omnívoro", 10, "Tierra");
    inventorBase = new Personaje(1, "Rick", especieBase, dimensionBase, EstadoPersonajes.Vivo, "Independiente", 10, "Genio");
    
    // Instancia de referencia para los tests
    inventoBase = new Invento(100, "Pistola de Portales", inventorBase, "dispositivo de viaje", 10, "Desc");
  });

  describe("Constructor y validaciones", () => {
    it("Debe crear una instancia válida si los datos son correctos", () => {
      expect(inventoBase.id).toBe(100);
      expect(inventoBase.nivelPeligrosidad).toBe(10);
      expect(inventoBase.inventor).toBe(inventorBase);
    });

    it("Debe lanzar error si la peligrosidad no es válida (1-10)", () => {
      [0, 11, 5.5, -1].forEach((level) => {
        expect(() => new Invento(100, "Test", inventorBase, "arma", level, "desc"))
          .toThrow(`[Invento Error]: el nivel de peligrosidad debe estar entre 1 y 10, se recibió: ${level}`);
      });
    });

    it("Debe permitir niveles extremos (1 y 10)", () => {
      [1, 10].forEach((level) => {
        const inv = new Invento(100, "Test", inventorBase, "biotecnología", level, "desc");
        expect(inv.nivelPeligrosidad).toBe(level);
      });
    });
  });

  describe("Getters y Setters", () => {
    it("Debe permitir cambiar el inventor y el tipo", () => {
      const nuevoInv = new Personaje(2, "Morty", especieBase, dimensionBase, EstadoPersonajes.Vivo, "Independiente", 3, "Nieto");
      
      inventoBase.inventor = nuevoInv;
      inventoBase.tipo = "Objeto cotidiano" as TipoInvento;

      expect(inventoBase.inventor).toBe(nuevoInv);
      expect(inventoBase.tipo).toBe("Objeto cotidiano");
    });

    it("Debe validar el nivel de peligrosidad al usar el setter", () => {
      inventoBase.nivelPeligrosidad = 5;
      expect(() => { inventoBase.nivelPeligrosidad = 13; }).toThrow("[Invento Error]");
      expect(inventoBase.nivelPeligrosidad).toBe(5); // Mantiene el último valor válido
    });

    it("Debe permitir modificar la descripción", () => {
      inventoBase.descripcion = "Nueva desc";
      expect(inventoBase.descripcion).toBe("Nueva desc");
    });

    it("Debe dar error si el ID es igual a 0", () => {
      expect(() => {
        new Invento(0, "Pistola de Portales", inventorBase, "dispositivo de viaje", 10, "Desc");
      }).toThrow(`El ID no puede ser 0`);
    });

    it("Debe dar error si el nombre está vacío", () => {
      expect(() => {
        new Invento(100, "", inventorBase, "dispositivo de viaje", 10, "Desc");
      }).toThrow(`El nombre no puede estar vacío`);
    });

    it("Debe dar error si la descripción está vacía", () => {
      expect(() => {
        new Invento(100, "Pistola de Portales", inventorBase, "dispositivo de viaje", 10, "");
      }).toThrow(`La descripción no puede estar vacía`);
    });
  });
});