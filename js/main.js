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
    'modules/affirm-integration.js'
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
        
        console.log('All modules loaded successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});