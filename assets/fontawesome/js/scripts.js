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

  // --- Random Hero Image Functionality ---
  const heroImageElement = document.querySelector(".hero-image");
  if (heroImageElement) {
    // Adjust these paths to correctly point to your hero images
    const images = [
      "/phatsammys1.webp",
      "/images/hero/second-hero-image.webp", // Example path
      "/images/hero/third-hero-image.webp", // Example path
    ];

    // Select a random image
    const randomIndex = Math.floor(Math.random() * images.length);
    // Set the src attribute, ensuring it's a valid path
    heroImageElement.src = images[randomIndex];
  } else {
    console.warn("Hero image element not found.");
  }
}); // End of DOMContentLoaded
