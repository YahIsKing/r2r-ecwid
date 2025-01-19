// Affirm Integration Module for Ecwid
(function() {
    // Configuration object for Affirm
    const AFFIRM_CONFIG = {
        public_api_key: "YOUR_PUBLIC_API_KEY", // Replace with your actual public key
        script_url: 'https://cdn1.affirm.com/js/v2/affirm.js'
    };

    // Initialize Affirm
    function initAffirm() {
        // Load Affirm.js script
        const script = document.createElement('script');
        script.src = AFFIRM_CONFIG.script_url;
        script.async = true;
        script.onload = () => {
            // Configure Affirm
            affirm.ui.ready(() => {
                affirm.config({
                    public_api_key: AFFIRM_CONFIG.public_api_key,
                    script: AFFIRM_CONFIG.script_url
                });
            });
        };
        document.head.appendChild(script);
    }

    // Handle Affirm checkout
    function handleAffirmCheckout(orderData) {
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

    // Listen for Ecwid events
    Ecwid.OnPageLoaded.add(function(page) {
        if (page.type == 'CHECKOUT_PAYMENT_DETAILS') {
            // Add Affirm payment option to checkout
            const paymentContainer = document.querySelector('.ec-payment-options');
            if (paymentContainer) {
                const affirmOption = document.createElement('div');
                affirmOption.className = 'ec-payment-option affirm-payment-option';
                affirmOption.innerHTML = `
                    <div class="ec-payment-option__header">
                        <div class="ec-payment-option__title">Pay with Affirm</div>
                        <div class="ec-payment-option__description">Buy now, pay over time</div>
                    </div>
                `;
                paymentContainer.appendChild(affirmOption);

                // Initialize Affirm components
                initAffirm();
            }
        }
    });

    // Initialize when document is ready
    document.addEventListener('DOMContentLoaded', initAffirm);
})();
