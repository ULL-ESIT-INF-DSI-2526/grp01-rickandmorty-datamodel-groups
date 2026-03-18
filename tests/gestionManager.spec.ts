import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GestionManager } from '../src/managers/GestionManager.js';
import { DataManager } from '../src/database/DataManager.js';
import { IEntity } from '../src/interfaces/IEntity.js';

/** Sustituye la clase real por una versión controlada */
vi.mock('../src/database/DataManager.js');

/** Interfaz JSON simple */
interface IPruebaJSON { id: string; valor: string; }

/** Modelo básico */
class ModeloPrueba implements IEntity {
  constructor(public id: string, public valor: string) {}
}

/** Hereda de GestionManager para poder testearla */
class ManagerPrueba extends GestionManager<ModeloPrueba, 'dimensiones', IPruebaJSON> {
  protected _coleccion: 'dimensiones' = 'dimensiones' as const;
  protected mapearAJSON(item: ModeloPrueba): IPruebaJSON {
    return { id: item.id, valor: item.valor };
  }
  public async cargar(msg: string): Promise<void> { console.log(msg); }
}

describe('GestionManager tests', () => {
  let manager: ManagerPrueba;
  let itemBase: ModeloPrueba;
  
  /** Objeto que imita los métodos de DataManager */
  const mockDMInstance: Partial<DataManager> = {
    guardarBaseDatos: vi.fn().mockResolvedValue(undefined),
    leerBaseDatos: vi.fn().mockReturnValue([])
  };

  beforeEach(() => {
    vi.clearAllMocks();
    itemBase = new ModeloPrueba('1', 'Original');
    vi.mocked(DataManager.getInstance).mockResolvedValue(mockDMInstance as DataManager);
    manager = new ManagerPrueba();
    manager.add(itemBase);
  });

  it('Debe devolver la lista completa de elementos', async () => {
    const item2 = new ModeloPrueba('2', 'Segundo');
    await manager.add(item2);

    const resultado = manager.getAll();
    expect(resultado).toHaveLength(2);
    expect(resultado).toContain(itemBase);
  });

  it('Debe añadir correctamente un elemento', async () => {
    expect(manager.getById('1')).toBe(itemBase);
  });

  it('Debe lanzar error si se intenta añadir un elemento que ya estaba', async () => {
    await expect(manager.add(itemBase)).rejects.toThrow("ID ya existente");
  });

  it('Debe eliminar correctamente un elemento', async () => {
    await manager.delete('1');
    expect(manager.getById('1')).toBeUndefined();
    expect(mockDMInstance.guardarBaseDatos).toHaveBeenCalledTimes(2);
  });

  it('Debe buscar un elemento por su ID, sea string o número', async () => {
    expect(manager.getById('1')).toBeDefined();
    expect(manager.getById(1)).toBeDefined();
  });

  it('Debe devolver undefined si no encuentra un elemento', async () => {
    expect(manager.getById('3')).toBeUndefined();
  });

  it('update() debe modificar el item o fallar si no existe', async () => {
    const actualizado = new ModeloPrueba('1', 'Modificado');
    await manager.update(actualizado);
    expect(manager.getById('1')?.valor).toBe('Modificado');
  });

  it('Debe lanzar error si el elemento a actualizar no existe', async () => {
    const item = new ModeloPrueba('99', 'error');
    await expect(manager.update(item)).rejects.toThrow('Elemento no encontrado');
  }); 
});