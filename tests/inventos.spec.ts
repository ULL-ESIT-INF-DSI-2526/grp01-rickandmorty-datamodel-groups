import { describe, it, expect, beforeEach } from "vitest";
import { Invento } from "../src/models/Invento.js";
import { Personaje } from "../src/models/Personaje.js";
import { Dimension } from "../src/models/Dimension.js";
import { Especie } from "../src/models/Especie.js";
import { EstadoPersonajes } from "../src/types/EstadoPersonajes.js";
import { TipoInvento } from "../src/types/TipoInventos.js";

describe("Invento Model tests", () => {
  // Constantes para valores válidos
  const validId = 100;
  const validNombre = "Pistola de Portales";
  const validTipo: TipoInvento = "dispositivo de viaje";
  const validPeligrosidad = 10;
  const validDesc = "Permite viajar entre dimensiones";

  let dimensionBase: Dimension;
  let especieBase: Especie;
  let inventorBase: Personaje;
  let inventoBase: Invento;

  beforeEach(() => {
    dimensionBase = new Dimension(
      "C-137",
      "Tierra",
      "activa",
      5,
      "Dimensión original",
    );
    especieBase = new Especie("E1", "Humano", "Mamífero", "Omnívoro", 10, "Tierra");

    inventorBase = new Personaje(
      1,
      "Rick Sanchez",
      especieBase,
      dimensionBase,
      EstadoPersonajes.Vivo,
      "Independiente",
      10,
      "Genio",
    );

    inventoBase = new Invento(
      validId,
      validNombre,
      inventorBase,
      validTipo,
      validPeligrosidad,
      validDesc,
    );
  });

  describe("Constructor y validaciones de integridad", () => {
    it("Debe crear una instancia válida de Invento si todos los datos son correctos", () => {
      expect(inventoBase).toBeDefined();
      expect(inventoBase.id).toBe(validId);
      expect(inventoBase.nivelPeligrosidad).toBe(validPeligrosidad);
      expect(inventoBase.inventor).toBe(inventorBase);
    });

//     it("Debe lanzar error si el nivel de peligrosidad no cumple el rango (1-10) o no es entero", () => {
//       const invalidLevels = [0, 11, 5.5, -1];
//       invalidLevels.forEach((level) => {
//         expect(() => {
//           new Invento(
//             validId,
//             validNombre,
//             inventorBase,
//             validTipo,
//             level,
//             validDesc,
//           );
//         }).toThrow(
//           `[Invento Error]: el nivel de peligrosidad debe estar entre 1 y 10, se recibió: ${level}`,
//         );
//       });
//     });

//     it("Debe permitir niveles de peligrosidad en los extremos (1 y 10)", () => {
//       const boundaryLevels = [1, 10];
//       boundaryLevels.forEach((level) => {
//         const inv = new Invento(
//           validId,
//           validNombre,
//           inventorBase,
//           validTipo,
//           level,
//           validDesc,
//         );
//         expect(inv.nivelPeligrosidad).toBe(level);
//       });
//     });
//   });

//   describe("Getters y Setters", () => {
//     it("Debe permitir modificar el ID y el Nombre", () => {
//       inventoBase.id = 999;
//       inventoBase.nombre = "Caja de Meeseeks";
//       expect(inventoBase.id).toBe(999);
//       expect(inventoBase.nombre).toBe("Caja de Meeseeks");
//     });

//     it("Debe permitir cambiar el inventor y el tipo", () => {
//       const nuevoInventor = new Personaje(
//         2,
//         "Morty Smith",
//         especieBase,
//         dimensionBase,
//         EstadoPersonajes.Vivo,
//         "Independiente",
//         3,
//         "Nieto",
//       );

//       inventoBase.inventor = nuevoInventor;
//       inventoBase.tipo = "Objeto cotidiano absurdo" as TipoInvento;

//       expect(inventoBase.inventor).toBe(nuevoInventor);
//       expect(inventoBase.tipo).toBe("Objeto cotidiano absurdo");
//     });

//     it("Debe validar el nivel de peligrosidad al usar el setter", () => {
//       inventoBase.nivelPeligrosidad = 5;
//       expect(inventoBase.nivelPeligrosidad).toBe(5);

//       expect(() => {
//         inventoBase.nivelPeligrosidad = 13;
//       }).toThrow("[Invento Error]");

//       expect(inventoBase.nivelPeligrosidad).toBe(5);
//     });

//     it("Debe permitir modificar la descripción", () => {
//       const nuevaDesc = "Nueva descripción técnica del artefacto";
//       inventoBase.descripcion = nuevaDesc;
//       expect(inventoBase.descripcion).toBe(nuevaDesc);
//     });
  });
});