import prompts from 'prompts';
import { MultiverseManager } from '../managers/MultiverseManager.js';
import { ServicioConsultas } from './ServicioConsultas.js';

/** 
 * Clase encargada de gestionar la interfaz de línea de comandos
 * Proporciona menús interactivos para la gestión de datos y consultas del 
 * multiverso de Rick y Morty
 */
export class Menu {
  /** Instancia única del gestor del multiverso */
  private multiverseManager = MultiverseManager.getInstance();

  /**
   * Punto de entrada de la aplicación. Inicializa los datos y lanza
   * el menú principal
   */
  async iniciar(): Promise<void> {
    await this.multiverseManager.inicializar();
    console.clear();
    console.log('--- Sistema de Gestión del Multiverso ---');
    await this.menuPrincipal();
  }

  /**
   * Muestra el menú principal. Gestiona la navegación principal y decide
   * si persistir los cambios al salir
   */
  private async menuPrincipal(): Promise<void> {
    const respuesta = await prompts({
      type: 'select',
      name: 'accion',
      message: 'Seleccione una opción:',
      choices: [
        { title: '  Gestión de Datos (Añadir/Eliminar/Modificar)', value: 'crud' },
        { title: '  Consultar Personajes', value: 'c_personaje' },
        { title: '  Consultar Localizaciones', value: 'c_localizacion' },
        { title: '  Consultar Inventos', value: 'c_inventos' },
        { title: '  Versiones Alternativas', value: 'versiones' },
        { title: '  Salir y Guardar', value: 'salir_guardar' },
        { title: '  Salir SIN Guardar', value: 'salir_sin_guardar' }]
    });

    if (respuesta.accion === 'salir_guardar') return await this.multiverseManager.persistirMultiverso();
    if (respuesta.accion === 'salir_sin_guardar' || !respuesta.accion) return console.log('Cerrando sin guardar...');

    switch (respuesta.accion) {
      case 'crud': await this.menuCRUD(); break;
      case 'c_per': await this.consultaPersonajes(); break;
      case 'c_loc': await this.consultaLocalizaciones(); break;
      case 'c_inv': await this.consultaInventos(); break;
      case 'versiones': await this.localizarVersiones(); break;
    }
    await this.menuPrincipal()
  }

  /** Busca y muestra todas las versiones alternativas de un personaje */
  private async localizarVersiones(): Promise<void> {
    const { nombre } = await prompts({
      type: 'text',
      name: 'nombre',
      message: 'Nombre del personaje para buscar sus versiones alternativas:'
    });
    const versiones = this.multiverseManager.personajes.getAll().filter(
      p => p.nombre.toLowerCase() === (nombre as string).toLowerCase()
    );
    if (versiones.length === 0) {
      console.log('No se encontraron versiones alternativas de este personaje');
    } else {
      console.table(versiones.map(v => ({
        ID: v.id,
        Nombre: v.nombre,
        Dimensión: v.dimensionOrigen.nombre,
        Estado: v.estado
      })));
    }
  }

  /**
   * Gestiona el flujo de consulta de personajes
   * Permite filtrar por cualquier campo y ordenar por nombre o nivel de inteligencia
   */
  private async consultaPersonajes() {
    const { filtro, campo, orden } = await prompts([
      { type: 'text', name: 'filtro', message: 'Filtrar por cualquier campo:' },
      { type: 'select', name: 'campo', message: 'Ordenar por:', choices: [{title:'Nombre', value:'nombre'}, {title:'Inteligencia', value:'nivelInteligencia'}] },
      { type: 'select', name: 'orden', message: 'Orden:', choices: [{title:'ASC', value:'asc'}, {title:'DESC', value:'desc'}] }
    ]);
    const res = ServicioConsultas.buscarPersonajes(this.multiverseManager.personajes.getAll(), filtro, campo, orden);
    console.table(res.map(p => ({ Nombre: p.nombre, Especie: p.especie.name, Dim: p.dimensionOrigen.nombre, IQ: p.nivelInteligencia })));
  }

  /** Gestiona el flujo de consulta de localizaciones o planetas */
  private async consultaLocalizaciones() {
    const { filtro } = await prompts({ type: 'text', name: 'filtro', message: 'Filtrar (Nombre/Tipo/Dimensión):' });
    const res = ServicioConsultas.buscarLocalizaciones(this.multiverseManager.planetas.getAll(), filtro);
    console.table(res.map(l => ({ Nombre: l.nombre, Tipo: l.tipo, Dimensión: l.dimension.nombre })));
  }

  /** Gestiona el flujo de consulta de inventos */
  private async consultaInventos() {
    const { filtro } = await prompts({ type: 'text', name: 'filtro', message: 'Filtrar (Nombre/Tipo/Inventor/Peligrosidad):' });
    const res = ServicioConsultas.buscarInventos(this.multiverseManager.inventos.getAll(), filtro);
    console.table(res.map(i => ({ Nombre: i.nombre, Inventor: i.inventor.nombre, Riesgo: i.nivelPeligrosidad })));
  }

  /** Menú secundario para operaciones CRUD */
  private async menuCRUD(): Promise<void> {
    const mapeoManagers = {
      dimensiones: this.multiverseManager.dimensiones,
      personajes: this.multiverseManager.personajes,
      especies: this.multiverseManager.especies,
      planetas: this.multiverseManager.planetas,
      inventos: this.multiverseManager.inventos
    };
    const { entidad, operacion } = await prompts([{
      type: 'select',
      name: 'entidad',
      message: 'Selecciones una entidad:',
      choices: [
        { title: 'Personajes', value: 'personajes'},
        { title: 'Dimensiones', value: 'dimensiones'},
        { title: 'Especies', value: 'especies'},
        { title: 'Localizaciones', value: 'localizaciones'},
        { title: 'Inventos', value: 'inventos'}]
    }, {
      type: 'select',
      name: 'operacion',
      message: 'Operación:',
      choices: [
        { title: 'Añadir', value: 'anadir'},
        { title: 'Eliminar', value: 'borrar'},
        { title: 'Modificar', value: 'actualizar'},
        { title: 'Volver', value: 'volver'}]
    }]);

    if (operacion === 'volver') return;
    const manager = mapeoManagers[entidad as keyof typeof mapeoManagers];

    if (operacion === 'borrar') {
      const { id } = await prompts({ type: 'text', name: 'id', message: 'ID a eliminar:' });
      manager.delete(id); 
      console.log("Elemento eliminado");
    } else if (operacion === 'anadir' || operacion === 'actualizar') {
      let id: string | undefined;
      if (operacion === 'actualizar') {
        const res = await prompts({ type: 'text', name: 'id', message: 'ID del elemento a modificar:' });
        id = res.id;
        if (!manager.getById(id!)) {
          console.error("El ID no existe");
          return;
        }
      }
    }
  }
}