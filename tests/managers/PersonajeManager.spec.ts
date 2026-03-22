import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PersonajeManager } from '../../src/managers/PersonajeManager.js';
import { Personaje } from '../../src/models/Personaje.js';
import { Especie } from '../../src/models/Especie.js';
import { Dimension } from '../../src/models/Dimension.js';
import { DataManager } from '../../src/database/DataManager.js';
import { IPersonajeJSON } from '../../src/interfaces/IPersonajeJSON.js';
import { EstadoPersonajes } from '../../src/types/EstadoPersonajes.js';

/**
 * Subclase específica para test que expone métodos protegidos
 */
class PersonajeManagerTest extends PersonajeManager {
  public exponerMapearAJSON(p: Personaje): IPersonajeJSON {
    return this.mapearAJSON(p);
  }
}

vi.mock('../src/database/DataManager.js', () => ({
  DataManager: {
    getInstance: vi.fn(),
  },
}));

describe('PersonajeManager', () => {
  let manager: PersonajeManagerTest;
  let mockEspecie: Especie;
  let mockDimension: Dimension;

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new PersonajeManagerTest();
    
    mockEspecie = { id: 'E-1', nombre: 'Humano' } as unknown as Especie;
    mockDimension = { id: 'DIM-1', nombre: 'Tierra C-137' } as unknown as Dimension;
  });

  describe('Método cargar', () => {
    it('debería cargar personajes vinculándolos con su especie y dimensión por ID', async () => {
      const mockDatosJSON: IPersonajeJSON[] = [{
        id: 1,
        nombre: 'Rick Sanchez',
        especieId: 'E-1',
        dimensionId: 'DIM-1',
        estado: EstadoPersonajes.Vivo,
        afiliacion: "Independiente",
        nivelInteligencia: 10,
        descripcion: 'Científico loco'
      }];

      const mockDMInstance = {
        leerBaseDatos: vi.fn().mockReturnValue(mockDatosJSON),
      } as unknown as DataManager;

      DataManager.getInstance = vi.fn().mockResolvedValue(mockDMInstance);

      await manager.cargar([mockEspecie], [mockDimension]);

      const personajes = manager.getAll();
      expect(personajes).toHaveLength(1);
      expect(personajes[0]).toBeInstanceOf(Personaje);
      expect(personajes[0].nombre).toBe('Rick Sanchez');
      
      expect(personajes[0].especie).toBe(mockEspecie);
      expect(personajes[0].dimensionOrigen).toBe(mockDimension);
    });

    it('debería mostrar un aviso si las referencias de ID no existen', async () => {
      const mockDatosJSON: IPersonajeJSON[] = [{
        id: 2,
        nombre: 'Personaje Huérfano',
        especieId: 'ID-INEXISTENTE',
        dimensionId: 'DIM-1',
        estado: EstadoPersonajes.Vivo,
        afiliacion: "Independiente",
        nivelInteligencia: 5,
        descripcion: 'Sin especie'
      }];

      const mockDMInstance = {
        leerBaseDatos: vi.fn().mockReturnValue(mockDatosJSON),
      } as unknown as DataManager;

      DataManager.getInstance = vi.fn().mockResolvedValue(mockDMInstance);
      
      const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      await manager.cargar([], [mockDimension]); 

      expect(spyWarn).toHaveBeenCalledWith(expect.stringContaining('Referencias rotas'));
      spyWarn.mockRestore();
    });
  });

  describe('Método mapearAJSON', () => {
    it('debería convertir un objeto Personaje a su versión plana JSON extrayendo los IDs', () => {
      const personajeReal = {
        id: 10,
        nombre: 'Morty',
        especie: mockEspecie, 
        dimensionOrigen: mockDimension, 
        estado: EstadoPersonajes.Vivo,
        afiliacion: "Independiente",
        nivelInteligencia: 3,
        descripcion: 'Nieto'
      } as unknown as Personaje;

      const resultadoJSON = manager.exponerMapearAJSON(personajeReal);

      expect(resultadoJSON.id).toBe(10);
      expect(resultadoJSON.especieId).toBe('E-1');
      expect(resultadoJSON.dimensionId).toBe('DIM-1');
      expect(resultadoJSON.nombre).toBe('Morty');
    });
  });
});