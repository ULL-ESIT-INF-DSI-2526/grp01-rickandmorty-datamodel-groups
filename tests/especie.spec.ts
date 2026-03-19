import { describe, it, expect, beforeEach } from "vitest";
import { Especie } from "../src/models/Especie.js";

describe("Especie Model tests", () => {
  // Valores por defecto válidos para las pruebas
  const validId = "ESP-001";
  const validNombre = "Humano";
  const validOrigen = "Tierra (Dimensión C-137)";
  const validTipo = "Mamífero";
  const validLife = 80;
  const validDesc = "Especie inteligente dominante de su planeta.";

  let especieBase: Especie;

  beforeEach(() => {
    // Inicializamos una especie limpia antes de cada test
    especieBase = new Especie(
      validId,
      validNombre,
      validOrigen,
      validTipo,
      validLife,
      validDesc
    );
  });

  describe("Constructor e Integridad", () => {
    it("Debe crear una instancia válida si los parámetros son correctos", () => {
      expect(especieBase).toBeDefined();
      expect(especieBase.id).toBe(validId);
      expect(especieBase.nombre).toBe(validNombre);
      expect(especieBase.averageLifeExpectancy).toBe(validLife);
    });

  
  });

  describe("Getters y Setters", () => {
    it("Debe permitir modificar propiedades a través de los setters", () => {
      especieBase.nombre = "Cromulon";
      especieBase.averageLifeExpectancy = 5000;
      
      expect(especieBase.nombre).toBe("Cromulon");
      expect(especieBase.averageLifeExpectancy).toBe(5000);
    });

  });

  describe("Persistencia", () => {
    it("toJSON() debe devolver un objeto plano con la estructura de IEspecie", () => {
      const json = especieBase.toJSON();
      
      expect(json).toEqual({
        id: validId,
        nombre: validNombre,
        origen: validOrigen,
        tipo: validTipo,
        averageLifeExpectancy: validLife,
        descripcion: validDesc
      });
      
      // Verificamos que sea un objeto plano y no la instancia de la clase
      expect(json).not.toBeInstanceOf(Especie);
    });
  });
});