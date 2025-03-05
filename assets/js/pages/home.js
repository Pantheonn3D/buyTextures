/**
 * Home page specific functionality
 */

// Hardcoded texture data with correct image paths
const textureData = [
    { 
        image: "assets/textures/concrete/concrete-rough/main-preview.webp", 
        name: "Concrete Rough", 
        details: "8K Resolution, seamless", 
        link: "pages/texture-detail.html?id=concrete-rough" 
    },
    { 
        image: "assets/textures/acoustic/acoustic-panel-white/main-preview.webp", 
        name: "White Acoustic Panel", 
        details: "8K Resolution, seamless",
        link: "pages/texture-detail.html?id=acoustic-panel-white"
    },
    { 
        image: "assets/textures/fabric/fabric-couch-beige/main-preview.webp", 
        name: "Beige Couch Fabric", 
        details: "8K Resolution, seamless",
        link: "pages/texture-detail.html?id=fabric-couch-beige"
    },
    { 
        image: "assets/textures/fabric/sweater-wool-beige/main-preview.webp", 
        name: "Beige Sweater Wool", 
        details: "8K Resolution, seamless",
        link: "pages/texture-detail.html?id=sweater-wool-beige"
    }
];

function initHomePage() {
    console.log("Initializing home page...");
    
    // Fetch texture data from JSON file
    fetch('data/textures.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update image paths to use the assets directory prefix
            const processedData = data.map(texture => ({
                ...texture,
                image: `assets/${texture.image}`
            }));
            
            // Filter for featured textures if needed
            const featuredTextures = processedData.filter(texture => texture.featured);
            
            // Initialize carousel with the featured textures
            initCarousel(featuredTextures.length > 0 ? featuredTextures : processedData);
        })
        .catch(error => {
            console.error('Error loading textures:', error);
            // Fallback to hardcoded data - you can keep your original array as fallback
            const textureData = [
                { 
                    image: "assets/textures/concrete/concrete-rough/main-preview.webp", 
                    name: "Concrete Rough", 
                    details: "8K Resolution, seamless", 
                    link: "pages/texture-detail.html?id=concrete-rough" 
                },
                { 
                    image: "assets/textures/acoustic/acoustic-panel-white/main-preview.webp", 
                    name: "White Acoustic Panel", 
                    details: "8K Resolution, seamless",
                    link: "pages/texture-detail.html?id=acoustic-panel-white"
                },
                { 
                    image: "assets/textures/fabric/fabric-couch-beige/main-preview.webp", 
                    name: "Beige Couch Fabric", 
                    details: "8K Resolution, seamless",
                    link: "pages/texture-detail.html?id=fabric-couch-beige"
                },
                { 
                    image: "assets/textures/fabric/sweater-wool-beige/main-preview.webp", 
                    name: "Beige Sweater Wool", 
                    details: "8K Resolution, seamless",
                    link: "pages/texture-detail.html?id=sweater-wool-beige"
                }
            ];
            
            initCarousel(textureData);
        });
}
