(function () {
  "use strict";

  const WEBRING_DATA_URL =
    "https://alexzeecomedy.com/pages/webring/members.json";
  const WEBRING_HOME = "https://alexzeecomedy.com/pages/webring/";

  // Get current site's domain
  function getCurrentDomain() {
    return window.location.protocol + "//" + window.location.hostname;
  }

  // Navigate to next, previous, or random site
  function navigate(members, direction, currentSite) {
    const currentIndex = members.findIndex(
      (member) =>
        member.url === currentSite ||
        member.url.includes(window.location.hostname)
    );

    let targetIndex;

    switch (direction) {
      case "prev":
        targetIndex = currentIndex <= 0 ? members.length - 1 : currentIndex - 1;
        break;
      case "next":
        targetIndex = currentIndex >= members.length - 1 ? 0 : currentIndex + 1;
        break;
      case "random":
        do {
          targetIndex = Math.floor(Math.random() * members.length);
        } while (targetIndex === currentIndex && members.length > 1);
        break;
      default:
        return;
    }

    window.open(members[targetIndex].url, "_blank");
  }

  // Create the webring widget HTML
  function createWidget(webringData) {
    const currentSite = getCurrentDomain();
    const members = webringData.webring.members;

    const widget = document.createElement("div");
    widget.className = "comedy-webring-widget";
    widget.innerHTML = `
      <div class="webring-content">
        <p class="webring-title">🎭 <strong>${webringData.webring.name}</strong></p>
        <div class="webring-nav">
          <button onclick="comedyWebring.navigate('prev')">← Prev</button>
          <button onclick="comedyWebring.navigate('random')">🎲 Random</button>
          <button onclick="comedyWebring.navigate('next')">Next →</button>
          <a href="${WEBRING_HOME}" target="_blank">🏠 Directory</a>
        </div>
        <p class="webring-description">${webringData.webring.description}</p>
      </div>
    `;

    // Store data globally for navigation
    window.comedyWebring = {
      data: webringData,
      navigate: function (direction) {
        navigate(members, direction, currentSite);
      },
    };

    return widget;
  }

  // Load webring data and insert widget
  function initWebring() {
    fetch(WEBRING_DATA_URL)
      .then((response) => response.json())
      .then((data) => {
        const widget = createWidget(data);

        // Try to find existing webring container
        let container = document.getElementById("webring-widget");
        if (!container) {
          // If no container found, append to body
          container = document.body;
        }

        container.appendChild(widget);
      })
      .catch((error) => {
        console.error("Failed to load webring data:", error);
      });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebring);
  } else {
    initWebring();
  }
})();
