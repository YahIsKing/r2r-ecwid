// Store configuration settings

const storeConfig = {
    // Store specific settings
    storeId: 'YOUR_STORE_ID',
    
    // Feature flags
    features: {
        customProductOptions: true,
        // Add more feature flags as needed
    },
    
    // Custom styling
    styling: {
        primaryColor: '#4A90E2',
        secondaryColor: '#F5A623',
        // Add more styling variables as needed
    },
    
    // Module specific configurations
    modules: {
        productOptions: {
            enabled: true,
            defaultOptions: []
        }
        // Add more module configurations as needed
    }
};
