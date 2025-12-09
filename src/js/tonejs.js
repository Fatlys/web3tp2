document.addEventListener("DOMContentLoaded", () => {
  if (!window.Tone) return;

  let audioOK = false;

  const synth = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.2 }
  }).toDestination();
  synth.volume.value = -5;

  const fm = new Tone.FMSynth({
    harmonicity: 3,
    modulationIndex: 10,
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.5 }
  }).toDestination();
  fm.volume.value = -6;

  const membrane = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 4,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1 }
  }).toDestination();
  membrane.volume.value = -10;

  async function activerAudio() {
    if (audioOK) return;
    try {
      await Tone.start();
      audioOK = true;
      console.log("✅ Audio Tone.js activé!");
    } catch (e) {
      console.log("Erreur audio:", e);
    }
  }

  document.body.addEventListener("click", activerAudio);

  function sonScouter() {
    if (!audioOK) return;
    synth.triggerAttackRelease("C5", "32n");
    setTimeout(() => synth.triggerAttackRelease("E5", "32n"), 50);
  }

  function sonTransformation() {
    if (!audioOK) return;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        fm.triggerAttackRelease(["C4", "E4", "G4"][i % 3], "64n");
      }, i * 80);
    }
    setTimeout(() => {
      membrane.triggerAttackRelease("C2", "2n");
    }, 700);
  }

  document.querySelectorAll(".character-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activerAudio();
      sonScouter();
    });
  });

  window.playDBZSound = (type) => {
    activerAudio();
    if (type === "scouter") sonScouter();
    else if (type === "transformation") sonTransformation();
  };

  setInterval(() => {
    if (audioOK && Math.random() > 0.7) {
      synth.triggerAttackRelease("C6", "64n");
    }
  }, 8000);
});