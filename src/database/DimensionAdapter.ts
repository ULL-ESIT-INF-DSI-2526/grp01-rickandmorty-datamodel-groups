import { IDimension } from "../interfaces/IDimension.js";
import { Dimension } from "../models/Dimension.js";

export class DimensionAdapter {
  // JSON a clase
  public static toDomain(raw: IDimension): Dimension {
    return new Dimension(
      raw.id,
      raw.nombre,
      raw.estado,
      raw.nivelTecnologico,
      raw.descripcion
    );
  }

  // clase a JSON
  public static toPersistence(d: Dimension): IDimension {
    return {
      id: d.id,
      nombre: d.nombre,
      estado: d.estado,
      nivelTecnologico: d.nivelTecnologico,
      descripcion: d.descripcion
    };
  }
}