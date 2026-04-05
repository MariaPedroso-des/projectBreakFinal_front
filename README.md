>[!IMPORTANT]
>
>Frontend - App de rutas y pernocta pet friendly

# QUÉ ES EL PROYECTO

Aplicación frontend desarrollada con React y Vite para visualizar, filtrar, publicar y editar rutas de senderismo y ubicaciones de pernocta camper orientadas a usuarios que viajan con su perrete.

Esta parte del proyecto consume la API del backend y se encarga de toda la interfaz de usuario, la navegación entre páginas, los formularios y la representación de los datos.

## QUÉ TECNOLOGÍAS UTILIZA

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- CSS Modules

## CÓMO SE INSTALA

1. Clonar el repositorio de [GitHub](https://github.com/MariaPedroso-des/projectBreakFinal_front)
2. Instalar dependencias

```bash
npm install
```

## CÓMO SE EJECUTA

  - `npm run dev` -> inicia la aplicación en desarrollo
  - `npm run build` -> genera la build de producción
  - `npm run preview` -> previsualiza la build de producción
  - `npm run lint` -> ejecuta la revisión con ESLint

## VARIABLES DE ENTORNO QUE NECESITA

  Crear un archivo con las variables de entorno necesarias:

  ```env
      VITE_APP_API_URL=
  ```
  Puedes utilizar el .env.example como referencia :)

## ESTRUCTURA DEL PROYECTO

```bash
├── public
├── src
│   ├── components
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── HikingsFilters.jsx
│   │   ├── OvernightsFilters.jsx
│   │   └── ...
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── HikingsPage.jsx
│   │   ├── HikingDetailPage.jsx
│   │   ├── HikingFormPage.jsx
│   │   ├── OvernightsPage.jsx
│   │   ├── OvernightDetailPage.jsx
│   │   ├── OvernightFormPage.jsx
│   │   └── FormChoicePage.jsx
│   ├── services
│   │   ├── hikingsService.js
│   │   ├── hikingOptionsService.js
│   │   ├── overnightsService.js
│   │   └── overnightOptionsService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## CARACTERÍSTICAS PRINCIPALES

  - Navegación entre páginas con React Router DOM
  - Home con accesos directos a rutas, pernoctas y publicación
  - Listado de rutas con filtros
  - Listado de pernoctas con filtros
  - Vista detalle de rutas
  - Vista detalle de pernoctas
  - Formularios para crear nuevas rutas
  - Formularios para crear nuevas pernoctas
  - Edición de rutas y pernoctas existentes
  - Eliminación de rutas y pernoctas
  - Consumo de datos desde la API del backend
  - Organización del código en pages, components y services
  - Estilos globales y modulares para mantener una interfaz coherente

## RUTAS PRINCIPALES DEL FRONT

/                     -> Home
/hikings              -> listado de rutas
/hikings/:id          -> detalle de una ruta
/hikings/new          -> crear ruta
/hikings/edit/:id     -> editar ruta
/overnights           -> listado de pernoctas
/overnights/:id       -> detalle de una pernocta
/overnights/new       -> crear pernocta
/overnights/edit/:id  -> editar pernocta
/formchoice           -> pantalla para elegir qué publicar

## CÓMO FUNCIONA CON EL BACKEND

El frontend se conecta al backend mediante fetch usando la variable VITE_APP_API_URL.

Consume endpoints para:

  - obtener listados de rutas y pernoctas
  - obtener el detalle de una ruta o una pernocta
  - crear nuevas entradas
  - editar entradas existentes
  - eliminar entradas
  - cargar opciones de filtros y formularios desde rutas de utilidades

## PARKINGLOT

  - Sistema de usuarios y perfiles
  - Favoritos
  - Valoraciones
  - Subida real de imágenes
  - Mapa navegable
  - Geolocalización
  - Integración más avanzada con Google Maps
  - Filtros avanzados
  - Mejoras de accesibilidad
  - Mejoras visuales y responsive más avanzadas