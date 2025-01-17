// Initialize Ecwid API and load feature modules
Ecwid.OnAPILoaded.add(function() {
    console.log('Main script loaded, initializing features...');
    // Load feature-specific files
    const baseUrl = 'https://yahisking.github.io/r2r-ecwid/js/'; // Adjust this to your GitHub Pages URL
    const featureFiles = [
        'features/product-customizations.js',
        'features/category-customizations.js',
        'features/red-sea-customizations.js'
    ];

    featureFiles.forEach(file => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `${baseUrl}/${file}`;
        console.log(`Loading feature: ${baseUrl}/${file}`);
        script.onload = function() {
            console.log(`Successfully loaded: ${file}`);
        };
        script.onerror = function(e) {
            console.error(`Failed to load: ${file}`, e);
        };
        document.head.appendChild(script);
    });
});