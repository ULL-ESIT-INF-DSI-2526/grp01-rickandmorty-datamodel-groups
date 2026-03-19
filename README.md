[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/U8NqX9JL)

🟢 1. Preparación (Solo la primera vez)

Para que tu ordenador sepa que las ramas de tus compañeros existen:

git fetch --all
git checkout [s-dev|g-dev|t-dev]  # Ejemplo: git checkout s-dev

🟡 2. Trabajo Diario (Guardar tus avances)

Haz esto cada vez que termines una tarea en tu carpeta:

git add .
git commit -m "Explicación de lo que has hecho"
git push origin [s-dev|g-dev|t-dev] # Ejemplo: git push origin s-dev

🔵 3. Sincronización (Traer lo que otros han hecho)

Si Saray ha metido cambios en main y tú los necesitas:

# 1. Ve a main y bájate lo nuevo
git checkout main
git pull origin main

# 2. Vuelve a tu rama y absorbe esos cambios
git checkout [s-dev|g-dev|t-dev]
git merge main