import { Menu } from "./ui/Menu.js";

/**
 * Punto de entrada principal de la aplicación.
 */
async function main(): Promise<void> {
  const menu = new Menu();
  await menu.iniciar();
}

main().catch((error) => {
  console.error("Error al iniciar la aplicación:", error);
});