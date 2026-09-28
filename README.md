# Página

Proyecto con frontend y backend separados.

- **frontend/** — React 19 + Vite 8 (JavaScript)
- **backend/** — Express 5 + TypeScript 5

## Requisitos

Node.js >= 22.12 (recomendado: la última LTS)

## Puesta en marcha

Clona y entra a la carpeta del proyecto. Cada paquete se instala por separado, así que
necesitas **dos terminales**.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

Queda en `http://localhost:3000`. Con `npm run dev` se reinicia solo al guardar cambios.

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Queda en `http://localhost:5173` y abre el navegador automáticamente.

La portada lista las secciones. Entrá a `/pulido-de-piso`, `/escaleras-artisticas` o
`/construcciones-civiles-e-industriales` para verlas, y a cualquier sub-página para ver
el detalle de un servicio.

## Estructura

```
.
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx        punto de entrada (envuelve en BrowserRouter)
│       ├── App.jsx         nav + rutas
│       ├── index.css       estilos globales
│       ├── data/
│       │   └── sections.js  TODO EL CONTENIDO DEL SITIO (editalo acá)
│       ├── components/
│       │   ├── Nav.jsx           menú de secciones
│       │   ├── Cards.jsx         tarjetas de sección y de servicio
│       │   ├── Breadcrumbs.jsx   ruta de navegación
│       │   ├── Gallery.jsx       galería con placeholders
│       │   ├── ContactCta.jsx    bloque de contacto
│       │   └── Pending.jsx       marca de contenido pendiente
│       ├── pages/
│       │   ├── Home.jsx          portada
│       │   ├── SectionRoute.jsx  /:section
│       │   ├── ItemRoute.jsx     /:section/:item
│       │   └── NotFound.jsx
│       └── lib/
│           ├── catalog.js  búsquedas y armado de rutas
│           └── api.js      helper de fetch hacia el backend
└── backend/
    ├── tsconfig.json
    └── src/
        ├── index.ts        arranque del servidor
        ├── app.ts          configuración de Express
        └── routes/
            └── health.ts   endpoint de ejemplo
```

## Contenido: dónde se carga todo

**Todo el contenido del sitio está en `frontend/src/data/sections.js`.** No hace falta tocar
ningún componente para cambiar textos o agregar servicios.

### Estructura de una sección

```js
{
  slug: 'pulido-de-piso',     // URL: /slug — sin tildes, sin espacios
  nav: 'Pulido de piso',      // texto del menú
  title: 'Pulido de piso',    // título de la página (H1)
  summary: null,              // bajada de la sección
  pending: false,             // true = muestra "Contenido en preparación"
  items: [ /* servicios */ ],
}
```

### Estructura de un servicio

```js
{
  slug: 'pulido-y-plastificado',  // URL: /:section/slug
  title: 'Pulido y plastificado',  // H1 de la página
  summary: null,                   // bajada
  body: [null, null],              // párrafos de descripción
  includes: [null, null, null],    // viñetas de "Qué incluye"
  images: [],                      // rutas de fotos, ej: ['/fotos/piso-1.jpg']
}
```

### Regla de los placeholders

`null` y `[]` significan **"esto todavía no está escrito"**. La página lo muestra como un
bloque punteado con el texto "pendiente", así se ve de un vistazo qué falta. Reemplazá
`null` por el texto y el bloque desaparece solo. No hace falta borrar los placeholders.

Para agregar un servicio nuevo, copiá un bloque `items` existente y cambiá `slug` y `title`.
El nav, los enlaces y el 404 se actualizan solos.

### Contacto

En `site.contact`, dentro del mismo archivo:

```js
contact: {
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
}
```

Mientras estén vacíos el bloque muestra "Datos de contacto pendientes". Al cargar el
teléfono aparecen los links `tel:` y de WhatsApp automáticamente.

## Rutas

| Ruta                  | Qué muestra                                        |
| --------------------- | -------------------------------------------------- |
| `/`                   | Portada con las secciones                          |
| `/:section`           | Sección con la grilla de sus servicios             |
| `/:section/:item`     | Servicio: descripción, qué incluye, galería, CTA  |
| cualquier otra        | 404 con el listado de secciones                    |

## Secciones actuales

| Sección                                | Ruta                                    | Servicios                                                              |
| -------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| Pulido de piso                         | `/pulido-de-piso`                       | Pulido y plastificado · Reparaciones · Pulido e hidrolaqueado · Colocación de zócalos |
| Escaleras artísticas                    | `/escaleras-artisticas`                 | Barandas · Sin barandas · Pasamanos · Nuevos y restauraciones         |
| Construcciones civiles e industriales  | `/construcciones-civiles-e-industriales` | Marcada como `pending: true`                                        |

Los slugs van sin tildes a propósito; los textos visibles sí las llevan.



## API

Base: `http://localhost:3000`

| Método | Ruta        | Descripción                 |
| ------ | ----------- | --------------------------- |
| GET    | `/api/health` | Comprobación de estado    |

Respuesta:

```json
{ "status": "ok", "message": "API funcionando", "uptime": 7.19 }
```

Cualquier ruta desconocida devuelve `404` con `{ "error": "Not found" }`.

## Configuración

Copia los archivos de ejemplo si necesitas cambiar algo:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

| Variable         | Dónde      | Por defecto                 | Descripción              |
| ---------------- | ---------- | --------------------------- | ------------------------ |
| `PORT`           | backend    | `3000`                      | Puerto del servidor      |
| `CORS_ORIGIN`    | backend    | `http://localhost:5173`     | Orígenes permitidos      |
| `VITE_API_URL`   | frontend   | `http://localhost:3000`     | Base URL de la API       |

## Scripts

Iguales en ambos paquetes:

| Script         | Qué hace                                  |
| -------------- | ----------------------------------------- |
| `npm run dev`  | Servidor de desarrollo con recarga        |
| `npm run build` | Compila para producción                  |
| `npm start`    | Ejecuta la compilación (solo backend)     |
| `npm run typecheck` | Verifica tipos sin emitir (solo backend) |

En el frontend, `npm run build` genera `frontend/dist/`. En el backend genera `backend/dist/`
con `npm start`.

## Añadir un endpoint

1. Crea el archivo en `backend/src/routes/`, por ejemplo `users.ts`:

```ts
import { Router } from 'express'

export const usersRouter = Router()

usersRouter.get('/', (_req, res) => {
  res.json([])
})
```

2. Móntalo en `backend/src/app.ts`:

```ts
import { usersRouter } from './routes/users.js'
// ...
app.use('/api/users', usersRouter)
```

3. Llámalo desde `frontend/src/lib/api.js`:

```js
const users = await api('/api/users')
```

## Notas

- `backend/package.json` tiene `"type": "module"` y TypeScript compila con
  `module: NodeNext`, por eso los imports internos llevan extensión `.js` aunque el
  archivo fuente sea `.ts`.
- El backend no lee `.env` automáticamente. Si necesitas variables de entorno reales,
  instala `dotenv` y llama a `dotenv/config()` al inicio de `src/index.ts`.
