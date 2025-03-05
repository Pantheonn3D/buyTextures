/**
 * Sidebar component functionality
 */

/**
 * Toggle sidebar and move shopping cart icon
 */
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("shoppingCart").classList.toggle("headerMove");
}