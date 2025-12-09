document.addEventListener("DOMContentLoaded", () => {
  // Horloge temps réel
  function updateClock() {
    const clockEl = document.getElementById("hud-clock");
    const dateEl = document.getElementById("hud-date");
    const now = new Date();
    
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString("fr-CA", { hour12: false });
    }
    
    if (dateEl) {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      dateEl.textContent = `${year}.${month}.${day}`;
    }
  }
  
  updateClock();
  setInterval(updateClock, 1000);

  // Logs automatiques
  function addLog() {
    const logs = document.getElementById("logs");
    if (!logs) return;
    
    const messages = [
      "SCAN: KI_AUGMENTE",
      "ALERTE: MOUVEMENT",
      "DATA: TRANSMISSION_OK",
      "STATUT: SURVEILLANCE",
      "SIGNAL: DRAGON_RADAR"
    ];
    
    const now = new Date();
    const time = now.toLocaleTimeString("fr-CA", { hour12: false });
    const msg = messages[Math.floor(Math.random() * messages.length)];
    
    const newLine = document.createElement("div");
    newLine.className = "log-line new";
    newLine.innerHTML = `<span class="log-time">${time}</span> ${msg}`;
    
    logs.querySelectorAll(".log-line.new").forEach(line => {
      line.classList.remove("new");
    });
    
    logs.appendChild(newLine);
    
    while (logs.children.length > 6) {
      logs.removeChild(logs.firstChild);
    }
    
    logs.scrollTop = logs.scrollHeight;
  }
  
  setInterval(addLog, 4000);
});