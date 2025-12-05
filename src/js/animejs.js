import anime from "animejs";

console.log("AnimeJS chargé !");

anime({
    targets: 'h1',
    translateX: 150,
    duration: 1500,
    easing: "easeInOutQuad"
});
