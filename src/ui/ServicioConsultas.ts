import { Personaje } from "../models/Personaje.js";
import { Planetas } from "../models/Planetas.js";
import { Invento } from "../models/Invento.js";

/**
 * Servicio encargado de realizar operaciones de búsqueda, filtrado y ordenación
 * sobre las diferentes colecciones de datos del multiverso
 */
export class ServicioConsultas {
  /**
   * Filtra y ordena una lista de personajes según un término de búsqueda
   * @param lista - Lista de objetos Personaje a procesar
   * @param termino - Término para filtrar
   * @param campo - Atributo por el cual se quiere ordenar la lista
   * @param orden - Sentido de la ordenación
   * @returns Nueva lista con los personajes filtrados y ordenados
   */
  static buscarPersonajes(lista: Personaje[], termino: string, 
    campo: 'nombre' | 'nivelInteligencia', orden: 'asc' | 'desc'): Personaje[] {
    const term = termino.toLowerCase();
    const filtrados = lista.filter(p =>
      [p.nombre, p.especie.name, p.afiliacion, p.estado, p.dimensionOrigen.nombre]
      .some(atr => atr.toLowerCase().includes(term)));
    return filtrados.sort((a, b) => {
      const factor = orden === 'asc' ? 1 : -1;
      const valA = a[campo];
      const valB = b[campo];
      const comparadores = {
        string: (s1: string, s2: string) => s1.localeCompare(s2) * factor,
        number: (n1: number, n2: number) => (n1 - n2) * factor,
      };
      if (typeof valA === 'string' && typeof valB === 'string') {
        return comparadores.string(valA, valB);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return comparadores.number(valA, valB);
      }
      return 0;
    });
  }

  /**
   * Busca localizaciones y/o planetas según un término de búsqueda
   * @param lista - Lista de objetos Planetas
   * @param termino - Término para filtrar
   * @returns Nueva lista de localizaciones y/o planetas filtrados
   */
  static buscarLocalizaciones(lista: Planetas[], termino: string): Planetas[] {
    const term = termino.toLowerCase();
    return lista.filter(l =>
      [l.nombre, l.tipo, l.dimension.nombre]
      .some(atr => atr.toLowerCase().includes(term)));
  }

  /**
   * Busca inventos según un término de búsqueda
   * @param lista - Lista de objetos Invento
   * @param termino - Término para filtrar
   * @returns Nueva lista de inventos filtrados
   */
  static buscarInventos(lista: Invento[], termino: string): Invento[] {
    const term = termino.toLowerCase();
    return lista.filter(i =>
      [i.nombre, i.tipo, i.inventor.nombre].some(atr => atr.toLowerCase().includes(term)) ||
      i.nivelPeligrosidad.toString() === termino);
  }
}
