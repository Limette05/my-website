document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const logo = document.querySelector(".nav-left");

  if (window.scrollY > 150) {
    // Navbar kleiner machen
    navbar.style.height = "90px"; // Höhe der Navbar verkleinern
    // Logo ausblenden
    logo.style.opacity = "0";
    logo.style.maxHeight = "0"; // Größe des Logos auf 0 setzen
  } else {
    // Navbar wieder auf ursprüngliche Größe setzen
    navbar.style.height = "190px";
    // Logo wieder einblenden
    logo.style.opacity = "1";
    logo.style.maxHeight = "180px"; // Ursprüngliche Größe des Logos
  }
});
