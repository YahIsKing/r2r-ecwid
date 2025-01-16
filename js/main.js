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
        
        if (page.type == "PRODUCT") {
            console.log('On product page:', page.productId);
            
            // Try to modify the page title as a test
            document.title = 'Product: ' + page.name;
        }
    });
});