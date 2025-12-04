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

const photos = document.querySelectorAll(".photo");
const toggleFavorisBtn = document.getElementById("toggle-favoris");
let filterActive = false;

// Initialisation des favoris à partir du localStorage
photos.forEach((photo, index) => {
  const coeur = photo.querySelector(".photo-favori");
  const isFavori = localStorage.getItem("photoFavori" + index) === "true";

  photo.dataset.favori = isFavori ? "true" : "false"; // <-- synchronisation
  coeur.textContent = isFavori ? "❤️" : "♡";

  // Clic sur le cœur
  coeur.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentlyFavori = photo.dataset.favori === "true";
    photo.dataset.favori = currentlyFavori ? "false" : "true";
    coeur.textContent = currentlyFavori ? "♡" : "❤️";
    localStorage.setItem("photoFavori" + index, !currentlyFavori);

    if (filterActive && !currentlyFavori) {
      photo.style.display = "none";
    }
  });
});

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

// Clic sur le bouton toggle
toggleFavorisBtn.addEventListener("click", () => {
  filterActive = !filterActive;
  updatePhotosDisplay();
});
