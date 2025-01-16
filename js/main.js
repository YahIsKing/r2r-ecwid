// Enable development logs first
localStorage.setItem("show_ec_logs", "ALL");

// Log script location
console.log('Script location:', document.currentScript?.src || 'Unable to determine source');

// Log initial load
console.log('Script initializing...');

// Create script element for Ecwid integration
var ecwidScript = document.createElement('script');
ecwidScript.text = `
    window.ec = window.ec || {};
    window.ec.config = window.ec.config || {};
    window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

    Ecwid.OnAPILoaded.add(function() {
        console.log('Ecwid API loaded in store');
        
        Ecwid.OnPageLoaded.add(function(page) {
            console.log('Store page loaded:', page.type);
            
            // Create red banner
            const banner = document.createElement('div');
            banner.style.cssText = 'background-color: red; height: 20px; width: 100%; position: fixed; top: 0; left: 0; z-index: 9999999;';
            document.body.insertBefore(banner, document.body.firstChild);
            
            if (page.type === "PRODUCT") {
                console.log('Product page detected:', page.productId);
            }
        });
    });
`;

// Add script to page
document.body.appendChild(ecwidScript);