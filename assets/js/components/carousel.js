/**
 * Carousel component for featured textures
 */

// Will be populated from textures.json
let textures = [];

/**
 * Generate carousel cards from texture data
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function generateCarouselCards(trackId = "carouselTrack") {
    const track = document.getElementById(trackId);
    
    if (!track) {
        console.error(`Carousel track element with ID '${trackId}' not found!`);
        return;
    }
    
    // Clear track first to prevent duplicates if function is called multiple times
    track.innerHTML = '';
    
    // Triple the array for smooth infinite scrolling
    const duplicatedTextures = [...textures, ...textures, ...textures]; 

    duplicatedTextures.forEach(texture => {
        const card = document.createElement("div");
        card.classList.add("carouselCard");

        let imageElement = `<img src="${texture.image}" alt="${texture.name}" class="carouselItem">`;
        if (texture.link) {
            imageElement = `<a href="${texture.link}">${imageElement}</a>`;
        }

        card.innerHTML = `
            ${imageElement}
            <p class="textureName">${texture.name}</p>
            <p class="textureDetails">${texture.details}</p>
            <div class="featuredButtonContainer">
                <button class="addFeaturedToCart">Add to cart</button>
                <button class="viewFeaturedTexture" onclick="location.href='${texture.link || '#'}'">View</button>
            </div>
        `;
        track.appendChild(card);
    });

    console.log(`generateCarouselCards(${trackId}): Added`, track.children.length, "cards.");
}

/**
 * Calculate the appropriate carousel offset based on screen size
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function calculateOffsets(trackId = "carouselTrack") {
    const track = document.getElementById(trackId);
    
    if (!track || track.children.length === 0) {
        console.error(`Track '${trackId}' not found or has no children`);
        return 0;
    }
    
    const firstCard = track.children[0];
    const cardWidth = firstCard.clientWidth;
    const gap = 16; // Match the CSS gap

    // Return appropriate offset based on screen size
    if (window.innerWidth <= 768) {
        return cardWidth / 1.3 + gap / 1.3;
    } else {
        return Math.floor(cardWidth / 3 + gap / 3);
    }
}

/**
 * Set the initial carousel position
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function updateCarouselPosition(trackId = "carouselTrack") {
    const track = document.getElementById(trackId);
    
    if (!track) {
        console.error(`Track '${trackId}' not found in updateCarouselPosition`);
        return;
    }
    
    const initialOffset = calculateOffsets(trackId);
    
    // Apply the transform to position cards
    track.style.transform = `translateX(-${initialOffset}px)`;
    console.log(`Updated carousel position for '${trackId}' with offset:`, initialOffset);
}

/**
 * Move the carousel one card to the left with animation
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function swipeLeft(trackId = "carouselTrack") {
    console.log(`swipeLeft triggered for '${trackId}'`);

    const track = document.getElementById(trackId);

    if (!track) {
        console.error(`Error: Carousel track '${trackId}' not found`);
        return;
    }

    if (track.children.length <= 4) { 
        console.warn(`Not enough items for scrolling in '${trackId}'. Exiting swipeLeft.`);
        return;
    }

    const initialOffset = calculateOffsets(trackId);
    const cardWidth = track.children[0]?.clientWidth || 0;
    const gap = 16;

    if (isNaN(initialOffset) || initialOffset === 0) {
        console.error(`Invalid initial offset for '${trackId}':`, initialOffset);
        return;
    }

    // 1. Animate carousel movement
    track.style.transition = "transform 1.5s ease-in-out";
    track.style.transform = `translateX(-${initialOffset + cardWidth + gap}px)`;

    // 2. After animation completes, move first card to end and reset position
    setTimeout(() => {
        const firstCard = track.firstElementChild;
        if (firstCard) {
            // Move first card to end
            track.appendChild(firstCard);
            
            // Disable transition for instant repositioning
            track.style.transition = "none";
            
            // Force browser to process style changes
            void track.offsetWidth;
            
            // Reset position to maintain illusion of infinite scroll
            track.style.transform = `translateX(-${initialOffset}px)`;
        }
    }, 1500); // Must match the transition duration
}

// Store auto-scroll intervals for different carousels
const autoScrollIntervals = {};

/**
 * Start auto-scroll for a carousel
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function startAutoScroll(trackId = "carouselTrack") {
    // Clear any existing interval first to prevent multiples
    if (autoScrollIntervals[trackId]) {
        clearInterval(autoScrollIntervals[trackId]);
    }
    autoScrollIntervals[trackId] = setInterval(() => swipeLeft(trackId), 3000);
    console.log(`Auto-scroll started for '${trackId}'`);
}

/**
 * Stop auto-scroll for a carousel
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function stopAutoScroll(trackId = "carouselTrack") {
    clearInterval(autoScrollIntervals[trackId]);
    console.log(`Auto-scroll stopped for '${trackId}'`);
}

/**
 * Initialize a carousel with texture data
 * @param {Array} textureData - Array of texture objects
 * @param {string} trackId - ID of the carousel track element (default: "carouselTrack")
 */
function initCarousel(textureData, trackId = "carouselTrack") {
    textures = textureData;
    generateCarouselCards(trackId);
    
    // Wait a moment for cards to render before positioning and starting animation
    setTimeout(() => {
        updateCarouselPosition(trackId);
        
        const track = document.getElementById(trackId);
        if (track && track.children.length > 4) {
            // Attach event listeners
            track.addEventListener("mouseenter", () => stopAutoScroll(trackId));
            track.addEventListener("mouseleave", () => startAutoScroll(trackId));
            
            // Start the auto-scroll
            startAutoScroll(trackId);
        } else {
            console.error(`Not enough items for infinite scroll in '${trackId}'.`);
        }
    }, 500);
}