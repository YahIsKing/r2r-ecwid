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
                const breadcrumbPath = window.location.pathname;
                console.log('Current path:', breadcrumbPath);

                // Look for "Red Sea Products" in the breadcrumb text
                const breadcrumbText = document.body.textContent;
                const isRedSeaProduct = breadcrumbText.includes('Red Sea Products');
                
                if (isRedSeaProduct) {
                    clearInterval(checkExist);
                    console.log('✓ Red Sea product detected in breadcrumb path');
                    addRedSeaDropshipInfo();
                } else {
                    console.log('✗ Not a Red Sea product path');
                }
            }, 500); // Increased interval to ensure page loads
        }
    });
});

function addRedSeaDropshipInfo() {
    // Wait for the "Order from warehouse" button to be present
    const checkExist = setInterval(function() {
        const orderButton = document.querySelector('button.order-from-warehouse');
        if (orderButton) {
            clearInterval(checkExist);
            
            // Create and insert the Red Sea info button
            const redSeaButton = document.createElement('button');
            redSeaButton.className = 'red-sea-info-btn';
            redSeaButton.innerHTML = 'Red Sea Shipping Information';
            redSeaButton.style.marginTop = '10px';
            redSeaButton.style.width = '100%';
            redSeaButton.style.padding = '13px 0';
            redSeaButton.style.backgroundColor = '#2196F3';
            redSeaButton.style.color = 'white';
            redSeaButton.style.border = 'none';
            redSeaButton.style.borderRadius = '4px';
            redSeaButton.style.cursor = 'pointer';
            
            // Insert the button after the order button
            orderButton.parentNode.insertBefore(redSeaButton, orderButton.nextSibling);
            
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
