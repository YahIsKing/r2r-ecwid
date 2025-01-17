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

            // Get the product name from the page data
            const productName = page.name || '';
            console.log('Checking product:', productName);

            // Check if this is a Red Sea product based on name
            if (isRedSeaProduct(productName)) {
                console.log('✓ Red Sea product detected');
                addRedSeaDropshipInfo({ id: page.productId, name: productName });
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
        console.log('Attempting to add Red Sea dropship info button...');
        
        // List of possible selectors to try, in order of preference
        const possibleSelectors = [
            '.details-product-purchase__section--actions',
            '.details-product-purchase__buttons',
            '.details-product__sidebar',
            '.details-product__wrap'
        ];

        let attempts = 0;
        const maxAttempts = 20; // 10 seconds total (20 * 500ms)
        
        const checkExist = setInterval(function() {
            attempts++;
            
            // Try each selector until we find one that exists
            let targetSection = null;
            for (const selector of possibleSelectors) {
                targetSection = document.querySelector(selector);
                if (targetSection) {
                    console.log(`Found target section using selector: ${selector}`);
                    break;
                }
            }

            if (targetSection) {
                clearInterval(checkExist);
                console.log('Found target section, adding Red Sea info button');
                
                try {
                    insertRedSeaButton(targetSection, product);
                    console.log('✓ Red Sea info button added successfully');
                } catch (error) {
                    console.error('Error adding Red Sea button:', error);
                }
            } else {
                console.log(`Waiting for target section... Attempt ${attempts}/${maxAttempts}`);
                if (attempts >= maxAttempts) {
                    clearInterval(checkExist);
                    console.warn('Timeout waiting for target section. Available elements:', 
                        document.querySelector('.details-product-purchase') || 'None');
                }
            }
        }, 500);
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
        
        // Insert the button
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
