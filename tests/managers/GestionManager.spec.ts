import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GestionManager } from '../../src/managers/GestionManager.js';
import { DataManager } from '../../src/database/DataManager.js';
import { IEntity } from '../../src/interfaces/IEntity.js';

vi.mock('../../src/database/DataManager.js');

interface IPruebaJSON { id: string; valor: string; }

class ModeloPrueba implements IEntity {
  constructor(public id: string, public valor: string) {}
}

class ManagerPrueba extends GestionManager<ModeloPrueba, 'dimensiones', IPruebaJSON> {
  protected _coleccion = 'dimensiones' as const;
  protected mapearAJSON(item: ModeloPrueba): IPruebaJSON {
    return { id: item.id, valor: item.valor };
  }
  public async cargar(): Promise<void> { }
}

describe('GestionManager tests', () => {
  let manager: ManagerPrueba;
  let itemBase: ModeloPrueba;
  
  const mockDMInstance = {
    guardarBaseDatos: vi.fn().mockResolvedValue(undefined),
    leerBaseDatos: vi.fn().mockReturnValue([])
  };

  beforeEach(() => {
    vi.clearAllMocks();
    itemBase = new ModeloPrueba('1', 'Original');
    vi.mocked(DataManager.getInstance).mockResolvedValue(mockDMInstance as unknown as DataManager);
    manager = new ManagerPrueba();
    manager.add(itemBase); 
  });

  it('Debe devolver la lista completa de elementos', () => {
    const item2 = new ModeloPrueba('2', 'Segundo');
    manager.add(item2);

    const resultado = manager.getAll();
    expect(resultado).toHaveLength(2);
  });

  it('Debe lanzar error si se intenta añadir un ID duplicado (Síncrono)', () => {
    expect(() => manager.add(itemBase)).toThrow("ID ya existente");
  });

  it('Debe eliminar correctamente un elemento de la memoria', () => {
    manager.delete('1');
    expect(manager.getById('1')).toBeUndefined();

  });

  it('Debe buscar un elemento por su ID, sea string o número', () => {
    expect(manager.getById('1')).toBeDefined();
    expect(manager.getById(1)).toBeDefined();
  });

  it('update() debe modificar el item', () => {
    const actualizado = new ModeloPrueba('1', 'Modificado');
    manager.update(actualizado);
    expect(manager.getById('1')?.valor).toBe('Modificado');
  });

  it('Debe lanzar error si el elemento a actualizar no existe (Síncrono)', () => {
    const itemInexistente = new ModeloPrueba('99', 'error');
    expect(() => manager.update(itemInexistente)).toThrow('Elemento no encontrado');
  });

  it('Debe persistir los datos correctamente al llamar a guardar()', async () => {
    await manager.guardar();
    expect(mockDMInstance.guardarBaseDatos).toHaveBeenCalledWith('dimensiones', expect.any(Array));
  });
});