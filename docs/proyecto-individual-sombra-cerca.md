# PROYECTO INDIVIDUAL · SOMBRA CERCA

### Atlas interactivo de refugios urbanos y rutas de confort peatonal

**RETO DE DESARROLLO FRONTEND**  
*Astro 7.3 · Tailwind CSS 4.3 · pnpm*

> Una aplicación para descubrir dónde caminar, descansar y protegerse del sol en la ciudad.

### DOCUMENTO DE ESPECIFICACIÓN
*Consigna, funcionalidades obligatorias, estructura técnica y criterios de evaluación.*

---

## 1. Descripción del proyecto

Sombra Cerca es una aplicación web que permite explorar espacios urbanos que ofrecen condiciones favorables para caminar o hacer una pausa: árboles y sombra, bancas, fuentes de agua, baños públicos, rampas, iluminación y zonas de descanso.

El usuario podrá consultar lugares mediante un catálogo filtrable, revisar la ficha de cada espacio, comparar sus características y construir una pequeña lista de lugares guardados. La aplicación debe ayudar a responder una pregunta concreta: ¿dónde puedo hacer una pausa o caminar con mayor comodidad cerca de una zona determinada?

El proyecto puede utilizar Cajamarca como ciudad de referencia, pero el alumno puede elegir otra ciudad y crear un conjunto de datos ficticio verosímil. Los datos deben identificarse como demostrativos cuando no hayan sido verificados en campo.

### Problema que resuelve
La información sobre espacios de descanso y condiciones peatonales suele estar dispersa. Una plaza puede tener árboles, pero no bancas; otra puede tener rampas, pero poca sombra. Sombra Cerca organiza esas características para facilitar una decisión rápida.

### Público objetivo
- Personas que caminan por la ciudad y necesitan hacer pausas durante sus recorridos.
- Visitantes que no conocen bien una zona urbana.
- Personas que valoran la accesibilidad y desean identificar servicios y facilidades antes de desplazarse.

### Resultado esperado
Un sitio web funcional, visualmente consistente y responsive. No se evaluará solo que las pantallas existan: los filtros, los detalles, los favoritos y la navegación deben funcionar con datos reales del propio proyecto.

---

## 2. Alcance y reglas generales

- **Modalidad:** individual. Cada estudiante desarrolla su propia solución.
- **Tipo:** aplicación frontend multipágina construida con Astro.
- **Datos:** archivos locales JavaScript/JSON incluidos en el repositorio. No se exige API ni base de datos.
- **Persistencia:** favoritos guardados en `localStorage` del navegador.
- **Contenido:** mínimo 12 espacios urbanos, distribuidos en al menos 3 categorías o tipos.
- **Imágenes:** mínimo 1 imagen por espacio. Se permiten imágenes propias o recursos con licencia adecuada; no se aceptan imágenes rotas.
- **Integridad:** no presentar datos ficticios como mediciones oficiales ni afirmar que un lugar es accesible o seguro sin evidencia.

> **Importante:** No se permite entregar una plantilla descargada sin personalización, una sola página larga que simule todas las rutas ni una interfaz estática cuyos controles no hagan nada.

---

## 3. Requerimientos funcionales obligatorios

El alumno debe implementar todos los requerimientos siguientes. Cada punto será comprobado durante la revisión.

### RF-01 · Página de inicio
- Crear una portada con nombre del producto, propuesta de valor y una llamada a la acción que lleve al explorador.
- Mostrar al menos 3 espacios destacados mediante tarjetas.
- Incluir un bloque breve que explique qué significan los indicadores de sombra, descanso y accesibilidad.

### RF-02 · Explorador de espacios
- Crear una ruta `/espacios/` que liste los 12 espacios como mínimo.
- Cada tarjeta debe mostrar: fotografía, nombre, tipo, zona o barrio, nivel de sombra, disponibilidad de asientos y una etiqueta de accesibilidad.
- Incluir un campo de búsqueda que filtre por nombre o zona mientras el usuario escribe.
- Incluir filtros por tipo de espacio, nivel de sombra y disponibilidad de asientos.
- Permitir combinar filtros; por ejemplo, parques + sombra alta + con asientos.
- Mostrar el número de resultados y un mensaje útil cuando no existan coincidencias.
- Incluir una acción para limpiar todos los filtros.

### RF-03 · Ficha de detalle dinámica
- Crear una ruta dinámica `/espacios/[slug]/` para cada espacio.
- Mostrar descripción, dirección o referencia, horario orientativo si se conoce, galería o imagen principal y características detalladas.
- Mostrar indicadores separados para sombra, asientos, agua, baños, rampas y estado de iluminación. Si un dato no está disponible, mostrar “Sin información”; no asumir que la facilidad no existe.
- Incluir un enlace para volver al explorador y una acción para guardar o quitar de favoritos.
- Si el slug no existe, mostrar una página 404 personalizada.

### RF-04 · Favoritos
- Crear la ruta `/favoritos/`.
- Guardar favoritos en `localStorage` para que permanezcan al recargar la página en el mismo navegador.
- Permitir quitar un espacio de favoritos desde la ficha y desde la lista de favoritos.
- Mostrar un estado vacío con un enlace para explorar espacios.
- Evitar errores cuando `localStorage` esté vacío o contenga datos inválidos.

### RF-05 · Comparador
- Permitir seleccionar hasta 3 espacios para compararlos.
- Comparar como mínimo: tipo, sombra, asientos, agua, baños, rampas e iluminación.
- Impedir seleccionar un cuarto espacio y explicar el límite.
- Permitir retirar espacios de la comparación y mostrar un estado inicial cuando no haya elementos seleccionados.

---

## 4. Requerimientos de interfaz y experiencia

### RF-06 · Diseño responsive
- La interfaz debe adaptarse correctamente a móvil (ancho aproximado de 375 px), tablet y escritorio (1440 px).
- En móvil, las tarjetas deben pasar a una sola columna; en pantallas amplias, utilizar una cuadrícula de 2 o 3 columnas.
- Los filtros deben seguir siendo utilizables en pantallas pequeñas; pueden mostrarse en un panel desplegable.
- No debe existir desplazamiento horizontal accidental.

### RF-07 · Navegación y estados
- Crear navegación consistente entre Inicio, Explorar espacios y Favoritos.
- Indicar visualmente la sección activa.
- Todos los botones, enlaces, filtros y controles deben tener una función real.
- Añadir estados hover y focus visibles.
- Mostrar estados vacíos, resultados sin coincidencias y errores de ruta.

### RF-08 · Accesibilidad básica
- Usar HTML semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` y `<footer>` cuando corresponda.
- Añadir texto alternativo descriptivo a las imágenes informativas.
- Asegurar contraste legible entre texto y fondo.
- Permitir navegar los controles principales con teclado.
- No utilizar únicamente el color para comunicar niveles o estados: acompañarlo con texto.

### RF-09 · Identidad visual
- Definir una paleta coherente inspirada en naturaleza, sombra y espacio urbano.
- Diseñar un sistema consistente de tarjetas, botones, etiquetas, campos y mensajes.
- Evitar el aspecto de dashboard administrativo genérico.
- La interfaz debe priorizar lectura rápida, jerarquía visual y fotografías.

---

## 5. Modelo de datos obligatorio

Crear un archivo de datos independiente, por ejemplo `src/data/espacios.js`. Cada espacio debe ser un objeto con esta estructura mínima:

- `id`: identificador único
- `slug`: texto para la URL
- `nombre`: nombre del lugar
- `tipo`: parque, plaza, alameda u otro
- `zona`: barrio o sector
- `direccion`: referencia
- `descripcion`: texto descriptivo
- `imagen`: ruta o URL de imagen
- `sombra`: baja, media o alta
- `asientos`: `true`, `false` o `null`
- `agua`: `true`, `false` o `null`
- `banos`: `true`, `false` o `null`
- `rampas`: `true`, `false` o `null`
- `iluminacion`: baja, media, alta o `null`

### Reglas del modelo
- Los 12 registros deben respetar la misma estructura.
- Los identificadores y slugs no deben repetirse.
- Usar `null` cuando no exista información; no reemplazar desconocido por `false`.
- Centralizar los datos: no duplicar manualmente la misma ficha en varias páginas.
- Crear funciones reutilizables para buscar por slug, filtrar espacios y obtener destacados.

#### Ejemplo conceptual de registro (los valores son ilustrativos):

```javascript
{
  id: 1,
  slug: "parque-del-bosque",
  nombre: "Parque del Bosque",
  tipo: "parque",
  zona: "Sector norte",
  sombra: "alta",
  asientos: true,
  agua: null,
  banos: false,
  rampas: true
}
```

---

## 6. Requerimientos técnicos

### Tecnologías obligatorias

| Tecnología | Uso obligatorio |
| :--- | :--- |
| **Astro 7.3** | Estructura del sitio, páginas, layouts, componentes y rutas dinámicas. |
| **Tailwind CSS 4.3** | Estilos, diseño responsive, estados visuales y sistema de espaciado. |
| **pnpm** | Instalación de dependencias, scripts y ejecución del proyecto. |
| **JavaScript** | Modelo de datos, filtros, favoritos y lógica del comparador. |
| **localStorage** | Persistencia local de favoritos y, opcionalmente, selección del comparador. |

### Configuración y ejecución
- Crear el proyecto con Astro 7.3 y configurar Tailwind CSS 4.3 siguiendo el flujo oficial compatible con esas versiones.
- Usar `pnpm` para instalar y administrar dependencias. No entregar `package-lock.json` ni `yarn.lock`.
- El proyecto debe arrancar con `pnpm dev` y generar la versión de producción con `pnpm build`.
- La compilación debe finalizar sin errores.
- No incorporar frameworks adicionales (React, Vue, Svelte) salvo autorización expresa del docente.

### Estructura mínima sugerida

```text
src/
├── components/   # Tarjetas, filtros, navegación, etiquetas
├── layouts/      # Layout principal
├── pages/        # index.astro, espacios/, favoritos.astro
├── data/         # espacios.js
├── scripts/      # lógica cliente si se requiere
└── styles/       # estilos globales
public/           # imágenes y recursos estáticos
astro.config.mjs
package.json
pnpm-lock.yaml
```

*La estructura puede variar si el alumno mantiene una organización clara y separa responsabilidades.*

---

## 7. Entregables

- **Repositorio:** enlace a GitHub con el código fuente completo.
- **README.md:** descripción, tecnologías, requisitos, instalación, comandos y decisiones relevantes.
- **Aplicación desplegada:** enlace público funcional (por ejemplo, Netlify, Vercel o Cloudflare Pages).
- **Datos:** mínimo 12 registros completos y consistentes.
- **Presentación:** demostración individual de 5 a 8 minutos.
- **Capturas:** inicio, explorador con filtros, detalle, favoritos y comparador.

El repositorio debe permitir que el docente clone el proyecto, ejecute `pnpm install` y luego `pnpm dev` sin configuraciones manuales adicionales.

---

## 8. Criterios de evaluación

**Puntaje total: 20 puntos.** Se calificará el funcionamiento comprobable, no únicamente la apariencia.

| Criterio | Indicadores | Puntos |
| :--- | :--- | :---: |
| **Funcionalidad** | Búsqueda, filtros combinados, detalle dinámico, favoritos y comparador operativos. | 7 |
| **Astro y arquitectura** | Componentes reutilizables, layouts, rutas dinámicas, datos centralizados y estructura clara. | 4 |
| **Interfaz y responsive** | Diseño coherente, jerarquía visual y adaptación a móvil, tablet y escritorio. | 4 |
| **Calidad y accesibilidad** | HTML semántico, estados, teclado, textos alternativos y manejo de información desconocida. | 2 |
| **Entrega y sustentación** | Repositorio reproducible, README, despliegue y explicación de decisiones. | 3 |

### Condiciones que afectan la calificación
- Un control visual que no realiza ninguna acción se considera no implementado.
- Si el proyecto no compila o no puede ejecutarse siguiendo el README, se descontará en entrega y calidad técnica.
- Si no existen 12 espacios o se repiten registros para completar el mínimo, se descontará en funcionalidad y modelo de datos.
- Si los filtros no se pueden combinar, RF-02 se considera parcialmente implementado.
- Si los favoritos desaparecen al recargar la página, RF-04 no está completo.

---

## 9. Pruebas de aceptación

Antes de entregar, el alumno debe comprobar estos escenarios:

- Al ingresar a `/espacios/`, aparecen al menos 12 espacios.
- Al escribir una zona en el buscador, la lista se reduce a coincidencias.
- Al combinar tipo, sombra y asientos, solo aparecen registros que cumplen todos los filtros.
- Al limpiar filtros, vuelve a mostrarse el catálogo completo.
- Al abrir una tarjeta, la URL contiene el slug correcto y muestra la ficha correspondiente.
- Al guardar un favorito, aparece en `/favoritos/` y permanece después de recargar.
- Al seleccionar 3 espacios, el comparador muestra sus diferencias y bloquea una cuarta selección.
- Al abrir un slug inexistente, aparece una página 404 diseñada.
- En móvil, no hay desbordamiento horizontal y los controles siguen siendo utilizables.
- `pnpm build` termina correctamente.

---

## 10. Desafío adicional (no obligatorio)

- Añadir una vista de mapa esquemático propia (sin depender de una API externa), ubicando los espacios mediante coordenadas ficticias claramente identificadas.
- Incorporar un indicador de “mejor coincidencia” según filtros elegidos, explicando qué criterios se utilizaron.
- Permitir compartir la URL de un espacio y conservar filtros mediante parámetros de consulta.

*La funcionalidad adicional no reemplaza ninguno de los requerimientos obligatorios.*

---

## Consigna final

Desarrolla Sombra Cerca como un producto digital que una persona realmente podría utilizar. No te limites a construir pantallas: organiza los datos, resuelve los flujos completos, valida los estados y cuida la experiencia en dispositivos móviles. La evaluación se realizará probando la aplicación y revisando el código fuente.

> **Éxito:** el mejor resultado no será el que tenga más efectos visuales, sino el que convierta información clara y confiable en una experiencia útil.
