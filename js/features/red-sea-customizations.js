// Red Sea product customizations
Ecwid.OnAPILoaded.add(function() {
    console.log('Red Sea customization script loaded');
    Ecwid.OnPageLoaded.add(function(page) {
        console.log(`Page loaded - Type: ${page.type}`);
        if (page.type == "PRODUCT") {
            console.log(`Product page detected - Product ID: ${page.productId}`);
            
            // Wait for the breadcrumbs to be loaded
            const checkExist = setInterval(function() {
                // Check the breadcrumb path
                const breadcrumbText = document.body.textContent;
                console.log('Checking for Red Sea Products in:', breadcrumbText.substring(0, 200) + '...');

                // Look for "Red Sea Products" in the breadcrumb text
                const isRedSeaProduct = breadcrumbText.includes('Red Sea Products');
                
                if (isRedSeaProduct) {
                    clearInterval(checkExist);
                    console.log('✓ Red Sea product detected in breadcrumb path');
                    addRedSeaDropshipInfo();
                }
            }, 500); // Increased interval to ensure page loads
        }
    });
});

function addRedSeaDropshipInfo() {
    console.log('Attempting to add Red Sea dropship info button...');
    // Wait for the "Save for later" section to be present
    const checkExist = setInterval(function() {
        const saveForLaterTitle = document.querySelector('.favorite-product__title');
        console.log('Looking for save for later section...', saveForLaterTitle ? 'Found' : 'Not found');

        if (saveForLaterTitle) {
            clearInterval(checkExist);
            console.log('Found save for later section, adding Red Sea info button');
            
            // Create and insert the Red Sea info button
            const redSeaButton = document.createElement('button');
            redSeaButton.className = 'details-product-purchase__button red-sea-info-btn';
            redSeaButton.innerHTML = 'Red Sea Shipping Information';
            redSeaButton.style.marginBottom = '20px'; // Add space before the "Save for later" section
            redSeaButton.style.width = '100%';
            redSeaButton.style.padding = '13px 0';
            redSeaButton.style.backgroundColor = '#2196F3';
            redSeaButton.style.color = 'white';
            redSeaButton.style.border = 'none';
            redSeaButton.style.borderRadius = '4px';
            redSeaButton.style.cursor = 'pointer';
            redSeaButton.style.display = 'block'; // Ensure it's a block element
            
            // Get the parent container of the "Save for later" title
            const container = saveForLaterTitle.closest('.product-details-module__title').parentElement;
            
            // Insert the button before the "Save for later" section
            container.insertBefore(redSeaButton, saveForLaterTitle.closest('.product-details-module__title'));
            console.log('Red Sea info button added successfully');
            
            // Create the dialog
            const dialog = document.createElement('dialog');
            dialog.className = 'red-sea-dialog';
            dialog.innerHTML = `
                <div class="red-sea-dialog-content">
                    <h2>Red Sea Drop Shipping Information</h2>
                    <p>Red Sea aquariums are shipped directly from the manufacturer's warehouse to ensure safe delivery of your aquarium.</p>
                    <p>Important details:</p>
                    <ul>
                        <li>Shipping typically takes 5-7 business days</li>
                        <li>You will receive tracking information once the item ships</li>
                        <li>Curbside delivery is included</li>
                        <li>Please inspect the aquarium upon delivery</li>
                    </ul>
                    <button class="close-dialog">Close</button>
                </div>
            `;
            document.body.appendChild(dialog);
            
            // Add click handlers
            redSeaButton.addEventListener('click', () => {
                dialog.showModal();
            });
            
            dialog.querySelector('.close-dialog').addEventListener('click', () => {
                dialog.close();
            });
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .red-sea-dialog {
                    padding: 20px;
                    border: none;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    max-width: 500px;
                    width: 90%;
                }
                
                .red-sea-dialog::backdrop {
                    background-color: rgba(0, 0, 0, 0.5);
                }
                
                .red-sea-dialog h2 {
                    color: #333;
                    margin-top: 0;
                }
                
                .red-sea-dialog ul {
                    padding-left: 20px;
                }
                
                .red-sea-dialog .close-dialog {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 15px;
                }
                
                .red-sea-dialog .close-dialog:hover {
                    background-color: #d32f2f;
                }
            `;
            document.head.appendChild(style);
        }
    }, 500);
}
