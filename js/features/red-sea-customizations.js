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
            // Get the product details sidebar
            const sidebar = document.querySelector('.product-details__sidebar');
            
            if (!sidebar) {
                console.error('Product sidebar not found');
                return;
            }

            // Find the action panel section
            const actionPanel = sidebar.querySelector('.product-details-module.product-details__action-panel.details-product-purchase');
            
            if (!actionPanel) {
                console.error('Action panel not found');
                return;
            }

            // Create button module container
            const moduleContainer = document.createElement('div');
            moduleContainer.className = 'product-details-module product-details__action-panel details-product-purchase';

            // Create module title (optional header)
            const moduleTitle = document.createElement('div');
            moduleTitle.className = 'product-details-module__title ec-header-h6 details-product-purchase__place notranslate';
            moduleContainer.appendChild(moduleTitle);

            // Create module content container
            const moduleContent = document.createElement('div');
            moduleContent.className = 'product-details-module__content product-details-module__content--indented';

            // Create the Red Sea info button
            const redSeaButton = document.createElement('button');
            redSeaButton.className = 'form-control form-control--button form-control--large form-control--primary';
            redSeaButton.innerHTML = 'Red Sea Shipping Information';
            moduleContent.appendChild(redSeaButton);

            // Add content to module container
            moduleContainer.appendChild(moduleContent);
            
            // Insert after the action panel
            actionPanel.parentNode.insertBefore(moduleContainer, actionPanel.nextSibling);
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
        const styles = document.createElement('style');
        styles.textContent = `
            .product-details-module.product-details__action-panel {
                margin: 15px 0;
            }
            .product-details-module__content--indented {
                padding: 0;
            }
            .form-control--button.form-control--large {
                width: 100%;
            }
        `;
        document.head.appendChild(styles);
    }

    // Register handlers with EventManager
    EventManager.addHandler('product', handleProductPage);
})();
