import {
  findSpaceBySlug,
  formatDisponibilidad,
  formatNivel,
} from "../data/espacios.js";
import {
  MAX_COMPARADOR,
  getComparador,
  toggleComparador,
  removeFromComparador,
  clearComparador,
} from "./storage.js";

let avisoTimeout = null;

function showLimitNotice() {
  const aviso = document.getElementById("comparador-aviso");
  if (!aviso) return;

  aviso.classList.remove("hidden");
  if (avisoTimeout) clearTimeout(avisoTimeout);
  avisoTimeout = setTimeout(() => {
    aviso.classList.add("hidden");
  }, 4000);
}

function renderTablaComparativa(espacios) {
  const vacio = document.getElementById("comparador-vacio");
  const tablaWrap = document.getElementById("comparador-tabla-wrap");
  const thead = document.getElementById("comparador-thead");
  const tbody = document.getElementById("comparador-tbody");

  if (!vacio || !tablaWrap || !thead || !tbody) return;

  const tieneElementos = espacios.length > 0;
  vacio.classList.toggle("hidden", tieneElementos);
  tablaWrap.classList.toggle("hidden", !tieneElementos);

  if (!tieneElementos) {
    thead.textContent = "";
    tbody.textContent = "";
    return;
  }

  // Cabecera con foto, nombre, enlace a ficha y botón quitar
  thead.textContent = "";
  const headerRow = document.createElement("tr");

  const cornerTh = document.createElement("th");
  cornerTh.scope = "col";
  cornerTh.className =
    "w-40 p-4 text-xs font-bold uppercase tracking-wide text-neutral-muted";
  cornerTh.textContent = "Característica";
  headerRow.appendChild(cornerTh);

  for (const esp of espacios) {
    const th = document.createElement("th");
    th.scope = "col";
    th.className = "p-4 align-top";

    const box = document.createElement("div");
    box.className = "space-y-2";

    const img = document.createElement("img");
    img.src = esp.imagen;
    img.alt = esp.imagenAlt;
    img.className = "h-28 w-full rounded-lg object-cover";
    box.appendChild(img);

    const link = document.createElement("a");
    link.href = `/espacios/${esp.slug}/`;
    link.className = "block text-sm font-bold text-primary-900 hover:underline";
    link.textContent = esp.nombre;
    box.appendChild(link);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.setAttribute("data-comparador-quitar", esp.slug);
    removeBtn.className =
      "text-xs font-semibold text-accent-terracota hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 rounded";
    removeBtn.textContent = "Quitar de comparación";
    box.appendChild(removeBtn);

    th.appendChild(box);
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);

  // Filas de los 7 atributos obligatorios (RF-05)
  const filas = [
    {
      label: "Tipo",
      getValue: (e) => e.tipo.charAt(0).toUpperCase() + e.tipo.slice(1),
    },
    { label: "Sombra", getValue: (e) => formatNivel(e.sombra) },
    { label: "Asientos", getValue: (e) => formatDisponibilidad(e.asientos) },
    { label: "Agua potable", getValue: (e) => formatDisponibilidad(e.agua) },
    { label: "Baños públicos", getValue: (e) => formatDisponibilidad(e.banos) },
    { label: "Rampas", getValue: (e) => formatDisponibilidad(e.rampas) },
    { label: "Iluminación", getValue: (e) => formatNivel(e.iluminacion) },
  ];

  tbody.textContent = "";
  for (const fila of filas) {
    const tr = document.createElement("tr");
    tr.className = "odd:bg-white even:bg-neutral-surface/60";

    const th = document.createElement("th");
    th.scope = "row";
    th.className = "p-4 font-semibold text-primary-900";
    th.textContent = fila.label;
    tr.appendChild(th);

    for (const esp of espacios) {
      const td = document.createElement("td");
      const val = fila.getValue(esp);
      td.className =
        val === "Sin información"
          ? "p-4 font-medium text-neutral-muted italic"
          : "p-4 font-medium text-neutral-text";
      td.textContent = val;
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
}

export function syncComparadorUI() {
  const slugs = getComparador();
  const selectedSet = new Set(slugs);
  const espacios = slugs.map((slug) => findSpaceBySlug(slug)).filter(Boolean);

  // 1. Botones de comparar en tarjetas y ficha
  document.querySelectorAll("[data-compare-btn]").forEach((btn) => {
    const slug = btn.getAttribute("data-slug");
    const nombre = btn.getAttribute("data-nombre") || "este espacio";
    const activo = Boolean(slug && selectedSet.has(slug));

    btn.setAttribute("aria-pressed", String(activo));
    btn.setAttribute(
      "aria-label",
      activo
        ? `Quitar ${nombre} del comparador`
        : `Agregar ${nombre} al comparador`,
    );

    const label = btn.querySelector("[data-compare-label]");
    if (label) {
      label.textContent = activo ? "En comparador" : "Comparar";
    }

    btn.classList.toggle("bg-emerald-50", activo);
    btn.classList.toggle("border-primary-700", activo);
    btn.classList.toggle("text-primary-900", activo);
    btn.classList.toggle("bg-white", !activo);
    btn.classList.toggle("border-slate-300", !activo);
    btn.classList.toggle("text-neutral-text", !activo);
  });

  // 2. Contadores globales y barra flotante
  const bar = document.getElementById("comparador-bar");
  const barCount = document.getElementById("comparador-bar-count");
  const chipsContainer = document.getElementById("comparador-chips");

  document.querySelectorAll("[data-comparador-count]").forEach((el) => {
    el.textContent = `${espacios.length}/${MAX_COMPARADOR}`;
  });

  if (barCount) barCount.textContent = String(espacios.length);
  if (bar) bar.classList.toggle("hidden", espacios.length === 0);

  if (chipsContainer) {
    chipsContainer.textContent = "";
    for (const esp of espacios) {
      const chip = document.createElement("span");
      chip.className =
        "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = esp.nombre;
      chip.appendChild(nameSpan);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-comparador-quitar", esp.slug);
      btn.setAttribute("aria-label", `Quitar ${esp.nombre} del comparador`);
      btn.className =
        "rounded-full px-1 text-emerald-200 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
      btn.textContent = "×";
      chip.appendChild(btn);

      chipsContainer.appendChild(chip);
    }
  }

  // 3. Tabla dentro del modal
  renderTablaComparativa(espacios);
}

export function initComparadorUI() {
  const modal = document.getElementById("comparador-modal");

  function openModal() {
    if (!modal) return;
    syncComparadorUI();
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const compareBtn = target.closest("[data-compare-btn]");
    if (compareBtn) {
      const slug = compareBtn.getAttribute("data-slug");
      if (!slug) return;
      const result = toggleComparador(slug);
      if (!result.ok && result.reason === "limit") {
        showLimitNotice();
      }
      syncComparadorUI();
      return;
    }

    const removeBtn = target.closest("[data-comparador-quitar]");
    if (removeBtn) {
      const slug = removeBtn.getAttribute("data-comparador-quitar");
      if (slug) {
        removeFromComparador(slug);
        syncComparadorUI();
      }
      return;
    }

    if (target.closest("[data-comparador-limpiar]")) {
      clearComparador();
      syncComparadorUI();
      return;
    }

    if (target.closest("[data-comparador-abrir]")) {
      openModal();
      return;
    }

    if (target.closest("[data-comparador-cerrar]") || target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  window.addEventListener("storage", syncComparadorUI);
  syncComparadorUI();
}
