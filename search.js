document.addEventListener("DOMContentLoaded", () => {
  let e = document.getElementById("searchForm"),
    t = document.getElementById("searchInput");
  e.addEventListener("submit", (e) => {
    e.preventDefault();
    let n = t.value.trim();
    if (n) {
      let l = encodeURIComponent(n);
      window.location.href = `/test.html?q=${l}`;
    }
  });
});
