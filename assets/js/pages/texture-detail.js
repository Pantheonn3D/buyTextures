/**
 * Texture Detail Page functionality
 */

// Fallback texture data with correct paths (used if JSON fetch fails)
const fallbackTextureData = [
    {
      id: "concrete-rough",
      image: "assets/textures/concrete/concrete-rough/main-preview.webp",
      name: "Concrete Rough",
      details: "8K Resolution, seamless",
      description: "High-quality rough concrete texture with detailed surface variations perfect for architectural visualization and gaming environments.",
      category: "concrete",
      price: 0.99,
      featured: true,
      resolution: "8192 × 8192",
      format: "png",
      maps: {
        diffuse: "assets/textures/concrete/concrete-rough/maps/diffuse.jpg",
        normal: "assets/textures/concrete/concrete-rough/maps/normal.jpg"
      }
    },
    {
      id: "acoustic-panel-white",
      image: "assets/textures/acoustic/acoustic-panel-white/main-preview.webp",
      name: "White Acoustic Panel",
      details: "8K Resolution, seamless",
      description: "Clean white acoustic panel texture with precise perforations, ideal for interior design and audio visual environments.",
      category: "acoustic",
      price: 0.99,
      featured: true,
      resolution: "8192 × 8192",
      format: "png",
      maps: {
        diffuse: "assets/textures/acoustic/acoustic-panel-white/maps/diffuse.jpg",
        normal: "assets/textures/acoustic/acoustic-panel-white/maps/normal.jpg"
      }
    },
    {
      id: "fabric-couch-beige",
      image: "assets/textures/fabric/fabric-couch-beige/main-preview.webp",
      name: "Beige Couch Fabric",
      details: "8K Resolution, seamless",
      description: "Soft beige fabric texture with subtle weave pattern, perfect for furniture upholstery and interior design projects.",
      category: "fabric",
      price: 0.99,
      featured: true,
      resolution: "8192 × 8192",
      format: "png",
      maps: {
        diffuse: "assets/textures/fabric/fabric-couch-beige/maps/diffuse.jpg",
        normal: "assets/textures/fabric/fabric-couch-beige/maps/normal.jpg"
      }
    },
    {
      id: "sweater-wool-beige",
      image: "assets/textures/fabric/sweater-wool-beige/main-preview.webp",
      name: "Beige Sweater Wool",
      details: "8K Resolution, seamless",
      description: "Ultra-detailed beige sweater wool texture perfect for clothing, furniture and fabric simulations. This texture delivers exceptional detail and realism for your 3D projects.",
      category: "fabric",
      price: 0.99,
      featured: true,
      resolution: "8192 × 8192",
      format: "png",
      maps: {
        diffuse: "assets/textures/fabric/sweater-wool-beige/maps/diffuse.jpg",
        normal: "assets/textures/fabric/sweater-wool-beige/maps/normal.jpg",
        height: "assets/textures/fabric/sweater-wool-beige/maps/height.jpg"
      }
    }
];

/**
 * Get URL parameter by name
 */
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Initialize the expandable sections with smooth height animation
 */
function initExpandableSections() {
    // Technical Details section
    const techToggleBtn = document.getElementById('toggleTechnicalDetails');
    const techSection = document.getElementById('technicalDetailsContainer');
    const techContent = document.getElementById('technicalDetailsContent');
    
    if (techToggleBtn && techSection && techContent) {
        techToggleBtn.addEventListener('click', function() {
            if (techSection.classList.contains('expanded')) {
                // Collapse
                techSection.classList.remove('expanded');
                techContent.style.height = '0';
            } else {
                // Expand - calculate content height first
                techSection.classList.add('expanded');
                const height = techContent.scrollHeight;
                techContent.style.height = height + 'px';
            }
        });
    }
    
    // SEO Description section
    const seoToggleBtn = document.getElementById('toggleSeoDescription');
    const seoSection = document.getElementById('seoDetailedDescription');
    const seoContent = document.getElementById('seoDescriptionContent');
    
    if (seoToggleBtn && seoSection && seoContent) {
        seoToggleBtn.addEventListener('click', function() {
            if (seoSection.classList.contains('expanded')) {
                // Collapse
                seoSection.classList.remove('expanded');
                seoContent.style.height = '0';
            } else {
                // Expand - calculate content height first
                seoSection.classList.add('expanded');
                const height = seoContent.scrollHeight;
                seoContent.style.height = height + 'px';
            }
        });
    }
}

/**
 * Initialize the image zoom functionality
 */
function initImageZoom() {
    const overlay = document.getElementById('imageZoomOverlay');
    const zoomImage = document.getElementById('zoomImage');
    const closeBtn = document.getElementById('zoomCloseBtn');
    
    if (!overlay || !zoomImage || !closeBtn) return;
    
    // Close zoom on button click
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
    });
    
    // Close zoom on background click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
    
    // Close zoom on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    });
    
    // Add click event to main image for zoom
    const mainImageContainer = document.getElementById('mainImageContainer');
    if (mainImageContainer) {
        mainImageContainer.addEventListener('click', (e) => {
            const img = e.target.closest('img');
            if (img) {
                zoomImage.src = img.src;
                zoomImage.alt = img.alt;
                overlay.classList.add('active');
            }
        });
    }
}

/**
 * Initialize image navigation arrows
 */
function initImageNavigation() {
    const prevArrow = document.querySelector('.image-nav-prev');
    const nextArrow = document.querySelector('.image-nav-next');
    
    if (!prevArrow || !nextArrow) return;
    
    prevArrow.addEventListener('click', () => {
        // Find current active thumbnail
        const activeThumbnail = document.querySelector('.smallPreviewImage.active');
        if (!activeThumbnail) return;
        
        // Get previous thumbnail
        const prevThumbnail = activeThumbnail.previousElementSibling;
        if (prevThumbnail) {
            prevThumbnail.click();
        } else {
            // Wrap around to the last thumbnail
            const thumbnails = document.querySelectorAll('.smallPreviewImage');
            if (thumbnails.length > 0) {
                thumbnails[thumbnails.length - 1].click();
            }
        }
    });
    
    nextArrow.addEventListener('click', () => {
        // Find current active thumbnail
        const activeThumbnail = document.querySelector('.smallPreviewImage.active');
        if (!activeThumbnail) return;
        
        // Get next thumbnail
        const nextThumbnail = activeThumbnail.nextElementSibling;
        if (nextThumbnail) {
            nextThumbnail.click();
        } else {
            // Wrap around to the first thumbnail
            const thumbnails = document.querySelectorAll('.smallPreviewImage');
            if (thumbnails.length > 0) {
                thumbnails[0].click();
            }
        }
    });
}

/**
 * Update the main image display
 */
function updateMainImage(texture) {
    const mainImageContainer = document.getElementById('mainImageContainer');
    if (!mainImageContainer) return;
    
    // Convert path from assets/... to ../assets/... for pages folder
    const mainImagePath = texture.image.replace(/^assets\//, '../assets/');
    
    // Check if we already have a wrapper and image
    let wrapper = mainImageContainer.querySelector('.mainImageWrapper');
    
    if (!wrapper) {
        // Create wrapper if it doesn't exist
        wrapper = document.createElement('div');
        wrapper.className = 'mainImageWrapper';
        
        // Insert wrapper at the beginning, but after any navigation arrows
        const arrows = mainImageContainer.querySelectorAll('.image-nav-arrow');
        if (arrows.length > 0) {
            arrows[arrows.length - 1].after(wrapper);
        } else {
            mainImageContainer.prepend(wrapper);
        }
    }
    
    // Update or create the image
    let img = wrapper.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        img.className = 'mainTextureImage';
        wrapper.appendChild(img);
    }
    
    // Set image properties
    img.src = mainImagePath;
    img.alt = texture.name;
}

/**
 * Update the texture detail page with the provided texture data
 */
function updateTextureDetailPage(texture, allTextures) {
    console.log("Updating page with texture:", texture.name);
    
    // Update page title
    document.title = `${texture.name} - Texture Marketplace`;
    
    // Update main texture image
    updateMainImage(texture);
    
    // Update preview images
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
        // Clear existing previews
        previewContainer.innerHTML = '';
        
        // Add main preview
        const mainPreviewPath = texture.image.replace(/^assets\//, '../assets/');
        addPreviewImage(previewContainer, mainPreviewPath, `${texture.name} main preview`, true);
        
        // Add map previews if available
        if (texture.maps) {
            for (const [mapType, mapPath] of Object.entries(texture.maps)) {
                const adjustedMapPath = mapPath.replace(/^assets\//, '../assets/');
                addPreviewImage(previewContainer, adjustedMapPath, `${texture.name} ${mapType} map`, false, mapType);
            }
        }
    }
    
    // Update texture details
    const titleElement = document.getElementById('textureTitle');
    if (titleElement) {
        titleElement.textContent = texture.name;
    }
    
    const descriptionElement = document.getElementById('textureDescription');
    if (descriptionElement) {
        // Clear existing spans
        descriptionElement.innerHTML = '';
        
        // Add key details as spans
        const details = texture.details.split(',').map(detail => detail.trim());
        details.forEach(detail => {
            const span = document.createElement('span');
            span.textContent = detail;
            descriptionElement.appendChild(span);
        });
    }
    
    const fullDescriptionElement = document.getElementById('textureFullDescription');
    if (fullDescriptionElement) {
        fullDescriptionElement.textContent = texture.description || texture.details;
    }
    
    const priceElement = document.getElementById('texturePrice');
    if (priceElement) {
        // Preserve the currency span if it exists
        let currencySpan = priceElement.querySelector('.currency');
        if (!currencySpan) {
            currencySpan = document.createElement('span');
            currencySpan.className = 'currency';
            currencySpan.textContent = '$';
            priceElement.prepend(currencySpan);
        }
        
        // Set price text directly to the price element (after the currency span)
        priceElement.childNodes[1].nodeValue = texture.price.toFixed(2);
    }
    
    // Update texture details list
    const detailsListElement = document.getElementById('textureDetailsList');
    if (detailsListElement) {
        detailsListElement.innerHTML = `
            <div class="detailItem">
                <span class="detailLabel">Resolution</span>
                <span class="detailValue">${texture.resolution || '8192 × 8192'}</span>
            </div>
            <div class="detailItem">
                <span class="detailLabel">Seamless</span>
                <span class="detailValue">Yes</span>
            </div>
            <div class="detailItem">
                <span class="detailLabel">File Format</span>
                <span class="detailValue">${texture.format || 'PNG'}</span>
            </div>
            <div class="detailItem">
                <span class="detailLabel">PBR Maps</span>
                <span class="detailValue">${Object.keys(texture.maps).length}</span>
            </div>
        `;
    }
    
    // Update maps list
    const mapsListElement = document.getElementById('textureMapsList');
    if (mapsListElement) {
        mapsListElement.innerHTML = '';
        
        // Add map types
        const mapTypes = Object.keys(texture.maps);
        for (const mapType of mapTypes) {
            const formattedName = mapType.charAt(0).toUpperCase() + mapType.slice(1);
            const element = document.createElement('div');
            element.className = 'mapType included';
            element.innerHTML = `<i class="fi fi-rr-check"></i>${formattedName}`;
            mapsListElement.appendChild(element);
            
            // Add click event to select the corresponding thumbnail
            element.addEventListener('click', () => {
                const thumbnails = document.querySelectorAll('.smallPreviewImage');
                thumbnails.forEach(thumbnail => {
                    if (thumbnail.classList.contains(mapType)) {
                        thumbnail.click();
                    }
                });
            });
        }
    }
    
    // Set up suggested textures
    setupSuggestedTextures(allTextures, texture.id);
    
    // Update SEO description
    updateSeoDescription(texture.id);
    
    // Set up Add to Cart button functionality
    setupAddToCartButton(texture);
    
    // Initialize image navigation
    initImageNavigation();
}

/**
 * Helper function to add a preview image with click functionality
 */
function addPreviewImage(container, imagePath, altText, isActive, mapType = '') {
    const preview = document.createElement('div');
    preview.className = `smallPreviewImage ${isActive ? 'active' : ''} ${mapType}`;
    
    // Add map type indicator for non-main previews
    let indicatorHTML = '';
    if (mapType) {
        indicatorHTML = `<div class="map-type-indicator">${mapType}</div>`;
    }
    
    preview.innerHTML = `<img src="${imagePath}" alt="${altText}">${indicatorHTML}`;
    
    // Add click event to update main image
    preview.addEventListener('click', () => {
        // Update main image
        const mainImageContainer = document.getElementById('mainImageContainer');
        const mainImageWrapper = mainImageContainer.querySelector('.mainImageWrapper');
        if (mainImageWrapper) {
            const mainImage = mainImageWrapper.querySelector('img') || document.createElement('img');
            mainImage.src = imagePath;
            mainImage.alt = altText;
            mainImage.className = 'mainTextureImage';
            
            if (!mainImage.parentNode) {
                mainImageWrapper.appendChild(mainImage);
            }
        }
        
        // Update active state
        document.querySelectorAll('.smallPreviewImage').forEach(p => p.classList.remove('active'));
        preview.classList.add('active');
    });
    
    container.appendChild(preview);
}

/**
 * Add suggested textures to the right panel
 */
function setupSuggestedTextures(allTextures, currentTextureId) {
    const suggestedPanel = document.getElementById('suggestedTextures');
    if (!suggestedPanel) return;
    
    // Clear panel
    suggestedPanel.innerHTML = '';
    
    // Filter out current texture and get random textures
    const otherTextures = allTextures.filter(t => t.id !== currentTextureId);
    const shuffled = otherTextures.sort(() => 0.5 - Math.random());
    const selectedTextures = shuffled.slice(0, 4);
    
    // Add textures to panel
    selectedTextures.forEach(texture => {
        const imagePath = texture.image.replace(/^assets\//, '../assets/');
        const card = document.createElement('a');
        card.href = `texture-detail.html?id=${texture.id}`;
        card.className = 'suggestedTextureCard';
        card.innerHTML = `
            <img src="${imagePath}" alt="${texture.name}">
            <div class="suggestedTextureInfo">
                <h4>${texture.name}</h4>
                <div class="suggestedPrice">$${texture.price.toFixed(2)}</div>
            </div>
        `;
        suggestedPanel.appendChild(card);
    });
}

/**
 * Update the SEO detailed description based on texture ID
 */
function updateSeoDescription(textureId) {
    const seoContent = document.getElementById('seoDescriptionContent');
    if (!seoContent) return;
    
    // Map of texture IDs to their detailed SEO descriptions
    const seoDescriptions = {
        "sweater-wool-beige": `<h2>Beige Sweater Wool Texture - Complete Technical Documentation</h2>
            <p>The <span class="keyword">Beige Cable Knit Sweater Wool Texture</span> is a premium 8K resolution seamless texture meticulously crafted to deliver photorealistic fabric simulation for 3D design, architectural visualization, product rendering, fashion design, gaming environments, and virtual reality applications. This high-end texture captures the intricate detail and warmth of hand-knitted cable patterns found in luxury winter apparel, home textiles, and cozy interior design elements.</p>

            <div class="technicalSpec">
                <h4>Technical Specifications</h4>
                <dl>
                    <dt>Resolution</dt>
                    <dd>8192 × 8192 pixels (8K Ultra HD)</dd>
                    
                    <dt>Color Depth</dt>
                    <dd>16-bit per channel (48-bit color)</dd>
                    
                    <dt>File Format</dt>
                    <dd>PNG with alpha channel, EXR available on request</dd>
                    
                    <dt>Seamless Tiling</dt>
                    <dd>Perfect edge-to-edge continuity at any scale</dd>
                    
                    <dt>UV Mapping</dt>
                    <dd>UV coordinates optimized for standard 3D modeling platforms</dd>
                    
                    <dt>Physical Size Reference</dt>
                    <dd>100cm × 100cm at native resolution</dd>
                    
                    <dt>Texel Density</dt>
                    <dd>81.92 pixels per centimeter</dd>
                </dl>
            </div>

            <h3>Included PBR Maps and Textures</h3>

            <p>This comprehensive texture pack includes all necessary physically-based rendering maps to achieve true-to-life material simulation in your preferred rendering engine:</p>

            <ul>
                <li><strong>Diffuse/Albedo Map (8K):</strong> Captures the natural beige wool color variations with subtle yarn transitions and fiber highlights</li>
                <li><strong>Normal Map (8K):</strong> Precisely documents the three-dimensional cable knit pattern with realistic yarn twists and crossovers</li>
                <li><strong>Height/Displacement Map (8K):</strong> Adds true geometric depth to the cable patterns, enabling close-up rendering with accurate self-shadowing</li>
                <li><strong>Roughness Map (8K):</strong> Mimics the variable surface smoothness of wool fibers, with higher roughness in the densely knitted areas</li>
                <li><strong>Ambient Occlusion Map (8K):</strong> Enhances realism by accurately shadowing the deep recesses between cable patterns</li>
            </ul>

            <h3>Detailed Visual Characteristics</h3>

            <p>The <span class="keyword">beige wool cable knit texture</span> exhibits classic Aran-inspired patterns with intricate twists and crossovers that create a three-dimensional, tactile appearance. The pattern features:</p>

            <ul>
                <li>Prominent vertical cable twists with approximately 2cm width, showcasing the traditional 6-stitch rope cable technique</li>
                <li>Precisely modeled purl stitch backgrounds creating depth contrast between the raised cables</li>
                <li>Natural fiber irregularities with fine individual strands visible at close inspection</li>
                <li>Subtle color variations ranging from warm cream to light tan (Pantone 13-0905 TCX "Angora" to 14-1012 TCX "Sand Dollar")</li>
                <li>Authentic light-catching properties that highlight the raised portions of the knit pattern</li>
                <li>Microscopic fuzz and fiber detail visible at maximum zoom, perfect for extreme close-up product visualization</li>
            </ul>

            <h3>Optimal Rendering Settings</h3>

            <p>To achieve photorealistic results with the <span class="keyword">beige cable knit wool texture</span>, we recommend these render configurations:</p>

            <table>
                <tr>
                    <th>Rendering Engine</th>
                    <th>Material Type</th>
                    <th>Recommended Settings</th>
                </tr>
                <tr>
                    <td>Arnold</td>
                    <td>aiStandardSurface</td>
                    <td>Base: 1.0, Specular: 0.3, Roughness: 0.75-0.85, Subsurface: 0.15, Displacement: 0.4-0.6</td>
                </tr>
                <tr>
                    <td>V-Ray</td>
                    <td>VRayMtl</td>
                    <td>Diffuse: 0.85, Reflect: 0.1, Reflect Glossiness: 0.2, Displacement Amount: 0.5-0.7</td>
                </tr>
                <tr>
                    <td>Blender Cycles</td>
                    <td>Principled BSDF</td>
                    <td>Base Color: Texture, Roughness: 0.8, Specular: 0.3, Displacement: 0.5, Subsurface: 0.1</td>
                </tr>
            </table>

            <h3>Optimal Applications & Use Cases</h3>

            <p>The <span class="keyword">beige cable knit wool texture</span> is perfectly suited for a wide range of applications, including:</p>

            <ul>
                <li><strong>Fashion Design & Virtual Garment Prototyping:</strong> Create realistic winter sweaters, cardigans, scarves, hats, and other knitted apparel with authentic fiber detail</li>
                <li><strong>Interior Visualization:</strong> Design cozy living spaces with textured throws, cushions, ottomans, and upholstery</li>
                <li><strong>Product Visualization:</strong> Showcase knitted home goods, furniture coverings, and textile products with true-to-life detail</li>
                <li><strong>Architectural Visualization:</strong> Add warmth and tactile elements to residential interiors through textured accents</li>
                <li><strong>Game Development:</strong> Create high-fidelity environment assets and character clothing that respond realistically to in-game lighting</li>
            </ul>`,
        
        "acoustic-panel-white": `<h2>White Acoustic Panel Texture - Complete Technical Documentation</h2>
            <p>The <span class="keyword">White Acoustic Panel Texture</span> is a premium 8K resolution seamless material meticulously designed for architectural visualization, acoustic simulation, interior design, product rendering, and high-fidelity 3D applications. This professional-grade texture captures the precise geometric pattern and surface properties of perforated acoustic panels used in contemporary architecture, commercial interiors, recording studios, and performance spaces.</p>

            <div class="technicalSpec">
                <h4>Technical Specifications</h4>
                <dl>
                    <dt>Resolution</dt>
                    <dd>8192 × 8192 pixels (8K Ultra HD)</dd>
                    
                    <dt>Color Depth</dt>
                    <dd>16-bit per channel (48-bit color)</dd>
                    
                    <dt>File Format</dt>
                    <dd>PNG with alpha channel for perforations, EXR available on request</dd>
                    
                    <dt>Seamless Tiling</dt>
                    <dd>Perfect edge-to-edge continuity with aligned perforation pattern</dd>
                    
                    <dt>UV Mapping</dt>
                    <dd>Optimized for standard architectural surfaces with precise pattern alignment</dd>
                    
                    <dt>Physical Size Reference</dt>
                    <dd>120cm × 120cm at native resolution</dd>
                    
                    <dt>Texel Density</dt>
                    <dd>68.27 pixels per centimeter</dd>
                </dl>
            </div>

            <h3>Included PBR Maps and Textures</h3>

            <p>This comprehensive texture set includes all necessary physically-based rendering maps for realistic acoustic panel simulation:</p>

            <ul>
                <li><strong>Diffuse/Albedo Map (8K):</strong> Captures the clean white surface with subtle variations in tone and reflectivity</li>
                <li><strong>Normal Map (8K):</strong> Accurately represents the three-dimensional aspects of the perforations and panel surface</li>
                <li><strong>Height/Displacement Map (8K):</strong> Provides precise geometric detail for the perforations and micro-surface texture</li>
                <li><strong>Roughness Map (8K):</strong> Maps the variable surface smoothness between the main panel and perforation edges</li>
                <li><strong>Ambient Occlusion Map (8K):</strong> Enhances depth within perforations and subtle surface variations</li>
                <li><strong>Metallic/Specular Map (8K):</strong> Defines precise reflective properties of the panel surface</li>
                <li><strong>Opacity/Alpha Map (8K):</strong> Enables true perforation rendering without geometric modeling</li>
            </ul>

            <h3>Detailed Visual Characteristics</h3>

            <p>The <span class="keyword">white acoustic panel texture</span> features these distinctive properties:</p>

            <ul>
                <li>Precise geometric pattern of 3mm diameter perforations in a square grid arrangement</li>
                <li>5mm spacing between perforation centers (approximately 40,000 perforations per square meter)</li>
                <li>Clean, semi-matte white surface finish with subtle surface texture</li>
                <li>Precisely calibrated white tone matching Pantone 11-0601 TCX "Bright White"</li>
                <li>Subtle panel edge detailing for realistic seam visualization</li>
                <li>Micro-texture on the panel surface mimicking pressed mineral fiber or micro-perforated MDF</li>
                <li>Slight color variation around perforation edges to enhance depth perception</li>
                <li>Captured dust and minor wear patterns for authentic aged appearance (optional overlay)</li>
            </ul>

            <h3>Optimal Rendering Settings</h3>

            <p>To achieve photorealistic results with the <span class="keyword">acoustic panel texture</span>, we recommend these render configurations:</p>

            <table>
                <tr>
                    <th>Rendering Engine</th>
                    <th>Material Type</th>
                    <th>Recommended Settings</th>
                </tr>
                <tr>
                    <td>Arnold</td>
                    <td>aiStandardSurface</td>
                    <td>Base: 0.95, Specular: 0.3, Roughness: 0.4-0.6, Opacity: Alpha Map, Displacement: 0.3-0.5</td>
                </tr>
                <tr>
                    <td>V-Ray</td>
                    <td>VRayMtl</td>
                    <td>Diffuse: 0.95, Reflect: 0.15, Reflect Glossiness: 0.4, Opacity: Alpha Map, Displacement: 0.3-0.5</td>
                </tr>
                <tr>
                    <td>Blender Cycles</td>
                    <td>Principled BSDF</td>
                    <td>Base Color: Texture, Roughness: 0.5-0.6, Specular: 0.3, Alpha: Connected, Displacement: 0.4</td>
                </tr>
            </table>

            <h3>Optimal Applications & Use Cases</h3>

            <p>The <span class="keyword">white acoustic panel texture</span> is ideally suited for:</p>

            <ul>
                <li><strong>Architectural Visualization:</strong> Contemporary ceilings, wall treatments, and acoustic features</li>
                <li><strong>Interior Design:</strong> Office spaces, conference rooms, auditoriums, and performance venues</li>
                <li><strong>Studio Design:</strong> Recording studios, broadcast facilities, and audio production environments</li>
                <li><strong>Commercial Spaces:</strong> Restaurants, lobbies, retail environments, and public buildings</li>
                <li><strong>Educational Facilities:</strong> Lecture halls, classrooms, and multipurpose spaces</li>
            </ul>`,
        
        "concrete-rough": `<h2>Rough Concrete Texture - Complete Technical Documentation</h2>
            <p>The <span class="keyword">Rough Concrete Texture</span> is a premium 8K resolution seamless material designed for architectural visualization, industrial environments, urban settings, and detailed 3D applications. This professional-grade texture captures the rugged character of weathered concrete with realistic surface irregularities, creating authentic visual depth for walls, floors, facades, and structural elements.</p>

            <div class="technicalSpec">
                <h4>Technical Specifications</h4>
                <dl>
                    <dt>Resolution</dt>
                    <dd>8192 × 8192 pixels (8K Ultra HD)</dd>
                    
                    <dt>Color Depth</dt>
                    <dd>16-bit per channel (48-bit color)</dd>
                    
                    <dt>File Format</dt>
                    <dd>PNG with alpha channel, EXR available on request</dd>
                    
                    <dt>Seamless Tiling</dt>
                    <dd>Perfect edge-to-edge continuity for unlimited surface coverage</dd>
                    
                    <dt>UV Mapping</dt>
                    <dd>Optimized for standard architectural mapping with no stretching</dd>
                    
                    <dt>Physical Size Reference</dt>
                    <dd>200cm × 200cm at native resolution</dd>
                    
                    <dt>Texel Density</dt>
                    <dd>40.96 pixels per centimeter</dd>
                </dl>
            </div>

            <h3>Included PBR Maps and Textures</h3>

            <p>This comprehensive texture set includes all necessary physically-based rendering maps for realistic concrete simulation:</p>

            <ul>
                <li><strong>Diffuse/Albedo Map (8K):</strong> Captures the natural concrete color with stains, aging and subtle color variations</li>
                <li><strong>Normal Map (8K):</strong> Accurately represents the three-dimensional surface irregularities, cracks, and aggregate</li>
                <li><strong>Height/Displacement Map (8K):</strong> Provides precise geometric detail for close-up rendering with realistic depth</li>
                <li><strong>Roughness Map (8K):</strong> Maps variable surface smoothness from worn areas to rougher sections</li>
                <li><strong>Ambient Occlusion Map (8K):</strong> Enhances depth perception with accurate shadowing in crevices and depressions</li>
            </ul>

            <h3>Detailed Visual Characteristics</h3>

            <p>The <span class="keyword">rough concrete texture</span> features these distinctive properties:</p>

            <ul>
                <li>Visible aggregate distribution with varied stone size and placement</li>
                <li>Authentic surface pitting and air bubble impressions from the casting process</li>
                <li>Natural weathering patterns with subtle staining and discoloration</li>
                <li>Micro-cracks and stress fractures that add realism without suggesting structural failure</li>
                <li>Subtle color variations ranging from light to medium gray tones</li>
                <li>Surface irregularities and undulations creating natural shadow-catching areas</li>
                <li>Rough-cast finish with trowel marks and form impressions</li>
            </ul>

            <h3>Optimal Applications & Use Cases</h3>

            <p>The <span class="keyword">rough concrete texture</span> is ideally suited for:</p>

            <ul>
                <li><strong>Architectural Visualization:</strong> Industrial buildings, urban exteriors, basement walls, parking structures</li>
                <li><strong>Interior Design:</strong> Industrial and urban-inspired interiors, raw concrete feature walls</li>
                <li><strong>Game Development:</strong> Urban environments, industrial settings, post-apocalyptic scenes</li>
                <li><strong>VFX and Film:</strong> Set extensions, matte paintings, and digital environments</li>
                <li><strong>Product Design:</strong> Concrete furniture, decorative elements, and architectural features</li>
            </ul>`
    };
    
    // Get the SEO content for this texture ID, or use a default if not found
    const seoHTML = seoDescriptions[textureId] || `
        <h2>${textureId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Technical Details</h2>
        <p>This premium 8K resolution texture is optimized for photorealistic rendering and visualization. The seamless design ensures perfect tiling across large surfaces while maintaining exceptional detail at close viewing distances.</p>
        
        <div class="technicalSpec">
            <h4>Technical Specifications</h4>
            <dl>
                <dt>Resolution</dt>
                <dd>8192 × 8192 pixels (8K Ultra HD)</dd>
                
                <dt>Color Depth</dt>
                <dd>16-bit per channel (48-bit color)</dd>
                
                <dt>File Format</dt>
                <dd>PNG with alpha channel</dd>
                
                <dt>Seamless Tiling</dt>
                <dd>Yes, perfect edge-to-edge continuity</dd>
            </dl>
        </div>
        
        <h3>Included PBR Maps</h3>
        <p>This texture includes multiple PBR maps for photorealistic rendering in your preferred 3D application.</p>
    `;
    
    // Set the content
    seoContent.innerHTML = seoHTML;
}

/**
 * Handle case when texture is not found
 */
function handleTextureNotFound() {

        // Specific implementation for texture-detail.html
    // Use an immediately invoked function to avoid pollution in global scope
    (function() {
        // Flag to track if handlers are already attached
        let handlersAttached = false;
        
        document.addEventListener('DOMContentLoaded', function() {
            // Only attach handlers once
            if (handlersAttached) return;
            handlersAttached = true;
            
            // Find the add to cart button
            const addToCartBtn = document.querySelector('.add-to-cart-btn');
            
            if (addToCartBtn) {
                // Remove any existing click listeners
                const newBtn = addToCartBtn.cloneNode(true);
                addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
                
                // Add our single click listener
                newBtn.addEventListener('click', function() {
                    // Get texture details from the page
                    const textureId = this.getAttribute('data-id');
                    const textureName = document.querySelector('.texture-title').textContent;
                    const texturePrice = parseFloat(document.querySelector('.texture-price').textContent.replace('$', ''));
                    const textureCategory = document.querySelector('.texture-category').textContent;
                    const textureImage = document.querySelector('.texture-preview img').src;
                    
                    // Create texture item object
                    const textureItem = {
                        id: textureId,
                        name: textureName,
                        price: texturePrice,
                        category: textureCategory,
                        image: textureImage
                    };
                    
                    // Add to cart with debounce protection
                    addToCart(textureItem);
                });
            }
        });
    })();
    document.title = 'Texture Not Found - Texture Marketplace';
    
    const titleElement = document.getElementById('textureTitle');
    if (titleElement) {
        titleElement.textContent = 'Texture Not Found';
    }
    
    const descriptionElement = document.getElementById('textureDescription');
    if (descriptionElement) {
        descriptionElement.innerHTML = '<span>Not Available</span>';
    }
    
    const fullDescriptionElement = document.getElementById('textureFullDescription');
    if (fullDescriptionElement) {
        fullDescriptionElement.textContent = 'The texture you are looking for might have been removed or is temporarily unavailable. Please check the URL or return to the home page.';
    }
    
    // Clear price and hide cart button
    const priceElement = document.getElementById('texturePrice');
    if (priceElement) {
        priceElement.innerHTML = '<span class="currency">$</span>0.00';
    }
        // Find the checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                initiateCheckout();
            });
        }
    

    // Show "not found" message in image area
    const mainImageContainer = document.getElementById('mainImageContainer');
    if (mainImageContainer) {
        // Clear navigation arrows
        const arrows = mainImageContainer.querySelectorAll('.image-nav-arrow');
        arrows.forEach(arrow => arrow.style.display = 'none');
        
        // Add not found message
        const wrapper = mainImageContainer.querySelector('.mainImageWrapper') || document.createElement('div');
        wrapper.className = 'mainImageWrapper';
        wrapper.innerHTML = `
            <div class="notFoundMessage">
                <i class="fi fi-rr-exclamation"></i>
                <h2>Texture Not Found</h2>
                <p>We couldn't find the texture you were looking for.</p>
                <a href="../index.html">Return to Homepage</a>
            </div>
        `;
        
        if (!wrapper.parentNode) {
            mainImageContainer.appendChild(wrapper);
        }
    }
    
    // Hide previews and clear other sections
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    
    const detailsListElement = document.getElementById('textureDetailsList');
    if (detailsListElement) {
        detailsListElement.innerHTML = '';
    }
    
    const mapsListElement = document.getElementById('textureMapsList');
    if (mapsListElement) {
        mapsListElement.innerHTML = '';
    }
    
    // Hide expandable sections
    const techSection = document.getElementById('technicalDetailsContainer');
    if (techSection) {
        techSection.style.display = 'none';
    }
    
    const seoSection = document.getElementById('seoDetailedDescription');
    if (seoSection) {
        seoSection.style.display = 'none';
    }
}

/**
 * Initialize the texture detail page
 */
function initTextureDetailPage() {
    console.log("Initializing texture detail page...");
    
    // Initialize expandable sections
    initExpandableSections();
    
    // Initialize image zoom
    initImageZoom();
    
    // Get the texture ID from URL parameter
    const textureId = getParameterByName('id');
    if (!textureId) {
        handleTextureNotFound();
        return;
    }
    
    // Fetch textures from JSON file
    fetch('../data/textures.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data to ensure image paths are correct
            const processedData = data.map(texture => ({
                ...texture,
                image: `assets/${texture.image}`,
                maps: texture.maps ? Object.fromEntries(
                    Object.entries(texture.maps).map(([type, path]) => [type, `assets/${path}`])
                ) : {}
            }));
            
            // Find the specific texture by ID
            const texture = processedData.find(t => t.id === textureId);
            
            if (!texture) {
                handleTextureNotFound();
                return;
            }
            
            // Update page with texture details - pass all textures for suggestions
            updateTextureDetailPage(texture, processedData);
        })
        .catch(error => {
            console.error('Error loading textures:', error);
            
            // Fallback to hardcoded data
            console.log("Using fallback texture data");
            const texture = fallbackTextureData.find(t => t.id === textureId);
            
            if (!texture) {
                handleTextureNotFound();
                return;
            }
            
            // Update page with fallback texture data
            updateTextureDetailPage(texture, fallbackTextureData);
        });
}

// Setup Add to Cart button
function setupAddToCartButton(texture) {
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (addToCartBtn && texture) {
        addToCartBtn.addEventListener('click', function() {
            if (typeof addToCart === 'function') {
                // Add to cart
                const success = addToCart({
                    id: texture.id,
                    name: texture.name,
                    category: texture.category || 'Texture',
                    price: texture.price || 15.99,
                    image: texture.image,
                    maps: texture.maps || {}
                });
                
                if (success) {
                    // Show success toast
                    if (typeof showToast === 'function') {
                        showToast(`Added ${texture.name} to cart!`);
                    }
                    
                    // Update button state temporarily
                    addToCartBtn.innerHTML = '<i class="fi fi-sr-check"></i> Added to Cart';
                    addToCartBtn.classList.add('success');
                    
                    // Reset button after delay
                    setTimeout(() => {
                        addToCartBtn.innerHTML = '<i class="fi fi-rr-shopping-cart"></i> Add to Cart';
                        addToCartBtn.classList.remove('success');
                    }, 2000);
                }
            } else {
                console.error('addToCart function not found. Make sure cart.js is loaded!');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initTextureDetailPage);