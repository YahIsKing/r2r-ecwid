// Review Widget Feature
export function initReviewWidget() {
    // Only run on home page
    if (window.location.pathname !== '/') {
        return;
    }

    // Function to inject the review widget
    function injectReviewWidget() {
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
            injectReviewWidget();
            obs.disconnect(); // Stop observing once widget is injected
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
