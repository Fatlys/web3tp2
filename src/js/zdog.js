document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("zdog-canvas");
  if (!canvas || !window.Zdog) return;

  const { Illustration, Shape, Ellipse } = Zdog;

  const illo = new Illustration({
    element: canvas,
    dragRotate: true,
    resize: true,
    zoom: 4
  });

  // Sphère orange principale (Dragon Ball)
  new Shape({
    addTo: illo,
    stroke: 40,
    color: '#ff8800',
  });

  // Étoile rouge à 4 branches au centre
  const starPoints = [
    { x: 0, y: -10 },
    { x: 3, y: -3 },
    { x: 10, y: 0 },
    { x: 3, y: 3 },
    { x: 0, y: 10 },
    { x: -3, y: 3 },
    { x: -10, y: 0 },
    { x: -3, y: -3 }
  ];

  new Shape({
    addTo: illo,
    path: starPoints,
    closed: true,
    stroke: 0,
    color: '#ff0000',
    fill: true
  });

  // Animation de rotation continue
  function animate() {
    illo.rotate.y += 0.02;
    illo.rotate.x = Math.sin(Date.now() * 0.001) * 0.1;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();

  // Pause lors du drag
  canvas.addEventListener("mousedown", () => { 
    illo.rotate.y = illo.rotate.y; 
  });
});