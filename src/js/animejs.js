document.addEventListener("DOMContentLoaded", () => {
  if (!window.anime) return;

  anime({
    targets: ".hud-header",
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 800,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".hud-left",
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    delay: 200,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".hud-center",
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: 800,
    delay: 300,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".hud-right",
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 800,
    delay: 400,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".hud-footer",
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay: 500,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".hud-logo",
    boxShadow: [
      "0 0 10px rgba(0, 255, 0, 0.3)",
      "0 0 25px rgba(0, 255, 0, 0.6)",
      "0 0 10px rgba(0, 255, 0, 0.3)"
    ],
    duration: 2000,
    loop: true,
    easing: "easeInOutSine"
  });

  document.querySelectorAll(".character-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      anime({
        targets: btn,
        scale: 1.05,
        duration: 200,
        easing: "easeOutQuad"
      });
    });

    btn.addEventListener("mouseleave", () => {
      anime({
        targets: btn,
        scale: 1,
        duration: 200,
        easing: "easeOutQuad"
      });
    });
  });

  document.getElementById("lock-target").addEventListener("click", function() {
    const lockSound = document.getElementById("lock-sound");
    if (lockSound) {
      lockSound.currentTime = 0;
      lockSound.play();
      
      // Déclencher le popup à la fin du son
      lockSound.addEventListener("ended", function() {
        if (window.showDetection) {
          window.showDetection();
        }
      }, { once: true });
    }

    anime({
      targets: ".crosshair",
      scale: [1, 1.5, 1],
      rotate: "1turn",
      duration: 500,
      easing: "easeInOutQuad"
    });

    anime({
      targets: "#character-img",
      scale: [1, 1.1, 1],
      duration: 300
    });
  });
});