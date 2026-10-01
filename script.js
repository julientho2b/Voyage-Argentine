/* ------------------- NAV BURGER ------------------- */
const burger = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const mapElement = document.querySelector("#map");
const voirGalerie = document.querySelector("#voir-galerie");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Fermer le menu quand on clique sur un lien
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

if (mapElement) {
  const map = L.map("map", {
    gestureHandling: true,
    gestureHandlingOptions: {
      duration: 1000,
      text: {
        touch: "Utilisez deux doigts pour déplacer la carte",
        scroll: "Utilisez Ctrl + molette pour zoomer sur la carte",
        scrollMac: "Utilisez ⌘ + molette pour zoomer sur la carte",
      },
    },
  });

  map.setView([-40.5, -68.06], 4);

  map.setView([-40.5, -68.06], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");

    div.innerHTML = `
  <div><span class="legend-icon">✈️</span> Temps de vol</div>
  <div><span class="legend-icon">🚗</span> Temps de trajet</div>
  <div><span class="legend-flight"></span> Trajet aérien</div>
  <div><span class="legend-line"></span> Trajet routier</div>
`;

    return div;
  };

  legend.addTo(map);

  // MARQUEURS

  L.marker([-34.6037, -58.3816]).addTo(map);

  L.marker([-54.8019, -68.303]).addTo(map).bindTooltip("Ushuaia").openTooltip();

  L.marker([-49.3314, -72.8863])
    .addTo(map)
    .bindTooltip("El Chaltén")
    .openTooltip();

  L.marker([-50.3379, -72.2648])
    .addTo(map)
    .bindTooltip("El Calafate")
    .openTooltip();

  L.marker([-34.2506, -59.4712])
    .addTo(map)
    .bindTooltip("San Antonio de Areco")
    .openTooltip();

  // BUENOS AIRES → USHUAIA

  const trajetBuenosUshuaia = [
    [-34.6037, -58.3816],
    [-54.8019, -68.303],
  ];

  const dureeBuenosUshuaia = "3h30";

  L.polyline(trajetBuenosUshuaia, {
    dashArray: "10, 10",
  }).addTo(map);

  const milieuBuenosUshuaia = [-44.7, -60.5];

  const pointA = map.latLngToLayerPoint(L.latLng(-34.6037, -58.3816));

  const pointB = map.latLngToLayerPoint(L.latLng(-54.8019, -68.303));

  const angle =
    Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * (180 / Math.PI);

  L.marker(milieuBuenosUshuaia, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angle + 180}deg)">✈️ ${dureeBuenosUshuaia}</div>`,
      className: "trajet-label",
    }),
  }).addTo(map);

  // USHUAIA → EL CALAFATE

  const trajetUshuaiaCalafate = [
    [-54.8019, -68.303],
    [-50.3379, -72.2648],
  ];

  const dureeUshuaiaCalafate = "1h20";

  L.polyline(trajetUshuaiaCalafate, {
    dashArray: "10, 10",
  }).addTo(map);

  const milieuUshuaiaCalafate = [-51.8, -72.5];

  const pointAUshuaia = map.latLngToLayerPoint(L.latLng(-54.8019, -68.303));

  const pointBUshuaia = map.latLngToLayerPoint(L.latLng(-50.3379, -72.2648));

  const angleUshuaia =
    Math.atan2(
      pointBUshuaia.y - pointAUshuaia.y,
      pointBUshuaia.x - pointAUshuaia.x,
    ) *
    (180 / Math.PI);

  L.marker(milieuUshuaiaCalafate, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angleUshuaia + 180}deg)">✈️ ${dureeUshuaiaCalafate}</div>`,
      className: "trajet-label",
    }),
  }).addTo(map);

  // EL CALAFATE → EL CHALTÉN

  const trajetCalafateChalten = [
    [-50.3379, -72.2648],
    [-49.3314, -72.8863],
  ];

  const dureeCalafateChalten = "3h";

  L.polyline(trajetCalafateChalten, {
    color: "#b8571f",
  }).addTo(map);

  const milieuCalafateChalten = [-49.75, -72.7];

  const pointACalafateChalten = map.latLngToLayerPoint(
    L.latLng(-50.3379, -72.2648),
  );

  const pointBCalafateChalten = map.latLngToLayerPoint(
    L.latLng(-49.3314, -72.8863),
  );

  const angleCalafateChalten =
    Math.atan2(
      pointBCalafateChalten.y - pointACalafateChalten.y,
      pointBCalafateChalten.x - pointACalafateChalten.x,
    ) *
    (180 / Math.PI);

  const labelCalafateChalten = L.marker(milieuCalafateChalten, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angleCalafateChalten + 180}deg)">🚗 ${dureeCalafateChalten}</div>`,
      className: "trajet-label",
    }),
  });

  if (map.getZoom() >= 8) {
    labelCalafateChalten.addTo(map);
  }

  map.on("zoomend", () => {
    if (map.getZoom() >= 8) {
      labelCalafateChalten.addTo(map);
    } else {
      map.removeLayer(labelCalafateChalten);
    }
  });

  // EL CHALTÉN → EL CALAFATE

  const trajetChaltenCalafateRetour = [
    [-49.3314, -72.8863],
    [-49.7, -72.5],
    [-50.3379, -72.2648],
  ];

  const dureeChaltenCalafate = "3h";

  L.polyline(trajetChaltenCalafateRetour, {
    color: "#b8571f",
  }).addTo(map);

  const milieuChaltenCalafate = [-49.85, -72.35];

  const pointAChaltenCalafate = map.latLngToLayerPoint(
    L.latLng(-49.3314, -72.8863),
  );

  const pointBChaltenCalafate = map.latLngToLayerPoint(
    L.latLng(-50.3379, -72.2648),
  );

  const angleChaltenCalafate =
    Math.atan2(
      pointBChaltenCalafate.y - pointAChaltenCalafate.y,
      pointBChaltenCalafate.x - pointAChaltenCalafate.x,
    ) *
    (180 / Math.PI);

  const labelChaltenCalafate = L.marker(milieuChaltenCalafate, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angleChaltenCalafate + 10}deg)">🚗 ${dureeChaltenCalafate}</div>`,
      className: "trajet-label",
    }),
  });

  if (map.getZoom() >= 8) {
    labelChaltenCalafate.addTo(map);
  }

  map.on("zoomend", () => {
    if (map.getZoom() >= 8) {
      labelChaltenCalafate.addTo(map);
    } else {
      map.removeLayer(labelChaltenCalafate);
    }
  });

  // EL CALAFATE → BUENOS AIRES

  const trajetCalafateBuenos = [
    [-50.3379, -72.2648],
    [-34.6037, -58.3816],
  ];

  const dureeCalafateBuenos = "3h15";

  L.polyline(trajetCalafateBuenos, {
    dashArray: "10, 10",
  }).addTo(map);

  const milieuCalafateBuenos = [-42, -67.0];

  const pointACalafate = map.latLngToLayerPoint(L.latLng(-50.3379, -72.2648));

  const pointBBuenos = map.latLngToLayerPoint(L.latLng(-34.6037, -58.3816));

  const angleCalafateBuenos =
    Math.atan2(
      pointBBuenos.y - pointACalafate.y,
      pointBBuenos.x - pointACalafate.x,
    ) *
    (180 / Math.PI);

  L.marker(milieuCalafateBuenos, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angleCalafateBuenos}deg)">✈️ ${dureeCalafateBuenos}</div>`,
      className: "trajet-label",
    }),
  }).addTo(map);

  // BUENOS AIRES → SAN ANTONIO DE ARECO

  const trajetBuenosAreco = [
    [-34.6037, -58.3816],
    [-34.2506, -59.4712],
  ];

  const dureeBuenosAreco = "1h30";

  L.polyline(trajetBuenosAreco, {
    color: "#b8571f",
  }).addTo(map);

  const milieuBuenosAreco = [-34.45, -59.05];

  const pointABuenosAreco = map.latLngToLayerPoint(
    L.latLng(-34.6037, -58.3816),
  );

  const pointBBuenosAreco = map.latLngToLayerPoint(
    L.latLng(-34.2506, -59.4712),
  );

  const angleBuenosAreco =
    Math.atan2(
      pointBBuenosAreco.y - pointABuenosAreco.y,
      pointBBuenosAreco.x - pointABuenosAreco.x,
    ) *
    (180 / Math.PI);
  const labelBuenosAreco = L.marker(milieuBuenosAreco, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angleBuenosAreco + 180}deg)">🚗 ${dureeBuenosAreco}</div>`,
      className: "trajet-label",
    }),
  });

  if (map.getZoom() >= 9) {
    labelBuenosAreco.addTo(map);
  }

  map.on("zoomend", () => {
    if (map.getZoom() >= 9) {
      labelBuenosAreco.addTo(map);
    } else {
      map.removeLayer(labelBuenosAreco);
    }
  });

  // SAN ANTONIO DE ARECO → BUENOS AIRES

  const trajetArecoBuenosRetour = [
    [-34.2506, -59.4712],
    [-34.3, -59.25],
    [-34.6037, -58.3816],
  ];

  const dureeArecoBuenos = "1h30";

  L.polyline(trajetArecoBuenosRetour, {
    color: "#b8571f",
  }).addTo(map);

  const milieuArecoBuenos = [-34.35, -59.0];

  const pointAArecoBuenos = map.latLngToLayerPoint(
    L.latLng(-34.2506, -59.4712),
  );

  const pointBArecoBuenos = map.latLngToLayerPoint(
    L.latLng(-34.6037, -58.3816),
  );

  const angleArecoBuenos =
    Math.atan2(
      pointBArecoBuenos.y - pointAArecoBuenos.y,
      pointBArecoBuenos.x - pointAArecoBuenos.x,
    ) *
    (180 / Math.PI);

  const labelArecoBuenos = L.marker(milieuArecoBuenos, {
    icon: L.divIcon({
      html: `<div style="transform: rotate(${angleArecoBuenos + 5}deg)">🚗 ${dureeArecoBuenos}</div>`,
      className: "trajet-label",
    }),
  });

  if (map.getZoom() >= 9) {
    labelArecoBuenos.addTo(map);
  }

  map.on("zoomend", () => {
    if (map.getZoom() >= 9) {
      labelArecoBuenos.addTo(map);
    } else {
      map.removeLayer(labelArecoBuenos);
    }
  });
}

const photoGrid = document.querySelector(".photo-grid");

if (photoGrid !== null) {
  const photosList = [
    "Photo.jpg",
    "Photo1.jpg",
    "Photo2.jpg",
    "Photo3.jpg",
    "Photo4.jpg",
    "Photo5.jpg",
    "Photo6.jpg",
    "Photo7.jpg",
    "Photo8.jpg",
    "Photo9.jpg",
    "Photo10.webp",
    "Photo11.jpg",
    "Photo12.webp",
    "Photo13.webp",
    "Photo14.webp",
    "Photo15.jpg",
    "Photo16.jpg",
    "Photo17.jpg",
    "Photo18.jpg",
    "Photo19.jpg",
    "Photo20.webp",
    "Photo21.webp",
    "Photo22.webp",
    "Lac.jpg",
    "Fitz-Roy.jpg",
    "Stele.webp",
    "bus-ushuaia.webp",
    "Perito-Moreno.jpg",
    "Boca.webp",
    "Photo23.jpg",
  ];

  let nombrePhotos;

  if (window.innerWidth <= 600) {
    nombrePhotos = 6;
  } else {
    nombrePhotos = 15;
  }

  const photosAleatoires = [...photosList]
    .sort(() => Math.random() - 0.5)
    .slice(0, nombrePhotos);

  let galerieOuverte = false;

  function afficherGalerie() {
    photoGrid.innerHTML = "";

    const photosAAfficher = galerieOuverte ? photosList : photosAleatoires;

    photosAAfficher.forEach((nomFichier) => {
      const photoDiv = document.createElement("div");

      photoDiv.classList.add("photo");

      photoDiv.style.backgroundImage = `url("img/${nomFichier}")`;

      photoGrid.appendChild(photoDiv);
    });

    voirGalerie.textContent = galerieOuverte
      ? "Réduire la galerie ↑"
      : "Voir toute la galerie ↓";
  }

  afficherGalerie();

  voirGalerie.addEventListener("click", () => {
    galerieOuverte = !galerieOuverte;

    afficherGalerie();
  });

  /* ------------------- LIGHTBOX ------------------- */
  const lightboxEl = document.getElementById("lightbox");

  if (lightboxEl !== null) {
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = 0;

    let visiblePhotos = [];

    let timerPhoto;

    function showPhoto(index, animer = true) {
      const photo = visiblePhotos[index];
      const imgSrc = photo.style.backgroundImage
        .replace('url("', "")
        .replace('")', "");

      clearTimeout(timerPhoto);

      const afficher = () => {
        const rect = lightboxImg.getBoundingClientRect();

        closeBtn.style.top = `${rect.top}px`;
        closeBtn.style.left = `${rect.right - 30}px`;
        lightboxImg.classList.remove("changing");
      };

      const charger = () => {
        lightboxImg.onload = afficher;
        lightboxImg.src = imgSrc;
        if (lightboxImg.complete) afficher();
      };

      lightboxImg.classList.add("changing");

      if (animer) {
        // changement de photo : fondu puis nouvelle image
        timerPhoto = setTimeout(charger, 200);
      } else {
        // ouverture : on efface l'ancienne image avant de charger la nouvelle
        lightboxImg.removeAttribute("src");
        charger();
      }
    }

    function openLightbox(photo) {
      lightboxEl.classList.add("open");

      const photosActuelles = document.querySelectorAll(".photo");

      visiblePhotos = Array.from(photosActuelles).filter(
        (p) => p.style.display !== "none",
      );

      currentIndex = visiblePhotos.indexOf(photo);

      showPhoto(currentIndex, false);
    }

    // Écouteurs clic et tap sur toutes les photos
    photoGrid.addEventListener("click", (e) => {
      const photo = e.target.closest(".photo");

      if (photo !== null) {
        openLightbox(photo);
      }
    });

    // Fermer la lightbox
    closeBtn.addEventListener("click", () => {
      lightboxEl.classList.remove("open");
    });

    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl) {
        lightboxEl.classList.remove("open");
      }
    });

    // Navigation flèches (précédent / suivant)
    prevBtn.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
      showPhoto(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % visiblePhotos.length;
      showPhoto(currentIndex);
    });
  }
}

const reduireEtapes = document.querySelectorAll(".etape");

reduireEtapes.forEach((etape, index) => {
  if (index >= 2) {
    etape.style.display = "none";
  }
});

const voirItineraire = document.querySelector("#voir-itineraire");

let itineraireOuvert = false;

voirItineraire.addEventListener("click", () => {
  itineraireOuvert = !itineraireOuvert;
  voirItineraire.textContent = itineraireOuvert
    ? "Réduire l'itinéraire ↑"
    : "Voir tout l'itinéraire ↓";

  reduireEtapes.forEach((etape, index) => {
    if (index >= 2) {
      if (itineraireOuvert) {
        etape.style.display = "block";
      } else {
        etape.style.display = "none";
      }
    } else {
      etape.style.display = "block";
    }
  });
});

const activeSection = document.querySelectorAll(".nav-links a");

activeSection[0].classList.add("active");

activeSection.forEach((lien) => {
  lien.addEventListener("click", () => {
    activeSection.forEach((lien) => {
      lien.classList.remove("active");
    });
    lien.classList.add("active");
  });
});
