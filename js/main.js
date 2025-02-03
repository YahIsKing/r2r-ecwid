// Initialize Ecwid API and load feature modules
const baseUrl = 'https://yahisking.github.io/r2r-ecwid/js/'; // Adjust this to your GitHub Pages URL

// Core modules to load first
const coreModules = [
    'core/event-manager.js'
];

// Feature modules to load after core
const featureModules = [
    'features/product-customizations.js',
    'features/category-customizations.js',
    'features/red-sea-customizations.js',
    'modules/affirm-integration.js',
    'features/review-widget.js'
];

// Load script helper function
function loadScript(file) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `${baseUrl}/${file}`;
        script.onload = () => {
            console.log(`Successfully loaded: ${file}`);
            resolve();
        };
        script.onerror = (e) => {
            console.error(`Failed to load: ${file}`, e);
            reject(e);
        };
        document.head.appendChild(script);
    });
}

// Initialize the application
Ecwid.OnAPILoaded.add(async function() {
    console.log('Main script loaded, initializing core modules...');
    
    try {
        // Load core modules first
        for (const module of coreModules) {
            await loadScript(module);
        }
        
        // Initialize EventManager
        EventManager.init();
        
        // Load feature modules
        console.log('Loading feature modules...');
        for (const module of featureModules) {
            await loadScript(module);
        }
        
        // Initialize review widget through event manager
        if (typeof initReviewWidget === 'function' && typeof injectReviewWidget === 'function') {
            console.log('Found review widget functions, initializing...');
            initReviewWidget();
            // Add page load handler for review widget
            EventManager.addHandler('page', (page) => {
                console.log('Page handler triggered for review widget');
                injectReviewWidget(page.type);
            });
        } else {
            console.warn('Review widget functions not found');
        }
        
        console.log('All modules loaded successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});