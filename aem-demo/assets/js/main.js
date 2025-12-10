async function loadFragment(slotId, url, append = false) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} al cargar ${url}`);
    }

    const html = await res.text();
    const slot = document.getElementById(slotId);

    if (!slot) return;

    if (append) {
      slot.innerHTML += html;
    } else {
      slot.innerHTML = html;
    }
  } catch (err) {
    console.error(`[AEM-DEMO] Error cargando fragmento: ${url}`, err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Header global (layout)
  await loadFragment("header-slot", "./aem-demo/templates/header.html");

  // 2. Contenido de la HOME (en orden)
  await loadFragment("content-slot", "./aem-demo/components/home/hero.html");
  await loadFragment(
    "content-slot",
    "./aem-demo/components/home/carrusel.html",
    true
  );
  await loadFragment(
    "content-slot",
    "./aem-demo/components/home/services.html",
    true
  );

  // 3. Footer global (layout)
  await loadFragment("footer-slot", "./aem-demo/templates/footer.html");
});
