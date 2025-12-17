document.addEventListener("DOMContentLoaded", () => {
  const characterData = {
    "goku": { powers: { base: 9001, current: 12000, max: 150000 } },
    "vegeta": { powers: { base: 8500, current: 11000, max: 140000 } },
    "frieza": { powers: { base: 120000, current: 150000, max: 500000 } }
  };

  function switchCharacter(charId) {
    const data = characterData[charId];
    if (!data) return;

    document.querySelectorAll(".character-img").forEach(img => {
      img.classList.remove("active");
    });

    const selectedImg = document.querySelector(`.character-img[data-char="${charId}"]`);
    if (selectedImg) {
      selectedImg.classList.add("active");
    }

    // MISE A JOUR VALEUR PUISANCE
    document.getElementById("base-power").textContent = data.powers.base;
    document.getElementById("current-power").textContent = data.powers.current;
    document.getElementById("max-power").textContent = data.powers.max;

    // ANIMATION BARRE PUISSANCE
    const bars = document.querySelectorAll(".power-bar-fill");
    bars.forEach(bar => bar.style.width = "0%");
    setTimeout(() => {
      bars[0].style.width = "85%";
      bars[1].style.width = "100%";
      bars[2].style.width = "60%";
    }, 100);

    
    document.querySelectorAll(".character-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.char === charId);
    });

    // MISE A JOUR CARTE
    if (window.hudMap && window.hudCharLocations) {
      const loc = window.hudCharLocations[charId];
      if (loc) {
        window.hudMap.flyTo({ center: [loc.lng, loc.lat], zoom: 4, speed: 0.6 });
      }
    }

    if (window.setActiveMarker) window.setActiveMarker(charId);
    if (window.updateMapCoordinates && window.hudCharLocations) {
      const loc = window.hudCharLocations[charId];
      if (loc) window.updateMapCoordinates(loc.lng, loc.lat);
    }
  }

  document.querySelectorAll(".character-btn").forEach(btn => {
    btn.addEventListener("click", () => switchCharacter(btn.dataset.char));
  });

  window.switchCharacter = switchCharacter;
});