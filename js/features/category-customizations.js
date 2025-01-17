// Category page customizations
(function() {
    // Handler for category pages
    function handleCategoryPage(page) {
        try {
            console.log(`Category page loaded - ID: ${page.categoryId}`);
            customizeCategoryPage(page);
        } catch (error) {
            console.error('Error in category page handler:', error);
        }
    }

    // Customize category page
    function customizeCategoryPage(page) {
        // Wait for the category container to be present
        const checkExist = setInterval(function() {
            const categoryContainer = document.querySelector('.ec-category-page');
            if (categoryContainer) {
                clearInterval(checkExist);
                try {
                    applyCategoryCustomizations(categoryContainer, page);
                } catch (error) {
                    console.error('Error applying category customizations:', error);
                }
            }
        }, 500);
    }

    // Apply category-specific customizations
    function applyCategoryCustomizations(container, page) {
        // Add custom styling
        const style = document.createElement('style');
        style.textContent = `
            .ec-category-page {
                /* Add your custom category styles here */
            }
            
            .ec-category-title {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }
            
            .ec-category-description {
                color: #666;
                line-height: 1.6;
                margin-bottom: 30px;
            }
        `;
        document.head.appendChild(style);

        // Add category-specific elements or modifications
        if (page.categoryId) {
            // Example: Get category details using Ecwid API
            Ecwid.getCategoryDetails(page.categoryId, function(category) {
                try {
                    console.log('Category details loaded:', category);
                    // Add your category-specific customizations here
                    // For example:
                    // - Add custom headers
                    // - Modify layout
                    // - Add category-specific features
                } catch (error) {
                    console.error('Error processing category details:', error);
                }
            });
        }
    }

    // Handle cart changes (if needed for category-related cart features)
    function handleCartChange(cart) {
        try {
            console.log('Cart changed:', cart);
            // Add any category-related cart handling here
        } catch (error) {
            console.error('Error handling cart change:', error);
        }
    }

    // Register handlers with EventManager
    EventManager.addHandler('category', handleCategoryPage);
    EventManager.addHandler('cart', handleCartChange);
})();
