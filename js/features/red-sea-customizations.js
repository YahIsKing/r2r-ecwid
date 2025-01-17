// Red Sea product customizations
Ecwid.OnAPILoaded.add(function() {
    Ecwid.OnPageLoaded.add(function(page) {
        if (page.type == "PRODUCT") {
            // Get the product details
            Ecwid.getProduct(page.productId, function(product) {
                // Check if it's a Red Sea aquarium by looking for "Red Sea" in the title
                if (product.name.toLowerCase().includes('red sea')) {
                    addRedSeaDropshipInfo();
                }
            });
        }
    });
});

function addRedSeaDropshipInfo() {
    // Wait for the "Order from warehouse" button to be present
    const checkExist = setInterval(function() {
        const addToCartButton = document.querySelector('.details-product-purchase__button');
        if (addToCartButton) {
            clearInterval(checkExist);
            
            // Create and insert the Red Sea info button
            const redSeaButton = document.createElement('button');
            redSeaButton.className = 'red-sea-info-btn details-product-purchase__button';
            redSeaButton.innerHTML = 'Red Sea Shipping Information';
            redSeaButton.style.marginTop = '10px';
            
            // Insert the button after the "Order from warehouse" button
            addToCartButton.parentNode.insertBefore(redSeaButton, addToCartButton.nextSibling);
            
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
                .red-sea-info-btn {
                    width: 100%;
                    background-color: #2196F3;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .red-sea-info-btn:hover {
                    background-color: #1976D2;
                }
                
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
    }, 100);
}
