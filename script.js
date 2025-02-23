
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("shoppingCart").classList.toggle("headerMove");
}

//infinite scrolling carousel on homepage
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carouselTrack");
    const firstCard = track.children[0]; // Get the first card dynamically
    const cardWidth = firstCard.clientWidth;
    const gap = 16; // Match the CSS gap

    // Set the correct initial offset (half a card width)
    const initialOffset = cardWidth / 6 + gap / 6;
    track.style.transform = `translateX(-${initialOffset}px)`;

    function swipeLeft() {
        if (track.children.length > 10) {
            // Move exactly one full card width
            track.style.transition = "transform 1.5s ease-in-out";
            track.style.transform = `translateX(-${initialOffset + cardWidth + gap}px)`;

            setTimeout(() => {
                track.appendChild(track.children[0]); // Move first card to the end
                track.style.transition = "none";
                track.style.transform = `translateX(-${initialOffset}px)`; // Reset to correct offset
            }, 1500);
        }
    }

    setInterval(swipeLeft, 3000); // Moves every 3 seconds
});

//SCROLLBAR WORKS, DON'T TOUCH THIS CODE I HAVE NO IDEA WHY IT WORKS RIGHT NOW BUT IT DOES
document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector(".scroll-content");
    const scrollbar = document.querySelector(".custom-scrollbar-thumb");

    let isDragging = false;
    let startY, startScrollTop;
    let animationFrameId = null; // Store the requestAnimationFrame ID

    function updateScrollbar() {
        // Calculate scrollbar position based on scroll
        let scrollRatio = content.scrollTop / (content.scrollHeight - content.clientHeight);
        let scrollbarHeight = Math.max(content.clientHeight * (content.clientHeight / content.scrollHeight) / 2, 50); // Prevents thumb from being too small
        let scrollbarTop = scrollRatio * (content.clientHeight - scrollbarHeight) + 64;

        // Smoothly update scrollbar position using requestAnimationFrame
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(() => {
            scrollbar.style.height = scrollbarHeight + "px";
            scrollbar.style.top = scrollbarTop + "px";
        });
    }

    // Sync scrollbar when content scrolls
    content.addEventListener("scroll", updateScrollbar);
    updateScrollbar(); // Initialize position

    // Handle scrollbar dragging
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

        // Use requestAnimationFrame for smoother movement
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
});
