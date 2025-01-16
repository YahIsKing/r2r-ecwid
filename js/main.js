// Main initialization file for Ecwid store customizations
import { initTestBanner } from 'https://yahisking.github.io/r2r-ecwid/js/modules/test-banner.js';
import { storeConfig } from 'https://yahisking.github.io/r2r-ecwid/js/config/store-config.js';

// Initialize Ecwid configuration
window.ec = window.ec || {};
window.ec.config = window.ec.config || {};

// Wait for both DOM and Ecwid API to be ready
function waitForEcwid() {
    return new Promise((resolve) => {
        if (typeof Ecwid !== 'undefined') {
            resolve();
        } else {
            window.ecwidLoaded = resolve;
        }
    });
}

async function initializeStoreCustomizations() {
    try {
        // Wait for Ecwid API
        await waitForEcwid();
        console.log('Ecwid API loaded successfully');

        // Initialize store features based on config
        if (storeConfig.features.customProductOptions) {
            try {
                await import('https://yahisking.github.io/r2r-ecwid/js/modules/custom-product-options.js');
                console.log('Custom product options module loaded');
            } catch (error) {
                console.error('Error loading custom product options:', error);
            }
        }

        // Add Ecwid event listeners
        Ecwid.OnAPILoaded.add(() => {
            console.log('Ecwid API ready for use');
            if (Ecwid.refreshConfig) {
                Ecwid.refreshConfig();
            }
        });

        // Initialize test banner last
        initTestBanner();

    } catch (error) {
        console.error('Error initializing store customizations:', error);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStoreCustomizations);
} else {
    initializeStoreCustomizations();
}
