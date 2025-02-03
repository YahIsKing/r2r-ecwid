// Central event management system for Ecwid store customizations
const EventManager = {
    handlers: {
        product: [],
        category: [],
        cart: [],
        productOptions: [],
        page: []  // Add page handler type
    },

    // Initialize all event listeners
    init() {
        console.log('Initializing EventManager...');
        
        if (!window.Ecwid || !window.Ecwid.OnAPILoaded) {
            console.warn('Ecwid API not found. EventManager initialization skipped.');
            return;
        }

        Ecwid.OnAPILoaded.add(() => {
            console.log('API Loaded - Setting up event listeners...');
            
            // Set up page load handler
            if (Ecwid.OnPageLoaded) {
                Ecwid.OnPageLoaded.add((page) => {
                    console.log(`Page loaded - Type: ${page.type}`);
                    this.handlePageLoad(page);
                });
            }

            // Set up cart change handler
            if (Ecwid.OnCartChanged) {
                Ecwid.OnCartChanged.add((cart) => {
                    console.log('Cart changed');
                    this.notifyHandlers('cart', cart);
                });
            }

            // Set up product options change handler
            if (Ecwid.OnProductOptionsChanged) {
                Ecwid.OnProductOptionsChanged.add((product) => {
                    console.log('Product options changed');
                    this.notifyHandlers('productOptions', product);
                });
            }
        });
    },

    // Handle page load events and route to appropriate handlers
    handlePageLoad(page) {
        this.notifyHandlers('page', page);
        
        // Route to specific handlers based on page type
        switch (page.type) {
            case 'PRODUCT':
                this.notifyHandlers('product', page);
                break;
            case 'CATEGORY':
                this.notifyHandlers('category', page);
                break;
            // Add other page types as needed
        }
    },

    // Register a handler for a specific event type
    addHandler(type, handler) {
        if (this.handlers[type]) {
            this.handlers[type].push(handler);
            console.log(`Handler added for ${type}`);
        } else {
            console.warn(`Unknown handler type: ${type}`);
        }
    },

    // Notify all handlers of a specific type
    notifyHandlers(type, data) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Error in ${type} handler:`, error);
                }
            });
        }
    }
};

// Export for use in other modules
window.EventManager = EventManager;
