// Enable all development logs
localStorage.setItem("show_ec_logs", "ALL");

console.log('Testing - main.js file loaded');

// Function to create banner
function createBanner() {
    console.log('Creating banner...');
    const existingBanner = document.getElementById('test-banner');
    if (!existingBanner) {
        const banner = document.createElement('div');
        banner.id = 'test-banner';
        banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 1000;';
        document.body.insertBefore(banner, document.body.firstChild);
        console.log('Banner created');
    }
}

// Create banner on initial page load
createBanner();

Ecwid.OnAPILoaded.add(function() {
    console.log('API loaded');
    createBanner();
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log('Page loaded:', page.type);
        createBanner();
        
        if (page.type == "PRODUCT") {
            console.log(
                `
                Page loaded!
                Ecwid store ID is: ${Ecwid.getOwnerId()}
                Product ID is: ${page.productId}
                `
            )
        }
    });
});