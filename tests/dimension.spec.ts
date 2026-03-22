import { describe, it, expect, beforeEach } from 'vitest';
import { Dimension } from '../src/models/Dimension';
import { DimensionStatus } from '../src/types/Dimension.types';

describe("Dimension Model tests", () => {
  const validId = 'C-137';
  const validNombre = 'Dimensión Cronenberg';
  const validEstado: DimensionStatus = 'activa';
  const validNivel = 5;
  const validDesc = 'Leyes físicas alteradas';
  let dimensionBase: Dimension;

  beforeEach(() => {
    dimensionBase = new Dimension(validId, validNombre, validEstado, validNivel, validDesc);
  });

  describe("Constructor y validaciones de integridad", () => {
    it("Debe crear una instancia válida de Dimensión si todos los datos son correctos", () => {
      expect(dimensionBase).toBeDefined();
      expect(dimensionBase.id).toBe(validId);
      expect(dimensionBase.nivelTecnologico).toBe(validNivel);
    });

    it("Debe lanzar error si el ID no cumple la nomenclatura del Consejo de Ricks", () => {
      const invalidIds = ['137-C', 'c-137', 'XYZ', ''];
      invalidIds.forEach(id => {
        expect(() => {
          new Dimension(id, validNombre, validEstado, validNivel, validDesc);
        }).toThrow(`Formato de ID inválido: "${id}" no sigue la nomenclatura del Consejo de Ricks.`);
      });
    });

    it('Debe aceptar IDs complejos', () => {
      const complexIds = ['J19ζ7', 'C-500A', 'K-202'];
      complexIds.forEach(id => {
        const dim = new Dimension(id, validNombre, validEstado, validNivel, validDesc);
        expect(dim.id).toBe(id);
      });
    });

    it("Debe lanzar error si el nombre está vacío", () => {
      expect(() => {
        new Dimension(validId, '', validEstado, 0, validDesc);
      }).toThrow(`El nombre no puede estar vacío`)
    });

    it("Debe lanzar error si la descripción está vacía", () => {
      expect(() => {
        new Dimension(validId, validNombre, validEstado, 0, '');
      }).toThrow(`La descripción no puede estar vacía`)
    });

    it("Debe lanzar error si el nivel tecnológico es menor a 1", () => {
      expect(() => {
        new Dimension(validId, validNombre, validEstado, 0, validDesc);
      }).toThrow(`Nivel tecnológico inválido: "0" debe ser un número entero entre 1 y 10.`)
    });

    it("Debe lanzar error si el nivel tecnológico es mayor a 10", () => {
      expect(() => {
        new Dimension(validId, validNombre, validEstado, 11, validDesc);
      }).toThrow(`Nivel tecnológico inválido: "11" debe ser un número entero entre 1 y 10.`)
    });

    it("Debe lanzar error si el nivel tecnológico no es un entero", () => {
      expect(() => {
        new Dimension(validId, validNombre, validEstado, 6.5, validDesc);
      }).toThrow(`Nivel tecnológico inválido: "6.5" debe ser un número entero entre 1 y 10.`)
    });
  });

  describe("Getters y Setters", () => {
    it("Debe permitir cambiar el estado si es válido", () => {
      dimensionBase.estado = 'destruida';
      expect(dimensionBase.estado).toBe('destruida');
    });

    it("Debe permitir cambiar el nivel tecnológico si es válido", () => {
      dimensionBase.nivelTecnologico = 10;
      expect(dimensionBase.nivelTecnologico).toBe(10);
    });

    it("Debe fallar al cambiar el nivel tecnológico si es inválido", () => {
      expect(() => { dimensionBase.nivelTecnologico = 15; }).toThrow(/Nivel tecnológico inválido/);
    });
  });
});
