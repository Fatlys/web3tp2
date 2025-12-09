document.addEventListener("DOMContentLoaded", () => {
  const transformModal = new bootstrap.Modal(document.getElementById('transformModal'));
  
  // Données de transformation par personnage
  const transformations = {
    "goku": { name: "SUPER SAIYAN", emoji: "⚡🔥💥" },
    "vegeta": { name: "SUPER SAIYAN PRINCE", emoji: "👑⚡💫" },
    "gohan": { name: "SUPER SAIYAN 2", emoji: "⚡⚡🌟" },
    "piccolo": { name: "FUSION NAMEK", emoji: "🟢💚✨" },
    "frieza": { name: "GOLDEN FRIEZA", emoji: "👹✨💛" }
  };

  let lastClickTime = 0;
  const doubleClickDelay = 500;

  // Détecter double-clic sur les cartes de personnage
  document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastClickTime;
      
      if (timeDiff < doubleClickDelay && timeDiff > 0) {
        // Double-clic détecté !
        const charId = card.dataset.char;
        showTransformation(charId);
      }
      
      lastClickTime = currentTime;
    });
  });

  function showTransformation(charId) {
    const transform = transformations[charId];
    if (!transform) return;

    // Mettre à jour le contenu du modal
    document.getElementById("transform-name").textContent = transform.name;
    document.querySelector("#transformModal .modal-body div").textContent = transform.emoji;

    // Jouer le son de transformation
    if (window.playDBZSound) {
      window.playDBZSound("transformation");
    }

    // Afficher le modal
    transformModal.show();

    // Animer la barre de progression
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

    // Animation du personnage lors de la transformation
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

  // Afficher automatiquement au chargement après 5 secondes
  setTimeout(() => {
    showTransformation("goku");
  }, 5000);
});