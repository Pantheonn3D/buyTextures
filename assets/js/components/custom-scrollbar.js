/**
 * Custom scrollbar component
 */

/**
 * Initialize custom scrollbar
 */
function initCustomScrollbar() {
    const content = document.querySelector(".scroll-content");
    const scrollbar = document.querySelector(".custom-scrollbar-thumb");

    if (!content || !scrollbar) {
        console.error("Scrollbar elements not found");
        return;
    }

    let isDragging = false;
    let startY, startScrollTop;
    let animationFrameId = null;

    function updateScrollbar() {
        if (!content || !scrollbar) return;
        
        let scrollRatio = content.scrollTop / (content.scrollHeight - content.clientHeight);
        let scrollbarHeight = Math.max(content.clientHeight * (content.clientHeight / content.scrollHeight) / 2, 50);
        let scrollbarTop = scrollRatio * (content.clientHeight - scrollbarHeight);

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
            scrollbar.style.height = scrollbarHeight + "px";
            scrollbar.style.top = scrollbarTop + "px";
        });
    }

    // Add event listeners for scrollbar functionality
    content.addEventListener("scroll", updateScrollbar);
    
    scrollbar.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = content.scrollTop;
        document.body.style.userSelect = "none"; // Prevents text selection
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let deltaY = e.clientY - startY;
        let scrollStep = (content.scrollHeight - content.clientHeight) / (content.clientHeight - scrollbar.clientHeight);

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
            content.scrollTop = startScrollTop + deltaY * scrollStep;
        });
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "auto"; // Restore text selection
    });
    
    // Initialize scrollbar position
    updateScrollbar();
}