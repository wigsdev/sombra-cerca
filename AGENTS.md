# AGENTS.md · Guía Operativa para Agentes en Sombra Cerca

Este archivo define las reglas técnicas, arquitectónicas y de flujo de trabajo que cualquier agente o colaborador debe seguir estrictamente al trabajar en **Sombra Cerca**.

---

## 1. Contexto y Fuentes de Verdad

**Sombra Cerca** es una aplicación web frontend multipágina (atlas interactivo de refugios urbanos y confort peatonal) construida con **Astro (7.3+)**, **Tailwind CSS 4.3**, **Vanilla JavaScript** y **pnpm**.

Antes de implementar funcionalidades, modificar estilos o alterar el modelo de datos, consulta la documentación del proyecto en `docs/`:

- `docs/proyecto-individual-sombra-cerca.md` — Especificación oficial, requerimientos (`RF-01` a `RF-09`) y rúbrica de evaluación (20 pts).
- `docs/architecture.md` — Arquitectura SSG + scripts cliente, contrato de `src/data/espacios.js` y persistencia en `localStorage`.
- `docs/design.md` — Sistema de diseño, paleta WCAG AA/AAA, componentes atómicos y layouts responsivos.
- `docs/backlog.md` — Historias de usuario, criterios de aceptación Gherkin y Definition of Done (DoD).
- `docs/workflow.md` — Estructura de carpetas, estándares de desarrollo y despliegue.
- `docs/test-plan.md` — Matriz de pruebas de aceptación y checklist anti-penalización.

---

## 2. Restricciones Técnicas Estrictas

- **Gestor de paquetes exclusivo:** Usa únicamente `pnpm`. Está prohibido generar o versionar `package-lock.json` o `yarn.lock`.
- **Sin frameworks adicionales:** No instales React, Vue, Svelte ni librerías pesadas de estado salvo autorización explícita del usuario. Toda interactividad cliente debe resolverse con Astro + JavaScript modular (`src/scripts/`).
- **Arquitectura multipágina real:** Implementa las rutas públicas obligatorias (`/`, `/espacios/`, `/espacios/[slug]/`, `/favoritos/`) y una página `404` personalizada para slugs inexistentes. No entregues una plantilla sin personalización ni una sola página larga que simule rutas.
- **Datos centralizados e íntegros:**
  - La única fuente de datos es `src/data/espacios.js` (mínimo 12 registros con `id` y `slug` únicos, distribuidos en al menos 3 categorías).
  - Expón funciones reutilizables para buscar por `slug`, filtrar espacios y obtener destacados.
  - **Regla de `null` vs `false`:** Usa `null` cuando no exista información verificada y muéstralo siempre en UI como **“Sin información”**. Nunca reemplaces desconocido por `false`.
  - No dupliques fichas manualmente en distintas páginas, no presentes datos demostrativos como mediciones oficiales ni afirmes que un lugar es accesible o seguro sin evidencia.
- **Imágenes válidas:** Incluye mínimo 1 imagen por espacio (propias o con licencia adecuada). No se aceptan imágenes rotas.
- **Reglas funcionales críticas:**
  - Ningún botón, enlace, filtro o control visual puede quedar inerte.
  - Los filtros del explorador (`RF-02`) deben ser combinables entre sí (tipo + sombra + asientos + búsqueda en tiempo real) e incluir acción de limpieza y estado sin coincidencias.
  - El comparador (`RF-05`) debe admitir hasta 3 espacios, bloquear una cuarta selección y explicar el límite.
- **Persistencia defensiva:** Todo acceso a `localStorage` (favoritos y comparador) debe estar protegido contra almacenamiento vacío, bloqueado o JSON corrupto sin arrojar excepciones en consola.
- **Identidad visual (`RF-09`):** Evita el aspecto de *dashboard* administrativo genérico; prioriza lectura rápida, jerarquía visual y fotografías.

---

## 3. Desarrollo, Comandos y Verificación

### Servidor de desarrollo
Al iniciar el servidor de desarrollo, usa siempre el modo en segundo plano de Astro:

```bash
pnpm astro dev --background
```

Administra el servidor en segundo plano con:

```bash
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

### Comandos principales

```bash
pnpm install    # Instalar dependencias respetando pnpm-lock.yaml
pnpm dev        # Servidor de desarrollo local
pnpm test       # Pruebas unitarias con Vitest (lógica de datos, filtros, storage y comparador)
pnpm build      # Compilación de producción en dist/
pnpm preview    # Previsualización local de la compilación de producción
```

### Flujo de trabajo colaborativo (Pair-Programming en `main`)
El flujo operativo detallado vive en `docs/workflow.md`. Al resolver cada issue o bloque:
1. **Rama única:** Se trabaja directamente en `main` (sin ramas intermedias ni PRs) con entregas pequeñas y verificadas.
2. **Rol del agente al iniciar una issue:** Propón los archivos a crear/modificar (componentes, layouts, páginas, scripts o tests) y sugiere el código necesario. **No sobrescribas ni implementes los archivos de la issue sin autorización explícita si el usuario indicó que los implementará él mismo.**
3. **Verificación tras implementación del usuario:** Revisa el código implementado contra `docs/`, ejecuta `pnpm test` y `pnpm build` (si aplica) y reporta cualquier ajuste necesario.
4. **Prueba visual del usuario:** Espera a que el usuario pruebe la interfaz (escritorio `1440 px`, móvil `375 px`, consola sin errores) y dé el visto bueno.
5. **Commits atómicos por afinidad:** Tras el visto bueno, agrupa los archivos modificados/creados por afinidad lógica y propón los comandos `git add` + `git commit` siguiendo Conventional Commits v1.0.0.
6. **Automatización de calidad:** Mantener operativos **Vitest** (tests de lógica pura), **Husky** (`pre-commit`: `pnpm test`, `pre-push`: `pnpm build`) y **GitHub Actions CI** (`.github/workflows/ci.yml`).
7. **Regla *Zero Gold-Plating*:** No implementar desafíos opcionales (Sección 10) hasta completar y validar `v1.0.0` con el 100% de los requerimientos obligatorios.

### Validación obligatoria antes de finalizar una tarea
1. Ejecutar `pnpm test` y `pnpm build`, verificando código de salida `0` sin errores ni warnings rotos.
2. Confirmar reproducibilidad limpia (`pnpm install && pnpm dev` sin pasos manuales adicionales) y verificar que no existan imágenes rotas ni rutas inexistentes sin página `404` diseñada.
3. Verificar diseño responsive (1 columna en móvil `375 px`, 2–3 columnas en escritorio `1440 px`) y ausencia de desbordamiento horizontal (`overflow-x`).
4. Confirmar cumplimiento de accesibilidad básica: HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), textos `alt` descriptivos, contraste legible, foco visible por teclado (`focus-visible`) y nunca comunicar estados únicamente mediante color.

---

## 4. Convenciones de Commits (Conventional Commits 1.0.0)

Todos los commits deben adherirse estrictamente a la especificación [Conventional Commits v1.0.0](https://www.conventionalcommits.org/es/v1.0.0/).

### Formato obligatorio

```text
<type>[optional scope][optional !]: <description>

[optional body]

[optional footer(s)]
```

### Tipos permitidos
- `feat`: Nueva funcionalidad para el usuario (corresponde a `MINOR` en SemVer).
- `fix`: Corrección de un error o comportamiento defectuoso (corresponde a `PATCH` en SemVer).
- `docs`: Cambios exclusivos en documentación (`README.md`, `AGENTS.md`, `docs/*`).
- `style`: Cambios de formato o estilos visuales que no alteran la lógica de negocio.
- `refactor`: Reestructuración de código que no corrige un bug ni agrega una funcionalidad.
- `perf`: Mejora de rendimiento sin cambiar comportamiento funcional.
- `test`: Incorporación o ajuste de pruebas y validaciones.
- `build`: Cambios en el sistema de compilación o dependencias externas (`package.json`, `pnpm-lock.yaml`, `astro.config.mjs`).
- `ci`: Cambios en archivos o pipelines de integración/despliegue continuo.
- `chore`: Tareas de mantenimiento general que no modifican código de producción ni pruebas.
- `revert`: Reversión de un commit previo.

### Scopes recomendados
`data`, `home`, `espacios`, `filtros`, `detalle`, `favoritos`, `comparador`, `ui`, `a11y`, `routing`, `storage`, `docs`, `config`.

### Reglas de redacción
- Usa modo imperativo en minúsculas y sin punto final en `<description>` (máximo 72 caracteres).
- Haz commits atómicos: un cambio lógico cohesivo por commit.
- Marca cambios incompatibles (*Breaking Changes*) añadiendo `!` tras el tipo/scope y/o un footer `BREAKING CHANGE: <explicación>`.

### Ejemplos válidos

```text
feat(filtros): implementar filtrado combinado por tipo, sombra y asientos
fix(storage): manejar json corrupto en localStorage al cargar favoritos
feat(data)!: normalizar esquema de espacios y exigir slug en kebab-case
docs(agents): definir reglas de conventional commits y semver 2.0
build(config): integrar tailwind css 4.3 en astro.config.mjs
```

---

## 5. Versionado Semántico (SemVer 2.0.0)

El proyecto sigue estrictamente [Semantic Versioning 2.0.0](https://semver.org/lang/es/) bajo el formato `MAJOR.MINOR.PATCH` (con soporte opcional para pre-lanzamientos como `1.0.0-rc.1`).

### Reglas de incremento y mapeo con Conventional Commits
- **`MAJOR` (`X.0.0`)**: Cambios incompatibles en el contrato de datos (`src/data/espacios.js`), rutas públicas o estructura de persistencia en `localStorage` (`BREAKING CHANGE` o `!`).
- **`MINOR` (`0.X.0`)**: Nuevas funcionalidades retrocompatibles (`feat:`), como la incorporación de un requerimiento funcional (`RF-01` a `RF-05`) o un desafío adicional.
- **`PATCH` (`0.0.X`)**: Correcciones de errores retrocompatibles (`fix:`), ajustes de accesibilidad, estilos o mejoras internas sin nueva API.

### Ciclo de versiones del proyecto
- **`0.y.z` (Desarrollo inicial):** Fase de construcción iterativa antes de completar todos los requerimientos obligatorios.
- **`1.0.0` (Entrega principal):** Primera versión estable que cumple el 100% de los requerimientos obligatorios (`RF-01` a `RF-09`), pruebas de aceptación de la Sección 9 y compilación limpia en producción.
- **`1.x.y` (Evolución y desafíos opcionales):** Mejoras posteriores, correcciones post-revisión o desafíos adicionales de la Sección 10.

### Gestión de releases
- Mantén sincronizado el campo `"version"` en `package.json` con la etiqueta Git correspondiente (`vX.Y.Z`, ej. `v0.1.0`, `v1.0.0`).
- Crea un commit dedicado al corte de versión siguiendo el formato `chore(release): vX.Y.Z`.

---

## 6. Documentación Oficial de Astro

Documentación completa: https://docs.astro.build

Consulta estas guías antes de trabajar en tareas relacionadas:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
