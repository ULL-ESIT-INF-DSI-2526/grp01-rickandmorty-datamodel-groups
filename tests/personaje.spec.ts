import { describe, it, expect, beforeEach } from "vitest";
import { Personaje } from "../src/models/Personaje.js";
import { Dimension } from "../src/models/Dimension.js";
import { Especie } from "../src/models/Especie.js";
import { EstadoPersonajes } from "../src/types/EstadoPersonajes.js";
import { AfiliacionPersonajes } from "../src/types/AfiliacionPersonajes.js";

describe("Personaje Model tests", () => {
  // Constantes para valores válidos
  const validId = 1;
  const validNombre = "Rick Sanchez";
  const validEstado: EstadoPersonajes = EstadoPersonajes.Vivo;
  const validAfiliacion: AfiliacionPersonajes = "Independiente";
  const validInteligencia = 10;
  const validDesc = "Científico loco y abuelo de Morty";

  let dimensionBase: Dimension;
  let especieBase: Especie;
  let personajeBase: Personaje;

  beforeEach(() => {
    // Inicializamos dependencias
    dimensionBase = new Dimension(
      "C-137",
      "Tierra",
      "activa",
      5,
      "Dimensión original",
    );
    especieBase = new Especie("E1", "Humano", "Mamífero", "Omnívoro", "Tierra");

    // Inicializamos el personaje base
    personajeBase = new Personaje(
      validId,
      validNombre,
      especieBase,
      dimensionBase,
      validEstado,
      validAfiliacion,
      validInteligencia,
      validDesc,
    );
  });

  describe("Constructor y validaciones de integridad", () => {
    it("Debe crear una instancia válida de Personaje si todos los datos son correctos", () => {
      expect(personajeBase).toBeDefined();
      expect(personajeBase.nivelInteligencia).toBe(validInteligencia);
      expect(personajeBase.especie).toBe(especieBase);
    });

    it("Debe lanzar error si el nivel de inteligencia no cumple el rango (1-10) o no es entero", () => {
      const invalidLevels = [0, 11, 5.5, -1];
      invalidLevels.forEach((level) => {
        expect(() => {
          new Personaje(
            validId,
            validNombre,
            especieBase,
            dimensionBase,
            validEstado,
            validAfiliacion,
            level,
            validDesc,
          );
        }).toThrow(
          `[Personaje Error]: el nivel de inteligencia debe estar entre 1 y 10, se recibió: ${level}`,
        );
      });
    });

    it("Debe permitir niveles de inteligencia en los extremos (1 y 10)", () => {
      const boundaryLevels = [1, 10];
      boundaryLevels.forEach((level) => {
        const p = new Personaje(
          validId,
          validNombre,
          especieBase,
          dimensionBase,
          validEstado,
          validAfiliacion,
          level,
          validDesc,
        );
        expect(p.nivelInteligencia).toBe(level);
      });
    });
  });

  describe("Getters y Setters", () => {
    it("Debe permitir modificar el ID y el Nombre", () => {
      personajeBase.id = 666;
      personajeBase.nombre = "Morty Malvado";
      expect(personajeBase.id).toBe(666);
      expect(personajeBase.nombre).toBe("Morty Malvado");
    });

    it("Debe permitir cambiar la instancia de Especie y Dimensión", () => {
      const nuevaDim = new Dimension(
        "C-500A",
        "Nueva Tierra",
        "activa",
        8,
        "Otra dimension",
      );
      const nuevaEsp = new Especie(
        "E2",
        "Cronenberg",
        "Mutante",
        "Omnívoro",
        "C-137",
      );

      personajeBase.dimensionOrigen = nuevaDim;
      personajeBase.especie = nuevaEsp;

      expect(personajeBase.dimensionOrigen).toBe(nuevaDim);
      expect(personajeBase.especie).toBe(nuevaEsp);
    });

    it("Debe permitir cambiar el estado y la afiliación", () => {
      const nuevoEstado: EstadoPersonajes = EstadoPersonajes.Muerto;
      const nuevaAfil: AfiliacionPersonajes = "Consejo de Ricks";

      personajeBase.estado = nuevoEstado;
      personajeBase.afiliacion = nuevaAfil;

      expect(personajeBase.estado).toBe(nuevoEstado);
      expect(personajeBase.afiliacion).toBe(nuevaAfil);
    });

    it("Debe validar el nivel de inteligencia al usar el setter", () => {
      personajeBase.nivelInteligencia = 5;
      expect(personajeBase.nivelInteligencia).toBe(5);

      expect(() => {
        personajeBase.nivelInteligencia = 13;
      }).toThrow("[Personaje Error]");

      expect(personajeBase.nivelInteligencia).toBe(5);
    });

    it("Debe permitir modificar la descripción", () => {
      const nuevaDesc = "Nueva descripción del personaje";
      personajeBase.descripcion = nuevaDesc;
      expect(personajeBase.descripcion).toBe(nuevaDesc);
    });
  });
});
