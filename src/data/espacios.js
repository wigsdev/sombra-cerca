/**
 * Catálogo centralizado de espacios urbanos reales de Cajamarca, Perú.
 * Nota de integridad: las ubicaciones y nombres corresponden a espacios reales de la ciudad;
 * los atributos de confort que no cuentan con relevamiento en campo son demostrativos.
 * Convención: `null` indica ausencia de información verificada (mostrar como "Sin información").
 */
export const ESPACIOS = [
  {
    id: 1,
    slug: "plaza-de-armas-cajamarca",
    nombre: "Plaza de Armas de Cajamarca",
    tipo: "plaza",
    zona: "Centro Histórico",
    direccion: "Intersección de Jr. Del Comercio y Jr. Cruz de Piedra",
    descripcion:
      "Corazón monumental de la ciudad rodeado por la Catedral, la Iglesia San Francisco y casonas coloniales, con jardines cuidados, pileta central y bancas perimetrales.",
    imagen: "/images/espacios/plaza-de-armas-cajamarca.webp",
    imagenAlt:
      "Vista de la Plaza de Armas de Cajamarca con áreas verdes, pileta y arquitectura colonial",
    sombra: "media",
    asientos: true,
    agua: false,
    banos: true,
    rampas: true,
    iluminacion: "alta",
    horario: "Abierto las 24 horas",
  },
  {
    id: 2,
    slug: "alameda-de-los-incas",
    nombre: "Alameda de los Incas",
    tipo: "alameda",
    zona: "Complejo Qhapaq Ñan",
    direccion: "Av. Alameda de los Incas, altura Óvalo del León (Av. Atahualpa)",
    descripcion:
      "Extenso paseo peatonal urbano dentro del Complejo Qhapaq Ñan con esculturas de los catorce gobernantes del Tahuantinsuyo, veredas amplias y áreas verdes para caminatas.",
    imagen: "/images/espacios/alameda-de-los-incas.webp",
    imagenAlt:
      "Paseo peatonal y áreas verdes en la Alameda de los Incas del Complejo Qhapaq Ñan",
    sombra: "alta",
    asientos: true,
    agua: true,
    banos: true,
    rampas: true,
    iluminacion: "alta",
    horario: "06:00 – 22:00 h",
  },
  {
    id: 3,
    slug: "colina-santa-apolonia",
    nombre: "Mirador Cerro Santa Apolonia",
    tipo: "mirador",
    zona: "Centro / Sector Suroeste",
    direccion: "Final del Jr. Dos de Mayo, Cerro Santa Apolonia",
    descripcion:
      "Mirador natural conocido también por la Silla del Inca, con terrazas arboladas, jardines, senderos sombreados y vista panorámica de la ciudad y el valle de Cajamarca.",
    imagen: "/images/espacios/colina-santa-apolonia.webp",
    imagenAlt:
      "Terrazas arboladas y senderos del Cerro Santa Apolonia en Cajamarca",
    sombra: "alta",
    asientos: true,
    agua: null,
    banos: true,
    rampas: false,
    iluminacion: "media",
    horario: "08:00 – 18:00 h",
  },
  {
    id: 4,
    slug: "parque-las-torrecitas",
    nombre: "Parque Las Torrecitas",
    tipo: "parque",
    zona: "Sector 11 · Urb. Campo Real",
    direccion:
      "Jr. Ramiro León Urbina y Calle Amador Lecca Oliva, Urb. Campo Real · Sector 11",
    descripcion:
      "Parque vecinal con áreas verdes, árboles de copa amplia y bancas distribuidas para el descanso cotidiano de residentes y caminantes de la zona.",
    imagen: "/images/espacios/parque-las-torrecitas.webp",
    imagenAlt:
      "Áreas verdes y espacios de descanso del Parque Las Torrecitas en Cajamarca",
    sombra: "alta",
    asientos: true,
    agua: null,
    banos: false,
    rampas: true,
    iluminacion: "media",
    horario: "Abierto las 24 horas",
  },
  {
    id: 5,
    slug: "plazuela-belen",
    nombre: "Plazuela Belén",
    tipo: "plaza",
    zona: "Centro Histórico",
    direccion: "Intersección de Jr. Belén y Jr. Abancay, frente al Conjunto Monumental Belén",
    descripcion:
      "Plazuela histórica de escala íntima frente a la fachada de piedra volcánica de la Iglesia de Belén, con tránsito tranquilo y bancas para pausas breves.",
    imagen: "/images/espacios/plazuela-belen.webp",
    imagenAlt:
      "Plazuela Belén frente a la fachada de piedra del Conjunto Monumental Belén en Cajamarca",
    sombra: "media",
    asientos: true,
    agua: null,
    banos: false,
    rampas: true,
    iluminacion: "alta",
    horario: "Abierto las 24 horas",
  },
  {
    id: 6,
    slug: "parque-infantil-la-colmena",
    nombre: "Parque Infantil de La Colmena",
    tipo: "parque",
    zona: "Sector 12 · Barrio La Colmena",
    direccion: "Entre Jr. Ayacucho y Jr. Leoncio Prado, Barrio La Colmena",
    descripcion:
      "Espacio recreativo municipal con vegetación de sombra, zonas de descanso familiar y caminerías planas frecuentadas durante la mañana y la tarde.",
    imagen: "/images/espacios/parque-infantil-la-colmena.webp",
    imagenAlt:
      "Zona arbolada y senderos peatonales del Parque Infantil de La Colmena",
    sombra: "alta",
    asientos: true,
    agua: false,
    banos: false,
    rampas: true,
    iluminacion: "media",
    horario: "06:00 – 21:00 h",
  },
  {
    id: 7,
    slug: "alameda-heroes-de-san-ramon",
    nombre: "Alameda Héroes de San Ramón",
    tipo: "alameda",
    zona: "Centro-Este",
    direccion: "Av. de los Héroes de San Ramón, entre Plaza Toribio Casanova y Av. Atahualpa",
    descripcion:
      "Tradicional paseo arbolado que recorre seis cuadras junto al Convento de La Recoleta y el Estadio Héroes de San Ramón, muy transitado por peatones y estudiantes.",
    imagen: "/images/espacios/alameda-heroes-de-san-ramon.webp",
    imagenAlt:
      "Avenida y Alameda Héroes de San Ramón con arboleda central en Cajamarca",
    sombra: "media",
    asientos: true,
    agua: null,
    banos: null,
    rampas: true,
    iluminacion: "media",
    horario: "Abierto las 24 horas",
  },
  {
    id: 8,
    slug: "parque-horacio-zevallos",
    nombre: "Parque Horacio Zevallos",
    tipo: "parque",
    zona: "Centro Urbano",
    direccion: "Jr. I. Pereyra, cerca del Jr. Mariano Ibérico",
    descripcion:
      "Parque urbano rodeado de árboles altos que ofrecen sombra fresca durante el mediodía, pensado para caminar y transitar con menor exposición solar.",
    imagen: "/images/espacios/parque-horacio-zevallos.webp",
    imagenAlt:
      "Sendero sombreado por árboles en el Parque Horacio Zevallos",
    sombra: "alta",
    asientos: false,
    agua: null,
    banos: false,
    rampas: false,
    iluminacion: "baja",
    horario: "Abierto las 24 horas",
  },
  {
    id: 9,
    slug: "plazuela-amalia-puga",
    nombre: "Plazuela Amalia Puga",
    tipo: "plaza",
    zona: "Centro Histórico",
    direccion: "Jr. Amalia Puga, cerca del Convento de La Recoleta",
    descripcion:
      "Plazuela tradicional dedicada a la escritora cajamarquina Amalia Puga de Losada, con bancas, buena iluminación nocturna y escasa cobertura arbórea al mediodía.",
    imagen: "/images/espacios/plazuela-amalia-puga.webp",
    imagenAlt:
      "Plazuela Amalia Puga vista desde el Jirón Amalia Puga en Cajamarca",
    sombra: "baja",
    asientos: true,
    agua: false,
    banos: false,
    rampas: true,
    iluminacion: "alta",
    horario: "Abierto las 24 horas",
  },
  {
    id: 10,
    slug: "parque-de-la-madre",
    nombre: "Parque de la Madre",
    tipo: "parque",
    zona: "Urbanización Ramón Castilla",
    direccion: "Urbanización Ramón Castilla, Cajamarca",
    descripcion:
      "Parque residencial con vegetación mixta, bancas de descanso y acceso peatonal desde las calles circundantes de la urbanización.",
    imagen: "/images/espacios/parque-de-la-madre.webp",
    imagenAlt:
      "Árboles, caminerías y bancas del Parque de la Madre en Urb. Ramón Castilla",
    sombra: "alta",
    asientos: true,
    agua: null,
    banos: null,
    rampas: true,
    iluminacion: null,
    horario: null,
  },
  {
    id: 11,
    slug: "pasaje-de-la-cultura",
    nombre: "Pasaje de la Cultura",
    tipo: "alameda",
    zona: "Centro Histórico",
    direccion: "Ex Pasaje Atahualpa, entre Jr. Del Comercio cdra. 10 y Jr. Belén cdra. 6",
    descripcion:
      "Corredor peatonal habilitado para actividades culturales, ferias y tránsito libre de vehículos en el centro de la ciudad, con espacios para descansar.",
    imagen: "/images/espacios/pasaje-de-la-cultura.webp",
    imagenAlt:
      "Corredor peatonal del Pasaje de la Cultura (ex Pasaje Atahualpa) en el centro de Cajamarca",
    sombra: "alta",
    asientos: true,
    agua: true,
    banos: true,
    rampas: true,
    iluminacion: "alta",
    horario: "07:00 – 21:00 h",
  },
  {
    id: 12,
    slug: "plazuela-la-recoleta",
    nombre: "Plazuela La Recoleta",
    tipo: "plaza",
    zona: "Centro Histórico",
    direccion: "Intersección de Av. de los Héroes y Av. El Maestro, junto al Convento de La Recoleta",
    descripcion:
      "Plazuela monumental contigua a la Iglesia y Convento de La Recoleta y la Plaza Toribio Casanova, con amplios espacios peatonales y sombra parcial.",
    imagen: "/images/espacios/plazuela-la-recoleta.webp",
    imagenAlt:
      "Iglesia y Convento de La Recoleta vistos desde la plazuela en Cajamarca",
    sombra: "media",
    asientos: true,
    agua: null,
    banos: false,
    rampas: true,
    iluminacion: "alta",
    horario: "Abierto las 24 horas",
  },
];

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function getAllSpaces() {
  return ESPACIOS;
}

export function findSpaceBySlug(slug) {
  if (!slug || typeof slug !== "string") return undefined;
  const normalized = slug.trim().toLowerCase();
  return ESPACIOS.find((espacio) => espacio.slug.toLowerCase() === normalized);
}

export function getFeaturedSpaces(count = 3) {
  return ESPACIOS.filter(
    (e) => e.sombra === "alta" && e.asientos === true,
  ).slice(0, count);
}

export function getTiposDisponibles() {
  return [...new Set(ESPACIOS.map((e) => e.tipo))];
}

/**
 * Filtra espacios combinando búsqueda en nombre/zona + tipo + sombra + asientos (lógica AND).
 * @param {{ query?: string, tipo?: string, sombra?: string, asientos?: string | boolean | null }} [filters]
 */
export function filterSpaces(filters = {}) {
  const {
    query = "",
    tipo = "todos",
    sombra = "todos",
    asientos = "todos",
  } = filters;
  const normalizedQuery = normalizeText(query);

  return ESPACIOS.filter((item) => {
    if (normalizedQuery !== "") {
      const matchNombre = normalizeText(item.nombre).includes(normalizedQuery);
      const matchZona = normalizeText(item.zona).includes(normalizedQuery);
      if (!matchNombre && !matchZona) return false;
    }

    if (tipo && tipo !== "todos" && item.tipo !== tipo) {
      return false;
    }

    if (sombra && sombra !== "todos" && item.sombra !== sombra) {
      return false;
    }

    if (asientos === true || asientos === "si") {
      if (item.asientos !== true) return false;
    } else if (asientos === false || asientos === "no") {
      if (item.asientos !== false) return false;
    }

    return true;
  });
}

/**
 * Formatea valores booleanos/null respetando la regla estricta: null => "Sin información".
 */
export function formatDisponibilidad(
  valor,
  { si = "Disponible", no = "No disponible" } = {},
) {
  if (valor === true) return si;
  if (valor === false) return no;
  return "Sin información";
}

export function formatNivel(valor) {
  const labels = { alta: "Alta", media: "Media", baja: "Baja" };
  if (valor && labels[valor]) return labels[valor];
  return "Sin información";
}
