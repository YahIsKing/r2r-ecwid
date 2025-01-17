// Initialize Ecwid API and load feature modules
Ecwid.OnAPILoaded.add(function() {
    console.log('Main script loaded, initializing features...');
    // Load feature-specific files
    const featureFiles = [
        'features/product-customizations.js',
        'features/category-customizations.js',
        'features/red-sea-customizations.js'
    ];

    featureFiles.forEach(file => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        // Use relative path instead of absolute
        script.src = `js/${file}`;
        console.log(`Loading feature: ${file}`);
        script.onload = function() {
            console.log(`Successfully loaded: ${file}`);
        };
        script.onerror = function() {
            console.error(`Failed to load: ${file}`);
        };
        document.head.appendChild(script);
    });
});