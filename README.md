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

Aquí tienes el contenido para tu `README.md` optimizado para obtener la máxima nota. Está diseñado para resaltar la **calidad técnica**, los **patrones de diseño** y el **rigor en el testing**.

Copia y pega este contenido en tu archivo `README.md`:

-----

# 🌌 Multiverse Data Manager

## 📝 Descripción del Proyecto


## 🚀 Instalación y Ejecución

### Requisitos previos

### Pasos

## 🏗️ Arquitectura

El proyecto se ha desarrollado con el objetivo de cumplir los principios SOLID y algún patron de diseño para
aplicar los conocimientos de estas últimas semanas de clase, facilitar el mantenimiento y escalabilidad:

- ***Modelos (`/src/models`)***: Definiciones de clases que definen los objetos a incluir en el gestor del multiverso, cumplen los contratos que se definen en las interfaces de ***(`/src/types`)***

- ***Gestión (`/src/managers`)***: Desarrollo de los gestores concretos para cada modelo mencionado previamente, que extienden la clase abstracta ***Gestionmanager.ts*** para que solo se implementen de forma específica los métodos necesarios.

- Patrón ***Singleton***: se usa en (`/src/database/DataManager`) y en (`/src/managers/MultiverseManager`), para asegurar que solamente hay una instancia del manager que engloba las instancias de los managers concretos
 para centralizar el control de las colecciones.


3.  ***Persistencia (`/src/database`)***: Gestión usando **Lowdb**, guarda correctamente los datos de memoria en el archivo `database.json`.

4.  ***Interfaz (`/src/ui`)***: Interfaz de línea de comandos que usa ***Promts*** para proporcionar menùs y submenús para todas las opciones del gestor.

## 🧪 Testing y Calidad del Código

Se han llevado a cabo los tests necesarios para probar cada aspecto del código desarrollado con la herramiena ***Vitest***.

  * **Tests Unitarios**: comprobacins de la lógica de cada clase y modelo.
  * **Tests de Integración**: pruebas de flujo completo entre los managers,memoria y el JSON.
  * **Mocks**: Uso de `vi.mock` y `vi.spyOn` para aislar componentes y poder comprobar casos como la inicialización de bases de dato vacía o inválida

También mediante la herramienta ***Coverage*** con el motor **v8**, se ha hecho un cubrimiento bastante completo del código desarrollado

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
│   ├── ui/          # Interfaz de usuario
│   └── index.ts     # Programa principal
├── tests/           # Suite de pruebas
└── database.json    # Archivo de datos persistentes
...
```