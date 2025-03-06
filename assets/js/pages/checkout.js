/**
 * Checkout Page Functionality
 */

// Add this at the top of the file to track checkout state
let checkoutInProgress = false;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    if (typeof initCart === 'function') {
        initCart();
    }
    
    // Initialize variables
    const completePurchaseBtn = document.getElementById('completePurchase');
    const cardNumberInput = document.getElementById('cardNumber');
    const expDateInput = document.getElementById('expDate');
    const cvvInput = document.getElementById('cvv');
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    const applyPromoBtn = document.getElementById('applyPromo');
    const promoCodeInput = document.getElementById('promoCode');
    const confirmationModal = document.getElementById('confirmationModal');
    
    // Load cart items
    loadCartItems();
    
    // Set current date in the confirmation modal
    document.getElementById('purchaseDate').textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Set random order ID
    document.getElementById('orderId').textContent = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    
    // Format card number input with spaces
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Add spaces every 4 digits
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            
            // Update input value
            this.value = value;
            
            // Update card type indicator
            updateCardType(value.replace(/\s/g, ''));
        });
    }
    
    // Format expiration date input (MM / YY)
    if (expDateInput) {
        expDateInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Format as MM / YY
            if (value.length > 0) {
                if (value.length <= 2) {
                    this.value = value;
                } else {
                    this.value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
                }
            }
        });
    }
    
    // Limit CVV to 3 or 4 digits
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            // Limit to 4 digits
            this.value = value.substring(0, 4);
        });
    }
    
    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const creditCardForm = document.getElementById('creditCardForm');
            const paypalForm = document.getElementById('paypalForm');
            
            if (this.id === 'creditCard') {
                creditCardForm.classList.remove('hidden');
                paypalForm.classList.add('hidden');
            } else if (this.id === 'paypal') {
                creditCardForm.classList.add('hidden');
                paypalForm.classList.remove('hidden');
            }
        });
    });
    
    // Apply promo code
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = promoCodeInput.value.trim().toUpperCase();
            const discountRow = document.getElementById('discountRow');
            const discountEl = document.getElementById('discount');
            const subtotalEl = document.getElementById('subtotal');
            const totalEl = document.getElementById('total');
            
            if (promoCode === 'TEXTURE20') {
                // Get current subtotal value
                const subtotal = parseFloat(subtotalEl.textContent.replace('$', ''));
                
                // Calculate 20% discount
                const discountAmount = subtotal * 0.20;
                
                // Update discount display
                discountEl.textContent = '-$' + discountAmount.toFixed(2);
                discountRow.classList.remove('hidden');
                
                // Update total
                const newTotal = subtotal - discountAmount;
                totalEl.textContent = '$' + newTotal.toFixed(2);
                
                // Also update in confirmation modal
                document.getElementById('confirmTotal').textContent = '$' + newTotal.toFixed(2);
                
                // Feedback to user
                promoCodeInput.style.borderColor = 'var(--primary-color)';
                setTimeout(() => {
                    promoCodeInput.style.borderColor = '';
                }, 2000);
                
                // Show success toast
                showToast('Promo code applied successfully!');
            } else if (promoCode !== '') {
                // Invalid promo code
                promoCodeInput.style.borderColor = 'red';
                setTimeout(() => {
                    promoCodeInput.style.borderColor = '';
                }, 2000);
                
                // Show error toast
                showToast('Invalid promo code. Please try again.', 'error');
            }
        });
    }
    
    // Complete purchase button
    if (completePurchaseBtn) {
        completePurchaseBtn.addEventListener('click', function() {
            // IMPORTANT: Prevent multiple simultaneous checkout attempts
            if (checkoutInProgress) {
                showToast('Your purchase is already being processed.', 'info');
                return;
            }
            
            // Simple form validation
            const email = document.getElementById('email').value;
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const country = document.getElementById('country').value;
            const zipCode = document.getElementById('zipCode').value;
            
            if (!email || !firstName || !lastName || !country || !zipCode) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation with regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            
            const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').id;
            
            if (selectedPayment === 'creditCard') {
                const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
                const expDate = document.getElementById('expDate').value;
                const cvv = document.getElementById('cvv').value;
                const nameOnCard = document.getElementById('nameOnCard').value;
                
                if (!cardNumber || !expDate || !cvv || !nameOnCard) {
                    showToast('Please complete all payment details.', 'error');
                    return;
                }
                
                // Basic card validation
                if (cardNumber.length < 15 || !/^\d+$/.test(cardNumber)) {
                    showToast('Please enter a valid card number.', 'error');
                    return;
                }
                
                if (!/^\d{2}\s\/\s\d{2}$/.test(expDate)) {
                    showToast('Please enter a valid expiration date (MM / YY).', 'error');
                    return;
                }
                
                if (cvv.length < 3 || !/^\d+$/.test(cvv)) {
                    showToast('Please enter a valid security code.', 'error');
                    return;
                }
            }
            
            // Set checkout in progress - IMPORTANT: This prevents multiple checkout attempts
            checkoutInProgress = true;
            
            // Capture the current total value from the display
            const finalTotal = document.getElementById('total').textContent;
            
            // Show processing state
            completePurchaseBtn.disabled = true;
            completePurchaseBtn.innerHTML = '<span>Processing...</span>';
            
            // Simulate payment processing
            setTimeout(() => {
                // Ensure confirmation modal shows the correct final price
                document.getElementById('confirmTotal').textContent = finalTotal;
                
                // Show confirmation modal
                confirmationModal.classList.add('active');
                
                // Reset button state
                completePurchaseBtn.disabled = false;
                completePurchaseBtn.innerHTML = '<span>Complete Purchase</span><i class="fi fi-rr-angle-right"></i>';
                
                // Generate download links for each purchased item
                createDownloadLinks();
                
                // Clear cart after successful purchase
                clearCart();
                
                // Reset checkout state - IMPORTANT: This allows future checkout attempts
                checkoutInProgress = false;
            }, 2000);
        });
    }
    
    // Function to update credit card type based on number
    function updateCardType(number) {
        const visaCard = document.querySelector('.card-icon.visa');
        const masterCard = document.querySelector('.card-icon.mastercard');
        const amexCard = document.querySelector('.card-icon.amex');
        
        // Reset all
        visaCard.classList.remove('active');
        masterCard.classList.remove('active');
        amexCard.classList.remove('active');
        
        // Detect card type
        if (number.startsWith('4')) {
            visaCard.classList.add('active');
        } else if (/^5[1-5]/.test(number)) {
            masterCard.classList.add('active');
        } else if (/^3[47]/.test(number)) {
            amexCard.classList.add('active');
        }
    }
    
    // Function to create download links after successful payment
    function createDownloadLinks() {
        // Get cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const downloadItemsContainer = document.getElementById('downloadItems');
        if (!downloadItemsContainer) return;
        
        // Clear existing items
        downloadItemsContainer.innerHTML = '';
        
        // Add each item as a download
        cartItems.forEach(item => {
            // Generate a unique download token for this purchase
            const downloadToken = generateDownloadToken();
            
            // Determine the file size (random for demo, or use actual file size in a real implementation)
            const fileSize = item.fileSize || (Math.random() * 2 + 1).toFixed(1) + ' GB';
            
            // Create download item element
            const downloadElement = document.createElement('div');
            downloadElement.className = 'download-item';
            downloadElement.innerHTML = `
                <div class="download-info">
                    <h4>${item.name}</h4>
                    <span class="file-size">${fileSize}</span>
                </div>
                <a href="#" class="download-button" data-item-id="${item.id}" data-token="${downloadToken}">
                    <i class="fi fi-rr-download"></i> Download
                </a>
            `;
            
            downloadItemsContainer.appendChild(downloadElement);
        });
        
        // Add event listeners to download buttons
        const downloadButtons = downloadItemsContainer.querySelectorAll('.download-button');
        downloadButtons.forEach(button => {
            button.addEventListener('click', handleDownload);
        });
    }
    
    // Function to handle file downloads
    function handleDownload(e) {
        e.preventDefault();
        
        const itemId = this.getAttribute('data-item-id');
        const token = this.getAttribute('data-token');
        
        // In a real implementation, this would verify the download token with the server
        // and serve the actual file from a secure location
        
        // For demo purposes, we'll create a sample demo file
        const textData = 
`TEXTURE MARKETPLACE - PURCHASED TEXTURE
========================================

Thank you for your purchase from the Texture Marketplace!

Texture ID: ${itemId}
Download Token: ${token}
Download Date: ${new Date().toLocaleString()}

In a real implementation, this would be the actual texture file package
containing all the purchased texture maps and license information.

Your purchase includes:
- 8K resolution texture maps (diffuse, normal, etc.)
- License for commercial and personal use
- 24/7 customer support
- Free updates

For questions or support: support@texturemarketplace.com

========================================
© Texture Marketplace - All Rights Reserved`;

        // Create a blob from the text data
        const blob = new Blob([textData], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${itemId}_package.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Change button state to show download started
        this.innerHTML = '<i class="fi fi-rr-check"></i> Downloaded';
        this.style.backgroundColor = '#4CAF50';
    }
    
    // Generate a secure download token
    function generateDownloadToken() {
        // In a real implementation, this would be a more secure token
        // and would be stored on the server with the purchase record
        return 'dl_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }
});

// Function to load cart items from localStorage
function loadCartItems() {
    // Get cart items from localStorage - using consistent key name
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    const orderItemsContainer = document.getElementById('orderItems');
    if (!orderItemsContainer) return;
    
    // Clear existing items
    orderItemsContainer.innerHTML = '';
    
    // If cart is empty, show a message
    if (cartItems.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fi fi-rr-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="../index.html" class="empty-cart-link">Browse textures</a>
            </div>
        `;
        
        // Update totals
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        document.getElementById('confirmTotal').textContent = '$0.00';
        
        // Disable checkout button
        const completePurchaseBtn = document.getElementById('completePurchase');
        if (completePurchaseBtn) {
            completePurchaseBtn.disabled = true;
            completePurchaseBtn.classList.add('disabled');
        }
        
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    
    // Add each item to the order summary
    cartItems.forEach(item => {
        const itemPrice = parseFloat(item.price);
        const quantity = item.quantity || 1;
        subtotal += itemPrice * quantity;
        
        // Fix image paths for checkout page (might need '../' prefix)
        let imagePath = item.image;
        if (!imagePath.startsWith('../') && !imagePath.startsWith('http')) {
            imagePath = '../' + imagePath;
        }
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${imagePath}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-category">${item.category}</p>
            </div>
            <div class="item-price">$${itemPrice.toFixed(2)}</div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fi fi-rr-trash"></i>
            </button>
        `;
        
        orderItemsContainer.appendChild(itemElement);
    });
    
    // Add remove item functionality
    const removeButtons = orderItemsContainer.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeFromCart(itemId);
            
            // Reload the cart items
            loadCartItems();
        });
    });
    
    // Update totals
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('total').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('confirmTotal').textContent = '$' + subtotal.toFixed(2);
}