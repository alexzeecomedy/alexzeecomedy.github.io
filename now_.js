document.body.classList.remove("no-js"),
  (async function () {
    try {
      let t = await (await fetch("/pages/now/playing/wordle.html")).text(),
        e = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-wordle");
      document.getElementById("wordle-area").innerHTML = e
        ? e.innerHTML
        : "Content section not found.";
    } catch (n) {
      console.error("Error fetching content:", n),
        (document.getElementById("wordle-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let t = await (await fetch("/pages/now/playing/connections.html")).text(),
        e = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-connections");
      document.getElementById("connections-area").innerHTML = e
        ? e.innerHTML
        : "Content section not found.";
    } catch (n) {
      console.error("Error fetching content:", n),
        (document.getElementById("connections-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let t = await (await fetch("/pages/notes/index.html")).text(),
        e = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-note");
      document.getElementById("note-area").innerHTML = e
        ? e.innerHTML
        : "Content section not found.";
    } catch (n) {
      console.error("Error fetching content:", n),
        (document.getElementById("note-area").innerHTML =
          "Failed to load content.");
    }
  })(),
  (async function () {
    try {
      let t = await (await fetch("/pages/blog/index.html")).text(),
        e = new DOMParser()
          .parseFromString(t, "text/html")
          .getElementById("latest-blog");
      document.getElementById("blog-area").innerHTML = e
        ? e.innerHTML
        : "Content section not found.";
    } catch (n) {
      console.error("Error fetching content:", n),
        (document.getElementById("blog-area").innerHTML =
          "Failed to load content.");
    }
  })();
