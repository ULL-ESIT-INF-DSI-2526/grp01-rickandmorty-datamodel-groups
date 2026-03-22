import { describe, it, expect, beforeEach } from 'vitest';
import { Personaje } from '../src/models/Personaje.js';
import { Especie } from '../src/models/Especie.js';
import { Dimension } from '../src/models/Dimension.js';
import { EstadoPersonajes } from '../src/types/EstadoPersonajes.js';

describe("Personaje Model tests", () => {
  let rick: Personaje;
  let morty: Personaje;
  let especieHumana: Especie;
  let dimensionC137: Dimension;

  beforeEach(() => {
    // Datos de apoyo necesarios para instanciar un Personaje
    dimensionC137 = new Dimension('C-137', 'Tierra C-137', 'activa', 5, 'Leyes físicas base');
    especieHumana = new Especie('E1', 'Humano', dimensionC137, 'Mamífero', 80, 'Especie base');

    rick = new Personaje(
      1, 
      'Rick Sanchez', 
      especieHumana, 
      dimensionC137, 
      EstadoPersonajes.Vivo, 
      "Independiente", 
      10, 
      'Científico brillante'
    );

    morty = new Personaje(
      2, 
      'Morty Smith', 
      especieHumana, 
      dimensionC137, 
      EstadoPersonajes.Vivo, 
      "Independiente", 
      3, 
      'Nieto de Rick'
    );
  });

  describe('Constructor y Getters', () => {
    it('Debe inicializar correctamente y permitir acceder a los atributos', () => {
      expect(rick.id).toBe(1);
      expect(rick.nombre).toBe('Rick Sanchez');
      expect(rick.especie).toBe(especieHumana);
      expect(rick.dimensionOrigen).toBe(dimensionC137);
      expect(rick.estado).toBe(EstadoPersonajes.Vivo);
      expect(rick.afiliacion).toBe("Independiente");
      expect(rick.nivelInteligencia).toBe(10);
      expect(rick.descripcion).toBe('Científico brillante');
    });
  });

  describe('Setters', () => {
    it('Debe permitir cambiar la descripción', () => {
      rick.descripcion = 'Antagonista';
      expect(rick.descripcion).toBe('Antagonista');
    });

    it('Debe permitir cambiar estados y afiliaciones', () => {
      morty.estado = EstadoPersonajes.Muerto;
      morty.afiliacion = "Federacion Galactica";
      
      expect(morty.estado).toBe("Muerto");
      expect(morty.afiliacion).toBe("Federacion Galactica");
    });
  });

  describe('Validación de Nivel de Inteligencia (Coverage)', () => {
    it('Debe permitir cambiar el nivel si es válido (1-10)', () => {
      morty.nivelInteligencia = 5;
      expect(morty.nivelInteligencia).toBe(5);
    });

    it('Debe lanzar error si el nivel es menor a 1', () => {
      expect(() => { rick.nivelInteligencia = 0; }).toThrow(/debe estar entre 1 y 10/);
    });

    it('Debe lanzar error si el nivel es mayor a 10', () => {
      expect(() => { rick.nivelInteligencia = 11; }).toThrow(/debe estar entre 1 y 10/);
    });

    it('Debe lanzar error si el nivel no es un número entero', () => {
      expect(() => { rick.nivelInteligencia = 5.5; }).toThrow(/debe estar entre 1 y 10/);
    });
  });

  describe('Validaciones', () => {
    it("Debe dar error si el ID es igual a 0", () => {
      expect(() => {
        new Personaje(0, 'Rick Sanchez', especieHumana, dimensionC137, EstadoPersonajes.Vivo, 
        "Independiente", 10, 'Científico brillante');
      }).toThrow(`El ID no puede ser 0`);
    });

    it("Debe dar error si el nombre está vacío", () => {
      expect(() => {
        new Personaje(1, '', especieHumana, dimensionC137, EstadoPersonajes.Vivo, 
        "Independiente", 10, 'Científico brillante');
      }).toThrow(`El nombre no puede estar vacío`);
    });

    it("Debe dar error si la descripción está vacía", () => {
      expect(() => {
        new Personaje(1, 'Rick Sanchez', especieHumana, dimensionC137, EstadoPersonajes.Vivo, 
        "Independiente", 10, '');
      }).toThrow(`La descripción no puede estar vacía`);
    });
  });
});