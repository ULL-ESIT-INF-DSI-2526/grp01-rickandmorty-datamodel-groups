import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import prompts from 'prompts';
import { Menu } from '../src/ui/Menu.js'; 
import { MultiverseManager } from '../src/managers/MultiverseManager.js';
import { ServicioConsultas } from '../src/ui/ServicioConsultas.js';
import { Personaje } from '../src/models/Personaje.js';

vi.mock('prompts');
vi.mock('../src/ui/ServicioConsultas.js');

describe('Menu Tests', () => {
  let menu: Menu;

  const mockManager = {
    inicializar: vi.fn(),
    persistirMultiverso: vi.fn(),
    dimensiones: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn() },
    personajes: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn() },
    especies: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn() },
    planetas: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn() },
    inventos: { getAll: vi.fn(() => []), delete: vi.fn(), getById: vi.fn() },
  } as unknown as MultiverseManager;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(MultiverseManager, 'getInstance').mockReturnValue(mockManager);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'clear').mockImplementation(() => {});
    vi.spyOn(console, 'table').mockImplementation(() => {});
    menu = new Menu();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Flujo básico del menú', () => {
    it('Debe ejecutar el flujo de salir guardardando', async () => {
      vi.mocked(prompts).mockResolvedValue({ accion: 'salir_guardar' });
      await menu.iniciar();
      expect(mockManager.persistirMultiverso).toHaveBeenCalled();
    });
    
    it('Debe ejecutar el flujo de salir sin guardar', async () => {
      vi.mocked(prompts).mockResolvedValue({ accion: 'salir_sin_guardar' });
      await menu.iniciar();
      expect(mockManager.inicializar).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Cerrando sin guardar...');
    });
  });
  
  describe('Búsquedas de elementos del multiverso', () => {
    it('Debe ejecutar el flujo de consulta de personajes', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'c_per' }) // Corregido: c_per según tu switch
        .mockResolvedValueOnce({ filtro: 'Rick', campo: 'nombre', orden: 'asc' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });
      
      vi.mocked(ServicioConsultas.buscarPersonajes).mockReturnValue([]);
      
      await menu.iniciar();
      expect(ServicioConsultas.buscarPersonajes).toHaveBeenCalledWith(
        expect.any(Array), 'Rick', 'nombre', 'asc');
      expect(console.table).toHaveBeenCalled();
    });

    it('Debe ejecutar el flujo de consulta de localizaciones', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'c_loc' }) // Corregido: c_loc según tu switch
        .mockResolvedValueOnce({ filtro: 'Earth' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });
      
      vi.mocked(ServicioConsultas.buscarLocalizaciones).mockReturnValue([]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarLocalizaciones).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });

    it('Debe ejecutar el flujo de consulta de inventos', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'c_inv' }) // Corregido: c_inv según tu switch
        .mockResolvedValueOnce({ filtro: 'Portal' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });
      
      vi.mocked(ServicioConsultas.buscarInventos).mockReturnValue([]);

      await menu.iniciar();
      expect(ServicioConsultas.buscarInventos).toHaveBeenCalled();
      expect(console.table).toHaveBeenCalled();
    });
  });
  
  describe('Búsqueda de versiones alternativas', () => {
    it('Debe filtrar versiones alternativas correctamente', async () => {
      const listaPersonajes = [
        { id: '1', nombre: 'Rick', dimensionOrigen: { nombre: 'C-137' }, estado: 'Vivo' }
      ];
      vi.mocked(mockManager.personajes.getAll).mockReturnValue(listaPersonajes as unknown as Personaje[]);
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'versiones' })
        .mockResolvedValueOnce({ nombre: 'Rick' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(console.table).toHaveBeenCalled();
    });

    it('Debe mostrar un mensaje si no hay versiones alternativas', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'versiones' })
        .mockResolvedValueOnce({ nombre: 'Inexistente' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });
      
      vi.mocked(mockManager.personajes.getAll).mockReturnValue([]);
      
      await menu.iniciar();
      expect(console.log).toHaveBeenCalledWith('No se encontraron versiones alternativas de este personaje');
    });
  });
  
  describe('Menú CRUD', () => {
    it('Debe entrar en CRUD y volver sin hacer nada', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' })
        .mockResolvedValueOnce({ entidad: 'personajes', operacion: 'volver' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.personajes.delete).not.toHaveBeenCalled();
    });

    it('Debe eliminar una entidad en el menú CRUD', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' })
        .mockResolvedValueOnce({ entidad: 'personajes', operacion: 'borrar' })
        .mockResolvedValueOnce({ id: '123' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

      await menu.iniciar();
      expect(mockManager.personajes.delete).toHaveBeenCalledWith('123');
      // Corregido: Debe incluir el emoji y el punto exacto según tu código
      expect(console.log).toHaveBeenCalledWith('✅ Elemento eliminado.');
    });

    it('Debe fallar al actualizar si el ID no existe', async () => {
      vi.mocked(prompts)
        .mockResolvedValueOnce({ accion: 'crud' })
        .mockResolvedValueOnce({ entidad: 'especies', operacion: 'actualizar' })
        .mockResolvedValueOnce({ id: 'invalid-id' })
        .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });
      
      vi.mocked(mockManager.especies.getById).mockReturnValue(undefined);

      await menu.iniciar();
      // Corregido: Texto exacto con emoji y punto
      expect(console.error).toHaveBeenCalledWith('❌ El ID no existe.');
    });
  });
});