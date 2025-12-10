const BASE_PATH = "./aem-demo";
const TEMPLATES_PATH = `${BASE_PATH}/templates`;
const COMPONENTS_PATH = `${BASE_PATH}/components`;

async function loadFragment(slotId, url, append = false) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} al cargar ${url}`);
    }

    const html = await res.text();
    const slot = document.getElementById(slotId);
    if (!slot) return;

    slot.innerHTML = append ? slot.innerHTML + html : html;
  } catch (err) {
    console.error(`[AEM-DEMO] Error cargando fragmento: ${url}`, err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Header global
  await loadFragment("header-slot", `${TEMPLATES_PATH}/header.html`);

  // 2) Detectar qué página estamos viendo
  const rawPath = location.pathname.split("/").pop(); // ej: "index.html", "gallery.html", "" (si es "/")
  const currentPage = rawPath === "" ? "index.html" : rawPath;

  const isHome = currentPage === "index.html";
  const isGallery = currentPage === "gallery.html";
  const isAbout = currentPage === "about.html";

  // 3) HOME
  if (isHome) {
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/home/hero.html`
    );
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/home/carrusel.html`,
      true
    );
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/home/services.html`,
      true
    );
  }

  // 4) GALLERY
  if (isGallery) {
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/gallery/grid.html`
    );
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/gallery/services.html`,
      true
    );
  }

  // 5) ABOUT
  if (isAbout) {
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/about/story.html`
    );
    await loadFragment(
      "content-slot",
      `${COMPONENTS_PATH}/about/review.html`,
      true
    );
  }

  // 6) Footer global
  await loadFragment("footer-slot", `${TEMPLATES_PATH}/footer.html`);
});
