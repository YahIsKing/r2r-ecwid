// Main initialization file for Ecwid store customizations
import { initTestBanner } from './modules/test-banner.js';

// Initialize Ecwid configuration
window.ec = window.ec || Object();
window.ec.config = window.ec.config || Object();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize store customizations when DOM is ready
    initializeStoreCustomizations();
    // Initialize test banner
    initTestBanner();
});

function initializeStoreCustomizations() {
    // Check if store configuration is loaded
    if (typeof storeConfig === 'undefined') {
        console.error('Store configuration not found');
        return;
    }

    // Initialize custom product options
    if (typeof CustomProductOptions !== 'undefined') {
        CustomProductOptions.init(storeConfig);
    }

    // Add event listeners for Ecwid events
    Ecwid.OnAPILoaded.add(function() {
        console.log('Ecwid API loaded');
        // Add your Ecwid API related code here
        // Refresh Ecwid config
        Ecwid.refreshConfig && Ecwid.refreshConfig();
    });
}
