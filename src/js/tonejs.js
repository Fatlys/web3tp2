import * as Tone from "tone";

document.getElementById("toneBtn").addEventListener("click", async () => {
    await Tone.start(); // nécessaire pour le click
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
    console.log("Son joué !");
});
