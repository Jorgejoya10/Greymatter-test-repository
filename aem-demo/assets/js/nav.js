(function () {
  function getHeader() {
    return document.querySelector(".header");
  }

  function toggleMenu(forceState) {
    const header = getHeader();
    if (!header) return;

    const burger = header.querySelector(".header__burger");
    const isOpen =
      typeof forceState === "boolean"
        ? forceState
        : !header.classList.contains("header--menu-open");

    header.classList.toggle("header--menu-open", isOpen);

    if (burger) {
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }

  document.addEventListener("click", (event) => {
    const burger = event.target.closest(".header__burger");
    const link = event.target.closest(".header__link");

    if (burger) {
      event.preventDefault();
      toggleMenu();
      return;
    }

    if (link) {
      toggleMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 769) {
      toggleMenu(false);
    }
  });
})();
