import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect } from "vitest";
import {
  ESPACIOS,
  getAllSpaces,
  findSpaceBySlug,
  getFeaturedSpaces,
  getTiposDisponibles,
  filterSpaces,
  formatDisponibilidad,
  formatNivel,
} from "../src/data/espacios.js";

describe("Modelo de datos src/data/espacios.js", () => {
  it("contiene al menos 12 espacios urbanos en al menos 3 categorías", () => {
    expect(getAllSpaces().length).toBeGreaterThanOrEqual(12);
    expect(getTiposDisponibles().length).toBeGreaterThanOrEqual(3);
  });

  it("tiene id y slug únicos y válidos en kebab-case", () => {
    const ids = new Set(ESPACIOS.map((e) => e.id));
    const slugs = new Set(ESPACIOS.map((e) => e.slug));
    expect(ids.size).toBe(ESPACIOS.length);
    expect(slugs.size).toBe(ESPACIOS.length);

    for (const espacio of ESPACIOS) {
      expect(espacio.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(espacio.nombre.length).toBeGreaterThan(2);
      expect(espacio.imagen).toMatch(
        /^\/images\/espacios\/.+\.(jpg|jpeg|png|webp)$/,
      );
      const imagePath = resolve(process.cwd(), "public", espacio.imagen.slice(1));
      expect(existsSync(imagePath)).toBe(true);
      expect(["baja", "media", "alta"]).toContain(espacio.sombra);
    }
  });

  it('preserva null para información no verificada y la formatea como "Sin información"', () => {
    const tieneNull = ESPACIOS.some(
      (e) => e.agua === null || e.banos === null || e.iluminacion === null,
    );
    expect(tieneNull).toBe(true);
    expect(formatDisponibilidad(null)).toBe("Sin información");
    expect(formatDisponibilidad(true)).toBe("Disponible");
    expect(formatDisponibilidad(false)).toBe("No disponible");
    expect(formatNivel(null)).toBe("Sin información");
    expect(formatNivel("alta")).toBe("Alta");
  });

  it("findSpaceBySlug encuentra registros válidos y retorna undefined para inexistentes", () => {
    const espacio = findSpaceBySlug("alameda-de-los-incas");
    expect(espacio?.nombre).toBe("Alameda de los Incas");
    expect(findSpaceBySlug("slug-inexistente-404")).toBeUndefined();
  });

  it("getFeaturedSpaces devuelve al menos 3 espacios destacados", () => {
    const destacados = getFeaturedSpaces();
    expect(destacados.length).toBe(3);
    expect(
      destacados.every((e) => e.sombra === "alta" && e.asientos === true),
    ).toBe(true);
  });
});

describe("Filtrado combinado filterSpaces()", () => {
  it("sin filtros devuelve el catálogo completo", () => {
    expect(filterSpaces()).toHaveLength(ESPACIOS.length);
  });

  it("filtra por nombre o zona ignorando mayúsculas y acentos", () => {
    const porZona = filterSpaces({ query: "historico" });
    expect(porZona.length).toBeGreaterThanOrEqual(2);
    expect(porZona.every((e) => e.zona.includes("Histórico"))).toBe(true);

    const porNombre = filterSpaces({ query: "ALAMEDA" });
    expect(porNombre.length).toBeGreaterThanOrEqual(2);
  });

  it("combina tipo + sombra + asientos con intersección lógica AND", () => {
    const resultado = filterSpaces({
      tipo: "parque",
      sombra: "alta",
      asientos: true,
    });
    expect(resultado.length).toBeGreaterThanOrEqual(2);
    for (const item of resultado) {
      expect(item.tipo).toBe("parque");
      expect(item.sombra).toBe("alta");
      expect(item.asientos).toBe(true);
    }
  });

  it("retorna arreglo vacío cuando no existen coincidencias", () => {
    const sinResultados = filterSpaces({
      tipo: "mirador",
      sombra: "baja",
      asientos: false,
    });
    expect(sinResultados).toEqual([]);
  });
});
