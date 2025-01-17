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
                    <h4 class="ec-header-h4">Shipping Information</h4>
                    <div class="ec-modal__close" onclick="this.closest('dialog').close()">×</div>
                </div>
                <div class="ec-modal__body">
                    <div class="shipping-info-content">
                        <p>This item will be shipped directly from our warehouse:</p>
                        <ul>
                            <li>Free shipping on orders over $299</li>
                            <li>Usually ships within 1-2 business days</li>
                            <li>Tracking information will be provided</li>
                        </ul>
                        <p>For any shipping questions, please contact us.</p>
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
                border: none;
                border-radius: 8px;
                box-shadow: var(--ec-modal-shadow);
                max-width: 500px;
                width: 90%;
                padding: 0;
            }
            
            .shipping-info-dialog::backdrop {
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .shipping-info-dialog .ec-modal__header {
                padding: 20px 24px;
                border-bottom: 1px solid var(--ec-modal-border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .shipping-info-dialog .ec-modal__close {
                cursor: pointer;
                font-size: 24px;
                line-height: 1;
            }
            
            .shipping-info-dialog .ec-modal__body {
                padding: 24px;
            }
            
            .shipping-info-dialog .ec-modal__footer {
                padding: 16px 24px;
                border-top: 1px solid var(--ec-modal-border-color);
                text-align: right;
            }
            
            .shipping-info-content ul {
                margin: 16px 0;
                padding-left: 20px;
            }
            
            .shipping-info-button {
                cursor: pointer;
            }
        `;
        document.head.appendChild(styles);
    }

    // Initialize styles
    addRedSeaStyles();

    // Register handlers with EventManager
    EventManager.addHandler('product', handleProductPage);
})();
