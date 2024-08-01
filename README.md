# Sistema de Gestión de Candidatos y Personal

## Tabla de Contenidos
- [Visión General](#visión-general)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración y Ejecución](#configuración-y-ejecución)
  - [Requisitos Previos](#requisitos-previos)
  - [Configuración del Backend](#configuración-del-backend)
  - [Configuración del Frontend](#configuración-del-frontend)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Visión General

El Sistema de Gestión de Candidatos y Personal es una aplicación web completa diseñada para optimizar los procesos de reclutamiento y la gestión del personal interno. Esta plataforma ofrece una solución integral para el seguimiento de candidatos a lo largo del proceso de selección, la evaluación de habilidades y la gestión eficiente del personal.

## Características Principales

### Gestión de Candidatos
- Registro de nuevos candidatos
- Pipeline visual del proceso de selección
- Evaluación y calificación de candidatos
- Seguimiento del estado de cada candidato (activo/inactivo)
- Búsqueda avanzada y filtrado de candidatos

### Gestión de Personal
- Registro y gestión de miembros del personal
- Asignación de roles y permisos
- Seguimiento de actividad del personal

### Sistema de Autenticación
- Registro y login de usuarios
- Autenticación con Google
- Manejo de sesiones con JWT

### Dashboard y Análisis
- Visión general de estadísticas clave
- Gráficos y métricas de rendimiento
- Búsqueda rápida de candidatos desde el dashboard

### Formularios y Evaluaciones
- Creación y gestión de formularios personalizados
- Sistema de calificación para diferentes habilidades y competencias

## Tecnologías Utilizadas

### Backend
- **Lenguaje:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MySQL
- **ORM:** Sequelize
- **Autenticación:** Passport.js, JWT
- **Validación:** express-validator
- **Encriptación:** bcrypt
- **Documentación API:** Swagger

### Frontend
- **Framework:** React (con Vite como build tool)
- **Routing:** React Router
- **Gestión de Estado:** Context API
- **Estilos:** SASS
- **Componentes UI:** Material-UI
- **Peticiones HTTP:** Axios
- **Manejo de Cookies:** js-cookie

### Herramientas de Desarrollo
- **Control de Versiones:** Git
- **Testing Backend:** Jest
- **Testing Frontend:** Vitest
- **Linting:** ESLint
- **Formateo de Código:** Prettier

## Estructura del Proyecto

```
proyecto/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Configuración y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- MySQL

### Configuración del Backend

1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:
   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_tu_base_de_datos
   JWT_SECRET=tu_secreto_jwt
   GOOGLE_CLIENT_ID=tu_id_de_cliente_google
   GOOGLE_CLIENT_SECRET=tu_secreto_de_cliente_google
   ```

4. Inicia el servidor:
   ```
   npm start
   ```

   El servidor se iniciará en `http://localhost:5000` por defecto.

### Configuración del Frontend

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura la URL de la API en un archivo `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`.

## Pruebas

### Backend
Ejecuta las pruebas con Jest:
```
npm test
```

### Frontend
Ejecuta las pruebas con Vitest:
```
npm test
```

## Despliegue

### Backend
1. Asegúrate de que todas las variables de entorno estén configuradas correctamente para producción.
2. Construye la aplicación:
   ```
   npm run build
   ```
3. Inicia el servidor en modo producción:
   ```
   npm run start:prod
   ```

### Frontend
1. Construye la aplicación:
   ```
   npm run build
   ```
2. Los archivos de producción estarán en el directorio `dist/`.

## Contribución

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/NuevaCaracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna NuevaCaracteristica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia ISC. Consulta el archivo `LICENSE` para más detalles.
