import { describe, it, expect, beforeEach } from 'vitest';
import { Planetas } from '../src/models/Planetas.js'
import { TipoLocalizaciones } from '../src/types/Localizaciones.js';
import { Dimension } from '../src/models/Dimension.js';

describe("Dimension Model tests", () => {
  let dimension1: Dimension;
  let dimension2: Dimension;
  let planeta: Planetas;
  let localizacion: Planetas;
  const tipo1: TipoLocalizaciones = 'Planeta';
  const tipo2: TipoLocalizaciones = 'Estación espacial';

  beforeEach(() => {
    dimension1 = new Dimension('C-137', 'Dimensión Cronenberg', 'activa', 5, 'Leyes físicas alteradas');
    dimension2 = new Dimension('C-500A', 'Dimensión Burbuja', 'activa', 8, 'Leyes físicas invertidas');
    planeta = new Planetas('P137', 'Tierra C-137', tipo1, dimension1, 25000, '70% océano');
    localizacion = new Planetas('E450', 'Citadela de los Ricks', tipo2, dimension2, 5000, 'Cada vez menos población');
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
  });

  describe('Setters', () => {
    it ('Debe permitir cambiar el valor de la población', () => {
      planeta.poblacion = 500;
      expect(planeta.poblacion).toBe(500);
      localizacion.poblacion = 200;
      expect(localizacion.poblacion).toBe(200);
    });

    it ('Debe permitir cambiar el valor de la descripción', () => {
      planeta.descripcion = '30% tierra';
      expect(planeta.descripcion).toBe('30% tierra');
      localizacion.descripcion = 'Disminuye la población';
      expect(localizacion.descripcion).toBe('Disminuye la población');
    });
  });
});
