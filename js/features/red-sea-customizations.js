// Red Sea product customizations
(function() {
    let buttonAdded = false; // Flag to prevent multiple button additions

    // Handler for product pages
    function handleProductPage(page) {
        console.log(`Product page detected - Product ID: ${page.productId}`);
        
        try {
            // First check if we're in the correct storefront version
            if (!Ecwid.isStorefrontV3()) {
                console.warn('Red Sea customizations require Storefront V3');
                return;
            }

            // Get the product name from the page data
            const productName = page.name || '';
            console.log('Checking product:', productName);

            // Check if this is a Red Sea product based on name
            if (isRedSeaProduct(productName)) {
                console.log('✓ Red Sea product detected');
                const product = { id: page.productId, name: productName };
                
                // Set up a one-time listener for the page load
                if (!buttonAdded) {
                    buttonAdded = true;
                    Ecwid.OnPageLoaded.add(function(loadedPage) {
                        if (loadedPage.type === 'PRODUCT' && loadedPage.productId === product.id) {
                            console.log('Product page fully loaded, adding Red Sea info...');
                            addRedSeaDropshipInfo(product);
                        }
                    });
                    
                    // Refresh the page to ensure proper loading
                    Ecwid.refreshPage();
                }
            } else {
                console.log('✗ Not a Red Sea product');
            }

        } catch (error) {
            console.error('Error in product handler:', error);
        }
    }

    // Helper function to check if a product is a Red Sea product
    function isRedSeaProduct(productName) {
        return productName.toLowerCase().includes('red sea');
    }

    // Add Red Sea dropship information to the product page
    function addRedSeaDropshipInfo(product) {
        console.log('Adding Red Sea dropship info button...');
        
        try {
            // Get the product details action panel section
            const actionPanel = document.querySelector('.product-details__action-panel.details-product-purchase');
            
            if (!actionPanel) {
                console.error('Product action panel not found');
                return;
            }

            // Create button container that matches Ecwid's structure
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'product-details-module product-details__action-panel details-product-purchase';
            
            // Create the Red Sea info button with matching Ecwid styles
            const redSeaButton = document.createElement('button');
            redSeaButton.className = 'form-control form-control--button form-control--large form-control--primary';
            redSeaButton.innerHTML = 'Red Sea Shipping Information';
            buttonContainer.appendChild(redSeaButton);
            
            // Insert the button after the action panel
            actionPanel.parentNode.insertBefore(buttonContainer, actionPanel.nextSibling);
            console.log('✓ Red Sea info button added successfully');
            
            // Create and setup dialog
            setupRedSeaDialog(redSeaButton, product);
            
            // Add styles that match Ecwid's design system
            addRedSeaStyles();
            
        } catch (error) {
            console.error('Error adding Red Sea button:', error);
            buttonAdded = false; // Reset flag to allow retry
        }
    }

    function setupRedSeaDialog(button, product) {
        const dialog = document.createElement('dialog');
        dialog.className = 'ec-modal red-sea-dialog';
        dialog.innerHTML = `
            <div class="ec-modal__content red-sea-dialog-content">
                <h2 class="ec-header-h4">Red Sea Drop Shipping Information</h2>
                <p class="ec-text-muted">Red Sea aquariums are shipped directly from the manufacturer's warehouse to ensure safe delivery of your aquarium.</p>
                <div class="ec-text">
                    <p><strong>Important details for ${product.name}:</strong></p>
                    <ul>
                        <li>Shipping typically takes 5-7 business days</li>
                        <li>You will receive tracking information once the item ships</li>
                        <li>Curbside delivery is included</li>
                        <li>Please inspect the aquarium upon delivery</li>
                    </ul>
                </div>
                <div class="ec-modal__footer">
                    <button class="form-control button button--secondary close-dialog">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);
        
        // Add click handlers
        button.addEventListener('click', () => {
            dialog.showModal();
        });
        
        dialog.querySelector('.close-dialog').addEventListener('click', () => {
            dialog.close();
        });
    }

    function addRedSeaStyles() {
        // Add any custom styles needed for the Red Sea button and dialog
        const styles = document.createElement('style');
        styles.textContent = `
            .product-details-module.product-details__action-panel {
                margin-top: 15px;
            }
            .form-control--primary.red-sea-info-btn {
                width: 100%;
                margin-bottom: 10px;
            }
        `;
        document.head.appendChild(styles);
    }

    // Register handlers with EventManager
    EventManager.addHandler('product', handleProductPage);
})();
