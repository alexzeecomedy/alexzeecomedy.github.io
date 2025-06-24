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
});
