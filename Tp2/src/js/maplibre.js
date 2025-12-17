document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("map") || !window.maplibregl) return;

  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [162.9554, 23.4162],
    zoom: 2,
    attributionControl: false
  });

  map.dragRotate.disable();

  const locations = {
    "goku": { lng: 162.9554, lat: 23.4162 },
    "vegeta": { lng: 139.6917, lat: 35.6895 },
    "frieza": { lng: -46.6333, lat: -23.5505 }
  };

    // CREATION MARQUEUR POUR PERSONNAGES
  map.on("load", () => {
    Object.entries(locations).forEach(([id, loc]) => {
      const el = document.createElement("div");
      el.className = id === "goku" ? "map-marker active" : "map-marker";
      el.innerHTML = '<div class="marker-dot"></div>';
      
      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      
      markers[id] = { marker, element: el };
    });
  });

  const style = document.createElement("style");
  style.textContent = `
    .map-marker { width: 20px; height: 20px; position: relative; }
    .marker-dot { 
      position: absolute; 
      top: 50%; left: 50%; 
      transform: translate(-50%, -50%);
      width: 8px; height: 8px;
      background: #00ff6a; 
      border-radius: 50%;
      box-shadow: 0 0 10px #00ff6a;
    }
    .map-marker.active .marker-dot { 
      width: 12px; height: 12px; 
      box-shadow: 0 0 20px #00ff6a; 
    }
  `;
  document.head.appendChild(style);

  


 
});