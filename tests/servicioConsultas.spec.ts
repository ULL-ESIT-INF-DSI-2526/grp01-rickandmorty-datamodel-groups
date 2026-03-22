import { describe, it, expect } from "vitest";
import { ServicioConsultas } from "../src/ui/ServicioConsultas.js";
import { Personaje } from "../src/models/Personaje.js";
import { Planetas } from "../src/models/Planetas.js";
import { Invento } from "../src/models/Invento.js";

describe("ServicioConsultas tests", () => {
  describe('buscarPersonajes', () => {
    const mockPersonajes = [
      { 
          nombre: "Rick Sanchez", 
          nivelInteligencia: 10, 
          especie: { name: "Humano" },
          afiliacion: "C-137",
          estado: "Vivo",
          dimensionOrigen: { nombre: "Tierra" }
      },
      { 
          nombre: "Morty Smith", 
          nivelInteligencia: 3, 
          especie: { name: "Humano" },
          afiliacion: "C-137",
          estado: "Vivo",
          dimensionOrigen: { nombre: "Tierra" }
      },
      { 
          nombre: "Summer Smith", 
          nivelInteligencia: 5, 
          especie: { name: "Humano" },
          afiliacion: "C-137",
          estado: "Vivo",
          dimensionOrigen: { nombre: "Tierra" }
      }
    ] as unknown as Personaje[];

    it("Debe filtrar por nombre correctamente", () => {
      const resultado = ServicioConsultas.buscarPersonajes(mockPersonajes, "Rick", "nombre", "asc");
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nombre).toBe("Rick Sanchez");
    });

    it("Debe ordenar por inteligencia de forma descendente", () => {
      const resultado = ServicioConsultas.buscarPersonajes(mockPersonajes, "", "nivelInteligencia", "desc");
      expect(resultado[0].nivelInteligencia).toBe(10);
      expect(resultado[2].nivelInteligencia).toBe(3);
    });

    it("Debe devolver todos si el filtro está vacío", () => {
      const resultado = ServicioConsultas.buscarPersonajes(mockPersonajes, "", "nombre", "asc");
      expect(resultado).toHaveLength(3);
    });

    it("Debe filtrar por otros campos como afiliación o especie", () => {
      const resultado = ServicioConsultas.buscarPersonajes(mockPersonajes, "Humano", "nombre", "asc");
      expect(resultado).toHaveLength(3);
    });

    it("Debe cubrir la rama final (return 0) cuando los tipos no coinciden", () => {
      const mockTiposMixtos = [
        { 
          nombre: "Rick", 
          nivelInteligencia: 10, // Número
          especie: { name: "H" }, afiliacion: "A", estado: "V", dimensionOrigen: { nombre: "D" } 
        },
        { 
          nombre: "Morty", 
          nivelInteligencia: "10", // Forzamos un STRING donde debería haber un número
          especie: { name: "H" }, afiliacion: "A", estado: "V", dimensionOrigen: { nombre: "D" } 
        }
      ] as unknown as Personaje[];

      const resultado = ServicioConsultas.buscarPersonajes(
        mockTiposMixtos, "", "nivelInteligencia", "asc");
      expect(resultado).toHaveLength(2);
    });
  });
  
  describe("buscarLocalizaciones", () => {
    const mockLocalizaciones = [
      { 
        nombre: "Tierra C-137", 
        tipo: "Planeta", 
        dimension: { nombre: "C-137" } 
      },
      { 
        nombre: "Ciudadela", 
        tipo: "Estación", 
        dimension: { nombre: "Desconocida" } 
      }
    ] as unknown as Planetas[];

    it("Debe filtrar localizaciones por nombre", () => {
      const resultado = ServicioConsultas.buscarLocalizaciones(mockLocalizaciones, "Tierra");
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nombre).toBe("Tierra C-137");
    });

    it("Debe filtrar localizaciones por nombre de dimensión", () => {
      const resultado = ServicioConsultas.buscarLocalizaciones(mockLocalizaciones, "Desconocida");
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nombre).toBe("Ciudadela");
    });

    it("Debe devolver todas si el filtro está vacío", () => {
      const resultado = ServicioConsultas.buscarLocalizaciones(mockLocalizaciones, "");
      expect(resultado).toHaveLength(2);
    });
  });

  describe("buscarInventos", () => {
    const mockInventos = [
      { 
        nombre: "Pistola de portales", 
        inventor: { nombre: "Rick" }, 
        tipo: "Herramienta", 
        nivelPeligrosidad: 10 
      },
      { 
        nombre: "Caja de Meeseeks", 
        inventor: { nombre: "Rick" }, 
        tipo: "Gadget", 
        nivelPeligrosidad: 5 
      }
    ] as unknown as Invento[];

    it("Debe filtrar inventos por nombre", () => {
      const resultado = ServicioConsultas.buscarInventos(mockInventos, "Pistola");
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nombre).toBe("Pistola de portales");
    });

    it("Debe filtrar inventos por el nombre del inventor", () => {
      const resultado = ServicioConsultas.buscarInventos(mockInventos, "Rick");
      expect(resultado).toHaveLength(2);
    });

    it("Debe filtrar inventos por tipo", () => {
      const resultado = ServicioConsultas.buscarInventos(mockInventos, "Gadget");
      expect(resultado).toHaveLength(1);
      expect(resultado[0].tipo).toBe("Gadget");
    });

    it("Debe devolver lista vacía si no hay coincidencias", () => {
      const resultado = ServicioConsultas.buscarInventos(mockInventos, "Inexistente");
      expect(resultado).toHaveLength(0);
    });
  });
});
