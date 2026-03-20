import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import prompts from 'prompts';
import { Menu } from '../src/ui/Menu.js'; 
import { MultiverseManager } from '../src/managers/MultiverseManager.js';
import { Especie } from '../src/models/Especie.js';
import { Dimension } from '../src/models/Dimension.js';

vi.mock('prompts');

describe('Menu CRUD Tests', () => {
  let menu: Menu;

  const mockManager = {
    inicializar: vi.fn(),
    persistirMultiverso: vi.fn(),
    dimensiones: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    personajes: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    especies: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    planetas: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
    inventos: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn(), add: vi.fn(), update: vi.fn() },
  } as unknown as MultiverseManager;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(MultiverseManager, 'getInstance').mockReturnValue(mockManager);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'table').mockImplementation(() => {});
    vi.spyOn(console, 'clear').mockImplementation(() => {});
    menu = new Menu();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe listar los elementos de una entidad', async () => {
    const mockedPrompts = vi.mocked(prompts);
    
    mockedPrompts
      .mockResolvedValueOnce({ accion: 'crud' })
      .mockResolvedValueOnce({ entidad: 'dimensiones', operacion: 'listar' })
      .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

    await menu.iniciar();

    expect(mockManager.dimensiones.getAll).toHaveBeenCalled();
    expect(console.table).toHaveBeenCalled();
  });

  it('Debe eliminar un elemento por ID correctamente', async () => {
    const mockedPrompts = vi.mocked(prompts);
    
    mockedPrompts
      .mockResolvedValueOnce({ accion: 'crud' })
      .mockResolvedValueOnce({ entidad: 'especies', operacion: 'borrar' })
      .mockResolvedValueOnce({ id: 'ESP-01' })
      .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

    await menu.iniciar();

    expect(mockManager.especies.delete).toHaveBeenCalledWith('ESP-01');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('✅ Elemento eliminado'));
  });

  it('Debe añadir una nueva dimensión correctamente', async () => {
    const mockedPrompts = vi.mocked(prompts);
    
    mockedPrompts
      .mockResolvedValueOnce({ accion: 'crud' }) 
      .mockResolvedValueOnce({ entidad: 'dimensiones', operacion: 'anadir' }) 
      .mockResolvedValueOnce({ 
        id: 'D-100',
        nombre: 'Dimensión de Prueba',
        estado: 'activa',
        tec: 5,
        tipo: 'Experimental'
      })
      .mockResolvedValueOnce({ accion: 'salir_sin_guardar' }); 

    await menu.iniciar();

    expect(mockManager.dimensiones.add).toHaveBeenCalled();
    const llamada = vi.mocked(mockManager.dimensiones.add).mock.calls[0][0];
    expect(llamada.id).toBe('D-100');
    expect(llamada.nombre).toBe('Dimensión de Prueba');
  });

  it('Debe mostrar error si el ID no existe al intentar actualizar', async () => {
    const mockedPrompts = vi.mocked(prompts);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    vi.mocked(mockManager.inventos.getById).mockReturnValue(undefined);

    mockedPrompts
      .mockResolvedValueOnce({ accion: 'crud' })
      .mockResolvedValueOnce({ entidad: 'inventos', operacion: 'actualizar' })
      .mockResolvedValueOnce({ id: '999' }) // ID inexistente
      .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

    await menu.iniciar();

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('❌ El ID no existe'));
    expect(mockManager.inventos.update).not.toHaveBeenCalled();
  });

  it('Debe validar el rango de IQ en Personajes (simulación de validación)', async () => {
    const mockedPrompts = vi.mocked(prompts);
    
    vi.mocked(mockManager.especies.getAll).mockReturnValue([{ name: 'Humano' }] as unknown as Especie[]);
    vi.mocked(mockManager.dimensiones.getAll).mockReturnValue([{ nombre: 'Tierra' }] as unknown as Dimension[]);

    mockedPrompts
      .mockResolvedValueOnce({ accion: 'crud' })
      .mockResolvedValueOnce({ entidad: 'personajes', operacion: 'anadir' })
      .mockResolvedValueOnce({ 
        id: 1, 
        nombre: 'Morty', 
        eIdx: 0, 
        dIdx: 0, 
        afiliacion: 'Independiente', 
        iq: 3, 
        desc: 'Nieto' 
      })
      .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

    await menu.iniciar();

    expect(mockManager.personajes.add).toHaveBeenCalled();
  });
});