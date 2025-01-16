// Enable all development logs
localStorage.setItem("show_ec_logs", "ALL");

console.log('Testing - main.js file loaded');

Ecwid.OnAPILoaded.add(function() {
    Ecwid.OnPageLoaded.add(function(page) {
        // Create red banner
        const banner = document.createElement('div');
        banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999999;';
        document.body.insertBefore(banner, document.body.firstChild);

        // Log page info as per documentation example
        if (page.type == "PRODUCT") {
            console.log(
                `
                Page loaded!
                Ecwid store ID is: ${Ecwid.getOwnerId()}
                Product ID is: ${page.productId}
                `
            )
        }
    })
})