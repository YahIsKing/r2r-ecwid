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
        banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999999;';
        
        // For Ecwid store pages, insert into the store container
        const storeContainer = document.querySelector('.ec-wrapper');
        if (storeContainer) {
            console.log('Found store container, inserting banner');
            storeContainer.insertBefore(banner, storeContainer.firstChild);
        } else {
            console.log('No store container found, inserting into body');
            document.body.insertBefore(banner, document.body.firstChild);
        }
        console.log('Banner created');
    }
}

// Create banner on initial page load
createBanner();

// Watch for store container to appear
const observer = new MutationObserver((mutations, obs) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes) {
            for (const node of mutation.addedNodes) {
                if (node.classList && node.classList.contains('ec-wrapper')) {
                    console.log('Store container appeared, creating banner');
                    createBanner();
                }
            }
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

Ecwid.OnAPILoaded.add(function() {
    console.log('API loaded');
    createBanner();
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log('Page loaded:', page.type);
        setTimeout(createBanner, 100); // Small delay to ensure DOM is updated
        
        if (page.type == "PRODUCT") {
            console.log(
                `
                Page loaded!
                Ecwid store ID is: ${Ecwid.getOwnerId()}
                Product ID is: ${page.productId}
                `
            );
            createBanner();
        }
    });
});