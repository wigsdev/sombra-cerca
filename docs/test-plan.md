# Quality Assurance & Acceptance Test Plan · Sombra Cerca

> **Documento:** Plan Integral de Pruebas de Calidad y Criterios de Aceptación  
> **Rol asumido:** QA Lead & Quality Assurance Engineer  
> **Proyecto de Referencia:** [docs/proyecto-individual-sombra-cerca.md](file:///home/wigsdev/GitHub/sombra-cerca/docs/proyecto-individual-sombra-cerca.md)  
> **Foco de Control:** Sección 8 (Condiciones que afectan la calificación) y Sección 9 (Pruebas de aceptación)  
> **Puntaje Objetivo:** 20 / 20 Puntos

---

## 1. Estrategia y Alcance del Aseguramiento de Calidad (QA)

El objetivo de este plan es certificar que **Sombra Cerca** cumple con todos los escenarios operativos requeridos por la consigna docente antes de su entrega y sustentación. Conforme a las reglas de evaluación:
> *“Se calificará el funcionamiento comprobable, no únicamente la apariencia. Un control visual que no realiza ninguna acción se considera no implementado.”*

---

## 2. Matriz de Casos de Prueba de Aceptación Obligatorios (Sección 9)

| ID de Prueba | Requerimiento | Escenario de Prueba | Pasos de Verificación | Resultado Esperado | Estado / Check |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | RF-02 (Catálogo) | Carga inicial del catálogo completo | 1. Ingresar a la URL `/espacios/`.<br>2. Contar visualmente las tarjetas renderizadas. | Se listan al menos 12 espacios urbanos. Cada tarjeta muestra foto, nombre, tipo, zona, sombra, asientos y accesibilidad. | [ ] |
| **TC-02** | RF-02 (Búsqueda) | Filtrado reactivo en tiempo real (*as-you-type*) | 1. En el buscador de `/espacios/`, escribir una zona (ej. "Centro" o "Sur").<br>2. Observar la actualización sin presionar Enter. | La lista se reduce instantáneamente a los espacios que coinciden en nombre o zona. | [ ] |
| **TC-03** | RF-02 (Filtros) | Combinación de múltiples filtros simultáneos | 1. Seleccionar tipo: *Parque*.<br>2. Seleccionar sombra: *Alta*.<br>3. Activar: *Solo con asientos*. | La vista muestra únicamente los espacios que satisfacen los tres criterios al mismo tiempo (intersección lógica AND). | [ ] |
| **TC-04** | RF-02 (Reset) | Restablecimiento de catálogo filtrado | 1. Con filtros aplicados y búsqueda activa, pulsar *"Limpiar filtros"*. | El input se vacía, los filtros vuelven a su valor por defecto y reaparecen los 12 espacios completos. | [ ] |
| **TC-05** | RF-03 (Detalle) | Navegación dinámica y resolución de slug | 1. Hacer clic en *"Ver detalles"* en cualquier tarjeta.<br>2. Comprobar la URL en la barra de navegación.<br>3. Revisar la ficha del espacio. | La URL refleja `/espacios/[slug]/` con el slug exacto. Se muestran descripción, dirección, foto e indicadores completos. | [ ] |
| **TC-06** | RF-04 (Favoritos) | Persistencia y resiliencia en `localStorage` | 1. En una tarjeta o ficha, marcar como favorito.<br>2. Navegar a `/favoritos/`.<br>3. Presionar F5 (recarga forzada del navegador). | El espacio permanece visible en `/favoritos/`. Al pulsar *"Quitar"*, desaparece de la vista y de `localStorage`. | [ ] |
| **TC-07** | RF-05 (Comparador) | Selección de 3 espacios y bloqueo del 4to | 1. Seleccionar 3 espacios diferentes para comparar.<br>2. Abrir la comparativa.<br>3. Intentar seleccionar un 4to espacio en el catálogo. | Se contrastan tipo, sombra, asientos, agua, baños, rampas e iluminación. El sistema **impide** agregar el 4to y muestra un mensaje explicativo. | [ ] |
| **TC-08** | RF-03 (Error 404) | Manejo de rutas y slugs inexistentes | 1. Escribir manualmente en el navegador: `/espacios/ruta-que-no-existe-xyz/`. | Se despliega la página `404.astro` diseñada con la identidad visual del sitio y botón para volver al explorador. | [ ] |
| **TC-09** | RF-06 (Mobile) | Responsividad y ausencia de `overflow-x` | 1. Abrir DevTools en modo emulación móvil (ancho 375 px, ej. iPhone SE).<br>2. Desplazarse verticalmente por todas las rutas. | Las tarjetas pasan a 1 sola columna. Los filtros son utilizables (drawer/colapsable). Cero scroll horizontal accidental. | [ ] |
| **TC-10** | Sec. 6 (Compilación)| Compilación estricta para producción | 1. Ejecutar en terminal: `pnpm build`. | El comando finaliza con código de salida 0 (*Exit Code 0*) sin warnings críticos ni errores de Astro. | [ ] |

---

## 3. Pruebas Especiales de Calidad y Manejo de Datos (Sección 5 y 8)

### TC-11: Manejo Estricto del Valor `null` (Sin Información)
- **Objetivo:** Verificar que la aplicación no confunda desconocimiento con inexistencia.
- **Procedimiento:**
  1. Abrir la ficha de un espacio donde `agua: null` o `banos: null` (ej. Parque Las Torrecitas).
  2. Verificar visualmente el bloque de indicadores.
- **Criterio de Éxito:** La interfaz debe mostrar inequívocamente el texto **“Sin información”** con un icono neutro; bajo ninguna circunstancia debe mostrar "No tiene agua" ni asumir falso (`false`).

### TC-12: Tolerancia a `localStorage` Vacío o Corrupto
- **Objetivo:** Garantizar que la aplicación no colapse si el usuario borra sus cookies o datos de navegación.
- **Procedimiento:**
  1. En consola de desarrollador ejecutar: `localStorage.setItem('sombra_cerca_favoritos_v1', '{corrupt-json')`.
  2. Recargar `/favoritos/`.
- **Criterio de Éxito:** La página no debe congelarse ni arrojar `SyntaxError` en consola; debe mostrar el estado vacío con el botón *"Explorar espacios"*.

---

## 4. Matriz de Auditoría de Accesibilidad (A11y · RF-08)

| Verificación | Herramienta / Método | Criterio de Éxito | Estado |
| :--- | :--- | :--- | :---: |
| **Navegación por Teclado** | Tecla `Tab` / `Shift+Tab` / `Enter` | Todo enlace, botón, tarjeta y filtro puede seleccionarse y accionarse exclusivamente con el teclado. | [ ] |
| **Foco Visible** | Inspección visual | Los elementos enfocados exhiben un anillo de foco destacado (`ring-2 ring-emerald-700`). | [ ] |
| **Texto Alternativo (`alt`)** | Inspección DOM en `<img>` | Todas las imágenes informativas poseen textos descriptivos que contextualizan la vegetación y el entorno. | [ ] |
| **Contraste de Color** | Contrast Checker (Lighthouse / Axe) | Ratio superior a 4.5:1 en textos de cuerpo y superior a 3:1 en títulos grandes (WCAG 2.1 AA). | [ ] |
| **No Dependencia del Color** | Prueba monocromática | Los niveles de sombra y accesibilidad incluyen etiquetas de texto explícitas además del color. | [ ] |
| **HTML Semántico** | W3C Validator / Inspección | Se utilizan etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). | [ ] |

---

## 5. Checklist Anti-Penalización Pre-Entrega (Sección 8)

Antes de enviar el repositorio o iniciar la sustentación docente, QA debe firmar esta lista:

- [ ] **Sin controles huérfanos:** Todos los botones, enlaces y selectores ejecutan una acción verificable (nada es puramente cosmético).
- [ ] **Sin package-lock.json ni yarn.lock:** Se verificó que el repositorio contenga **únicamente** `pnpm-lock.yaml`.
- [ ] **Catálogo completo:** Existen exactamente 12 o más registros con datos consistentes y slugs únicos en `src/data/espacios.js`.
- [ ] **Imágenes operativas:** Ninguna imagen en el catálogo arroja error HTTP 404.
- [ ] **Persistencia verificada:** Los favoritos sobreviven a la recarga de página (F5) en el mismo navegador.
- [ ] **Despliegue operativo:** El enlace público (Cloudflare Pages, Vercel o Netlify) carga instantáneamente y no arroja errores 404 al navegar entre rutas.
