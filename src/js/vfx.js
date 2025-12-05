document.getElementById("alertBtn").addEventListener("click", () => {
    const box = document.getElementById("alertBox");
    box.style.display = "block";
    box.style.opacity = 0;
    let opacity = 0;
    const fade = setInterval(() => {
        opacity += 0.05;
        box.style.opacity = opacity;
        if(opacity >= 1) clearInterval(fade);
    }, 30);
});
