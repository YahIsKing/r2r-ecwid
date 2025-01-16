// Enable development logs first
localStorage.setItem("show_ec_logs", "ALL");

// Log script location
console.log('Script location:', document.currentScript?.src || 'Unable to determine source');

// Ensure we have the Ecwid object
if (typeof Ecwid === 'undefined') {
    console.error('Ecwid object not found');
} else {
    console.log('Ecwid object found');
}

// Basic test to see if our code is running
console.log('Main.js loaded - testing Ecwid integration');

// Main Ecwid integration
Ecwid.OnAPILoaded.add(function() {
    console.log('Ecwid API loaded - test message');
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log('Page loaded:', page.type);
        
        // Log the exact page type we're getting
        console.log('Current page type:', page.type);
        
        // Create red banner regardless of page type
        const banner = document.createElement('div');
        banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999999;';
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Log different page scenarios
        switch(page.type) {
            case "PRODUCT":
                console.log('On product page:', page.productId);
                console.log('Single product page');
                // Try to modify the page title as a test
                document.title = 'Product: ' + page.name;
                break;
            case "PRODUCTS":
                console.log('Products listing page');
                break;
            case "CATEGORY":
                console.log('Category page');
                break;
            default:
                console.log('Other page type:', page.type);
        }
    });
});