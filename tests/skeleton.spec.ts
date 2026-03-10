import { describe, it, expect } from "vitest";
import { suma } from "../src/index.ts";

describe("Pruebas de la función suma", () => {
  // --- FORMA 1: Casos individuales (Estilo BDD) ---
  describe("Comportamientos específicos", () => {
    it("debería funcionar correctamente con el número cero", () => {
      expect(suma(0, 5)).toBe(5);
    });
  });

  // --- FORMA 2: Bloque de datos (Table-Driven Testing) ---
  describe("Pruebas paramétricas de suma aritmética", () => {
    it.each([
      [1, 2, 3],
      [-1, -2, -3],
      [5, -2, 3],
      [1.5, 2.5, 4],
      [100, 200, 300],
    ])("Calculando: %d + %d debería ser %d", (a, b, expected) => {
      expect(suma(a, b)).toBe(expected);
    });
  });
});
