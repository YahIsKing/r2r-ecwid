// Product page customizations
(function() {
    // Handler for product pages
    function handleProductPage(page) {
        try {
            logProductInfo(page);
            customizeProductPage(page);
        } catch (error) {
            console.error('Error in product page handler:', error);
        }
    }

    // Log product information
    function logProductInfo(page) {
        console.log(
            `
            Page loaded!
            Ecwid store ID is: ${Ecwid.getOwnerId()}
            Product ID is: ${page.productId}
            Product Name is: ${page.name}
            `
        );
    }

    // Customize product page
    function customizeProductPage(page) {
        try {
            // Get cart data to access product information
            Ecwid.Cart.get(function(cart) {
                try {
                    const product = {
                        id: page.productId,
                        name: page.name
                    };
                    
                    console.log('Product details loaded:', product.name);
                    // Add your product customizations here
                    // For example:
                    // - Modify product layout
                    // - Add custom buttons
                    // - Change styling
                } catch (error) {
                    console.error('Error processing product data:', error);
                }
            });
        } catch (error) {
            console.error('Error getting cart data:', error);
        }
    }

    // Handle product option changes
    function handleProductOptions(product) {
        try {
            console.log('Product options changed:', product);
            // Add your option change handling logic here
        } catch (error) {
            console.error('Error handling product options:', error);
        }
    }

    // Register handlers with EventManager
    EventManager.addHandler('product', handleProductPage);
    EventManager.addHandler('productOptions', handleProductOptions);
})();
