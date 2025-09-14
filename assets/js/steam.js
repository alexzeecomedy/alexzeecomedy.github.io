async function fetchSteamStatus() {
  try {
    const res = await fetch("https://falling-shape-beda.loliyas-previos.workers.dev/");
    const data = await res.json();

    const el = document.getElementById("steam-status");

    if (data.nowPlaying) {
      // Show currently playing game
      el.innerHTML = `🎮 Now playing: <strong>${data.nowPlaying.name}</strong>`;
    } else if (data.lastPlayed) {
      // Convert minutes -> hours (rounded)
      const hours = (data.lastPlayed.playtime_forever / 60).toFixed(1);
      el.innerHTML = `🕹️ Last played: <strong>${data.lastPlayed.name}</strong><br><small>Total playtime: ${hours} hrs</small>`;
    } else {
      el.innerText = "Alex has no recent activity.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("steam-status").innerText =
      "Error loading Steam status.";
  }
}

// Run once and refresh every 60s
fetchSteamStatus();
setInterval(fetchSteamStatus, 60000);