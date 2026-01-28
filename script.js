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

const openPhoto = document.querySelectorAll(".photo");
const lightboxEl = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let visiblePhotos = [];

// Fonction pour afficher une photo dans la lightbox
function showPhoto(index) {
  const photo = visiblePhotos[index];
  const photoStyle = photo.style.backgroundImage;
  const imgSrc = photoStyle.replace('url("', "").replace('")', "");
  lightboxImg.src = imgSrc;
}

// Fonction pour ouvrir la lightbox sur une photo cliquée
function openLightbox(photo) {
  lightboxEl.style.display = "flex";

  // Créer tableau des photos visibles
  visiblePhotos = Array.from(openPhoto).filter(
    (p) => p.style.display !== "none",
  );

  // Définir l'index de la photo cliquée
  currentIndex = visiblePhotos.indexOf(photo);

  // Afficher la photo
  showPhoto(currentIndex);
}

// Ajouter écouteur clic sur toutes les photos
openPhoto.forEach((photo) => {
  photo.addEventListener("click", () => openLightbox(photo));
});

// Fermer la lightbox
closeBtn.addEventListener("click", () => {
  lightboxEl.style.display = "none";
});

// Navigation flèches
prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  showPhoto(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
  showPhoto(currentIndex);
});
