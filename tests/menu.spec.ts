import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import prompts from 'prompts';
import { Menu } from '../src/ui/Menu.js'; 
import { MultiverseManager } from '../src/managers/MultiverseManager.js';

vi.mock('prompts');

describe('Menu Tests', () => {
  let menu: Menu;

  const mockManager = {
    inicializar: vi.fn(),
    persistirMultiverso: vi.fn(),
    dimensiones: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn() },
    personajes: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn() },
    especies: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn() },
    planetas: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn() },
    inventos: { getAll: vi.fn(), delete: vi.fn(), getById: vi.fn() },
  } as unknown as MultiverseManager;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(MultiverseManager, 'getInstance').mockReturnValue(mockManager);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'clear').mockImplementation(() => {});
    menu = new Menu();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe ejecutar el flujo de salir sin guardar', async () => {
    const mockedPrompts = vi.mocked(prompts);
    mockedPrompts.mockResolvedValue({ accion: 'salir_sin_guardar' });

    await menu.iniciar();

    expect(mockManager.inicializar).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Cerrando sin guardar...');
  });

  it('Debe filtrar versiones alternativas correctamente', async () => {
    const mockedPrompts = vi.mocked(prompts);
    const listaPersonajes = [
      { id: '1', nombre: 'Rick', dimensionOrigen: { nombre: 'C-137' }, estado: 'Vivo' }
    ];
    vi.mocked(mockManager.personajes.getAll).mockReturnValue(listaPersonajes as any);
    mockedPrompts
      .mockResolvedValueOnce({ accion: 'versiones' })
      .mockResolvedValueOnce({ nombre: 'Rick' })
      .mockResolvedValueOnce({ accion: 'salir_sin_guardar' });

    await menu.iniciar();
    expect(mockManager.personajes.getAll).toHaveBeenCalled();
  });
});