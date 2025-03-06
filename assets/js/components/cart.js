/**
 * Cart functionality for the Texture Marketplace
 */

// Initialize cart from localStorage with consistent naming
let cart = [];

// Store button click states to prevent multiple rapid clicks
let addToCartInProgress = false;
let checkoutButtonInProgress = false;

// Flag to track if event handlers have been attached
let cartEventListenersAttached = false;

/**
 * Initialize cart system - must be called on all pages
 */
function initCart() {
    // Use 'cartItems' as the consistent localStorage key
    cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Update cart UI elements
    updateCartIcon();
    updateCartCount();
    
    // Set up event listeners (only once)
    setupCartEventListeners();
    
    console.log('Cart initialized with', cart.length, 'items');
}

/**
 * Update the cart count display in UI
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
        
        // Show/hide based on whether there are items
        if (cart.length > 0) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

/**
 * Add a texture to the cart
 * @param {Object} textureItem - Texture data object
 * @param {HTMLElement} [buttonElement] - Optional button element that triggered the action
 */
function addToCart(textureItem, buttonElement) {
    // Prevent multiple rapid clicks
    if (addToCartInProgress) {
        console.log('Add to cart already in progress, ignoring');
        return;
    }
    
    // Set flag to prevent multiple adds
    addToCartInProgress = true;
    console.log('Adding to cart:', textureItem);
    
    // Reload cart from localStorage to ensure we have the latest data
    cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if item already exists in cart
    const itemExists = cart.some(item => item.id === textureItem.id);
    
    if (!itemExists) {
        console.log('Item not in cart, adding it now');
        // Add new item to cart
        cart.push(textureItem);
        
        // Save to localStorage
        saveCart();
    } else {
        console.log('Item already in cart, no changes made');
    }
    
    // Re-enable button if provided
    if (buttonElement) {
        buttonElement.disabled = false;
    }
    
    // Reset flag after a short delay (prevents double-clicks)
    setTimeout(() => {
        addToCartInProgress = false;
        console.log('Add to cart process complete');
    }, 500);
}

/**
 * Remove a texture from the cart
 * @param {string} textureId - ID of texture to remove
 */
function removeFromCart(textureId) {
    cart = cart.filter(item => item.id !== textureId);
    saveCart();
    
    // If on checkout page, refresh the cart display
    if (window.location.pathname.includes('checkout.html') && typeof loadCartItems === 'function') {
        loadCartItems();
    }
}

/**
 * Update the quantity of a texture in the cart
 * @param {string} textureId - ID of texture to update
 * @param {number} quantity - New quantity (0 removes the item)
 */
function updateCartItemQuantity(textureId, quantity) {
    const itemIndex = cart.findIndex(item => item.id === textureId);
    
    if (itemIndex !== -1) {
        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            cart.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart[itemIndex].quantity = quantity;
        }
        saveCart();
    }
}

/**
 * Save cart to localStorage using consistent key
 */
function saveCart() {
    // Save cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
    
    // Update cart displays
    updateCartIcon();
    updateCartCount();
    
    console.log('Cart saved with', cart.length, 'items');
}

/**
 * Update the cart icon to show number of items
 */
function updateCartIcon() {
    const cartIcon = document.getElementById('shoppingCart');
    
    if (cartIcon) {
        // Remove existing badge if any
        const existingBadge = cartIcon.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        if (cart.length > 0) {
            // Add "has-items" class to the icon
            cartIcon.classList.add('has-items');
            
            // Create and append badge
            const badge = document.createElement('div');
            badge.className = 'cart-badge';
            badge.textContent = cart.length;
            cartIcon.appendChild(badge);
        } else {
            cartIcon.classList.remove('has-items');
        }
    }
}

/**
 * Clear the entire cart
 */
function clearCart() {
    cart = [];
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartDiscount');
    
    // Update cart displays
    updateCartIcon();
    updateCartCount();
}

/**
 * Initiate checkout process
 */
function initiateCheckout() {
    // Prevent multiple rapid clicks
    if (checkoutButtonInProgress) {
        return;
    }
    
    // Set flag to prevent multiple checkouts
    checkoutButtonInProgress = true;
    
    // Determine the correct path to checkout.html based on current URL
    const isInRoot = !window.location.pathname.includes('/pages/');
    const checkoutPath = isInRoot ? 'pages/checkout.html' : 'checkout.html';
    
    // Redirect to checkout page
    window.location.href = checkoutPath;
    
    // If for some reason the redirect doesn't happen immediately,
    // we'll reset the flag after a timeout
    setTimeout(() => {
        checkoutButtonInProgress = false;
    }, 2000);
}

/**
 * Display a toast notification - disabled per requirements
 * Keeping function for backwards compatibility
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 */
function showToast(message, type = 'success') {
    // Function kept for backward compatibility but will not display toasts
    console.log('Toast notification (disabled):', message, type);
}

/**
 * Set up all cart-related event listeners
 */
function setupCartEventListeners() {
    // Prevent attaching event listeners multiple times
    if (cartEventListenersAttached) {
        console.log('Cart event listeners already attached, skipping');
        return;
    }
    
    console.log('Setting up cart event listeners');
    
    // Setup shopping cart icon click
    const cartIcon = document.getElementById('shoppingCart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            initiateCheckout();
        });
    }
    
    // Find all checkout buttons
    const checkoutButtons = document.querySelectorAll('.checkout-button, .cart-checkout-button');
    
    // Attach the handler to each button
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            initiateCheckout();
        });
    });
    
    // Find and setup all add to cart buttons - if we're on a detail page
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        console.log('Found add to cart button, setting up handler');
        
        // Clone the button to remove any existing event listeners
        const newBtn = addToCartBtn.cloneNode(true);
        addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
        
        // Add a single event listener to the fresh button
        newBtn.addEventListener('click', function() {
            console.log('Add to cart button clicked');
            
            // Disable button while processing
            this.disabled = true;
            
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
            
            // Add to cart with our button reference
            addToCart(textureItem, this);
        });
    }
    
    cartEventListenersAttached = true;
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initCart();
});