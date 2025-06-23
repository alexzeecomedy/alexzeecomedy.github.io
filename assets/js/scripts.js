document.addEventListener("DOMContentLoaded", function () {
  // --- Copy Buttons Functionality ---
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const address = this.getAttribute("data-address");

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(address)
          .then(() => showCopyFeedback(this))
          .catch((err) => {
            console.error("Failed to copy text: ", err);
            fallbackCopyTextToClipboard(address, this);
          });
      } else {
        fallbackCopyTextToClipboard(address, this);
      }
    });
  });

  function fallbackCopyTextToClipboard(text, buttonElement) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showCopyFeedback(buttonElement);
    } catch (err) {
      console.error("Unable to copy text using execCommand: ", err);
    }
    document.body.removeChild(tempInput);
  }

  function showCopyFeedback(buttonElement) {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
    buttonElement.classList.add("copied");

    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.classList.remove("copied");
    }, 2000);
  }

  // --- Navigation Toggle Functionality ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("active");

      const expanded =
        navToggle.getAttribute("aria-expanded") === "true" || false;
      navToggle.setAttribute("aria-expanded", !expanded);
    });
  } else {
    console.warn(
      "Nav toggle or nav links not found. Hamburger menu may not function."
    );
  }

  // --- Theme Toggle Functionality ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  function setTheme(theme) {
    body.classList.remove("light", "dark");
    if (theme === "light") body.classList.add("light");
    else if (theme === "dark") body.classList.add("dark");
  }

  function updateThemeButton(theme) {
    const icons = {
      auto: '<i class="fa-solid fa-circle-half-stroke"></i>',
      dark: '<i class="fa-solid fa-circle"></i>',
      light: '<i class="fa-solid fa-sun"></i>',
    };
    themeToggle.innerHTML = icons[theme];
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);

    const currentTheme = body.classList.contains("dark")
      ? "dark"
      : body.classList.contains("light")
      ? "light"
      : "auto";
    updateThemeButton(currentTheme);

    themeToggle.addEventListener("click", function () {
      const current = body.classList.contains("dark")
        ? "dark"
        : body.classList.contains("light")
        ? "light"
        : "auto";

      const themeOrder = { auto: "dark", dark: "light", light: "auto" };
      const next = themeOrder[current];

      setTheme(next);
      if (next === "auto") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", next);
      }
      updateThemeButton(next);
    });
  }

  // --- Breadcrumb Generation ---
  function generateBreadcrumbs() {
    const breadcrumbNav = document.querySelector(".breadcrumb-nav");
    if (!breadcrumbNav) return;

    const path = window.location.pathname;
    const pathSegments = path.split("/").filter((segment) => segment);
    const breadcrumbList = breadcrumbNav.querySelector(".breadcrumb-list");

    breadcrumbList.innerHTML = "";

    // Home breadcrumb
    const homeItem = document.createElement("li");
    homeItem.className = "breadcrumb-item";
    homeItem.innerHTML = '<a href="https://alexzeecomedy.com">Home</a>';
    breadcrumbList.appendChild(homeItem);

    // Path breadcrumbs
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += "/" + segment;

      const item = document.createElement("li");
      item.className = "breadcrumb-item";

      let displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (displayName === "Index") displayName = "Blog";

      const isLast = index === pathSegments.length - 1;
      const ariaCurrent = isLast ? ' aria-current="page"' : "";

      item.innerHTML = `<a href="https://alexzeecomedy.com${currentPath}"${ariaCurrent}>${displayName}</a>`;
      breadcrumbList.appendChild(item);
    });
  }

  generateBreadcrumbs();
});
