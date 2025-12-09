document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // HORLOGE TEMPS RÉEL
  // ============================================
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

  // ============================================
  // LOGS AUTOMATIQUES
  // ============================================
  function addLog() {
    const logs = document.getElementById("logs");
    if (!logs) return;
    
    const messages = [
      "SCAN: KI_AUGMENTE",
      "ALERTE: MOUVEMENT_DÉTECTÉ",
      "DATA: TRANSMISSION_OK",
      "STATUT: SURVEILLANCE_ACTIVE",
      "SIGNAL: DRAGON_RADAR_ON",
      "CRYPTO: DÉCODAGE_RÉUSSI",
      "COMBAT: NIVEAU_ÉLEVÉ",
      "ÉNERGIE: FLUCTUATION",
      "SCOUTER: CALIBRATION_OK"
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

  // ============================================
  // SYSTÈME DE CHANGEMENT DE PERSONNAGE
  // ============================================
  const characterData = {
    "goku": {
      img: "./assets/img/goku.png",
      name: "Son Goku",
      profile: "名前: Son Goku<br>種族: サイヤ人<br>変身: スーパーサイヤ人<br>惑星: 地球/ナメック星",
      location: { lat: "23.4162° N", lng: "162.9554° E", planet: "PLANÈTE NAMEK" },
      powers: { base: 9001, current: 12000, max: 150000 }
    },
    "vegeta": {
      img: "./assets/img/Vegeta.png",
      name: "Vegeta",
      profile: "名前: Vegeta<br>種族: サイヤ人<br>変身: スーパーサイヤ人<br>惑星: 地球",
      location: { lat: "35.6895° N", lng: "139.6917° E", planet: "TERRE - JAPON" },
      powers: { base: 8500, current: 11000, max: 140000 }
    },
    "gohan": {
      img: "./assets/img/Gohan.png",
      name: "Gohan",
      profile: "名前: Gohan<br>種族: 半サイヤ人<br>変身: スーパーサイヤ人2<br>惑星: 地球",
      location: { lat: "45.5017° N", lng: "73.5673° W", planet: "TERRE - CANADA" },
      powers: { base: 7200, current: 9500, max: 130000 }
    },
    "piccolo": {
      img: "./assets/img/Piccolo.png",
      name: "Piccolo",
      profile: "名前: Piccolo<br>種族: ナメック星人<br>変身: 融合<br>惑星: ナメック星",
      location: { lat: "48.8566° N", lng: "2.3522° E", planet: "TERRE - FRANCE" },
      powers: { base: 6500, current: 8500, max: 95000 }
    },
    "frieza": {
      img: "./assets/img/Frieza.png",
      name: "Frieza",
      profile: "名前: Frieza<br>種族: 未知<br>変身: ゴールデンフリーザ<br>惑星: 未知",
      location: { lat: "23.5505° S", lng: "46.6333° W", planet: "TERRE - BRÉSIL" },
      powers: { base: 120000, current: 150000, max: 500000 }
    }
  };

  function switchCharacter(charId) {
    const data = characterData[charId];
    if (!data) return;

    // Changer l'image
    const img = document.getElementById("character-img");
    if (img) {
      img.src = data.img;
      img.alt = data.name;
    }

    // Mettre à jour le profil
    const dossier = document.getElementById("dossier-text");
    if (dossier) {
      dossier.innerHTML = data.profile;
      // Animation de fondu
      dossier.style.opacity = "0";
      setTimeout(() => {
        dossier.style.opacity = "1";
        dossier.style.transition = "opacity 0.3s";
      }, 100);
    }

    // Mettre à jour GPS
    const gpsLat = document.getElementById("gps-lat");
    const gpsLng = document.getElementById("gps-lng");
    if (gpsLat) gpsLat.textContent = data.location.lat;
    if (gpsLng) gpsLng.textContent = data.location.lng;

    // Mettre à jour le texte de localisation
    const locationText = document.querySelector(".hud-gps div:last-child");
    if (locationText) {
      locationText.innerHTML = `<span style="color: #ffff00;">📍</span> ${data.location.planet}`;
    }

    // Mettre à jour les valeurs de puissance
    const basePower = document.getElementById("base-power");
    const currentPower = document.getElementById("current-power");
    const maxPower = document.getElementById("max-power");
    
    if (basePower) basePower.textContent = data.powers.base;
    if (currentPower) currentPower.textContent = data.powers.current;
    if (maxPower) maxPower.textContent = data.powers.max;

    // Animer les barres de puissance
    const bars = document.querySelectorAll(".power-bar-fill");
    if (bars.length >= 3) {
      bars[0].style.width = "0%";
      bars[1].style.width = "0%";
      bars[2].style.width = "0%";
      
      setTimeout(() => {
        bars[0].style.width = "85%";
        bars[1].style.width = "100%";
        bars[2].style.width = "60%";
      }, 100);
    }

    // Mettre à jour les classes actives
    document.querySelectorAll(".character-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.char === charId);
    });

    document.querySelectorAll(".character-card").forEach(card => {
      card.classList.toggle("active", card.dataset.char === charId);
    });

    // Mettre à jour la carte
    if (window.hudMap && window.hudCharLocations) {
      const loc = window.hudCharLocations[charId];
      if (loc) {
        window.hudMap.flyTo({
          center: [loc.lng, loc.lat],
          zoom: 4,
          speed: 0.6,
          essential: true
        });
      }
    }

    // Mettre à jour le marqueur actif
    if (window.setActiveMarker) {
      window.setActiveMarker(charId);
    }

    // Mettre à jour les coordonnées de la carte
    if (window.updateMapCoordinates) {
      const loc = window.hudCharLocations[charId];
      if (loc) {
        window.updateMapCoordinates(loc.lng, loc.lat);
      }
    }

    // Animation du personnage lors du changement
    if (window.anime) {
      anime({
        targets: "#character-img",
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
        easing: "easeOutQuad"
      });

      anime({
        targets: ".crosshair",
        scale: [0.8, 1],
        rotate: "360deg",
        duration: 600,
        easing: "easeOutBack"
      });
    }
  }

  // ============================================
  // ATTACHER LES ÉVÉNEMENTS
  // ============================================
  document.querySelectorAll(".character-btn, .character-card").forEach(btn => {
    btn.addEventListener("click", () => {
      switchCharacter(btn.dataset.char);
    });
  });

  // ============================================
  // EXPOSER GLOBALEMENT
  // ============================================
  window.switchCharacter = switchCharacter;
});