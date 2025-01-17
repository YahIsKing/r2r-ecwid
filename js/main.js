// Initialize Ecwid API and load feature modules
Ecwid.OnAPILoaded.add(function() {
    // Load feature-specific files
    const featureFiles = [
        'features/product-customizations.js',
        'features/category-customizations.js'
    ];

    featureFiles.forEach(file => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `/js/${file}`;
        document.head.appendChild(script);
    });
});