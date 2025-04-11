# Sistema de Gestión Académica - Laravel & React (Inertia.js)

Aplicación web para la gestión de estudiantes, asignaturas, matrículas y calificaciones en un entorno universitario, construida con Laravel como backend y React (a través de Inertia.js) como frontend.

## Tabla de Contenidos

-   [Descripción](#descripción)
-   [Características](#características)
-   [Stack Tecnológico](#stack-tecnológico)
-   [Prerrequisitos](#prerrequisitos)
-   [Instalación Local](#instalación-local)
-   [Uso](#uso)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Documentación Técnica Adicional](#documentación-técnica-adicional)
-   [Contribuciones](#contribuciones)
-   [Licencia](#licencia)

## Descripción

Este proyecto tiene como objetivo proporcionar una herramienta centralizada y eficiente para administrar la información académica fundamental. Permite al personal autorizado gestionar ciclos de vida de estudiantes, el catálogo de asignaturas, las inscripciones anuales y el registro de calificaciones.

## Características Implementadas

**Nivel 1 (MVP):**

*   Registro de nuevos estudiantes.
*   Consulta de lista de estudiantes.
*   Registro de nuevas asignaturas.
*   Consulta de lista de asignaturas.
*   Matriculación de un estudiante en una asignatura para un año académico.
*   Consulta de lista de matrículas.
*   Registro de la calificación final para una matrícula.

**Nivel 2:**

*   Modificación de datos de estudiantes existentes.
*   Modificación de datos de asignaturas existentes.
*   Desmatriculación de un estudiante (eliminar matrícula y su nota asociada).
*   Modificación de una calificación existente.
*   Generación de reportes básicos (ej. estudiantes por asignatura, asignaturas por estudiante).

**Nivel 3:**

*   Eliminación de un estudiante (con sus matrículas y notas asociadas).
*   Eliminación de una asignatura (con sus matrículas y notas asociadas).
*   Eliminación de una calificación individual (sin eliminar la matrícula).

**Otras Características:**

*   Autenticación de usuarios (Login, Registro, Logout) proporcionada por Laravel Breeze.
*   Interfaz de usuario responsiva construida con React y Tailwind CSS.
*   Navegación fluida tipo SPA gracias a Inertia.js.
*   Validación robusta de datos en el backend (Form Requests).

## Stack Tecnológico

*   **Backend:** PHP 8.2+, Laravel 11.x
*   **Frontend:** React 18.x, Inertia.js, Vite
*   **Estilos:** Tailwind CSS 3.x
*   **Base de Datos:** PostgreSQL 14+ / MySQL 8.0+ (Configurable vía `.env`)
*   **Servidor Web (Desarrollo):** `php artisan serve` / `npm run dev` (Vite)
*   **Gestor de Dependencias PHP:** Composer
*   **Gestor de Paquetes JS:** npm 

## Prerrequisitos

Asegúrate de tener instalados los siguientes componentes en tu sistema local:

*   PHP (versión compatible con el proyecto, ej. 8.2+)
*   Composer v2+
*   Node.js (versión LTS recomendada, ej. v18 o v20+) y npm (o Yarn)
*   Un servidor de base de datos: PostgreSQL o MySQL.
*   Git

## Instalación Local

Sigue estos pasos para configurar el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Syndrast/proyecto-final-web.git
    cd proyecto-final-web
    ```

2.  **Instalar dependencias PHP:**
    ```bash
    composer install
    ```

3.  **Configurar el entorno:**
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Configurar la Conexión a la Base de Datos en `.env`:**
    *   Abre el archivo `.env` que acabas de crear.
    *   Localiza las variables `DB_*`.
    *   Establece `DB_CONNECTION` a `pgsql` o `mysql` según la base de datos que vayas a usar localmente.
    *   Establece `DB_HOST` a `127.0.0.1` (o `localhost`).
    *   Establece `DB_PORT` al puerto de tu servidor de base de datos local (por defecto `5432` para PostgreSQL, `3306` para MySQL).
    *   Define un nombre para tu base de datos local en `DB_DATABASE` (ej. `gestion_academica_db`).
    *   Define un nombre de usuario y contraseña para la base de datos local en `DB_USERNAME` y `DB_PASSWORD`.

5.  **Crear la Base de Datos Localmente:**
    *   Asegúrate de que tu servidor de base de datos (PostgreSQL o MySQL) esté corriendo localmente.
    *   **Crea una base de datos vacía** con el mismo nombre que especificaste en `DB_DATABASE` en el archivo `.env`.
    *   **Crea un usuario de base de datos** con el nombre de usuario y contraseña que especificaste en `DB_USERNAME` y `DB_PASSWORD`.
    *   **Otorga todos los privilegios** necesarios a ese usuario sobre la base de datos recién creada.
        *   *Ejemplo para PostgreSQL (usando `psql`):*
            ```sql
            -- Conectado como superusuario (ej. postgres)
            CREATE DATABASE gestion_academica_db;
            CREATE USER mi_usuario WITH ENCRYPTED PASSWORD 'mi_password_segura';
            GRANT ALL PRIVILEGES ON DATABASE gestion_academica_db TO mi_usuario;
            ```
        *   *Ejemplo para MySQL (usando cliente `mysql`):*
            ```sql
            -- Conectado como root o usuario con privilegios
            CREATE DATABASE gestion_academica_db;
            CREATE USER 'mi_usuario'@'localhost' IDENTIFIED BY 'mi_password_segura';
            GRANT ALL PRIVILEGES ON gestion_academica_db.* TO 'mi_usuario'@'localhost';
            FLUSH PRIVILEGES;
            ```
        *Reemplaza `gestion_academica_db`, `mi_usuario` y `mi_password_segura` con tus valores reales.*

6.  **Instalar dependencias JavaScript:**
    ```bash
    npm install
    ```

7.  **Ejecutar las migraciones:** Esto creará la estructura de tablas en tu base de datos.
    ```bash
    php artisan migrate
    ```

8.  **Compilar Assets (para producción):** Si no vas a usar `npm run dev`.
    ```bash
    npm run build
    ```

## Uso

1.  **Iniciar el Servidor de Desarrollo Laravel:**
    ```bash
    php artisan serve
    ```

2.  **Iniciar el Servidor de Desarrollo Vite (en otra terminal):**
    ```bash
    npm run dev
    ```

3.  Abre tu navegador y ve a la URL proporcionada por `php artisan serve` (normalmente `http://127.0.0.1:8000`).

4.  **Registrate en la pagina:**

## Documentación Técnica Adicional

Para una descripción más detallada de la arquitectura, configuración, flujo de datos y decisiones de diseño, consulta el archivo "Documentación Técnica.pdf"