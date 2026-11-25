import { describe, it, expect } from "vitest";
import {
  FAVORITOS_KEY,
  MAX_COMPARADOR,
  getFavoritos,
  toggleFavorito,
  removeFavorito,
  getComparador,
  toggleComparador,
  removeFromComparador,
  clearComparador,
} from "../src/scripts/storage.js";

function createMockStorage(initial = {}) {
  const store = new Map(Object.entries(initial));
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
}

describe("Persistencia defensiva storage.js", () => {
  it("retorna arreglo vacío si localStorage está vacío o contiene JSON corrupto", () => {
    expect(getFavoritos(createMockStorage())).toEqual([]);
    expect(
      getFavoritos(createMockStorage({ [FAVORITOS_KEY]: "{json-corrupto" })),
    ).toEqual([]);
    expect(
      getFavoritos(createMockStorage({ [FAVORITOS_KEY]: '{"no":"array"}' })),
    ).toEqual([]);
  });

  it("no arroja errores cuando localStorage está bloqueado", () => {
    const blocked = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    expect(() => getFavoritos(blocked)).not.toThrow();
    expect(() => toggleFavorito("alameda-de-los-incas", blocked)).not.toThrow();
  });

  it("agrega, persiste y elimina favoritos correctamente", () => {
    const storage = createMockStorage();
    const res1 = toggleFavorito("alameda-de-los-incas", storage);
    expect(res1.activo).toBe(true);
    expect(getFavoritos(storage)).toEqual(["alameda-de-los-incas"]);

    toggleFavorito("plaza-de-armas-cajamarca", storage);
    expect(getFavoritos(storage)).toHaveLength(2);

    removeFavorito("alameda-de-los-incas", storage);
    expect(getFavoritos(storage)).toEqual(["plaza-de-armas-cajamarca"]);
  });

  it("limita el comparador a 3 espacios y bloquea el cuarto", () => {
    const storage = createMockStorage();
    expect(toggleComparador("espacio-1", storage).ok).toBe(true);
    expect(toggleComparador("espacio-2", storage).ok).toBe(true);
    expect(toggleComparador("espacio-3", storage).ok).toBe(true);
    expect(getComparador(storage)).toHaveLength(MAX_COMPARADOR);

    const cuarto = toggleComparador("espacio-4", storage);
    expect(cuarto.ok).toBe(false);
    expect(cuarto.reason).toBe("limit");
    expect(getComparador(storage)).toHaveLength(3);

    removeFromComparador("espacio-2", storage);
    expect(getComparador(storage)).toHaveLength(2);

    clearComparador(storage);
    expect(getComparador(storage)).toEqual([]);
  });
});
