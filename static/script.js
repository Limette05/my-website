document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const menu_button = document.querySelector(".menu-button");
  const logo = document.querySelector(".nav-left");

  if (window.scrollY > 150) {
    // Navbar kleiner machen
    navbar.style.height = "90px"; // Höhe der Navbar verkleinern
    navbar.style.backgroundColor = "rgba(0,0,0,0)";
    menu_button.style.padding = "1em";
    menu_button.style.borderRadius = "2em";
    menu_button.style.backgroundColor = "rgba(5, 5, 10, 0.5)";
    // Logo ausblenden
    logo.style.opacity = "0";
    logo.style.maxHeight = "0"; // Größe des Logos auf 0 setzen
  } else {
    // Navbar wieder auf ursprüngliche Größe setzen
    navbar.style.height = "190px";
    navbar.style.backgroundColor = "rgba(5, 5, 10, 0.5)";
    menu_button.style.padding = null;
    menu_button.style.borderRadius = null;
    menu_button.style.backgroundColor = null;
    // Logo wieder einblenden
    logo.style.opacity = "1";
    logo.style.maxHeight = "180px"; // Ursprüngliche Größe des Logos
  }
});

function showMenu() {
  let menu = document.getElementById("menu-content");
  let mobileMenu = document.getElementById("menu-content-mobile");
  let menuBtn = document.getElementById("mobile-menu-button");
  let device = getComputedStyle(document.body).getPropertyValue("--device");

  if (device === "desktop") {
    menu.classList.toggle("show-menu");
  } else if (device === "mobile") {
    mobileMenu.classList.toggle("show-menu");
    menuBtn.classList.toggle("show-menu");
    document.body.classList.toggle("no-scroll");
  }
}

// hide menu on clicking outside
window.addEventListener("mouseup", function (event) {
  const menu = document.getElementById("menu-content");
  const btn = document.getElementById("menu-icon");
  const device = getComputedStyle(document.body).getPropertyValue("--device");

  if (device === "desktop" && !menu.contains(event.target) && !btn.contains(event.target)) {
    menu.classList.remove("show-menu");
  }

});

window.addEventListener("mouseup", function (event) {
  const slideShow = document.getElementById("header-container");

  if (!slideShow.contains(event.target)) {
    slideShow.classList.remove("toggle-fullscreen");
    document.body.classList.remove("no-scroll");
    let btn = document.getElementById("header-fullscreen");
    btn.classList.add("bx-fullscreen");
    btn.classList.remove("bx-fullscreen-exit");
  }
});

function toggleFullscreen(anyContainer, anyBtn) {
  let container = document.getElementById(anyContainer);
  let btn = document.getElementById(anyBtn);
  btn.classList.toggle("bx-fullscreen");
  btn.classList.toggle("bx-fullscreen-exit");
  container.classList.toggle("toggle-fullscreen");
  document.body.classList.toggle("no-scroll");
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
