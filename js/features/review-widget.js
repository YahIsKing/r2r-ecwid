// Review Widget Feature
console.log('Review Widget module loaded');

export function initReviewWidget() {
    console.log('Review Widget initialized');
    // We'll initialize this when the page load event fires
    // The actual injection will be handled by the event manager
}

export function injectReviewWidget(pageType) {
    console.log(`Attempting to inject review widget. Page type: ${pageType}, Path: ${window.location.pathname}`);
    
    // Only run on home page and SITE type
    if (window.location.pathname !== '/' || pageType !== 'SITE') {
        console.log('Not injecting review widget - wrong page type or path');
        return;
    }

    // Function to inject the review widget
    function injectReviewWidgetInner() {
        // Find the Delivery Info section
        const deliverySection = document.querySelector('div[aria-label="Delivery Info"]');
        if (!deliverySection) {
            return;
        }

        // Create container for the review widget
        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'ins-tile ins-tile--text ins-tile--title-left ins-tile--shown';
        reviewContainer.style.width = '100%';
        
        // Add the review widget script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://links.rift2reef.com/reputation/assets/review-widget.js';
        
        // Create the iframe
        const iframe = document.createElement('iframe');
        iframe.className = 'lc_reviews_widget';
        iframe.src = 'https://links.rift2reef.com/reputation/widgets/review_widget/DOw1gokd9fWfR7XmyjJZ';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.style.minWidth = '100%';
        iframe.style.width = '100%';
        
        // Add elements to the container
        reviewContainer.appendChild(script);
        reviewContainer.appendChild(iframe);
        
        // Insert after the delivery section
        deliverySection.parentNode.insertBefore(reviewContainer, deliverySection.nextSibling);
    }

    // Check if the delivery section exists, if not wait for it
    const observer = new MutationObserver((mutations, obs) => {
        const deliverySection = document.querySelector('div[aria-label="Delivery Info"]');
        if (deliverySection) {
            injectReviewWidgetInner();
            obs.disconnect(); // Stop observing once widget is injected
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
