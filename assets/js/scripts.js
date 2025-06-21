document.addEventListener("DOMContentLoaded", function () {
  // --- Copy Buttons Functionality ---
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const address = this.getAttribute("data-address");

      // Use Clipboard API for better modern support, fallback to execCommand
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(address)
          .then(() => {
            showCopyFeedback(this);
          })
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

      // Accessibility: Update aria-expanded attribute
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
    // else: auto, no class, use system
  }

  function updateThemeButton(theme) {
    themeToggle.innerHTML =
      theme === "auto"
        ? '<i class="fa-solid fa-circle-half-stroke"></i>'
        : theme === "dark"
        ? '<i class="fa-solid fa-circle"></i>'
        : '<i class="fa-solid fa-sun"></i>';
  }

  if (themeToggle) {
    // Load saved theme or auto
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);

    // Set initial button icon
    let initial = body.classList.contains("dark")
      ? "dark"
      : body.classList.contains("light")
      ? "light"
      : "auto";
    updateThemeButton(initial);

    // Toggle logic
    themeToggle.addEventListener("click", function () {
      let current = body.classList.contains("dark")
        ? "dark"
        : body.classList.contains("light")
        ? "light"
        : "auto";

      let next;
      if (current === "auto") next = "dark";
      else if (current === "dark") next = "light";
      else next = "auto";

      setTheme(next);
      if (next === "auto") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);

      updateThemeButton(next);
    });
  }

  // Add to your DOMContentLoaded event listener
  function generateBreadcrumbs() {
    const path = window.location.pathname;
    const breadcrumbNav = document.querySelector(".breadcrumb-nav");

    if (!breadcrumbNav) return;

    const pathSegments = path.split("/").filter((segment) => segment);
    const breadcrumbList = breadcrumbNav.querySelector(".breadcrumb-list");

    // Clear existing breadcrumbs
    breadcrumbList.innerHTML = "";

    // Always start with Home
    const homeItem = document.createElement("li");
    homeItem.className = "breadcrumb-item";
    homeItem.innerHTML = '<a href="https://alexzeecomedy.com">Home</a>';
    breadcrumbList.appendChild(homeItem);

    // Build breadcrumb path
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += "/" + segment;

      const item = document.createElement("li");
      item.className = "breadcrumb-item";

      // Format segment name
      let displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (displayName === "Index") displayName = "Blog";

      const isLast = index === pathSegments.length - 1;

      if (isLast) {
        item.innerHTML = `<a href="https://alexzeecomedy.com${currentPath}" aria-current="page">${displayName}</a>`;
      } else {
        item.innerHTML = `<a href="https://alexzeecomedy.com${currentPath}">${displayName}</a>`;
      }

      breadcrumbList.appendChild(item);
    });
  }

  // Call the function
  generateBreadcrumbs();
});
