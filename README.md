```
_____ ______   ___  ___  ___   _________  ___  ___      ___ _______   ________  ________  _______          
|\   _ \  _   \|\  \|\  \|\  \ |\___   ___\\  \|\  \    /  /|\  ___ \ |\   __  \|\   ____\|\  ___ \         
\ \  \\\__\ \  \ \  \\\  \ \  \\|___ \  \_\ \  \ \  \  /  / | \   __/|\ \  \|\  \ \  \___|\ \   __/|        
 \ \  \\|__| \  \ \  \\\  \ \  \    \ \  \ \ \  \ \  \/  / / \ \  \_|/_\ \   _  _\ \_____  \ \  \_|/__      
  \ \  \    \ \  \ \  \\\  \ \  \____\ \  \ \ \  \ \    / /   \ \  \_|\ \ \  \\  \\|____|\  \ \  \_|\ \     
   \ \__\    \ \__\ \_______\ \_______\ \__\ \ \__\ \__/ /     \ \_______\ \__\\ _\ ____\_\  \ \_______\    
    \|__|     \|__|\|_______|\|_______|\|__|  \|__|\|__|/       \|_______|\|__|\|__|\_________\|_______|    
                                                                                   \|_________|             
                                                                                                            
                                                                                                            
                             ________  ________  _________  ________                                        
                            |\   ___ \|\   __  \|\___   ___\\   __  \                                       
                            \ \  \_|\ \ \  \|\  \|___ \  \_\ \  \|\  \                                      
                             \ \  \ \\ \ \   __  \   \ \  \ \ \   __  \                                     
                              \ \  \_\\ \ \  \ \  \   \ \  \ \ \  \ \  \                                    
                               \ \_______\ \__\ \__\   \ \__\ \ \__\ \__\                                   
                                \|_______|\|__|\|__|    \|__|  \|__|\|__|                                   
                                                                                                            
                                                                                                            
                                                                                                            
                 _____ ______   ________  ________   ________  ________  _______   ________                 
                |\   _ \  _   \|\   __  \|\   ___  \|\   __  \|\   ____\|\  ___ \ |\   __  \                
                \ \  \\\__\ \  \ \  \|\  \ \  \\ \  \ \  \|\  \ \  \___|\ \   __/|\ \  \|\  \               
                 \ \  \\|__| \  \ \   __  \ \  \\ \  \ \   __  \ \  \  __\ \  \_|/_\ \   _  _\              
                  \ \  \    \ \  \ \  \ \  \ \  \\ \  \ \  \ \  \ \  \|\  \ \  \_|\ \ \  \\  \|             
                   \ \__\    \ \__\ \__\ \__\ \__\\ \__\ \__\ \__\ \_______\ \_______\ \__\\ _\             
                    \|__|     \|__|\|__|\|__|\|__| \|__|\|__|\|__|\|_______|\|_______|\|__|\|__|            
                                                                                                            
```
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-groups/actions/workflows/coverals.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-groups/actions/workflows/coverals.yml)
[![CI Tests](https://github.com/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-groups/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-groups/actions/workflows/ci.yml)
# 🌌 Multiverse Data Manager

## 📝 Descripción del Proyecto
Se trata de una aplicación CLI (Interfaz de Línea de Comandos) desarrollada en TypeScript que está orientada a la gestión y consulta del multiverso de Rick y Morty. 

El sistema permite hacer operaciones CRUD (crear, leer, actualizar y eliminar) sobre todas las entidades: personajes, dimensiones, planetas (localizaciones), especies e inventos.

También incluye lógicas avanzadas como:
- Búsqueda y filtrado dinámico por varios campos
- Rastreo de versiones alternativas del mismo personaje
- Registro de viajes y uso de artefactos
- Detección, en tiempo real, de anomalías

## 🚀 Instalación y Ejecución

### Requisitos previos
Para poder ejecutar el proyecto en su máquina local, deberá instalarse:
- [Node.js](https://nodejs.org/) (versión 16 o superior).
- Gestor de paquetes `npm` (se instala automáticamente junto con Node.js)
- Git (opcional, sólo si se va a clonar el repositorio)

### Pasos
1. **Clonar el repositorio:** (o descargar el código fuente):
```bash
git clone git@github.com:ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-groups.git
cd grp01-rickandmorty-datamodel-groups/
```

2. **Instalar las dependencias:**
El proyecto requiere librerías externas como Lowdb o Prompts, por lo que debe ejecutar:
```bash
npm install
```

3. **Ejecutar la aplicación:**
Al ejecutar el sigueinte comando se compilará el código fuente y se iniciará el menú.
```bash
npm start
```
De esta forma queda en modo ***watch*** por lo que si realizas cambios en el código, este se recompilará y reiniciará automáticamente.

### 🎬 Demostración del Sistema (`demo.ts`)
Hemos añadido un script de prueba para poder comprobar el funcionamiento interno de la aplicación sin tener que navegar por los menús. Este archivo utiliza la base de datos real (`database.json`) para realizar operaciones CRUD, búsquedas complejas, y detección de anomalías de forma automatizada.

Para ejecutar la demo, compila y lanza el archivo con:
```bash
npx ts-node src/demo.ts
```
(Nota: Si ya tienes el código compilado, puedes usar `node dist/demo.js`)

## 🏗️ Arquitectura

El proyecto se ha desarrollado con el objetivo de cumplir los principios SOLID y algún patron de diseño para
aplicar los conocimientos de estas últimas semanas de clase, facilitar el mantenimiento y escalabilidad:

- ***Modelos (`/src/models`)***: Definiciones de clases que definen los objetos a incluir en el gestor del multiverso, cumplen los contratos que se definen en las interfaces de ***(`/src/types`)***

- ***Gestión (`/src/managers`)***: Desarrollo de los gestores concretos para cada modelo mencionado previamente, que extienden la clase abstracta ***GestionManager.ts*** para que sólo se implementen de forma específica los métodos necesarios.

- Patrón ***Singleton***: Se usa en (`/src/database/DataManager`) y en (`/src/managers/MultiverseManager`), para asegurar que solamente hay una instancia del manager que engloba las instancias de los managers concretos para centralizar el control de las colecciones.


-  ***Persistencia (`/src/database`)***: Gestión usando **Lowdb**, guarda correctamente los datos de memoria en el archivo `database.json`.

-  ***Interfaz (`/src/ui`)***: Interfaz de línea de comandos que usa ***Prompts*** para proporcionar menús y submenús para todas las opciones del gestor.

## 🧪 Testing y Calidad del Código

Se han llevado a cabo los tests necesarios para probar cada aspecto del código desarrollado con la herramiena ***Vitest***.

  * **Tests Unitarios**: Comprobaciones de la lógica de cada clase y modelo.
  * **Tests de Integración**: Pruebas de flujo completo entre los managers, memoria y el JSON.
  * **Mocks**: Uso de `vi.mock` y `vi.spyOn` para aislar componentes y poder comprobar casos como la inicialización de bases de dato vacía o inválida

También mediante la herramienta ***Coverage*** con el motor **v8**, se ha hecho un cubrimiento bastante completo del código desarrollado.

```bash
# Ejecutar tests
npm test

# Generar reporte de cobertura
npm run coverage
```

## 🛠️ Funcionalidades Clave

  * **Operaciones CRUD**: añade, elimina, modifica y consulta los datos del multiverso

  * **Buscador de Anomalías**: Identifica personajes cuyas dimensiones de origen han sido destruidas o no existen en el registro

  * **Detector de Versiones Alternativas**: Agrupa personajes por nombre para listar sus distintas variantes a lo largo de las dimensiones, es decir, nombres con varias dimensiones distintas asociadas

  * **Registro de Sucesos**: Sistema de eventos que sigue cada viaje, cambio de estado de dimensión o uso de artefactos peligrosos.

  * **Informes Técnicos**: Cálculo del promedio de nivel tecnológico del multiverso, informe de variantes de personajes e informes de inventos con nivel de peligrosidad crítico, aquellos que son >= 8.

## 📚 Documentación

El código está documentado siguiendo los requisitos **TypeDoc y TSDoc**. Se puede generar y visualizar la documentación técnica en formato HTML ejecutando:

```bash
npm run doc
```

La documentación generada se encontrará en la carpeta `/docs`. Además en el repositorio se incluye la versión de ***GithubPages*** para visualizar dicha documentación.

## 📂 Estructura

```text
├── src/
│   ├── database/    # Gestión de persistencia
│   ├── interfaces/  # Contratos de datos y esquemas de la db
│   ├── managers/    # Lógica de gestión
│   ├── models/      # Clases de objetos del multiverso
│   ├── types/       # Enums y tipos personalizados
│   ├── demo/        # Script de prueba
│   ├── ui/          # Interfaz de usuario
│   └── index.ts     # Programa principal
├── tests/           # Suite de pruebas
└── database.json    # Archivo de datos persistentes
...
```