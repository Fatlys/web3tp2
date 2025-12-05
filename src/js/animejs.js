import anime from "animejs";

console.log("AnimeJS chargé !");

// Test animation loop
anime({
    targets: '.anime-loop',
    translateY: [0, 100],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 1000
});
