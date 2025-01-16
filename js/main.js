// Enable all development logs
localStorage.setItem("show_ec_logs", "ALL");

console.log('Testing - main.js file loaded');

Ecwid.OnAPILoaded.add(function() {
    console.log('API loaded');
    
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