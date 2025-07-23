document.body.classList.remove("no-js"),
  (async function () {
    try {
      let e = await fetch("/pages/now/playing/index.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("now-playing");
      document.getElementById("now-playing-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("now-playing-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let e = await fetch("/pages/now/reading.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("now-reading");
      document.getElementById("reading-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("reading-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let e = await fetch("/pages/now/listening.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("now-listening");
      document.getElementById("listening-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("listening-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let e = await fetch("/pages/now/watching.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("now-watching");
      document.getElementById("watching-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("watching-area").innerHTML =
          "Failed to load content.");
    }
  })();
