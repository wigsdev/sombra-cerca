export const FAVORITOS_KEY = "sombra_cerca_favoritos_v1";
export const COMPARADOR_KEY = "sombra_cerca_comparador_v1";
export const MAX_COMPARADOR = 3;

const memoryFallback = new Map();

function getDefaultStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    // Acceso bloqueado por políticas de privacidad
  }
  return null;
}

export function readSlugList(key, storage = getDefaultStorage()) {
  try {
    const raw = storage ? storage.getItem(key) : memoryFallback.get(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed.filter((item) => typeof item === "string" && item.trim() !== ""),
      ),
    ];
  } catch {
    return [];
  }
}

export function writeSlugList(key, list, storage = getDefaultStorage()) {
  const clean = [
    ...new Set(
      list.filter((item) => typeof item === "string" && item.trim() !== ""),
    ),
  ];
  const serialized = JSON.stringify(clean);
  try {
    if (storage) {
      storage.setItem(key, serialized);
    } else {
      memoryFallback.set(key, serialized);
    }
  } catch {
    memoryFallback.set(key, serialized);
  }
  return clean;
}

// --- Favoritos (RF-04) ---

export function getFavoritos(storage) {
  return readSlugList(FAVORITOS_KEY, storage);
}

export function isFavorito(slug, storage) {
  return getFavoritos(storage).includes(slug);
}

export function toggleFavorito(slug, storage) {
  const actuales = getFavoritos(storage);
  const existe = actuales.includes(slug);
  const siguientes = existe
    ? actuales.filter((item) => item !== slug)
    : [...actuales, slug];
  const favoritos = writeSlugList(FAVORITOS_KEY, siguientes, storage);
  return { favoritos, activo: !existe };
}

export function removeFavorito(slug, storage) {
  const siguientes = getFavoritos(storage).filter((item) => item !== slug);
  return writeSlugList(FAVORITOS_KEY, siguientes, storage);
}

// --- Comparador (RF-05, máx. 3) ---

export function getComparador(storage) {
  return readSlugList(COMPARADOR_KEY, storage).slice(0, MAX_COMPARADOR);
}

export function toggleComparador(slug, storage) {
  const actuales = getComparador(storage);
  if (actuales.includes(slug)) {
    const slugs = writeSlugList(
      COMPARADOR_KEY,
      actuales.filter((item) => item !== slug),
      storage,
    );
    return { ok: true, activo: false, reason: "removed", slugs };
  }

  if (actuales.length >= MAX_COMPARADOR) {
    return { ok: false, activo: false, reason: "limit", slugs: actuales };
  }

  const slugs = writeSlugList(COMPARADOR_KEY, [...actuales, slug], storage);
  return { ok: true, activo: true, reason: "added", slugs };
}

export function removeFromComparador(slug, storage) {
  const siguientes = getComparador(storage).filter((item) => item !== slug);
  return writeSlugList(COMPARADOR_KEY, siguientes, storage);
}

export function clearComparador(storage) {
  return writeSlugList(COMPARADOR_KEY, [], storage);
}
