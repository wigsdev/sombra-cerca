# Design System & UI/UX Specification · Sombra Cerca

> **Documento:** Especificación de Diseño de Interfaz y Experiencia de Usuario  
> **Rol asumido:** Lead UI/UX Designer & Design System Architect  
> **Proyecto de Referencia:** [docs/proyecto-individual-sombra-cerca.md](file:///home/wigsdev/GitHub/sombra-cerca/docs/proyecto-individual-sombra-cerca.md)  
> **Requerimientos Centrales:** RF-06 (Responsive), RF-07 (Navegación y Estados), RF-08 (Accesibilidad), RF-09 (Identidad Visual)  
> **Framework:** Tailwind CSS 4.3 en Astro 7.3

---

## 1. Fundamentos de Identidad Visual y Concepto de Diseño

### 1.1 Metáfora Visual: El Oásis Urbano
**Sombra Cerca** no es un panel administrativo ni un listado técnico gris. Su estética visual se inspira en el **alivio térmico y el respiro visual** que experimenta un peatón al encontrar una arboleda frondosa o una galería techada en medio de una tarde soleada en la ciudad de Cajamarca:
- **Copa vegetal y follaje:** Verdes profundos y tonos salvia que comunican calma, frescura y naturaleza.
- **Sombra y penumbra confortable:** Tonos pizarra y carbón vegetal para fondos de lectura y tipografía de alto contraste.
- **Cantería urbana y luz andina:** Acentos en tonos piedra caliza cálida y destellos ámbar suave que representan la iluminación y la luz solar filtrada.

### 1.2 Paleta de Color y Ratios de Contraste WCAG 2.1 AA/AAA

| Token Semántico | Nombre de Color | Hex / Valor Tailwind | Uso Principal | Ratio vs Fondo (A11y) |
| :--- | :--- | :--- | :--- | :--- |
| `color-primary-900` | Sombra Bosque | `#132E27` | Fondos de navegación, encabezados principales, texto `h1`/`h2` | **14.2:1** sobre blanco (AAA) |
| `color-primary-700` | Follaje Andino | `#1F4E3D` | Botones primarios, enlaces activos, bordes destacados | **9.1:1** sobre blanco (AAA) |
| `color-primary-500` | Verde Salvia | `#387B62` | Indicador de sombra alta, badges positivos | **4.8:1** sobre blanco (AA) |
| `color-accent-amber` | Sol Filtrado | `#D97706` | Sombra media, llamadas a la atención, estrellas de favoritos | **4.9:1** sobre oscuro (AA) |
| `color-accent-terracota`| Teja Urbana | `#C2410C` | Sombra baja, alertas, avisos de límite en comparador | **5.2:1** sobre blanco (AA) |
| `color-neutral-surface` | Piedra Caliza | `#F8FAF8` | Fondo general de la aplicación (`bg-neutral-50`) | Base neutra cálida |
| `color-neutral-card` | Blanco Puro | `#FFFFFF` | Fondo de tarjetas, paneles modales y menús | Elevación limpia |
| `color-neutral-text` | Carbón Urbano | `#1E293B` | Texto de cuerpo principal | **13.8:1** sobre fondo (AAA) |
| `color-neutral-muted` | Neblina Gris | `#64748B` | Textos secundarios, referencias, etiquetas neutrales | **4.7:1** sobre fondo (AA) |

---

## 2. Tipografía y Jerarquía Visual

Utilizamos una fuente sans-serif moderna, geométrica y con alta legibilidad en pantallas exteriores de alta luminosidad (ej. *Inter* o *Plus Jakarta Sans*):

| Nivel Semántico | Clase Tailwind | Tamaño / Interlineado | Peso | Caso de Uso |
| :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | `text-4xl md:text-5xl` | 2.5rem – 3rem / 1.15 | `font-extrabold` | Título de portada en Home |
| **H2 (Secciones)** | `text-2xl md:text-3xl` | 1.75rem – 2rem / 1.25 | `font-bold` | Títulos principales (`/espacios/`, detalle) |
| **H3 (Tarjetas)** | `text-lg md:text-xl` | 1.125rem – 1.25rem / 1.35 | `font-semibold` | Nombres de lugares en tarjetas |
| **Body (Cuerpo)** | `text-base` | 1rem / 1.6 | `font-normal` | Párrafos descriptivos, consignas |
| **Caption / Badge** | `text-xs md:text-sm` | 0.75rem – 0.875rem / 1.4 | `font-medium` | Indicadores de infraestructura, filtros |

---

## 3. Componentes Atómicos de la Interfaz

### 3.1 Tarjeta de Espacio Urbano (`CardEspacio`)
Componente modular que se reutiliza en:
1. Catálogo general (`/espacios/`)
2. Espacios destacados en Home (`/`)
3. Lista de Favoritos (`/favoritos/`)

**Estructura y Reglas Visuales:**
- **Contenedor:** Fondo blanco, borde sutil (`border border-slate-200/80`), esquinas redondeadas (`rounded-2xl`), sombra suave (`shadow-sm hover:shadow-md transition-shadow`).
- **Imagen:** Proporción 16:9 (`aspect-video`), `object-cover`, con indicador de tipo superpuesto en la esquina superior izquierda (ej. "Parque", "Plaza").
- **Botón de Favorito:** Icono flotante superior derecho (`heart`), accesible con teclado, con cambio de estado relleno/vacío y animación de microinteracción.
- **Cuerpo:**
  - Nombre del espacio (`h3`, `font-semibold`, corte a 1-2 líneas).
  - Zona o barrio con icono de pin geográfico (`text-sm text-slate-500`).
  - **Fila de Badges de Confort:**
    - Nivel de sombra (Chip con icono de árbol + texto: "Sombra Alta" / "Media" / "Baja").
    - Disponibilidad de asientos (Chip con icono de banca + "Con asientos" / "Sin asientos").
    - Etiqueta de accesibilidad (Chip con icono de silla de ruedas + "Accesible" / "Rampa disponible").
- **Footer de Tarjeta:** Botón "Ver detalles" (`w-full`, estilo outline/primary) y checkbox de selección "Comparar" (con contador activo).

### 3.2 Indicadores de Infraestructura y Regla Estricta para `null` (RF-03, RF-08)
Para cumplir con la directriz de **no excluir ni falsear datos desconocidos**, cada indicador en la ficha de detalle se diseña con 3 estados visuales explícitos:

```text
[✓] Disponible       -> Icono verde + Texto positivo (ej. "Baños públicos habilitados")
[✗] No disponible    -> Icono ámbar/rojo sutil + Texto negativo (ej. "Sin baños en el sitio")
[?] Sin información  -> Icono gris neutro + Texto explícito: "Sin información"
```

> **Regla de Accesibilidad:** Jamás utilizar únicamente el círculo de color verde o rojo. Cada estado debe llevar obligatoriamente su etiqueta textual y su icono SVG semántico correspondiente.

### 3.3 Barra de Búsqueda y Panel de Filtros Multidimensionales (`FiltrosGroup`)
- **Buscador interactivo:** Input accesible con icono de lupa, botón de borrado rápido (`x`), con debounce de 150 ms para filtrado *as-you-type*.
- **Filtro de Tipo:** Chips de selección múltiple/única (Todos, Parques, Plazas, Alamedas, Miradores).
- **Filtro de Sombra:** Botones segmentados (Todos, Alta, Media, Baja).
- **Filtro de Asientos:** Toggle switch o pills (Cualquiera, Con asientos, Sin asientos).
- **Barra de resumen:** Muestra el contador en vivo ("Mostrando 8 de 12 espacios") y el botón "Limpiar todos los filtros" visible solo cuando hay filtros activos.

### 3.4 Comparador Flotante y Tabla Comparativa (`ComparadorBar` y `ModalComparador`)
- **Barra Flotante Inferior:** Se fija en la parte inferior de la pantalla (`sticky bottom-4 z-40`) cuando hay al menos 1 espacio seleccionado.
  - Muestra miniaturas de hasta 3 espacios con botón individual de quitar (`×`).
  - Si el usuario intenta seleccionar un 4to espacio, la tarjeta emite un destello visual y se presenta un toast/tooltip accesible: *"Máximo 3 espacios para comparar simultáneamente"*.
  - Botón principal: "Comparar ahora (X/3)".
- **Modal / Vista Comparativa:**
  - Tabla responsive organizada en filas con contraste alterno:
    - Fila 1: Imagen y Nombre del espacio.
    - Fila 2: Tipo de espacio.
    - Fila 3: Nivel de Sombra (Alta / Media / Baja).
    - Fila 4: Disponibilidad de Asientos.
    - Fila 5: Agua potable (Disponible / No disponible / Sin información).
    - Fila 6: Baños públicos.
    - Fila 7: Rampas de accesibilidad.
    - Fila 8: Nivel de Iluminación nocturna.

---

## 4. Adaptabilidad Responsiva (Breakpoints y Layouts)

### 4.1 Móvil (Viewport 375 px a 640 px)
- **Header:** Logotipo compacto, botón menú hamburguesa accesible para navegación (Inicio, Explorar, Favoritos) con badge numérico en Favoritos.
- **Explorador:** 
  - Las tarjetas se apilan a **1 columna completa** (`grid-cols-1 w-full`).
  - Los filtros se agrupan detrás de un botón colapsable `"Filtrar espacios"` que abre un *Drawer* inferior deslizable con botón fijo `"Aplicar filtros"`.
  - Prohibido cualquier margen o contenedor con ancho estático superior a `100vw` para erradicar el `overflow-x`.
- **Ficha Detalle:** La galería/foto principal toma ancho completo, seguida por el bloque de información y la cuadrícula de indicadores en 2 columnas de chips legibles.

### 4.2 Tablet (Viewport 641 px a 1024 px)
- **Explorador:** Cuadrícula de tarjetas a **2 columnas** (`grid-cols-2 gap-4`).
- **Filtros:** Barra horizontal superior compacta con dropdowns semánticos.

### 4.3 Escritorio (Viewport 1025 px a 1440 px+)
- **Header:** Navegación horizontal expandida con enlaces de texto claro y estados de foco visibles.
- **Explorador:** 
  - Layout dividido en 2 columnas principales:
    - Lateral izquierdo (25% de ancho, `sticky top-20`): Panel lateral de filtros con checkboxes y radios accesibles.
    - Área principal (75% de ancho): Buscador superior, contador de resultados y cuadrícula a **3 columnas** (`grid-cols-3 gap-6`).

---

## 5. Wireframes Estructurales (ASCII / Markdown)

### 5.1 Wireframe: Explorador de Espacios (`/espacios/`) - Desktop
```text
+-------------------------------------------------------------------------------+
| [Logo] SOMBRA CERCA        Inicio    [Explorar Espacios]    Favoritos (2)     |
+-------------------------------------------------------------------------------+
| Catálogo de Espacios Urbanos en Cajamarca                                     |
| Encuentra sombra, bancas y refugio peatonal para tus recorridos.              |
+----------------------+--------------------------------------------------------+
| FILTRAR RESULTADOS   | [ 🔍 Buscar por nombre o zona...                     ] |
|                      +--------------------------------------------------------+
| Tipo de Espacio:     | Mostrando 12 de 12 espacios encontrados [Limpiar]      |
| [x] Parques          +------------------+------------------+------------------+
| [ ] Plazas           | [Foto 16:9]  [♡] | [Foto 16:9]  [♡] | [Foto 16:9]  [♡] |
| [ ] Alamedas         | Alameda de Incas | Plaza de Armas   | Santa Apolonia   |
|                      | Zona: Centro     | Zona: Histórico  | Zona: Sur        |
| Nivel de Sombra:     | [🌳 Alta]        | [🌤 Media]       | [🌳 Alta]        |
| (•) Todos ( ) Alta   | [🪑 Asientos: Sí]| [🪑 Asientos: Sí]| [🪑 Asientos: No]|
|                      | [♿ Accesible]   | [♿ Accesible]   | [⚠ Escaleras]   |
| Asientos:            | [Ver Detalle]    | [Ver Detalle]    | [Ver Detalle]    |
| [x] Solo con bancas  | [x] Comparar     | [ ] Comparar     | [x] Comparar     |
+----------------------+------------------+------------------+------------------+
|                      |  [ Barra Flotante: 2 espacios seleccionados -> [Comparar] ]
+-------------------------------------------------------------------------------+
```

### 5.2 Wireframe: Ficha de Detalle Dinámica (`/espacios/[slug]/`)
```text
+-------------------------------------------------------------------------------+
| [<- Volver al explorador]                                                     |
|                                                                               |
| [ Fotografía Principal en Alta Resolución / Galería ]       [ Guardar Fav ♡ ] |
|                                                                               |
| Parque Santa Apolonia                                         Tipo: Mirador   |
| Zona: Jr. Dos de Mayo, Sector Sur · Ref: A faldas del cerro                   |
| Horario orientativo: Lunes a Domingo 08:00 - 18:00 hrs                        |
|                                                                               |
| DESCRIPCIÓN:                                                                  |
| Espacio emblemático con amplias terrazas arboladas, mirador panorámico y     |
| zonas de sombra fresca proporcionada por eucaliptos y cipreses nativos.       |
|                                                                               |
| MATRIZ DE SERVICIOS E INFRAESTRUCTURA PEATONAL:                               |
| +------------------------------------+-------------------------------------+  |
| | 🌳 Sombra: Alta (Cobertura > 70%)  | 🪑 Asientos: Sí (Bancas de piedra)   |  |
| | 🚰 Agua Potable: Sin información   | 🚻 Baños Públicos: Disponibles       |  |
| | ♿ Rampas: Parcial (Tramos gradas) | 💡 Iluminación: Media               |  |
| +------------------------------------+-------------------------------------+  |
|                                                                               |
| [ Comparar este espacio ]                         [ Compartir ubicación 🔗 ]  |
+-------------------------------------------------------------------------------+
```

---

## 6. Guía de Estados del Sistema y Resiliencia Visual

### 6.1 Estados Vacíos (Empty States)
1. **Sin coincidencias en Búsqueda/Filtros:**
   - Ilustración vectorial o icono de lupa con brújula.
   - Título: *"No encontramos espacios con esos criterios"*.
   - Descripción: *"Prueba seleccionando otro nivel de sombra o limpiando los filtros para ver todos los espacios disponibles."*
   - Botón CTA: *"Restablecer todos los filtros"*.
2. **Favoritos Vacío (`/favoritos/`):**
   - Icono de corazón suave con marcador de mapa.
   - Título: *"Aún no tienes espacios guardados"*.
   - Descripción: *"Explora el catálogo y pulsa el corazón en cualquier tarjeta para armar tu lista de paradas favoritas."*
   - Botón CTA: *"Explorar espacios de sombra"*.
3. **Comparador Vacío:**
   - Mensaje guía: *"Selecciona hasta 3 espacios desde el catálogo para contrastar sus características lado a lado."*

### 6.2 Página 404 Personalizada (`src/pages/404.astro`)
- Diseño consistente con la paleta vegetal/urbana.
- Titular: *"Parece que te saliste del sendero (Error 404)"*.
- Texto explicativo: *"La ruta o el espacio que buscas no existe o ha cambiado de dirección."*
- Acciones de escape: Botón primario *"Volver al Explorador"* y botón secundario *"Ir a la Portada"*.

### 6.3 Accesibilidad de Teclado y Estados de Foco (A11y)
- Todos los elementos interactivos cuentan con un estilo de foco uniforme en Tailwind CSS:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2`
- Menú de navegación compatible con lectores de pantalla mediante atributos `aria-label="Navegación principal"` y `aria-current="page"` en la ruta activa.
- Los botones de toggle en favoritos usan `aria-pressed="true|false"` y etiquetas textuales audibles (`aria-label="Guardar Parque Central en favoritos"`).
