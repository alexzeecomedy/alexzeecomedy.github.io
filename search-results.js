document.addEventListener("DOMContentLoaded", () => {
  let e = document.getElementById("searchInputOnResults"),
    t = document.getElementById("searchResultsContainer"),
    n = new URLSearchParams(window.location.search),
    r = n.get("q");
  r
    ? ((e.value = r), s(r))
    : (t.innerHTML = "<p>Please enter a search term.</p>");
  let a = document.getElementById("searchFormOnResults");
  function s(e) {
    fetch("/search-data.json")
      .then((e) => e.json())
      .then((t) => {
        let n = t.filter(
          (t) =>
            t.title.toLowerCase().includes(e.toLowerCase()) ||
            t.content.toLowerCase().includes(e.toLowerCase())
        );
        l(n);
      })
      .catch((e) => {
        console.error("Error loading search data:", e),
          (t.innerHTML = "<p>An error occurred while searching.</p>");
      });
  }
  function l(e) {
    if (((t.innerHTML = ""), 0 === e.length)) {
      t.innerHTML = "<p>No results found for your search.</p>";
      return;
    }
    e.forEach((e) => {
      let n = document.createElement("div");
      (n.innerHTML = `
                <h3><a href="${e.url}">${e.title}</a></h3>
                <p>${e.content.substring(0, 150)}...</p> <!-- Show a snippet -->
            `),
        t.appendChild(n);
    });
  }
  a.addEventListener("submit", (n) => {
    n.preventDefault();
    let r = e.value.trim();
    if (r) {
      let a = encodeURIComponent(r);
      window.location.href = `/test.html?q=${a}`;
    } else t.innerHTML = "<p>Please enter a search term.</p>";
  });
});
