import { MultiverseManager } from "./managers/MultiverseManager.js";
import { Personaje } from "./models/Personaje.js";
import { ServicioConsultas } from "./ui/ServicioConsultas.js";

/**
 * Demo automática que prueba el ciclo de vida completo de los datos
 * desde la carga de DB hasta la persistencia final
 */
async function demo() {
  console.log("--- Demo del Sistema de Gestión del Multiverso ---");

  const manager = MultiverseManager.getInstance();
  try {
    console.log("Cargando base de datos...\n");
    await manager.inicializar();
    console.log("Sistema inicializado con éxito.\n");
  } catch (error) {
    console.error("Error crítico en la carga:", error);
    return;
  }

  const personajes = manager.personajes.getAll();
  const dimensiones = manager.dimensiones.getAll();
  const especies = manager.especies.getAll();

  console.log("⚪️ ESTADO INICIAL: 10 personajes:");
  console.table(
    personajes.slice(0,10).map((p) => ({
      ID: p.id,
      Nombre: p.nombre,
      Especie: p.especie.name,
      Origen: p.dimensionOrigen.nombre,
    }))
  );

  console.log("\n⚪️ BÚSQUEDAS: 'Rick' ordenado ascendentemente");
  const filtrados = ServicioConsultas.buscarPersonajes(
    personajes, "Rick", "nombre", "asc");
  console.table(filtrados.map(p => ({ Nombre: p.nombre, ID: p.id })));

  console.log("\n⚪️ VERSIONES ALTERNATIVAS: 'Rick':");
  const nombreBase = "Rick";
  const versiones = manager.personajes.getAll().filter(p => 
    p.nombre.includes(nombreBase) && p.nombre !== nombreBase
  );

  if (versiones.length > 0) {
    console.log(`✔️ Se han encontrado ${versiones.length} variantes de ${nombreBase}:`);
    console.table(
      versiones.map((v) => ({
        Variante: v.nombre,
        Dimensión: v.dimensionOrigen.nombre,
        Estado: v.estado,
        IQ: v.nivelInteligencia
      }))
    );
  } else {
    console.log(`No se encontraron variantes alternativas para ${nombreBase}.`);
  }

  console.log("\n⚪️ GESTIÓN DE ENTIDADES:");
  
  const idTest = "9999";
  const nuevoPersonaje = {
    id: idTest,
    nombre: "Rick de Prueba Unitario",
    especie: especies[0],
    dimensionOrigen: dimensiones[0],
    estado: "Vivo",
    afiliacion: "C-137",
    nivelInteligencia: 8,
    descripcion: "Creado para verificar el manager",
  };

  manager.personajes.add(nuevoPersonaje as unknown as Personaje);
  console.log("✔️ Creado:", manager.personajes.getById(idTest)?.nombre);

  const pParaModificar = manager.personajes.getById(idTest);
  if (pParaModificar) {
    pParaModificar.nivelInteligencia = 10;
    manager.personajes.update(pParaModificar);
    console.log("✔️ Actualizado: IQ subido a", manager.personajes.getById(idTest)?.nivelInteligencia);
  }

  manager.personajes.delete(idTest);
  const borrado = manager.personajes.getById(idTest);
  console.log(borrado ? "❌ Error: No se borró" : "✔️ Borrado correctamente de memoria");

  console.log("\n⚪️ LÓGICA DEL MULTIVERSO");
  
  console.log("- Informe IQ Medio:", manager.informeNivelTecnologico().toFixed(2));
  
  const anomalias = manager.buscarAnomalias();
  console.log(`- Anomalías detectadas: ${anomalias.length}`);
  console.log('Filtramos las anomalías cuyo motivo es: Conflicto de Dimensión')
  if (anomalias.length > 0) {
    console.table(anomalias.slice(0, 2).map(a => ({ Nombre: a.nombre, Motivo: "Conflicto de Dimensión" })));
  }

  if (personajes.length > 0 && dimensiones.length >= 2) {
    console.log("\n⚪️ VIAJES INTERDIMENSIONALES");
    const viajero = personajes[0];
    manager.registrarViaje(
      viajero.id.toString(),
      dimensiones[0].id,
      dimensiones[1].id,
      "Misión de reconocimiento"
    );
    console.log(`✔️ Viaje registrado para ${viajero.nombre}`);
    console.table(manager.historialViajes(viajero.id.toString()));
  }

  console.log("\n⚪️ GUARDANDO CAMBIOS EN LA BASE DE DATOS...");
  try {
    await manager.persistirMultiverso();
    console.log("Base de datos actualizada con éxito.");
  } catch (error) {
    console.error("Error al guardar:", error);
  }
}

demo();