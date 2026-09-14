# Dúo Gym
Aplicación web independiente, en español, para un plan inicial de 30 días y dos perfiles. No requiere cuentas ni paquetes de software para usarla.

## Archivos
Esta carpeta es autónoma. No importa recursos de las otras páginas del repositorio. No modifica sus archivos, menús ni datos.

## Publicación
La página todavía requiere habilitar GitHub Pages en el repositorio si no está activo:
Settings → Pages → Deploy from a branch → main → / (root) → Save.
Después de que GitHub complete la publicación, esta aplicación queda en la ruta /duo-gym/.

## Datos
El código público no contiene nombres reales, medidas personales ni registros. El usuario configura sus datos en el navegador. También se permite una configuración inicial mediante un fragmento de URL que no se envía al servidor; se retira del enlace en cuanto se lee. localStorage utiliza solo la clave duo-gym-local-v1. No hay cuentas, API de salud, analítica ni sincronización entre dispositivos. Los registros de ambos perfiles son independientes dentro del mismo navegador; quien utilice ese navegador puede verlos.

En Ajustes hay exportación e importación de una copia JSON. Importar reemplaza ambos perfiles tras confirmación. La aplicación no borra ni modifica claves de otras páginas. El modo privado o borrar datos del navegador puede eliminar los registros. Conviene exportar una copia antes de cambios de dispositivo.

El service worker se limita a esta carpeta y almacena únicamente los archivos de la aplicación para consulta sin conexión después de una carga completa. No interviene en las otras páginas.

## Plan
Plan general para adultos que comienzan: tres sesiones de fuerza por semana, cardio gradual, recuperación y cuatro semanas de progresión. Los ejercicios de base pueden ser comunes; cargas, registros y recomendaciones se calculan por persona. No se promete una transformación corporal en un mes. El plan requiere adaptación ante dolor, lesiones, embarazo, condiciones médicas o experiencia distinta.

Las referencias y los límites de las orientaciones sobre nutrición y suplementos están en la sección Nutrición. Las estimaciones de proteína usan el peso inicial editable, no calculan calorías ni diagnostican composición corporal. No hay marcas patrocinadas.

## Validación
Se verifica la sintaxis y la lógica de fechas, sesiones, separación de perfiles, importación de datos, recomendaciones y privacidad. La comprobación visual en navegadores y la prueba del modo sin conexión requieren un navegador y una publicación HTTPS; no se presentan como realizadas cuando aún no lo están.
