document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer || !window.maplibregl) return;

  const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [162.9554, 23.4162],
    zoom: 2,
    interactive: true,
    attributionControl: false
  });

  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();

  const characterLocations = {
    "goku": { lng: 162.9554, lat: 23.4162, name: "NAMEK", planet: "Planète Namek" },
    "vegeta": { lng: 139.6917, lat: 35.6895, name: "TOKYO", planet: "Terre - Japon" },
    "gohan": { lng: -73.5673, lat: 45.5017, name: "MONTRÉAL", planet: "Terre - Canada" },
    "piccolo": { lng: 2.3522, lat: 48.8566, name: "PARIS", planet: "Terre - France" },
    "frieza": { lng: -46.6333, lat: -23.5505, name: "SÃO PAULO", planet: "Terre - Brésil" }
  };

  const markerStyles = document.createElement("style");
  markerStyles.textContent = `
    .map-marker {
      position: relative;
      width: 20px;
      height: 20px;
    }
    .marker-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #00ff6a;
      border-radius: 50%;
      box-shadow: 0 0 10px #00ff6a;
    }
    .marker-ping {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid #00ff6a;
      border-radius: 50%;
      opacity: 0;
      animation: markerPing 2s ease-out infinite;
    }
    .map-marker.active .marker-dot {
      width: 12px;
      height: 12px;
      box-shadow: 0 0 20px #00ff6a;
    }
    .map-marker.active .marker-ping {
      width: 30px;
      height: 30px;
    }
    @keyframes markerPing {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
  `;
  document.head.appendChild(markerStyles);

  const markers = {};

  function createMarkerElement(isActive = false) {
    const el = document.createElement("div");
    el.className = "map-marker" + (isActive ? " active" : "");
    el.innerHTML = `
      <div class="marker-ping"></div>
      <div class="marker-dot"></div>
    `;
    return el;
  }

  map.on("load", () => {
    Object.entries(characterLocations).forEach(([id, loc]) => {
      const el = createMarkerElement(id === "goku");
      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      markers[id] = { marker, element: el };
    });
  });

  function updateCoordinates(lng, lat) {
    const coordsEl = document.getElementById("map-coords");
    if (coordsEl) {
      const latDir = lat >= 0 ? "N" : "S";
      const lngDir = lng >= 0 ? "E" : "W";
      coordsEl.textContent = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
    }
  }

  function setActiveMarker(charId) {
    Object.entries(markers).forEach(([id, { element }]) => {
      if (id === charId) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  }

  window.hudMap = map;
  window.hudCharLocations = characterLocations;
  window.setActiveMarker = setActiveMarker;
  window.updateMapCoordinates = updateCoordinates;

  updateCoordinates(162.9554, 23.4162);
});