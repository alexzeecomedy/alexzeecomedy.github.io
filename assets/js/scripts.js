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
            // Fallback for environments that might not support Clipboard API fully
            fallbackCopyTextToClipboard(address, this);
          });
      } else {
        // Fallback for older browsers
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
      // Optionally provide user feedback that copy failed
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
}); // End of DOMContentLoaded

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Helper: set theme
  function setTheme(theme) {
    body.classList.remove("light", "dark");
    if (theme === "light") body.classList.add("light");
    else if (theme === "dark") body.classList.add("dark");
    // else: auto, no class, use system
  }

  // Load saved theme or auto
  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme);

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

    // Optionally update button text/icon
    themeToggle.textContent =
      next === "auto"
        ? '<i class="fa-solid fa-circle-half-stroke"></i>'
        : next === "dark"
        ? '<i class="fa-solid fa-circle"></i>'
        : '<i class="fa-solid fa-sun"></i>';
  });

  // Set initial button icon
  let initial = body.classList.contains("dark")
    ? "dark"
    : body.classList.contains("light")
    ? "light"
    : "auto";
  themeToggle.textContent =
    initial === "auto"
      ? '<i class="fa-solid fa-circle-half-stroke"></i>'
      : initial === "dark"
      ? '<i class="fa-solid fa-circle"></i>'
      : '<i class="fa-solid fa-sun"></i>';
});
