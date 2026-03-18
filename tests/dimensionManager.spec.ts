import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DimensionManager } from '../src/managers/DimensionManager.js';
import { Dimension } from '../src/models/Dimension.js';
import { DataManager } from '../src/database/DataManager.js';
import { IDimension } from '../src/interfaces/IDimension.js';

/** Mock del DataManager para interceptar llamadas a disco */
vi.mock('../src/database/DataManager.js');
const mockedDM = vi.mocked(DataManager);

describe('DimensionManager - Suite de Pruebas', () => {
  let manager: DimensionManager;
  let dimBase: Dimension;
  let jsonBase: IDimension;
  let mockDMInstance: { leerBaseDatos: unknown; guardarBaseDatos: unknown };

  beforeEach(() => {
    vi.clearAllMocks();
    dimBase = new Dimension('C-137', 'Earth', 'activa', 5, 'Dimensión de Rick');
    jsonBase = { 
      id: 'C-137', 
      nombre: 'Earth', 
      estado: 'activa', 
      nivelTecnologico: 5, 
      descripcion: 'Dimensión de Rick' 
    };

    /** Objeto que imita los métodos de DataManager */
    mockDMInstance = {
      leerBaseDatos: vi.fn().mockReturnValue([jsonBase]),
      guardarBaseDatos: vi.fn().mockResolvedValue(undefined)
    };

    mockedDM.getInstance.mockResolvedValue(mockDMInstance as unknown as DataManager);
    manager = new DimensionManager();
  });

  it('Debe convertir correctamente los datos desde el JSON a la clase Dimension', async () => {
    await manager.cargar();
    const lista = manager.getAll();
    expect(lista).toHaveLength(1);
    
    expect(lista[0]).toBeInstanceOf(Dimension);
    expect(lista[0].nombre).toBe('Earth');
    expect(mockDMInstance.leerBaseDatos).toHaveBeenCalledWith('dimensiones');
  });

  it('Debe convertir la clase a un objeto plano correctamente', async () => {
    await manager.add(dimBase);
    
    expect(mockDMInstance.guardarBaseDatos).toHaveBeenCalledWith(
      'dimensiones',
      expect.arrayContaining([jsonBase])
    );
  });

  it('Debe heredar y funcionar correctamente con getById', async () => {
    await manager.cargar();
    expect(manager.getById('C-137')).toBeDefined();
    expect(manager.getById('999')).toBeUndefined();
  });

});