document.addEventListener("DOMContentLoaded", () => {
  const transformModal = new bootstrap.Modal(document.getElementById('transformModal'));
  
  const detectionMessages = {
    "goku": { name: "GOKU DETECTED", emoji: "⚡🔥💥", color: "#ff8c00" },
    "vegeta": { name: "VEGETA DETECTED", emoji: "👑⚡💫", color: "#0066ff" },
    "gohan": { name: "GOHAN DETECTED", emoji: "⚡⚡🌟", color: "#ffcc00" },
    "piccolo": { name: "PICCOLO DETECTED", emoji: "🟢💚✨", color: "#00ff00" },
    "frieza": { name: "FRIEZA DETECTED", emoji: "👹✨💛", color: "#9900ff" }
  };

  function showDetection() {
    // Trouver le personnage actuellement actif
    const activeBtn = document.querySelector(".character-btn.active");
    if (!activeBtn) return;
    
    const charId = activeBtn.dataset.char;
    const detection = detectionMessages[charId];
    if (!detection) return;

    // Mettre à jour le contenu du modal
    const transformName = document.getElementById("transform-name");
    transformName.textContent = detection.name;
    transformName.style.color = detection.color;
    
    document.querySelector("#transformModal .modal-body div").textContent = detection.emoji;

    // Changer le texte du modal
    const modalBody = document.querySelector("#transformModal .modal-body p");
    if (modalBody) {
      modalBody.textContent = "CIBLE VERROUILLÉE!";
    }

    if (window.playDBZSound) {
      window.playDBZSound("transformation");
    }

    transformModal.show();

    const progressBar = document.getElementById("power-progress");
    progressBar.style.width = "0%";
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      progressBar.style.width = progress + "%";
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 30);

    if (window.anime) {
      anime({
        targets: "#character-img",
        scale: [1, 1.3, 1],
        duration: 1500,
        easing: "easeInOutQuad"
      });

      anime({
        targets: ".character-display",
        boxShadow: [
          "0 0 20px rgba(255, 255, 0, 0.3)",
          "0 0 60px rgba(255, 255, 0, 0.8)",
          "0 0 20px rgba(255, 255, 0, 0.3)"
        ],
        duration: 1500,
        easing: "easeInOutQuad"
      });
    }
  }

  // Exposer la fonction globalement
  window.showDetection = showDetection;
});