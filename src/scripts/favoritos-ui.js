import { getFavoritos, toggleFavorito } from "./storage.js";

export function syncFavoritosUI() {
  const favs = new Set(getFavoritos());

  // 1. Actualizar contador en Header (desktop y móvil)
  document.querySelectorAll("[data-fav-count]").forEach((badge) => {
    badge.textContent = String(favs.size);
    badge.classList.toggle("hidden", favs.size === 0);
  });

  // 2. Actualizar todos los botones de favorito (tarjetas y ficha detalle)
  document.querySelectorAll("[data-fav-btn]").forEach((btn) => {
    const slug = btn.getAttribute("data-slug");
    const nombre = btn.getAttribute("data-nombre") || "este espacio";
    const activo = Boolean(slug && favs.has(slug));
    const isDetail = btn.hasAttribute("data-fav-detail");

    btn.setAttribute("aria-pressed", String(activo));
    btn.setAttribute(
      "aria-label",
      activo
        ? `Quitar ${nombre} de favoritos`
        : `Guardar ${nombre} en favoritos`,
    );

    const icon = btn.querySelector("[data-fav-icon]");
    if (icon) {
      icon.setAttribute("fill", activo ? "currentColor" : "none");
    }

    const label = btn.querySelector("[data-fav-label]");
    if (label) {
      label.textContent = isDetail
        ? activo
          ? "Guardado en favoritos"
          : "Guardar en favoritos"
        : activo
          ? "En favoritos"
          : "Guardar";
    }

    if (isDetail) {
      btn.classList.toggle("bg-amber-50", activo);
      btn.classList.toggle("border-amber-300", activo);
      btn.classList.toggle("text-amber-900", activo);
      btn.classList.toggle("bg-white", !activo);
      btn.classList.toggle("border-slate-300", !activo);
      btn.classList.toggle("text-primary-900", !activo);
    } else {
      btn.classList.toggle("bg-amber-500", activo);
      btn.classList.toggle("text-white", activo);
      btn.classList.toggle("bg-white/95", !activo);
      btn.classList.toggle("text-primary-900", !activo);
    }
  });

  // 3. Sincronizar vista dedicada /favoritos/ si está montada
  const favGrid = document.getElementById("grid-favoritos");
  const favEmpty = document.getElementById("estado-favoritos-vacio");
  const favCountText = document.getElementById("contador-favoritos");

  if (favGrid) {
    const cards = Array.from(favGrid.querySelectorAll("[data-espacio-card]"));
    let visibles = 0;

    for (const card of cards) {
      const slug = card.getAttribute("data-slug");
      const visible = Boolean(slug && favs.has(slug));
      card.classList.toggle("hidden", !visible);
      if (visible) visibles += 1;
    }

    favGrid.classList.toggle("hidden", visibles === 0);
    if (favEmpty) {
      favEmpty.classList.toggle("hidden", visibles > 0);
    }
    if (favCountText) {
      const palabra =
        visibles === 1 ? "espacio guardado" : "espacios guardados";
      favCountText.textContent = `${visibles} ${palabra}`;
    }
  }
}

export function initFavoritosUI() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest("[data-fav-btn]");
    if (!btn) return;

    const slug = btn.getAttribute("data-slug");
    if (!slug) return;

    toggleFavorito(slug);
    syncFavoritosUI();
  });

  window.addEventListener("storage", syncFavoritosUI);
  syncFavoritosUI();
}
