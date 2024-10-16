function toggleMenu() {
  const sideMenu = document.getElementById('sideMenu');
  if (sideMenu.style.left === '0px') {
    sideMenu.style.left = '-250px'; // Ocultar menu
  } else {
    sideMenu.style.left = '0px'; // Mostrar menu
  }
}