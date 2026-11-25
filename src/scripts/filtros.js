import { ESPACIOS, filterSpaces } from "../data/espacios.js";

export function initExploradorFiltros() {
  const searchInput = document.getElementById("buscador-espacios");
  const tipoSelect = document.getElementById("filtro-tipo");
  const sombraSelect = document.getElementById("filtro-sombra");
  const asientosSelect = document.getElementById("filtro-asientos");
  const clearButtons = document.querySelectorAll("[data-limpiar-filtros]");
  const countElement = document.getElementById("contador-resultados");
  const emptyState = document.getElementById("estado-sin-resultados");
  const grid = document.getElementById("grid-espacios");
  const cards = Array.from(document.querySelectorAll("[data-espacio-card]"));

  // Toggle de panel de filtros en móvil
  const toggleBtn = document.getElementById("toggle-filtros-movil");
  const panelFiltros = document.getElementById("panel-filtros");

  if (toggleBtn && panelFiltros) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = panelFiltros.classList.contains("hidden");
      panelFiltros.classList.toggle("hidden", !isHidden);
      toggleBtn.setAttribute("aria-expanded", String(isHidden));
    });
  }

  if (
    !searchInput ||
    !tipoSelect ||
    !sombraSelect ||
    !asientosSelect ||
    !grid
  ) {
    return;
  }

  const total = ESPACIOS.length;

  function applyFilters() {
    const query = searchInput.value;
    const tipo = tipoSelect.value;
    const sombra = sombraSelect.value;
    const asientos = asientosSelect.value;

    const filtrados = filterSpaces({ query, tipo, sombra, asientos });
    const slugsVisibles = new Set(filtrados.map((e) => e.slug));

    for (const card of cards) {
      const slug = card.getAttribute("data-slug");
      card.classList.toggle("hidden", !slugsVisibles.has(slug));
    }

    const visibles = filtrados.length;
    if (countElement) {
      const textoEspacio = visibles === 1 ? "espacio" : "espacios";
      countElement.textContent = `Mostrando ${visibles} de ${total} ${textoEspacio}`;
    }

    if (emptyState) {
      emptyState.classList.toggle("hidden", visibles > 0);
    }
    grid.classList.toggle("hidden", visibles === 0);

    const hayFiltrosActivos =
      query.trim() !== "" ||
      tipo !== "todos" ||
      sombra !== "todos" ||
      asientos !== "todos";

    clearButtons.forEach((btn) => {
      if (btn.hasAttribute("data-limpiar-inline")) {
        btn.classList.toggle("hidden", !hayFiltrosActivos);
      }
    });
  }

  function resetFilters() {
    searchInput.value = "";
    tipoSelect.value = "todos";
    sombraSelect.value = "todos";
    asientosSelect.value = "todos";
    applyFilters();
    searchInput.focus();
  }

  searchInput.addEventListener("input", applyFilters);
  tipoSelect.addEventListener("change", applyFilters);
  sombraSelect.addEventListener("change", applyFilters);
  asientosSelect.addEventListener("change", applyFilters);
  clearButtons.forEach((btn) => btn.addEventListener("click", resetFilters));

  applyFilters();
}
