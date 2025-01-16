// Enable all development logs
localStorage.setItem("show_ec_logs", "ALL");

console.log('Testing - main.js file loaded');

Ecwid.OnAPILoaded.add(function() {
    console.log('API loaded');
    
    // Create and add test banner
    const banner = document.createElement('div');
    banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 1000;';
    document.body.insertBefore(banner, document.body.firstChild);
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log('Page loaded:', page.type);
        
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