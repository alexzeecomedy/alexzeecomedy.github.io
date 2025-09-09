async function fetchSteamStatus() {
  try {
    const res = await fetch(
      "https://falling-shape-beda.loliyas-previos.workers.dev/"
    );
    const data = await res.json();

    const player = data.response.players[0];
    const el = document.getElementById("steam-status");

    if (player?.gameextrainfo) {
      el.innerHTML = `🎮 Now playing: <strong>${player.gameextrainfo}</strong>`;
    } else {
      el.innerText = `Alex is not in-game.`;
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