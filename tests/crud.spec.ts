import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import prompts from 'prompts';
import { Menu } from '../src/ui/Menu.js'; 
import { MultiverseManager } from '../src/managers/MultiverseManager.js';
import { Dimension } from '../src/models/Dimension.js';
import { Personaje } from '../src/models/Personaje.js';
import { Planetas } from '../src/models/Planetas.js';
import { Invento } from '../src/models/Invento.js';
import { Especie } from '../src/models/Especie.js';

vi.mock('prompts');

describe('Menu CRUD - Cobertura Total de Entidades', () => {
  let menu: Menu;

  const mockManager = {
    inicializar: vi.fn(),
    persistirMultiverso: vi.fn(),
    dimensiones: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    personajes: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    especies: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    planetas: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    inventos: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
  } as unknown as MultiverseManager;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(MultiverseManager, 'getInstance').mockReturnValue(mockManager);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'table').mockImplementation(() => {});
    vi.spyOn(console, 'clear').mockImplementation(() => {});
    menu = new Menu();
  });

  afterEach(() => vi.restoreAllMocks());

  describe('CRUD Dimensiones', () => {
    it('Debe añadir, actualizar y eliminar una dimensión', async () => {
      vi.mocked(mockManager.dimensiones.getById).mockReturnValue({ id: 'D-1' } as unknown as Dimension);
      
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'dimensiones', operacion: 'anadir' })
        .mockResolvedValueOnce({ id: 'D-1', nombre: 'C-137', estado: 'activa', tec: 5, tipo: 'C' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'dimensiones', operacion: 'actualizar' })
        .mockResolvedValueOnce({ id: 'D-1' }).mockResolvedValueOnce({ id: 'D-1', nombre: 'C-137-New', estado: 'v', tec: 1, tipo: 't' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'dimensiones', operacion: 'borrar' })
        .mockResolvedValueOnce({ id: 'D-1' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.dimensiones.add).toHaveBeenCalled();
      expect(mockManager.dimensiones.update).toHaveBeenCalled();
      expect(mockManager.dimensiones.delete).toHaveBeenCalledWith('D-1');
    });
  });

  describe('CRUD Personajes', () => {
    it('Debe añadir, actualizar y eliminar un personaje', async () => {
      vi.mocked(mockManager.especies.getAll).mockReturnValue([{ name: 'Humano' }] as unknown as Especie[]);
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([{ nombre: 'Tierra' }] as unknown as Dimension[]);
      vi.mocked(mockManager.personajes.getById).mockReturnValue({ id: 1 } as unknown as Personaje);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'personajes', operacion: 'anadir' })
        .mockResolvedValueOnce({ id: 1, nombre: 'Rick', eIdx: 0, dIdx: 0, afiliacion: 'A', iq: 10, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'personajes', operacion: 'actualizar' })
        .mockResolvedValueOnce({ id: 1 }).mockResolvedValueOnce({ id: 1, nombre: 'Rick 2', eIdx: 0, dIdx: 0, afiliacion: 'A', iq: 1, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'personajes', operacion: 'borrar' })
        .mockResolvedValueOnce({ id: 1 })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.personajes.add).toHaveBeenCalled();
      expect(mockManager.personajes.update).toHaveBeenCalled();
      expect(mockManager.personajes.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('CRUD Especies', () => {
    it('Debe añadir, actualizar y eliminar una especie', async () => {
      vi.mocked(mockManager.especies.getById).mockReturnValue({ id: 'E-1' } as unknown as Especie);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'especies', operacion: 'anadir' })
        .mockResolvedValueOnce({ id: 'E-1', name: 'Alien', origin: 'Mars', type: 'G', life: 100, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'especies', operacion: 'actualizar' })
        .mockResolvedValueOnce({ id: 'E-1' }).mockResolvedValueOnce({ id: 'E-1', name: 'Alien 2', origin: 'Mars', type: 'G', life: 10, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'especies', operacion: 'borrar' })
        .mockResolvedValueOnce({ id: 'E-1' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.especies.add).toHaveBeenCalled();
      expect(mockManager.especies.update).toHaveBeenCalled();
      expect(mockManager.especies.delete).toHaveBeenCalledWith('E-1');
    });
  });

  describe('CRUD Planetas', () => {
    it('Debe añadir, actualizar y eliminar un planeta', async () => {
      vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([{ nombre: 'C-137' }] as unknown as Dimension[]);
      vi.mocked(mockManager.planetas.getById).mockReturnValue({ id: 'P-1' } as unknown as Planetas);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'planetas', operacion: 'anadir' })
        .mockResolvedValueOnce({ id: 'P-1', nombre: 'Tierra', tipo: 'T', dIdx: 0, pob: 100, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'planetas', operacion: 'actualizar' })
        .mockResolvedValueOnce({ id: 'P-1' }).mockResolvedValueOnce({ id: 'P-1', nombre: 'Tierra 2', tipo: 'T', dIdx: 0, pob: 1, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'planetas', operacion: 'borrar' })
        .mockResolvedValueOnce({ id: 'P-1' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.planetas.add).toHaveBeenCalled();
      expect(mockManager.planetas.update).toHaveBeenCalled();
      expect(mockManager.planetas.delete).toHaveBeenCalledWith('P-1');
    });
  });

  describe('CRUD Inventos', () => {
    it('Debe añadir, actualizar y eliminar un invento', async () => {
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([{ nombre: 'Rick' }] as unknown as Personaje[]);
      vi.mocked(mockManager.inventos.getById).mockReturnValue({ id: 5 } as unknown as Invento);

      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'inventos', operacion: 'anadir' })
        .mockResolvedValueOnce({ id: 5, nombre: 'Portal Gun', pIdx: 0, tipo: 'T', peligro: 10, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'inventos', operacion: 'actualizar' })
        .mockResolvedValueOnce({ id: 5 }).mockResolvedValueOnce({ id: 5, nombre: 'Portal Gun 2', pIdx: 0, tipo: 'T', peligro: 1, desc: 'D' })
        .mockResolvedValueOnce({ accion: 'crud' }).mockResolvedValueOnce({ entidad: 'inventos', operacion: 'borrar' })
        .mockResolvedValueOnce({ id: 5 })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.inventos.add).toHaveBeenCalled();
      expect(mockManager.inventos.update).toHaveBeenCalled();
      expect(mockManager.inventos.delete).toHaveBeenCalledWith(5);
    });
  });

});