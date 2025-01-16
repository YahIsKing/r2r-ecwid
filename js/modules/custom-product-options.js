// Custom Product Options Module

export class CustomProductOptions {
    constructor(config) {
        this.config = config;
        if (this.config.modules.productOptions.enabled) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Listen for product page loads
        Ecwid.OnPageLoaded.add((page) => {
            if (page.type == 'PRODUCT') {
                this.initializeProductOptions();
            }
        });
    }

    initializeProductOptions() {
        // Initialize custom options for the current product
        console.log('Initializing custom product options');
        
        // Add custom fields to product page
        const productContainer = document.querySelector('.ec-product-details__description');
        if (productContainer) {
            this.addCustomFields(productContainer);
        }
    }

    addCustomFields(container) {
        const customFields = this.config.modules.productOptions.defaultOptions;
        customFields.forEach(field => {
            const fieldElement = this.createCustomField(field);
            container.appendChild(fieldElement);
        });
    }

    createCustomField(fieldConfig) {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-product-option';
        
        const label = document.createElement('label');
        label.textContent = fieldConfig.label;
        
        const input = document.createElement('input');
        input.type = fieldConfig.type || 'text';
        input.name = fieldConfig.name;
        input.required = fieldConfig.required || false;
        
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        
        return wrapper;
    }
}
