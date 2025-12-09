document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("zdog-canvas");
  if (!canvas || !window.Zdog) return;

  const { Illustration, Shape, Ellipse } = Zdog;

  const illo = new Illustration({
    element: canvas,
    dragRotate: true,
    resize: true,
    zoom: 3.5
  });

  // Sphère orange principale (Dragon Ball)
  new Shape({
    addTo: illo,
    stroke: 50,
    color: '#ff9500',
  });

  // Étoile rouge à 4 branches - Plus définie
  const starPoints = [
    { x: 0, y: -12 },    // Haut
    { x: 2.5, y: -2.5 },
    { x: 12, y: 0 },     // Droite
    { x: 2.5, y: 2.5 },
    { x: 0, y: 12 },     // Bas
    { x: -2.5, y: 2.5 },
    { x: -12, y: 0 },    // Gauche
    { x: -2.5, y: -2.5 }
  ];

  // Étoile AVANT (face visible)
  new Shape({
    addTo: illo,
    path: starPoints,
    closed: true,
    stroke: 0,
    color: '#cc0000',
    fill: true,
    translate: { z: 26 }
  });

  // Contour de l'étoile AVANT
  new Shape({
    addTo: illo,
    path: starPoints,
    closed: true,
    stroke: 1.5,
    color: '#990000',
    translate: { z: 25.5 }
  });

  // Étoile ARRIÈRE (côté opposé)
  new Shape({
    addTo: illo,
    path: starPoints,
    closed: true,
    stroke: 0,
    color: '#cc0000',
    fill: true,
    translate: { z: -26 }
  });

  // Contour de l'étoile ARRIÈRE
  new Shape({
    addTo: illo,
    path: starPoints,
    closed: true,
    stroke: 1.5,
    color: '#990000',
    translate: { z: -25.5 }
  });

  // Animation de rotation douce
  let time = 0;
  function animate() {
    time += 0.01;
    
    // Rotation principale (axe Y)
    illo.rotate.y += 0.015;
    
    // Légère oscillation (axe X)
    illo.rotate.x = Math.sin(time) * 0.15;
    
    // Très légère oscillation (axe Z)
    illo.rotate.z = Math.cos(time * 0.7) * 0.05;
    
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();

  // Gestion du drag
  let isDragging = false;
  
  canvas.addEventListener("mousedown", () => { 
    isDragging = true;
  });
  
  canvas.addEventListener("mouseup", () => { 
    isDragging = false;
  });
});