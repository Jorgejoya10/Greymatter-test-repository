(function () {
  let modalEl = null;

  function createModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement("div");
    modalEl.id = "hire-modal";
    modalEl.className = "hire-modal";

    modalEl.innerHTML = `
      <div class="hire-modal__backdrop" data-hire-close></div>
      <div class="hire-modal__dialog">
        <button class="hire-modal__close" type="button" data-hire-close>×</button>
        <h2 class="hire-modal__title">This shop is a demo 💐</h2>
        <p class="hire-modal__text">
          I built this storefront as an AEM-style component demo: templates, reusable components
          and responsive layouts.
        </p>
        <p class="hire-modal__text">
          If you want this to become a real e-commerce (cart, checkout, payments, auth,
          integrations…) there’s only one step left:
        </p>
        <p class="hire-modal__highlight">
          👉 Unlock my full power and hire me as your AEM / Frontend Developer. 
        </p>
        <p>Sincerely Jorge Joya.</p>
        <a
          href="https://www.linkedin.com/in/jorge-joya-/"
          target="_blank"
          rel="noopener noreferrer"
          class="hire-modal__button"
        >
          Contact me on LinkedIn
        </a>
      </div>
    `;

    document.body.appendChild(modalEl);
    return modalEl;
  }

  function openModal() {
    const modal = createModal();
    modal.classList.add("is-open");
  }

  function closeModal() {
    if (modalEl) {
      modalEl.classList.remove("is-open");
    }
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("#shop-now-cta");
    if (trigger) {
      event.preventDefault();
      openModal();
      return;
    }

    if (event.target.matches("[data-hire-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
})();
