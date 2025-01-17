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
        // Get complete product details using Product Browser API
        Ecwid.ProductBrowser.getProduct(function(product) {
            if (!product) {
                console.error('Product data not available');
                return;
            }

            // Get category names
            const categoryNames = product.categories ? 
                product.categories.map(categoryId => {
                    const category = Ecwid.ProductBrowser.getCategoryById(categoryId);
                    return category ? category.name : 'Unknown';
                }) : [];

            console.log(
                `
                Page loaded!
                Ecwid store ID: ${Ecwid.getOwnerId()}
                Product ID: ${product.id}
                Product Name: ${product.name}
                Categories: ${JSON.stringify(categoryNames)}
                `
            );
        });
    }

    // Customize product page
    function customizeProductPage(page) {
        try {
            Ecwid.ProductBrowser.getProduct(function(product) {
                if (!product) {
                    console.error('Product data not available');
                    return;
                }

                console.log('Processing product:', product.name);
                
                // Add your product customizations here
                // For example:
                // - Modify product layout
                // - Add custom buttons
                // - Change styling
                
                // Example: Add a custom class to the product container
                const productContainer = document.querySelector('.ec-product-page');
                if (productContainer) {
                    productContainer.classList.add('custom-product-view');
                }
            });
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
