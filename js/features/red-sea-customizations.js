// Red Sea product customizations
(function() {
    // Handler for product pages
    function handleProductPage(page) {
        console.log(`Product page detected - Product ID: ${page.productId}`);
        
        // Use the API to get product details with proper error handling
        try {
            // First check if we're in the correct storefront version
            if (!Ecwid.isStorefrontV3()) {
                console.warn('Red Sea customizations require Storefront V3');
                return;
            }

            // Get complete product details using Product Browser API
            Ecwid.ProductBrowser.getProduct(function(product) {
                if (!product) {
                    console.error('Product data not available');
                    return;
                }

                console.log('Complete product details:', product);
                
                // Check if this is a Red Sea product based on category
                if (isRedSeaProduct(product)) {
                    console.log('✓ Red Sea product detected');
                    addRedSeaDropshipInfo(product);
                } else {
                    console.log('✗ Not a Red Sea product');
                }
            });

        } catch (error) {
            console.error('Error in product handler:', error);
        }
    }

    // Helper function to check if a product is a Red Sea product
    function isRedSeaProduct(product) {
        // Check if we have category data
        if (product.categories && product.categories.length > 0) {
            // Log all categories for debugging
            console.log('Product categories:', product.categories);
            
            // Check each category and its parent categories
            return product.categories.some(categoryId => {
                const category = Ecwid.ProductBrowser.getCategoryById(categoryId);
                if (category) {
                    console.log('Checking category:', category.name);
                    return category.name === "Red Sea Products" || 
                           (category.parentCategory && category.parentCategory.name === "Red Sea Products");
                }
                return false;
            });
        }
        
        // If no categories, check product name as fallback
        return product.name.toLowerCase().includes('red sea');
    }

    // Add Red Sea dropship information to the product page
    function addRedSeaDropshipInfo(product) {
        console.log('Attempting to add Red Sea dropship info button...');
        
        // Use a more reliable selector based on Ecwid's structure
        const targetSelector = '.details-product-purchase__section--actions';
        const checkExist = setInterval(function() {
            const targetSection = document.querySelector(targetSelector);
            
            if (targetSection) {
                clearInterval(checkExist);
                console.log('Found target section, adding Red Sea info button');
                
                try {
                    insertRedSeaButton(targetSection, product);
                } catch (error) {
                    console.error('Error adding Red Sea button:', error);
                }
            }
        }, 500);

        // Clear interval after 10 seconds to prevent infinite checking
        setTimeout(() => {
            clearInterval(checkExist);
            console.warn('Timeout waiting for target section');
        }, 10000);
    }

    function insertRedSeaButton(targetSection, product) {
        // Create button container to match Ecwid's structure
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'details-product-purchase__button-wrapper red-sea-info-wrapper';
        
        // Create the Red Sea info button
        const redSeaButton = document.createElement('button');
        redSeaButton.className = 'form-control button button--large button--primary red-sea-info-btn';
        redSeaButton.innerHTML = 'Red Sea Shipping Information';
        buttonContainer.appendChild(redSeaButton);
        
        // Insert after the add to cart button
        targetSection.appendChild(buttonContainer);
        
        // Create and setup dialog
        setupRedSeaDialog(redSeaButton, product);
        
        // Add styles that match Ecwid's design system
        addRedSeaStyles();
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
        const style = document.createElement('style');
        style.textContent = `
            .red-sea-info-wrapper {
                margin-top: 15px;
                width: 100%;
            }
            
            .red-sea-dialog {
                border: none;
                border-radius: 8px;
                box-shadow: var(--ec-modal-shadow);
                max-width: 500px;
                width: 90%;
            }
            
            .red-sea-dialog::backdrop {
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            .red-sea-dialog-content {
                padding: 24px;
            }
            
            .red-sea-dialog ul {
                margin: 16px 0;
                padding-left: 20px;
            }
            
            .red-sea-dialog .ec-modal__footer {
                padding-top: 16px;
                border-top: 1px solid var(--ec-modal-border-color);
                margin-top: 16px;
            }
        `;
        document.head.appendChild(style);
    }

    // Register handlers with EventManager
    EventManager.addHandler('product', handleProductPage);
})();
