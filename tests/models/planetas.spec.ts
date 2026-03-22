import { describe, it, expect, beforeEach } from 'vitest';
import { Planetas } from '../../src/models/Planetas.js'
import { TipoLocalizaciones } from '../../src/types/Localizaciones.js';
import { Dimension } from '../../src/models/Dimension.js';

describe("Planetas Model tests", () => {
  let dimension1: Dimension;
  let planeta: Planetas;
  const tipo1: TipoLocalizaciones = 'Planeta';

  beforeEach(() => {
    dimension1 = new Dimension('C-137', 'Dimensión Cronenberg', 'activa', 5, 'Leyes físicas alteradas');
    planeta = new Planetas('P137', 'Tierra C-137', tipo1, dimension1, 25000, '70% océano');
  });

  describe('Constructor y Getters', () => {
    it('Debe inicializar correctamente y permitir acceder a los atributos', () => {
      expect(planeta.id).toBe('P137');
      expect(planeta.nombre).toBe('Tierra C-137');
      expect(planeta.tipo).toBe(tipo1);
      expect(planeta.dimension).toBe(dimension1);
      expect(planeta.poblacion).toBe(25000);
      expect(planeta.descripcion).toBe('70% océano');
    });

    it("Debe dar error si el ID está vacío", () => {
      expect(() => {
        new Planetas('', 'Tierra C-137', tipo1, dimension1, 25000, '70% océano');
      }).toThrow(`El ID no puede estar vacío`);
    });

    it("Debe dar error si el nombre está vacío", () => {
      expect(() => {
        new Planetas('P137', '', tipo1, dimension1, 25000, '70% océano');
      }).toThrow(`El nombre no puede estar vacío`);
    });

    it("Debe dar error si la descripción está vacía", () => {
      expect(() => {
        new Planetas('P137', 'Tierra C-137', tipo1, dimension1, 25000, '');
      }).toThrow(`La descripción no puede estar vacía`);
    });
  });

  describe('Setters', () => {
    it('Debe permitir cambiar el valor de la población', () => {
      planeta.poblacion = 500;
      expect(planeta.poblacion).toBe(500);
    });

    it('Debe permitir cambiar el valor de la descripción', () => {
      planeta.descripcion = '30% tierra';
      expect(planeta.descripcion).toBe('30% tierra');
    });
  });
});