import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { InventoManager } from '../src/managers/InventoManager.js';
import { Invento } from '../src/models/Invento.js';
import { Personaje } from '../src/models/Personaje.js';
import { DataManager } from '../src/database/DataManager.js';
import { IInventoJSON } from '../src/interfaces/IInventoJSON.js';
import { TipoInvento } from '../src/types/TipoInventos.js';

/**
 * Subclase específica para test
 * accede a los métodos protegidos
 */
class InventoManagerTest extends InventoManager {
  public exponerMapearAJSON(i: Invento): IInventoJSON {
    return this.mapearAJSON(i);
  }
}

// Mock del DataManager
vi.mock('../database/DataManager.js', () => ({
  DataManager: {
    getInstance: vi.fn(),
  },
}));

describe('InventoManager', () => {
  let manager: InventoManagerTest;
  let mockPersonaje: Personaje;

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new InventoManagerTest();
    
    // Creamos un mock de Personaje
    mockPersonaje = { 
      id: 1, 
      nombre: 'Rick' 
    } as unknown as Personaje;
  });

  it('debería cargar inventos y realizar la conversion del inventor', async () => {
    const mockDatosJSON: IInventoJSON[] = [{
      id: 101,
      nombre: 'Pistola de Portales',
      inventorId: 1,
      tipo: "arma" as TipoInvento,
      nivelPeligrosidad: 9,
      descripcion: 'Crea portales'
    }];

    // 1. Creamos el objeto que simula la instancia de DataManager
    const mockDMInstance = {
      leerBaseDatos: vi.fn().mockReturnValue(mockDatosJSON),
      // Añadimos lo mínimo para que el casting sea creíble
      guardarBaseDatos: vi.fn(),
    } as unknown as DataManager;

    // 2. SOLUCIÓN FINAL: Sobrescribimos la implementación directamente
    // Esto evita el error ".mockResolvedValue is not a function"
    DataManager.getInstance = vi.fn().mockResolvedValue(mockDMInstance);

    await manager.cargar([mockPersonaje]);

    const resultado = manager.getAll();
    expect(resultado).toHaveLength(1);
    expect(resultado[0].inventor).toBe(mockPersonaje);
  });

  it('debería mapear correctamente un objeto Invento a su estructura JSON', () => {
    // Simulamos un objeto Invento
    const inventoReal = {
      id: 50,
      nombre: 'Caja Meeseeks',
      inventor: mockPersonaje,
      tipo: 'Gadget' as TipoInvento,
      nivelPeligrosidad: 3,
      descripcion: 'Genera ayudantes'
    } as unknown as Invento;

    // Llamamos al método a través de nuestra subclase de test
    const jsonProcesado = manager.exponerMapearAJSON(inventoReal);

    expect(jsonProcesado.id).toBe(50);
    expect(jsonProcesado.inventorId).toBe(1); // El ID de nuestro mockPersonaje
  });
});