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

// Tout le code est exécuté après le chargement du DOM grâce à defer
const btnFiltrer = document.getElementById("filtrer-favoris");
const btnTout = document.getElementById("tout-afficher");
const photos = document.querySelectorAll(".photo");

btnFiltrer.addEventListener("click", () => {
  photos.forEach((photo, index) => {
    const estFavori = localStorage.getItem("photoFavori" + index) === "true";
    photo.style.display = estFavori ? "block" : "none";
  });
});

btnTout.addEventListener("click", () => {
  photos.forEach((photo) => (photo.style.display = "block"));
});
