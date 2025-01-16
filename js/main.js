// Enable development logs first
localStorage.setItem("show_ec_logs", "ALL");

// Basic test to see if our code is running
console.log('Main.js loaded - testing Ecwid integration');

Ecwid.OnAPILoaded.add(function() {
    console.log('Ecwid API loaded - test message');
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log('Ecwid page loaded:', page.type);
        
        if (page.type == "PRODUCT") {
            console.log('Product page detected:', {
                storeId: Ecwid.getOwnerId(),
                productId: page.productId
            });
        }
    });
});