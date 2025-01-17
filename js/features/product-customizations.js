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
            Ecwid store ID: ${Ecwid.getOwnerId()}
            Product ID: ${page.productId}
            Product Name: ${page.name}
            `
        );
    }

    // Customize product page
    function customizeProductPage(page) {
        try {
            console.log('Processing product:', page.name);
            
            // Example: Add a custom class to the product container
            const productContainer = document.querySelector('.ec-product-page');
            if (productContainer) {
                productContainer.classList.add('custom-product-view');
            }
        } catch (error) {
            console.error('Error customizing product page:', error);
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
