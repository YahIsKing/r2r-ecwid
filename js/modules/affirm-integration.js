// Affirm Integration Module for Ecwid
(function() {
    // Configuration object for Affirm
    const AFFIRM_CONFIG = {
        public_api_key: "YOUR_PUBLIC_API_KEY", // Replace with your actual public key
        script_url: 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js',
        company_name: "Rift 2 Reef Aquatics LLC"
    };

    // Debug logging helper
    function log(message, data = null) {
        console.log(`[Affirm Integration] ${message}`, data || '');
    }

    // Initialize Affirm
    function initAffirm() {
        log('Initializing Affirm...');
        // Load Affirm.js script
        const script = document.createElement('script');
        script.src = AFFIRM_CONFIG.script_url;
        script.async = true;
        script.onload = () => {
            log('Affirm script loaded successfully');
            // Configure Affirm
            affirm.ui.ready(() => {
                log('Affirm UI is ready');
                affirm.config({
                    public_api_key: AFFIRM_CONFIG.public_api_key,
                    script: AFFIRM_CONFIG.script_url
                });
            });
        };
        script.onerror = (error) => {
            log('Error loading Affirm script:', error);
        };
        document.head.appendChild(script);
    }

    // Add Affirm promotional messaging to cart
    function addAffirmToCart() {
        log('Adding Affirm to cart...');
        
        // Wait for cart total element to be available
        const waitForCartTotal = setInterval(() => {
            const cartTotalElement = document.querySelector('.ec-cart-summary__total') ||
                                   document.querySelector('.ec-cart-summary__cell.ec-cart-summary__price');
            
            // Also look for the cart summary container
            const cartSummaryContainer = document.querySelector('.ec-cart__summary_body') ||
                                       document.querySelector('.ec-cart-summary__body');
            
            if (cartTotalElement) {
                clearInterval(waitForCartTotal);
                
                // Get cart total amount
                const totalAmount = parseFloat(cartTotalElement.textContent.replace(/[^0-9.-]+/g, "")) * 100;
                log('Cart total amount:', totalAmount);

                // Create Affirm promotional element
                const affirmPromo = document.createElement('div');
                affirmPromo.className = 'affirm-cart-promo';
                affirmPromo.style.margin = '15px 0';
                affirmPromo.style.padding = '10px';
                affirmPromo.style.backgroundColor = '#f7f7f7';
                affirmPromo.style.borderRadius = '4px';
                
                // Add Affirm logo and promotional message container
                affirmPromo.innerHTML = `
                    <div class="affirm-as-low-as" 
                         data-amount="${totalAmount}" 
                         data-affirm-type="text" 
                         data-affirm-color="blue"
                         data-page-type="cart"
                         data-learnmore-show="true">
                    </div>
                    <style>
                        .affirm-cart-promo {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                        }
                        .affirm-modal-trigger {
                            color: #2962FF;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    </style>
                `;

                // Insert Affirm promo after cart total
                if (cartSummaryContainer) {
                    // Remove any existing Affirm promos to prevent duplicates
                    const existingPromo = cartSummaryContainer.querySelector('.affirm-cart-promo');
                    if (existingPromo) {
                        existingPromo.remove();
                    }
                    
                    cartSummaryContainer.appendChild(affirmPromo);
                    log('Affirm promo added to cart');
                    
                    // Refresh Affirm UI elements
                    if (typeof affirm !== 'undefined') {
                        affirm.ui.refresh();
                        log('Affirm UI refreshed');
                    }
                } else {
                    log('Cart summary container not found');
                }
            }
        }, 500); // Check every 500ms
        
        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(waitForCartTotal), 10000);
    }

    // Handle Affirm checkout
    function handleAffirmCheckout(orderData) {
        log('Handling Affirm checkout:', orderData);
        const checkout_items = orderData.items.map(item => ({
            display_name: item.name,
            sku: item.sku,
            unit_price: (item.price * 100).toFixed(0), // Affirm expects cents
            qty: item.quantity
        }));

        const affirmData = {
            merchant: {
                user_confirmation_url: window.location.origin + '/affirm-confirmation',
                user_cancel_url: window.location.origin + '/cart'
            },
            shipping: {
                name: {
                    first: orderData.customer.firstName,
                    last: orderData.customer.lastName
                },
                address: {
                    line1: orderData.customer.address,
                    city: orderData.customer.city,
                    state: orderData.customer.stateOrProvince,
                    zipcode: orderData.customer.postalCode,
                    country: orderData.customer.countryCode
                }
            },
            items: checkout_items,
            metadata: {
                shipping_type: "shipping",
                mode: "modal"
            },
            order_id: orderData.orderNumber,
            total: (orderData.total * 100).toFixed(0) // Convert to cents
        };

        affirm.checkout(affirmData);
        affirm.checkout.open();
    }

    // Add Affirm payment option to checkout
    function addAffirmToCheckout() {
        log('Adding Affirm to checkout...');
        
        // Wait for payment container to be available
        const waitForPaymentContainer = setInterval(() => {
            const paymentContainer = document.querySelector('.ec-payment-options');
            if (paymentContainer) {
                clearInterval(waitForPaymentContainer);
                
                // Check if Affirm option already exists
                if (!paymentContainer.querySelector('.affirm-payment-option')) {
                    const affirmOption = document.createElement('div');
                    affirmOption.className = 'ec-payment-option affirm-payment-option';
                    affirmOption.innerHTML = `
                        <div class="ec-payment-option__header">
                            <div class="ec-payment-option__title">
                                <img src="https://cdn-assets.affirm.com/images/blue_logo-transparent_bg.png" 
                                     alt="Affirm" 
                                     style="height: 24px; margin-right: 8px;">
                                Pay with Affirm
                            </div>
                            <div class="ec-payment-option__description">Buy now, pay over time</div>
                        </div>
                    `;
                    
                    // Add click handler
                    affirmOption.addEventListener('click', () => {
                        log('Affirm payment option clicked');
                        // Get current order data from Ecwid
                        Ecwid.OnOrderCreated.add(handleAffirmCheckout);
                    });
                    
                    paymentContainer.appendChild(affirmOption);
                    log('Affirm payment option added to checkout');
                }
            }
        }, 500); // Check every 500ms
        
        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(waitForPaymentContainer), 10000);
    }

    // Listen for Ecwid events
    Ecwid.OnPageLoaded.add(function(page) {
        log('Page loaded:', page.type);
        
        if (page.type == 'CART') {
            // Add Affirm messaging to cart page
            addAffirmToCart();
            
            // Re-run when cart updates
            Ecwid.OnCartChanged.add(() => {
                log('Cart changed, updating Affirm messaging');
                setTimeout(addAffirmToCart, 500); // Small delay to ensure DOM is updated
            });
        }
        else if (page.type == 'CHECKOUT_PAYMENT_DETAILS') {
            // Add Affirm payment option to checkout
            addAffirmToCheckout();
        }
    });

    // Initialize when document is ready
    document.addEventListener('DOMContentLoaded', () => {
        log('Document ready, initializing Affirm integration');
        initAffirm();
    });
})();
