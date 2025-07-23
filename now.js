document.body.classList.remove("no-js"),
  (async function () {
    try {
      let e = await fetch("/pages/now/playing/wordle.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-wordle");
      document.getElementById("wordle-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("wordle-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let e = await fetch("/pages/now/playing/connections.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-connections");
      document.getElementById("connections-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("connections-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let e = await fetch("/pages/notes/index.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-note");
      document.getElementById("note-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("note-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let e = await fetch("/pages/blog/index.html"),
        t = await e.text(),
        n = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-blog");
      document.getElementById("blog-area").innerHTML = n
        ? n.innerHTML
        : "Content section not found.";
    } catch (e) {
      console.error("Error fetching content:", e),
        (document.getElementById("blog-area").innerHTML =
          "Failed to load content.");
    }
  })();
