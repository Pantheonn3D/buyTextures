// Toggle sidebar, move shopping cart icon

export function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const cart = document.getElementById("shoppingCart");
    
    if (sidebar && cart) {
      sidebar.classList.toggle("open");
      cart.classList.toggle("headerMove");
    }
  }
  