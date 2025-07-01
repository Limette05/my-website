document.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const menu_icon = document.querySelector(".menu-icon");
  const logo = document.querySelector(".nav-left a");
  const title = document.querySelector(".title-name")

  if (window.scrollY > 150) {
    // Navbar kleiner machen
    navbar.style.height = "0"; // Höhe der Navbar verkleinern
    menu_icon.style.top = "0.2em";
    menu_icon.style.height = "max-content";
    menu_icon.classList.add("menu-icon-free");
    // Logo ausblenden
    logo.style.opacity = "0";
    logo.style.height = "0"; // Größe des Logos auf 0 setzen
    logo.classList.add("disabled-a");
  } else {
    // Navbar wieder auf ursprüngliche Werte setzen
    navbar.style.height = "20vh";
    menu_icon.style.top = null;
    menu_icon.style.height = "20vh";
    menu_icon.classList.remove("menu-icon-free");
    // Logo wieder einblenden
    logo.style.opacity = "1";
    logo.style.height = "20vh"; // Ursprüngliche Größe des Logos
    logo.classList.remove("disabled-a");
  }
});

function showMenu() {
  let menu = document.getElementById("menu-content");
  let mobileMenu = document.getElementById("menu-content-mobile");
  let menuBtn = document.getElementById("mobile-menu-button");
  let device = getComputedStyle(document.body).getPropertyValue("--device");
  let menu_icon = document.getElementById("menu-icon");

  if (device === "desktop") {
    menu.classList.toggle("show-menu");
    menu_icon.classList.toggle("menu-icon-open");
  } else if (device === "mobile") {
    const isOpen = mobileMenu.classList.toggle("show-menu");
    menuBtn.classList.toggle("show-menu");
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }
}

// hide menu on clicking outside
window.addEventListener("mouseup", function (event) {
  const menu = document.getElementById("menu-content");
  const btn = document.getElementById("menu-icon");
  const device = getComputedStyle(document.body).getPropertyValue("--device");
  let menu_open = document.getElementById("menu-icon");

  if (
    device === "desktop" &&
    !menu.contains(event.target) &&
    !btn.contains(event.target)
  ) {
    menu.classList.remove("show-menu");
    menu_open.classList.remove("menu-icon-open");
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
  let scroll = 1000;

  if (device === "mobile") {
    scroll = 500;
  }

  if (direction === "left") {
    container.scrollLeft -= scroll;
  } else if (direction === "right") {
    container.scrollLeft += scroll;
  }
}
