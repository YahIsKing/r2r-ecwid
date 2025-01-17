// Red Sea product customizations
(function() {
    // Handler for product pages
    function handleProductPage(page) {
        console.log(`Product page detected - Product ID: ${page.productId}`);
        
        try {
            // First check if we're in the correct storefront version
            if (!Ecwid.isStorefrontV3()) {
                console.warn('Red Sea customizations require Storefront V3');
                return;
            }

            // Set up a one-time listener for the page load
            Ecwid.OnPageLoaded.add(function(loadedPage) {
                if (loadedPage.type === 'PRODUCT') {
                    // Small delay to ensure description is loaded
                    setTimeout(() => {
                        setupShippingButtons(page);
                    }, 500);
                }
            });

        } catch (error) {
            console.error('Error in product handler:', error);
        }
    }

    // Setup shipping info buttons in the description
    function setupShippingButtons(page) {
        // Find all shipping info buttons in the description
        const buttons = document.querySelectorAll('.shipping-info-button');
        
        buttons.forEach(button => {
            if (!button.dataset.initialized) {
                console.log('Setting up shipping info button');
                
                // Create and setup dialog for this button
                setupRedSeaDialog(button, {
                    id: page.productId,
                    name: page.name || ''
                });
                
                // Mark as initialized
                button.dataset.initialized = 'true';
            }
        });
    }

    // Create and setup the shipping info dialog
    function setupRedSeaDialog(button, product) {
        // Create dialog if it doesn't exist
        let dialog = document.getElementById('shipping-info-dialog');
        if (!dialog) {
            dialog = document.createElement('dialog');
            dialog.id = 'shipping-info-dialog';
            dialog.className = 'ec-modal shipping-info-dialog';
            
            // Add dialog content
            dialog.innerHTML = `
                <div class="ec-modal__header">
                    <h4 class="ec-header-h4">RED SEA DROP SHIPPING</h4>
                    <div class="ec-modal__close" onclick="this.closest('dialog').close()">×</div>
                </div>
                <div class="ec-modal__body">
                    <div class="shipping-info-content">
                        <p>All Red Sea aquarium systems are shipped directly from the manufacturer to ensure safe delivery. Typical delivery timeframe is 1-3 weeks from order placement.</p>
                        
                        <p>Here's what to expect:</p>
                        <ul>
                            <li>Orders are processed by Red Sea within 1-3 business days</li>
                            <li>You'll receive tracking information once your order ships</li>
                            <li>The shipping company will contact you to arrange a convenient delivery time</li>
                            <li>Please note: Due to direct shipping arrangements, order modifications may incur restocking fees</li>
                        </ul>
                        
                        <p style="margin-top: 15px;">Note: Shipping available to continental US states only.</p>
                    </div>
                </div>
                <div class="ec-modal__footer">
                    <button class="form-control form-control--button form-control--small" onclick="this.closest('dialog').close()">Close</button>
                </div>
            `;
            
            document.body.appendChild(dialog);
        }
        
        // Add click handler to button
        button.addEventListener('click', (e) => {
            e.preventDefault();
            dialog.showModal();
        });
    }

    // Add the necessary styles
    function addRedSeaStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .shipping-info-dialog {
                border: none !important;
                border-radius: 8px !important;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
                max-width: 800px !important;
                width: 90% !important;
                padding: 0 !important;
                background: white !important;
            }
            
            .shipping-info-dialog::backdrop {
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .shipping-info-dialog .ec-modal__header {
                padding: 20px 30px !important;
                border-bottom: 1px solid #eee !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            }
            
            .shipping-info-dialog .ec-modal__header h4 {
                margin: 0 !important;
                color: #1e3c72 !important;
                font-size: 24px !important;
                font-weight: 600 !important;
            }
            
            .shipping-info-dialog .ec-modal__close {
                cursor: pointer;
                font-size: 24px;
                line-height: 1;
                color: #666;
            }
            
            .shipping-info-dialog .ec-modal__body {
                padding: 30px !important;
            }
            
            .shipping-info-dialog .shipping-info-content {
                font-size: 16px !important;
                line-height: 1.6 !important;
                color: #333 !important;
            }
            
            .shipping-info-dialog .shipping-info-content p {
                margin: 0 0 15px 0 !important;
            }
            
            .shipping-info-dialog .shipping-info-content ul {
                margin: 15px 0 !important;
                padding-left: 25px !important;
            }
            
            .shipping-info-dialog .shipping-info-content ul li {
                margin-bottom: 10px !important;
            }
            
            .shipping-info-dialog .ec-modal__footer {
                padding: 20px 30px !important;
                border-top: 1px solid #eee !important;
                text-align: right !important;
            }
            
            .shipping-info-button {
                cursor: pointer;
                background-color: #E41E31 !important;
                color: white !important;
                border: none !important;
                padding: 8px 16px !important;
                border-radius: 4px !important;
                font-weight: 500 !important;
                text-decoration: none !important;
                display: inline-block !important;
                line-height: 1.5 !important;
                transition: background-color 0.2s ease !important;
            }

            .shipping-info-button:hover {
                background-color: #C41929 !important;
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize styles
    addRedSeaStyles();

    // Register handlers with EventManager
    EventManager.addHandler('product', handleProductPage);
})();
