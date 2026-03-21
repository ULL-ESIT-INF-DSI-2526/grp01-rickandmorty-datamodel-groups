import { IEvento } from "../interfaces/IEvento.js";
import { PersonajeManager } from "./PersonajeManager.js";
import { DimensionManager } from "./DimensionManager.js";
import { PlanetaManager } from "./PlanetaManager.js";
import { InventoManager } from "./InventoManager.js";
import { EspecieManager } from "./EspecieManager.js";
import { EventoManager } from "./EventoManager.js";
import { DataManager } from "../database/DataManager.js";
import { Personaje } from "../models/Personaje.js";
import { DimensionStatus } from "../types/Dimension.types.js";
import { Dimension } from "../models/Dimension.js";
import { IInformeInvento } from "../interfaces/IInformeInvento.js";

/**
 * clase gestora del multiverso, usa instancias de los managers concretos, y sigue un patron singleton
 */
export class MultiverseManager {
  private static _instance: MultiverseManager;
  private _eventosMultiverso: EventoManager;
  private _personajes: PersonajeManager;
  private _dimensiones: DimensionManager;
  private _planetas: PlanetaManager;
  private _especies: EspecieManager;
  private _inventos: InventoManager;

  /** Constructor privado del singleton que inicializa las instancias de los managers concretos */
  private constructor() {
    this._personajes = new PersonajeManager();
    this._dimensiones = new DimensionManager();
    this._planetas = new PlanetaManager();
    this._especies = new EspecieManager();
    this._inventos = new InventoManager();
    this._eventosMultiverso = new EventoManager();
  }

  /** Permite acceder al atributo privado _personajes */
  get personajes(): PersonajeManager { return this._personajes};

  /** Permite acceder al atributo privado _dimensiones */
  get dimensiones(): DimensionManager { return this._dimensiones};

  /** Permite acceder al atributo privado _planetas */
  get planetas(): PlanetaManager { return this._planetas};

  /** Permite acceder al atributo privado _especies */
  get especies(): EspecieManager { return this._especies};

  /** Permite acceder al atributo privado _inventos */
  get inventos(): InventoManager { return this._inventos};

  /** Método para obtener instancia, y si no existe la crea */
  public static getInstance(): MultiverseManager {
    if (!MultiverseManager._instance) {
      MultiverseManager._instance = new MultiverseManager();
    }
    return MultiverseManager._instance;
  }

  /** Método inicial para cargar los datos del JSON usando los managers de cada instancia */
  public async inicializar(): Promise<void> {
    await DataManager.getInstance();

    await this._eventosMultiverso.cargar();
    await this._dimensiones.cargar();
    await this._especies.cargar();
    await this._planetas.cargar(this._dimensiones);
    await this._personajes.cargar(
      this._especies.getAll(),
      this._dimensiones.getAll(),
    );
    await this._inventos.cargar(this._personajes.getAll());

    console.log("Multiverso inicializado desde JSON");
  }

  /** Método de guardado del estado actual de todas las colecciones en el JSON */
  public async persistirMultiverso(): Promise<void> {
    await this._eventosMultiverso.guardar();
    await this._dimensiones.guardar();
    await this._personajes.guardar();
    await this._inventos.guardar();
    await this._planetas.guardar();
    await this._especies.guardar();

    console.log("Multiverso guardado en JSON");
  }

  /**
   * Método de búsqueda de anomalias
   * @returns Personaje[] con anomalias, es decir,
   * que la dimensión asociada a su id, dimensión origen no existe,
   * o que la dimensión asociada a su id dimensión tiene un estado destruida
   */
  public buscarAnomalias(): Personaje[] {
    const dimensiones = this._dimensiones.getAll();
    return this._personajes.getAll().filter((pers) => {
      const dimOrigen = dimensiones.find(
        (dim) => dim.id === pers.dimensionOrigen.id,
      );
      if (!dimOrigen) return true;
      if (dimOrigen.estado === "destruida") return true;
      return false;
    });
  }

  /**
   * Método de búsqueda filtrada por estado de dimensión
   * @param estado - Estado por el que filtrar la búsqueda
   * @returns Array de dimensiones que coinciden en estado con el párametro
   */
  public dimensionesPorEstado(estado: DimensionStatus): Dimension[] {
    return this._dimensiones.getAll().filter((d) => d.estado === estado);
  }

  /**
   * Método que registra en memoria un viaje interdimensional
   * @param personajeId - ID del personaje que ha viajado
   * @param origenId - ID de la dimensión de la que viene
   * @param destinoId - ID de la dimensión a la que va
   * @param descripcion - Motivo del viaje
   */
  public registrarViaje(
    personajeId: string,
    origenId: string,
    destinoId: string,
    descripcion: string,
  ): void {
    const nuevoViaje: IEvento = {
      id: `Viaje-${Date.now()}`,
      fecha: new Date().toString(),
      tipo: "viaje interdimensional",
      descripcion: descripcion,
      idPersonaje: personajeId,
      idOrigen: origenId,
      idDestino: destinoId,
    };

    this._eventosMultiverso.registrar(nuevoViaje);
    console.log(
      `Viaje del personaje con id: ${personajeId} registrado en memoria.`,
    );
  }

  /**
   * Método para cambiar estado de la dimensión en memoria
   * @param id - ID de la dimensión
   * @param estado - Estado a actualizar
   * @param descripcion - Motivo de actualizar estado
   */
  public registrarSucesoDimension(
    id: string,
    estado: DimensionStatus,
    descripcion: string,
  ): void {
    const dimension = this._dimensiones.getById(id);

    if (dimension) {
      dimension.estado = estado;
      const nuevoEvento: IEvento = {
        id: `Dimension-${Date.now()}`,
        fecha: new Date().toString(),
        tipo: "cambio estado de dimension",
        descripcion: `Cambio estado dimension a ${estado}: ${descripcion}`,
        idOrigen: id,
      };

      this._eventosMultiverso.registrar(nuevoEvento);

      console.log(
        `Suceso en dimensión con id ${id} registrado con estado ${estado}.`,
      );
    } else {
      console.error(
        `Error al registrar el suceso: La dimensión con id ${id} no existe.`,
      );
    }
  }

  /**
   *Método que registra en memoria la acción de un artefacto
   * @param inventoId - ID del artefacto
   * @param accion - Desplegar o neutralizar artefacto
   * @param descripcion - Motivo o descripción del artefacto
   */
  public registrarAccionArtefacto(
    inventoId: string,
    accion: "despliegue" | "neutralizacion",
    descripcion: string,
  ): void {
    const invento = this._inventos.getById(inventoId);

    if (invento) {
      const nuevoEvento: IEvento = {
        id: `Artefacto-${Date.now()}`,
        fecha: new Date().toString(),
        tipo: "despliegue artefacto",
        descripcion: `${accion}: ${descripcion}`,
        idArtefacto: inventoId,
        idOrigen: invento.inventor.dimensionOrigen.id,
      };

      this._eventosMultiverso.registrar(nuevoEvento);
      console.log(
        `Acción de ${accion} sobre el invento ${invento.nombre} registrada.`,
      );
    }
  }

  /** 
   * Método de informe, que calcula el promedio del nivel tecnológico de las 
   * dimensiones que no han sido destruidas
   */
  public informeNivelTecnologico(): number {
    const activas = this.dimensionesPorEstado("activa");

    if (activas.length === 0) {
      return 0;
    }

    const suma = activas.reduce((acc, d) => acc + d.nivelTecnologico, 0);
    return suma / activas.length;
  }

  /**
   * Método de informe, que devuelve el historial de viajes de un personaje
   * @param personajeId - ID del personaje que consultar historial
   * @returns Array de todos los eventos asociados a este personaje, es decir, los viajes
   */
  public historialViajes(personajeId: string): IEvento[] {
    return this._eventosMultiverso
      .getById(personajeId)
      .filter((e) => e.tipo === "viaje interdimensional");
  }

  /**
   * Método de informe que muestra las versiones alternativas de los personajes registrados
   * es decir, personajes con mismo nombre pero distinto id
   * @returns
   */
  public informeVersionesAlternativas(): [string, number][] {
    const contadorVersiones = new Map<string, number>();
    const personajes = this._personajes.getAll();

    personajes.forEach((pers) => {
      const nombre = pers.nombre;
      const nombreIteracion = contadorVersiones.get(nombre) || 0;
      contadorVersiones.set(nombre, nombreIteracion + 1);
    });

    const personajesAlternativos = Array.from(contadorVersiones);

    return personajesAlternativos.filter(
      ([, totalVersiones]) => totalVersiones > 1,
    );
  }

  /** 
   * Método informe de inventos con nivel de riesgo superior a 8
   * @returns IInformeInvento[] lista con datos del invento y su inventor
   */
  public informeInventosCriticos(): IInformeInvento[] {
    const todosLosInventos = this._inventos.getAll();

    const filtrados = todosLosInventos.filter(
      (inv) => inv.nivelPeligrosidad > 8,
    );

    return filtrados.map((inv) => {
      const inventor = inv.inventor;

      return {
        nombre: inv.nombre,
        peligro: inv.nivelPeligrosidad,
        inventor: inventor.nombre,
        localizacion: inventor.dimensionOrigen.nombre,
      };
    });
  }
}