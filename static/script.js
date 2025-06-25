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

function showMenuOnMobile() {
  let menu = document.getElementById("menu-content");
  let mobileMenu = document.getElementById("menu-content-mobile");
  let menuBtn = document.getElementById("mobile-menu-button");
  let device = getComputedStyle(document.body).getPropertyValue("--device");

  if (device === "desktop") {
    menu.classList.toggle("show-menu");
  } else if (device === "mobile") {
    mobileMenu.classList.toggle("show-menu");
    menuBtn.classList.toggle("show-menu");
    document.body.style.overflow = document.body.style.overflow
      ? null
      : "hidden";
  }
}

// hide menu on clicking outside
window.addEventListener("mouseup", function (event) {
  const menu = document.getElementById("menu-content");
  const device = getComputedStyle(document.body).getPropertyValue("--device");

  if (device === "desktop" && !menu.contains(event.target)) {
    menu.classList.remove("show-menu");
  }
});

window.addEventListener("mouseup", function (event) {
  const slideShow = document.getElementById("header-container");

  if (!slideShow.contains(event.target)) {
    slideShow.classList.remove("toggle-fullscreen");
    document.body.style.overflow = null;
  }
});

function toggleFullscreen(anyContainer) {
  let container = document.getElementById(anyContainer);
  container.classList.toggle("toggle-fullscreen");
  document.body.style.overflow = document.body.style.overflow ? null : "hidden";
}

function slide(anyContainer, direction) {
  let container = document.getElementById(anyContainer);
  const device = getComputedStyle(document.body).getPropertyValue("--device");
  let scroll = 1000

  if (device === "mobile") {
    scroll = 500;
  }

  if (direction === "left") {
    container.scrollLeft -= scroll;
  } else if (direction === "right") {
    container.scrollLeft += scroll;
  }
}
