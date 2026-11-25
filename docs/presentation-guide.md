# Presentation & Evaluation Defense Guide · Sombra Cerca

> **Documento:** Guía de Sustentación Individual, Protocolo de Demostración y Capturas  
> **Rol asumido:** Technical Evangelist & Course Mentor  
> **Proyecto de Referencia:** [docs/proyecto-individual-sombra-cerca.md](file:///home/wigsdev/GitHub/sombra-cerca/docs/proyecto-individual-sombra-cerca.md)  
> **Requerimientos Centrales:** Sección 7 (Entregables) y Sección 8 (Criterios de evaluación y sustentación - 3 puntos)  
> **Duración de la Demostración:** 5 a 8 minutos estrictos

---

## 1. Estructura y Cronograma de la Sustentación (5 a 8 Minutos)

El objetivo de la sustentación es evidenciar el funcionamiento comprobable del proyecto, la solidez de la arquitectura en Astro 7.3 y las decisiones de diseño adoptadas.

```text
[0:00 - 1:00]  1. Introducción y Problema Urbano Resuelto
[1:00 - 2:30]  2. Portada (RF-01) y Explorador con Filtros Combinados (RF-02)
[2:30 - 4:00]  3. Ficha de Detalle Dinámica y Tratamiento de 'null' (RF-03)
[4:00 - 5:30]  4. Persistencia en Favoritos (RF-04) y Comparador de 3 Espacios (RF-05)
[5:30 - 6:45]  5. Arquitectura Técnica, Código Limpio y Adaptabilidad Móvil (RF-06 a RF-09)
[6:45 - 8:00]  6. Despliegue en Producción, Conclusiones y Preguntas del Docente
```

---

## 2. Guion Paso a Paso para la Demostración en Vivo

### Minuto 0:00 – 1:00 · Apertura y Propuesta de Valor
- **Qué decir:**
  > *"Estimado docente, presento **Sombra Cerca**, una aplicación web multipágina desarrollada con Astro 7.3, Tailwind CSS 4.3 y pnpm, diseñada para ayudar a los peatones en Cajamarca a identificar dónde caminar, descansar y protegerse de la radiación solar. El problema que resuelve es la dispersión de datos urbanos: una plaza puede ser hermosa, pero si carece de sombra o bancas accesibles, no permite una pausa adecuada. Sombra Cerca centraliza esa información para permitir decisiones rápidas y confiables."*
- **Qué mostrar en pantalla:** La portada de la aplicación desplegada en producción.

---

### Minuto 1:00 – 2:30 · Portada y Explorador con Filtros Reactivos (RF-01 y RF-02)
- **Qué mostrar en pantalla:**
  1. Bajar en la portada para mostrar los **3 espacios destacados** (`getFeaturedSpaces()`) y el bloque pedagógico que explica la escala de sombra y accesibilidad.
  2. Hacer clic en el botón principal CTA *"Explorar Espacios"* para navegar a `/espacios/`.
  3. Demostrar la **búsqueda reactiva mientras se escribe**: tipear *"centro"* en el buscador y ver cómo se filtran en vivo las tarjetas.
  4. Demostrar la **combinación de filtros**: seleccionar `Parques` + `Sombra Alta` + `Con asientos`. Resaltar que los filtros operan bajo intersección lógica (AND).
  5. Mostrar el contador de resultados dinámico y luego pulsar *"Limpiar filtros"* para restaurar el catálogo completo de 12 espacios.
- **Qué decir:**
  > *"En el explorador no nos limitamos a una búsqueda simple: implementamos una lógica combinatoria reactiva en cliente que evalúa tipo, nivel de sombra y asientos simultáneamente, con retroalimentación instantánea del conteo y manejo de estados vacíos."*

---

### Minuto 2:30 – 4:00 · Ficha de Detalle Dinámica y Tratamiento de `null` (RF-03)
- **Qué mostrar en pantalla:**
  1. Abrir un espacio con datos parciales (ej. un parque donde el agua o los baños figuren como desconocidos).
  2. Mostrar la URL limpia generada con el slug dinámico (`/espacios/[slug]/`).
  3. Señalar en la matriz de servicios la etiqueta **“Sin información”** con su icono neutro.
  4. Pulsar el botón *"Guardar en favoritos"*; notar la retroalimentación visual inmediata.
- **Qué decir:**
  > *"Aquí observamos el cumplimiento estricto del pliego técnico: cuando un servicio no tiene datos verificados en campo, la aplicación almacena `null` y presenta explícitamente 'Sin información', sin falsear datos ni asumir que el servicio no existe. Además, la ruta se resuelve estáticamente a través de `getStaticPaths` en Astro, garantizando rendimiento instantáneo."*

---

### Minuto 4:00 – 5:30 · Favoritos y Comparador de Espacios (RF-04 y RF-05)
- **Qué mostrar en pantalla:**
  1. Navegar a `/favoritos/` desde la barra superior. Comprobar que el espacio guardado está presente.
  2. **Presionar F5 (recarga forzada):** demostrar que el espacio sigue allí gracias a `localStorage`.
  3. Regresar al explorador y seleccionar **3 espacios para comparar**.
  4. Abrir la barra o vista comparativa para contrastar lado a lado: sombra, asientos, agua, baños, rampas e iluminación.
  5. **Intentar seleccionar un 4to espacio:** mostrar el bloqueo visual y el mensaje explicativo que restringe la selección a 3 espacios como máximo.
- **Qué decir:**
  > *"La persistencia en favoritos es resiliente a cierres del navegador y cuenta con manejo defensivo de errores. El comparador respeta el límite estricto de 3 elementos exigido en RF-05, contrastando todos los indicadores obligatorios."*

---

### Minuto 5:30 – 6:45 · Calidad Técnica, Responsive y Accesibilidad (RF-06 a RF-09)
- **Qué mostrar en pantalla:**
  1. Abrir DevTools (`Ctrl+Shift+M`) y mostrar la vista en **375 px (móvil)**:
     - Las tarjetas pasan limpiamente a 1 columna.
     - Cero scroll horizontal accidental.
     - Los filtros siguen accesibles mediante el botón desplegable.
  2. Navegar mediante el teclado con la tecla `Tab`: mostrar los anillos de foco visibles (`focus-visible:ring-2`).
  3. Mostrar brevemente en el editor o terminal la estructura de `src/data/espacios.js` y la ejecución limpia de `pnpm build`.
- **Qué decir:**
  > *"Hemos cuidado la accesibilidad y el diseño responsive: ningún indicador depende únicamente del color, todas las imágenes tienen textos `alt` y la estructura es 100% semántica. El código está centralizado, sin dependencias superfluas de frameworks pesados."*

---

### Minuto 6:45 – 8:00 · Cierre y Rondas de Preguntas
- **Qué decir:**
  > *"El repositorio se encuentra publicado en GitHub con instrucciones directas para clonar y ejecutar con `pnpm dev`, y el despliegue está activo en Netlify/Cloudflare Pages. Quedo atento a sus preguntas o a cualquier prueba adicional que desee comprobar en el código o en la interfaz."*

---

## 3. Guía de Capturas Obligatorias para la Entrega (Sección 7)

Para cumplir con el entregable de capturas exigido en el pliego, almacenar las imágenes en la carpeta `docs/screenshots/` con la siguiente nomenclatura estandarizada:

| Archivo | Contenido Requerido | Elementos Clave Visibles |
| :--- | :--- | :--- |
| `01-inicio.webp` | Portada principal (`/`) | Hero con nombre del producto, botón CTA al explorador, 3 espacios destacados y bloque pedagógico de indicadores. |
| `02-explorador-filtros.webp`| Catálogo filtrado (`/espacios/`) | Buscador con texto, filtros activos combinados (tipo + sombra + asientos) y contador dinámico de resultados. |
| `03-ficha-detalle.webp` | Ficha dinámica (`/espacios/[slug]/`) | Slug en URL, descripción, fotografía, botón de favorito y matriz de servicios con tratamiento de `null` ("Sin información"). |
| `04-favoritos.webp` | Vista de favoritos (`/favoritos/`) | Espacios almacenados en `localStorage` y botón de retiro o enlace de retorno. |
| `05-comparador.webp` | Tabla comparativa (`RF-05`) | Comparación de hasta 3 espacios con filas de sombra, asientos, agua, baños, rampas e iluminación. |
| `06-responsive-mobile.webp` | Vista en 375 px (Móvil) | Inspección de pantalla en 375 px demostrando tarjeta a 1 columna y cero desbordamiento horizontal. |

---

## 4. Rúbrica de Autoevaluación Final (Meta: 20 / 20)

| Criterio Evaluado | Pts | Estado de Verificación |
| :--- | :---: | :--- |
| **Funcionalidad (7 pts)** | 7/7 | Búsqueda as-you-type, filtros combinados AND, ficha dinámica con slug, persistencia en favoritos y comparador operativo con bloqueo de 4to elemento. |
| **Astro y Arquitectura (4 pts)** | 4/4 | Componentes reutilizables (`CardEspacio`, `Header`), layout semántico, rutas dinámicas `[slug].astro`, datos 100% centralizados en `src/data/espacios.js`. |
| **Interfaz y Responsive (4 pts)** | 4/4 | Sistema visual consistente en Tailwind CSS 4.3, diseño fluido de 375 px a 1440 px sin overflow horizontal. |
| **Calidad y Accesibilidad (2 pts)** | 2/2 | HTML semántico, foco de teclado visible, textos `alt` descriptivos y tratamiento riguroso de `null` como "Sin información". |
| **Entrega y Sustentación (3 pts)** | 3/3 | Repositorio limpio con `pnpm-lock.yaml` (sin package-lock/yarn.lock), README completo, despliegue público y demostración dentro de 5 a 8 minutos. |
| **Puntaje Total Proyectado** | **20 / 20** | **Excelente / Calificación Máxima** |
