# Engineering Workflow & Technical Standards · Sombra Cerca

> **Documento:** Flujo de Trabajo Técnico, Estándares de Ingeniería y Guía de Operaciones  
> **Rol asumido:** Tech Lead & DevOps Engineer  
> **Proyecto de Referencia:** [docs/proyecto-individual-sombra-cerca.md](file:///home/wigsdev/GitHub/sombra-cerca/docs/proyecto-individual-sombra-cerca.md)  
> **Stack Obligatorio:** Astro 7.3 · Tailwind CSS 4.3 · pnpm · JavaScript Moderno (ESModules)  
> **Restricciones Críticas:** Prohibición absoluta de `package-lock.json` y `yarn.lock`. Cero frameworks adicionales (React, Vue, Svelte) sin autorización explícita. Compilación limpia obligatoria con `pnpm build`.

---

## 1. Configuración del Entorno y Tooling Obligatorio

### 1.1 Gestor de Paquetes Exclusivo: `pnpm`
Conforme a la Sección 6 y Sección 8 de las especificaciones:
- **Única herramienta autorizada:** `pnpm` (versión 9.x o compatible).
- **Prohibición de bloqueos ajenos:** El repositorio no debe incluir `package-lock.json` (npm) ni `yarn.lock` (Yarn). La presencia de estos archivos penaliza la calificación de entrega.
- **Archivo de bloqueo oficial:** `pnpm-lock.yaml` debe estar debidamente versionado en Git.

### 1.2 Comandos y Scripts Oficiales en `package.json`

| Comando | Acción Ejecutada | Entorno / Uso |
| :--- | :--- | :--- |
| `pnpm install` | Instala las dependencias respetando `pnpm-lock.yaml`. | Inicialización y CI/CD |
| `pnpm dev` | Inicia el servidor de desarrollo local de Astro (puerto por defecto `4321`). | Desarrollo activo local |
| `pnpm build` | Compila el sitio estático optimizado en el directorio `dist/`. | Verificación y producción |
| `pnpm preview` | Levanta un servidor local sirviendo la carpeta compilada `dist/`. | Validación pre-deploy |
| `pnpm test` | Ejecuta la suite de pruebas unitarias con **Vitest** (`vitest run`). | Verificación local, Husky y CI |

---

## 2. Estructura de Proyecto y Separación de Responsabilidades

El repositorio sigue estrictamente la arquitectura recomendada en la Sección 6, aislando lógica, presentación y datos:

```text
sombra-cerca/
├── docs/                             # Documentación de ingeniería y especificaciones
│   ├── proyecto-individual-sombra-cerca.md
│   ├── backlog.md
│   ├── design.md
│   ├── workflow.md
│   ├── architecture.md
│   ├── test-plan.md
│   └── presentation-guide.md
├── public/                           # Activos estáticos públicos (imágenes, favicons)
│   ├── favicon.svg
│   └── images/
│       └── espacios/                 # Fotografías optimizadas de los 12 espacios
│           ├── plaza-armas.webp
│           ├── alameda-incas.webp
│           └── ...
├── src/
│   ├── components/                   # Componentes reutilizables de Astro y UI
│   │   ├── common/
│   │   │   ├── Header.astro          # Navegación semántica global y enlaces activos
│   │   │   └── Footer.astro          # Pie de página institucional y créditos
│   │   ├── espacios/
│   │   │   ├── CardEspacio.astro     # Tarjeta reutilizable con badges y botón detalle
│   │   │   ├── FiltrosPanel.astro    # Controles de búsqueda, tipo, sombra y asientos
│   │   │   ├── BadgeIndicador.astro  # Chip accesible (sombra, asientos, accesibilidad)
│   │   │   └── MatrizServicios.astro # Tabla de indicadores para ficha de detalle
│   │   └── comparador/
│   │       ├── ComparadorBar.astro   # Barra flotante inferior de selección (máx 3)
│   │       └── ComparadorModal.astro # Vista comparativa lado a lado
│   ├── layouts/
│   │   └── Layout.astro              # Estructura HTML5 base con metaetiquetas y SEO
│   ├── pages/
│   │   ├── index.astro               # RF-01: Portada, propuesta de valor y destacados
│   │   ├── espacios/
│   │   │   ├── index.astro           # RF-02: Explorador de espacios con filtros reactivos
│   │   │   └── [slug].astro          # RF-03: Ficha de detalle dinámica por parámetro
│   │   ├── favoritos.astro           # RF-04: Gestión y listado local de favoritos
│   │   └── 404.astro                 # Página personalizada de ruta no encontrada
│   ├── data/
│   │   └── espacios.js               # Fuente centralizada de datos (12+ registros)
│   ├── scripts/                      # Lógica JavaScript en cliente (ESModules)
│   │   ├── storage.js                # Helper defensivo para persistencia en localStorage
│   │   ├── filtros.js                # Lógica reactiva para búsqueda y combinación AND
│   │   └── comparador.js             # Lógica de selección, límite de 3 y comparación
│   └── styles/
│       └── global.css                # Directivas de Tailwind CSS 4.3 y estilos base
├── astro.config.mjs                  # Configuración de Astro 7.3
├── package.json                      # Manifiesto del proyecto y scripts
├── pnpm-lock.yaml                    # Lockfile reproducible oficial
└── README.md                         # Documento de entrega para el docente
```

---

## 3. Flujo de Trabajo Colaborativo, Git y Calidad Continua

### 3.1 Estrategia de Ramas: Desarrollo Directo en `main`
Para maximizar la velocidad de entrega y evitar fricción innecesaria en un proyecto individual, **se trabaja directamente sobre la rama `main`** mediante entregas incrementales pequeñas, siempre respaldadas por pruebas automatizadas y compilación limpia.

### 3.2 Ciclo Operativo por Issue (Pair-Programming Guiado)
Cada issue o bloque funcional sigue estrictamente este ciclo de 5 pasos:

1. **Propuesta técnica (Agente):** Sugiere los archivos a crear o modificar (componentes, layouts, páginas, scripts o tests) junto con el código propuesto alineado a `docs/`.
2. **Implementación (Desarrollador):** El desarrollador implementa los cambios directamente en el workspace.
3. **Verificación técnica (Agente):** El agente revisa los archivos implementados frente a la consigna (`RF-01` a `RF-09`, regla `null` → *“Sin información”*, accesibilidad) y ejecuta `pnpm test` y/o `pnpm build`.
4. **Prueba visual en interfaz (Desarrollador):** Validación rápida (30 segundos) en navegador:
   - Escritorio (`1440 px`) y Móvil (`375 px`, cero `overflow-x`).
   - Interacción real de controles y consola del navegador en `0` errores.
5. **Commits atómicos por afinidad (Agente → Desarrollador):** Tras el visto bueno visual, el agente agrupa los archivos creados/modificados por afinidad lógica y propone los comandos `git add` + `git commit` siguiendo **Conventional Commits v1.0.0**.

### 3.3 Convención de Commits (Conventional Commits v1.0.0) y SemVer 2.0.0
Ver reglas completas y ejemplos en [AGENTS.md](file:///home/wigsdev/GitHub/sombra-cerca/AGENTS.md):
- Formato obligatorio: `<type>[optional scope][optional !]: <description>`
- Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Versionado semántico (`SemVer 2.0.0`): `0.y.z` durante construcción inicial → `1.0.0` al completar el 100% de requerimientos obligatorios → `1.x.y` para desafíos opcionales.

---

## 4. Automatización de Calidad: Vitest, Husky y GitHub Actions CI

### 4.1 Pruebas Unitarias Quirúrgicas con Vitest
Para mantener velocidad de ejecución y proteger los puntos críticos de la rúbrica, Vitest valida la lógica pura del proyecto (`tests/*.test.js`):
- Integridad de `src/data/espacios.js` (≥ 12 espacios, `id` y `slug` únicos, ≥ 3 categorías, rutas de imagen definidas, respeto a `null`).
- Funciones de consulta y filtrado (`filterSpaces` con búsqueda sin acentos y lógica combinatoria AND, `findSpaceBySlug`, `getFeaturedSpaces`).
- Resiliencia de `src/scripts/storage.js` (`localStorage` vacío, bloqueado o JSON corrupto).
- Lógica del comparador (`src/scripts/comparador.js`, límite estricto de 3 espacios y bloqueo del 4.º).

### 4.2 Git Hooks con Husky (Ultraligero)
- **`.husky/pre-commit`:** Ejecuta `pnpm test` (rápido, `< 1 s`) para garantizar que ningún commit rompa la lógica ni los datos.
- **`.husky/pre-push`:** Ejecuta `pnpm build` para impedir subir compilaciones rotas a `main`.

### 4.3 Integración Continua con GitHub Actions (`.github/workflows/ci.yml`)
En cada `push` a `main` se ejecuta automáticamente el pipeline CI:
1. `pnpm install --frozen-lockfile` (valida reproducibilidad exacta del repositorio).
2. `pnpm test` (ejecuta la suite de Vitest).
3. `pnpm build` (verifica compilación de producción sin errores).

---

## 5. Plan de Ejecución Acelerado (6 Bloques · Entrega en 1 Jornada)

> **Regla *Zero Gold-Plating*:** Ningún desafío opcional de la Sección 10 se implementa antes de tener `v1.0.0` funcional, desplegada y validada con las 10 pruebas de aceptación.

| Bloque | Alcance / Issues | Entregable Verificable |
| :--- | :--- | :--- |
| **Bloque 0** | Setup: Tailwind CSS 4.3, Vitest, Husky, GitHub Actions CI + `src/data/espacios.js` (12 espacios) + 12 imágenes locales en `public/images/espacios/` | CI verde, tests de datos en verde, cero imágenes rotas |
| **Bloque 1** | `Layout.astro`, `Header`, `Footer`, `404.astro` y Portada `/` (`RF-01`) + conexión temprana de despliegue continuo | Sitio navegable desplegado en URL pública |
| **Bloque 2** | `CardEspacio`, `BadgeIndicador`, Explorador `/espacios/` + búsqueda en tiempo real y filtros combinados (`RF-02`) | Filtrado AND + contador + limpiar filtros + estado vacío |
| **Bloque 3** | Ficha dinámica `/espacios/[slug]/` + matriz de servicios con regla `null` → *“Sin información”* (`RF-03`) | Rutas dinámicas SSG + 404 en slug inexistente |
| **Bloque 4** | `storage.js` + Favoritos `/favoritos/` (`RF-04`) + Comparador máx. 3 espacios (`RF-05`) | Persistencia tras F5 + bloqueo del 4.º espacio con aviso |
| **Bloque 5** | Auditoría responsive (`375 px` / `1440 px`), accesibilidad teclado, `README.md`, capturas y corte `v1.0.0` | Proyecto listo para entrega y sustentación (20/20) |

---

## 6. Estrategia de Despliegue Continuo (CD)

El proyecto se conecta desde el **Bloque 1** a **Cloudflare Pages**, **Vercel** o **Netlify** apuntando directamente a la rama `main`:
- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Package manager:** `pnpm` (con `pnpm-lock.yaml`)
- Las rutas dinámicas de Astro SSG generan HTML estático en `dist/espacios/[slug]/index.html`, garantizando carga inmediata y cero errores de enrutamiento.

---

## 7. Protocolo de Auditoría y Entrega Final para el Docente

Conforme a las Secciones 7 y 8 de [docs/proyecto-individual-sombra-cerca.md](file:///home/wigsdev/GitHub/sombra-cerca/docs/proyecto-individual-sombra-cerca.md):

1. **Clonado Limpio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd sombra-cerca
   pnpm install
   pnpm dev
   ```
   *Criterio:* El proyecto debe iniciar en `http://localhost:4321` **sin ningún paso manual intermedio**.
2. **README.md de Entrega:** Descripción, enlace público desplegado, tecnologías, instalación, comandos y decisiones técnicas.
3. **Capturas de Pantalla:** Almacenadas en `docs/screenshots/` según [docs/presentation-guide.md](file:///home/wigsdev/GitHub/sombra-cerca/docs/presentation-guide.md).
