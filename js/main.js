console.log('Testing - main.js file loaded');

// Function to wait for Ecwid to be fully loaded
function waitForEcwid() {
    if (typeof Ecwid === 'undefined') {
        console.log('Waiting for Ecwid...');
        setTimeout(waitForEcwid, 500);
        return;
    }

    console.log('Ecwid found, initializing...');
    
    // Enable development logs
    try {
        localStorage.setItem('show_ec_logs', 'ALL');
        console.log('Development logs enabled');
    } catch (e) {
        console.log('Could not enable development logs:', e);
    }

    // Initialize our Ecwid customizations
    Ecwid.OnAPILoaded.add(function() {
        console.log('Ecwid API fully loaded');
        
        Ecwid.OnPageLoaded.add(function(page) {
            console.log('New page loaded:', page.type);
            
            if (page.type == "PRODUCT") {
                console.log(
                    `
                    Product page loaded!
                    Store ID: ${Ecwid.getOwnerId()}
                    Product ID: ${page.productId}
                    `
                );
            }
        });
    });
}

// Start the initialization process
waitForEcwid();