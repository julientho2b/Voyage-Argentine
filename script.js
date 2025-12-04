const burger = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Fermer le menu quand on clique sur un lien
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Sélectionner tous les boutons Favori
const btnFavoris = document.querySelectorAll(".photo-favori");

// Boucle sur chaque bouton
btnFavoris.forEach((btn, index) => {
  // Vérifier si cet index est déjà favori dans le localStorage
  if (localStorage.getItem("photoFavori" + index) === "true") {
    btn.textContent = "❤️";
  }

  // Ajouter l'événement clic à chaque bouton
  btn.addEventListener("click", () => {
    if (btn.textContent === "♡") {
      btn.textContent = "❤️";
      localStorage.setItem("photoFavori" + index, "true");
    } else {
      btn.textContent = "♡";
      localStorage.setItem("photoFavori" + index, "false");
    }
  });
});

// Récupération du bouton et des photos
const toggleFavorisBtn = document.getElementById("toggle-favoris");
const photos = document.querySelectorAll(".photo");
let filterActive = false;

// Fonction pour mettre à jour l'affichage des photos
function updatePhotosDisplay() {
  photos.forEach((photo) => {
    const isFavori = photo.dataset.favori === "true";
    photo.style.display = filterActive
      ? isFavori
        ? "block"
        : "none"
      : "block";
  });

  toggleFavorisBtn.textContent = filterActive
    ? "Afficher toutes les photos"
    : "Afficher seulement les favoris";
}

// Clic sur le bouton toggle pour filtrer les favoris
toggleFavorisBtn.addEventListener("click", () => {
  filterActive = !filterActive;
  updatePhotosDisplay();
});

// Clic sur le cœur pour ajouter/enlever un favori
photos.forEach((photo) => {
  const coeur = photo.querySelector(".photo-favori");

  coeur.addEventListener("click", (e) => {
    e.stopPropagation(); // évite de déclencher d'autres events si besoin

    // Basculer l'état favori
    const isFavori = photo.dataset.favori === "true";
    photo.dataset.favori = isFavori ? "false" : "true";
    coeur.textContent = isFavori ? "♡" : "❤️";

    // Si le filtre est actif, mettre à jour l'affichage
    if (filterActive && !isFavori) {
      photo.style.display = "none";
    }
  });
});
