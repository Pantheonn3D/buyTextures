/**
 * Main initialization script
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing application...");
    
    // Initialize custom scrollbar
    initCustomScrollbar();
    
    // Initialize page-specific features based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            // Home page initialization
            initHomePage();
            break;
            
        case 'texture-detail.html':
            // Detail page initialization (if you have a function for this)
            // initTexturePage();
            break;
            
        // Add other pages as needed
    }
    
    // Handle window resize for carousel
    window.addEventListener("resize", function() {
        if (typeof updateCarouselPosition === 'function') {
            updateCarouselPosition();
        }
    });
});