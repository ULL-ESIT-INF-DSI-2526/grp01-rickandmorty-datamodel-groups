import prompts from "prompts";
import { MultiverseManager } from "../managers/MultiverseManager.js";
import { ServicioConsultas } from "./ServicioConsultas.js";
import { Dimension } from "../models/Dimension.js";
import { Personaje } from "../models/Personaje.js";
import { AfiliacionPersonajes } from "../types/AfiliacionPersonajes.js";
import { EstadoPersonajes } from "../types/EstadoPersonajes.js";
import { Invento } from "../models/Invento.js";
import { Planetas } from "../models/Planetas.js";
import { Especie } from "../models/Especie.js";
import { TipoLocalizaciones } from "../types/Localizaciones.js";
import { TipoInvento } from "../types/TipoInventos.js";

type ManagerData =
  | "personajes"
  | "dimensiones"
  | "planetas"
  | "especies"
  | "inventos";

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
    console.log("--- Sistema de Gestión del Multiverso ---");
    await this.menuPrincipal();
  }

  /**
   * Muestra el menú principal. Gestiona la navegación principal y decide
   * si persistir los cambios al salir
   */
  private async menuPrincipal(): Promise<void> {
    const respuesta = await prompts({
      type: "select",
      name: "accion",
      message: "Seleccione una opción:",
      choices: [
        {
          title: "  Gestión de Datos (Añadir/Eliminar/Modificar)",
          value: "crud",
        },
        { title: "  Consultar Personajes", value: "c_personaje" },
        { title: "  Consultar Localizaciones", value: "c_localizacion" },
        { title: "  Consultar Inventos", value: "c_inventos" },
        { title: "  Versiones Alternativas", value: "versiones" },
        { title: "  Salir y Guardar", value: "salir_guardar" },
        { title: "  Salir SIN Guardar", value: "salir_sin_guardar" },
      ],
    });

    if (respuesta.accion === "salir_guardar") {
      await this.multiverseManager.persistirMultiverso();
      return;
    }

    if (respuesta.accion === "salir_sin_guardar" || !respuesta.accion) {
      console.log("Cerrando sin guardar...");
      return;
    }

    switch (respuesta.accion) {
      case "crud":
        await this.menuCRUD();
        break;
      case "c_personaje":
        await this.consultaPersonajes();
        break;
      case "c_localizacion":
        await this.consultaLocalizaciones();
        break;
      case "c_inventos":
        await this.consultaInventos();
        break;
      case "versiones":
        await this.localizarVersiones();
        break;
    }

    await this.menuPrincipal();
  }

  /** Busca y muestra todas las versiones alternativas de un personaje */
  private async localizarVersiones(): Promise<void> {
    const { nombre } = await prompts({
      type: "text",
      name: "nombre",
      message: "Nombre del personaje para buscar sus versiones alternativas:",
    });

    const versiones = this.multiverseManager.personajes
      .getAll()
      .filter(
        (p) => p.nombre.toLowerCase() === (nombre as string).toLowerCase(),
      );

    if (versiones.length === 0) {
      console.log("No se encontraron versiones alternativas de este personaje");
    } else {
      console.table(
        versiones.map((v) => ({
          ID: v.id,
          Nombre: v.nombre,
          Dimensión: v.dimensionOrigen.nombre,
          Estado: v.estado,
        })),
      );
    }
  }

  /**
   * Gestiona la consulta de personajes
   * Permite filtrar por cualquier campo y ordenar por nombre o nivel de inteligencia
   */
  private async consultaPersonajes(): Promise<void> {
    const { filtro, campo, orden } = await prompts([
      { type: "text", name: "filtro", message: "Filtrar por cualquier campo:" },
      {
        type: "select",
        name: "campo",
        message: "Ordenar por:",
        choices: [
          { title: "Nombre", value: "nombre" },
          { title: "Inteligencia", value: "nivelInteligencia" },
        ],
      },
      {
        type: "select",
        name: "orden",
        message: "Orden:",
        choices: [
          { title: "ASC", value: "asc" },
          { title: "DESC", value: "desc" },
        ],
      },
    ]);

    const res = ServicioConsultas.buscarPersonajes(
      this.multiverseManager.personajes.getAll(),
      filtro,
      campo,
      orden,
    );

    console.table(
      res.map(
        (p: {
          nombre: unknown;
          especie: { name: unknown };
          dimensionOrigen: { nombre: unknown };
          nivelInteligencia: unknown;
        }) => ({
          Nombre: p.nombre,
          Especie: p.especie.name,
          Dim: p.dimensionOrigen.nombre,
          IQ: p.nivelInteligencia,
        }),
      ),
    );
  }

  /** Gestiona la consulta de localizaciones o planetas */
  private async consultaLocalizaciones(): Promise<void> {
    const { filtro } = await prompts({
      type: "text",
      name: "filtro",
      message: "Filtrar (Nombre/Tipo/Dimensión):",
    });

    const res = ServicioConsultas.buscarLocalizaciones(
      this.multiverseManager.planetas.getAll(),
      filtro,
    );

    console.table(
      res.map(
        (l: {
          nombre: unknown;
          tipo: unknown;
          dimension: { nombre: unknown };
        }) => ({
          Nombre: l.nombre,
          Tipo: l.tipo,
          Dimensión: l.dimension.nombre,
        }),
      ),
    );
  }

  /** Gestiona la consulta de inventos */
  private async consultaInventos(): Promise<void> {
    const { filtro } = await prompts({
      type: "text",
      name: "filtro",
      message: "Filtrar (Nombre/Tipo/Inventor/Peligrosidad):",
    });

    const res = ServicioConsultas.buscarInventos(
      this.multiverseManager.inventos.getAll(),
      filtro,
    );

    console.table(
      res.map(
        (i: {
          nombre: unknown;
          inventor: { nombre: unknown };
          nivelPeligrosidad: unknown;
        }) => ({
          Nombre: i.nombre,
          Inventor: i.inventor.nombre,
          Riesgo: i.nivelPeligrosidad,
        }),
      ),
    );
  }

  /** Menú principal de gestión de entidades */
  private async menuCRUD(): Promise<void> {
    const { entidad, operacion } = await prompts([
      {
        type: "select",
        name: "entidad",
        message: "Seleccione una entidad:",
        choices: [
          { title: "Personajes", value: "personajes" },
          { title: "Dimensiones", value: "dimensiones" },
          { title: "Especies", value: "especies" },
          { title: "Localizaciones (Planetas)", value: "planetas" },
          { title: "Inventos", value: "inventos" },
        ],
      },
      {
        type: "select",
        name: "operacion",
        message: "Operación:",
        choices: [
          { title: "Listar Todo", value: "listar" },
          { title: "Añadir", value: "anadir" },
          { title: "Modificar", value: "actualizar" },
          { title: "Eliminar", value: "borrar" },
          { title: "Volver", value: "volver" },
        ],
      },
    ]);

    if (operacion === "volver" || !entidad) return;

    const manager = this.multiverseManager[entidad as ManagerData];

    if (operacion === "listar") {
      if (entidad === "personajes") {
        console.table(
          this.multiverseManager.personajes.getAll().map((p) => ({
            ID: p.id,
            Nombre: p.nombre,
            Especie: p.especie.name,
            Dimensión: p.dimensionOrigen.nombre,
            Estado: p.estado,
            Afiliación: p.afiliacion,
            Inteligencia: p.nivelInteligencia,
            Descripción: p.descripcion,
          })),
        );
      } else if (entidad === "dimensiones") {
        console.table(
          this.multiverseManager.dimensiones.getAll().map((d) => ({
            ID: d.id,
            Nombre: d.nombre,
            Estado: d.estado,
            NivelTecnológico: d.nivelTecnologico,
            Descripción: d.descripcion,
          })),
        );
      } else if (entidad === "especies") {
        console.table(
          this.multiverseManager.especies.getAll().map((e) => ({
            ID: e.id,
            Nombre: e.name,
            Origen: e.origin.nombre,
            Tipo: e.type,
            EsperanzaVida: e.averageLifeExpectancy,
            Descripción: e.description,
          })),
        );
      } else if (entidad === "planetas") {
        console.table(
          this.multiverseManager.planetas.getAll().map((p) => ({
            ID: p.id,
            Nombre: p.nombre,
            Tipo: p.tipo,
            Dimensión: p.dimension.nombre,
            Población: p.poblacion,
            Descripción: p.descripcion,
          })),
        );
      } else if (entidad === "inventos") {
        console.table(
          this.multiverseManager.inventos.getAll().map((i) => ({
            ID: i.id,
            Nombre: i.nombre,
            Inventor: i.inventor.nombre,
            Tipo: i.tipo,
            Peligrosidad: i.nivelPeligrosidad,
            Descripción: i.descripcion,
          })),
        );
      }
    } else if (operacion === "borrar") {
      const { id } = await prompts({
        type: "text",
        name: "id",
        message: "ID a eliminar:",
      });
      manager.delete(id);
      console.log("✅ Elemento eliminado.");
    } else {
      await this.procesarFormulario(entidad as ManagerData, operacion);
    }
  }

  /** Lógica para crear y modificar pidiendo todos los atributos */
  private async procesarFormulario(
    entidad: ManagerData,
    operacion: "anadir" | "actualizar",
  ): Promise<void> {
    let idPrevia: string | undefined;

    if (operacion === "actualizar") {
      const res = await prompts({
        type: "text",
        name: "id",
        message: `ID del ${entidad} a modificar:`,
      });
      idPrevia = res.id;

      if (!idPrevia || !this.multiverseManager[entidad].getById(idPrevia)) {
        console.error("❌ El ID no existe.");
        return;
      }
    }

    if (entidad === "dimensiones") {
      const d = await prompts([
        { type: "text", name: "id", message: "ID:", initial: idPrevia },
        { type: "text", name: "nombre", message: "Nombre:" },
        {
          type: "select",
          name: "estado",
          message: "Estado:",
          choices: [
            { title: "Activa", value: "activa" },
            { title: "Destruida", value: "destruida" },
          ],
        },
        { type: "number", name: "tec", message: "Nivel Tecnológico (1-10):" },
        { type: "text", name: "tipo", message: "Tipo (C-137, Prime...):" },
      ]);

      const objeto = new Dimension(d.id, d.nombre, d.estado, d.tec, d.tipo);

      if (operacion === "anadir") {
        this.multiverseManager.dimensiones.add(objeto);
      } else {
        this.multiverseManager.dimensiones.update(objeto);
      }
    } else if (entidad === "personajes") {
      const especies = this.multiverseManager.especies.getAll();
      const dimensiones = this.multiverseManager.dimensiones.getAll();

      const p = await prompts([
        {
          type: "number",
          name: "id",
          message: "ID Numérico:",
          initial: idPrevia ? parseInt(idPrevia) : undefined,
        },
        { type: "text", name: "nombre", message: "Nombre:" },
        {
          type: "select",
          name: "eIdx",
          message: "Especie:",
          choices: especies.map((e, i) => ({ title: e.name, value: i })),
        },
        {
          type: "select",
          name: "dIdx",
          message: "Dimensión:",
          choices: dimensiones.map((d, i) => ({ title: d.nombre, value: i })),
        },
        {
          type: "select",
          name: "afiliacion",
          message: "Afiliación:",
          choices: [
            { title: "Citadel", value: "Citadel" },
            { title: "Rebellion", value: "Rebellion" },
            { title: "Independiente", value: "Independiente" },
          ],
        },
        {
          type: "number",
          name: "iq",
          message: "IQ (1-10):",
          validate: (v: number) =>
            v >= 1 && v <= 10 ? true : "Debe ser 1-10",
        },
        { type: "text", name: "desc", message: "Descripción:" },
      ]);

      const objeto = new Personaje(
        p.id,
        p.nombre,
        especies[p.eIdx],
        dimensiones[p.dIdx],
        EstadoPersonajes.Vivo,
        p.afiliacion as AfiliacionPersonajes,
        p.iq,
        p.desc,
      );

      if (operacion === "anadir") {
        this.multiverseManager.personajes.add(objeto);
      } else {
        this.multiverseManager.personajes.update(objeto);
      }
    } else if (entidad === "especies") {
      const dimensiones = this.multiverseManager.dimensiones.getAll();
      const planetas = this.multiverseManager.planetas.getAll();

      const e = await prompts([
        { type: "text", name: "id", message: "ID:", initial: idPrevia },
        {
          type: "text",
          name: "name",
          message: "Nombre:",
          validate: (v: string) => v.trim() !== "" || "Obligatorio",
        },
        {
          type: "select",
          name: "originType",
          message: "Tipo de origen:",
          choices: [
            { title: "Dimensión", value: "dimension" },
            { title: "Planeta", value: "planeta" },
          ],
        },
        {
          type: (prev: string) => (prev === "dimension" ? "select" : null),
          name: "dimensionIdx",
          message: "Seleccione una dimensión:",
          choices: dimensiones.map((d, i) => ({ title: d.nombre, value: i })),
        },
        {
          type: (_: unknown, values: { originType?: string }) =>
            values.originType === "planeta" ? "select" : null,
          name: "planetaIdx",
          message: "Seleccione un planeta:",
          choices: planetas.map((p, i) => ({ title: p.nombre, value: i })),
        },
        {
          type: "text",
          name: "type",
          message: "Tipo:",
          validate: (v: string) => v.trim() !== "" || "Obligatorio",
        },
        {
          type: "number",
          name: "life",
          message: "Esperanza de Vida:",
          validate: (v: number) => v >= 0 || "No negativa",
        },
        {
          type: "text",
          name: "desc",
          message: "Descripción:",
          validate: (v: string) => v.trim() !== "" || "Obligatorio",
        },
      ]);

      const origen =
        e.originType === "dimension"
          ? dimensiones[e.dimensionIdx]
          : planetas[e.planetaIdx];

      const objeto = new Especie(
        e.id,
        e.name,
        origen,
        e.type,
        e.life,
        e.desc,
      );

      if (operacion === "anadir") {
        this.multiverseManager.especies.add(objeto);
      } else {
        this.multiverseManager.especies.update(objeto);
      }
    } else if (entidad === "planetas") {
      const dimensiones = this.multiverseManager.dimensiones.getAll();

      const l = await prompts([
        { type: "text", name: "id", message: "ID:", initial: idPrevia },
        { type: "text", name: "nombre", message: "Nombre:" },
        {
          type: "select",
          name: "tipo",
          message: "Tipo:",
          choices: [
            { title: "Planeta", value: "Planeta" },
            { title: "Base", value: "Base" },
          ],
        },
        {
          type: "select",
          name: "dIdx",
          message: "Dimensión:",
          choices: dimensiones.map((d, i) => ({ title: d.nombre, value: i })),
        },
        { type: "number", name: "pob", message: "Población:" },
        { type: "text", name: "desc", message: "Descripción:" },
      ]);

      const objeto = new Planetas(
        l.id,
        l.nombre,
        l.tipo as TipoLocalizaciones,
        dimensiones[l.dIdx],
        l.pob,
        l.desc,
      );

      if (operacion === "anadir") {
        this.multiverseManager.planetas.add(objeto);
      } else {
        this.multiverseManager.planetas.update(objeto);
      }
    } else if (entidad === "inventos") {
      const personajes = this.multiverseManager.personajes.getAll();

      const i = await prompts([
        {
          type: "number",
          name: "id",
          message: "ID Numérico:",
          initial: idPrevia ? parseInt(idPrevia) : undefined,
        },
        { type: "text", name: "nombre", message: "Nombre:" },
        {
          type: "select",
          name: "pIdx",
          message: "Inventor:",
          choices: personajes.map((p, idx) => ({
            title: p.nombre,
            value: idx,
          })),
        },
        { type: "text", name: "tipo", message: "Tipo Invento:" },
        {
          type: "number",
          name: "peligro",
          message: "Peligrosidad (1-10):",
          validate: (v: number) =>
            v >= 1 && v <= 10 ? true : "Debe ser 1-10",
        },
        { type: "text", name: "desc", message: "Descripción:" },
      ]);

      const objeto = new Invento(
        i.id,
        i.nombre,
        personajes[i.pIdx],
        i.tipo as TipoInvento,
        i.peligro,
        i.desc,
      );

      if (operacion === "anadir") {
        this.multiverseManager.inventos.add(objeto);
      } else {
        this.multiverseManager.inventos.update(objeto);
      }
    }

    console.log(
      `✅ ${entidad} ${operacion === "anadir" ? "añadido" : "actualizado"} con éxito.`,
    );
  }
}