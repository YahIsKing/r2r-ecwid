Ecwid.OnAPILoaded.add(function() {
    console.log('API loaded');
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log('Page loaded:', page.type);
        
        // Create red banner
        const banner = document.createElement('div');
        banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999999;';
        
        // For product pages, try to insert into the Ecwid container
        if (page.type === "PRODUCT") {
            const ecwidContainer = document.querySelector('#ecwid-products');
            if (ecwidContainer) {
                ecwidContainer.insertBefore(banner, ecwidContainer.firstChild);
            } else {
                document.body.insertBefore(banner, document.body.firstChild);
            }
            
            console.log(
                `
                Product page loaded!
                Ecwid store ID is: ${Ecwid.getOwnerId()}
                Product ID is: ${page.productId}
                `
            );
        } else {
            document.body.insertBefore(banner, document.body.firstChild);
        }
    });
});