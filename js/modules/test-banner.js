export function initTestBanner() {
    const banner = document.createElement('div');
    banner.style.cssText = `
        background-color: red;
        color: white;
        text-align: center;
        padding: 10px;
        font-weight: bold;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
    `;
    banner.textContent = "GitHub Pages Integration Test - If you see this, it's working!";
    
    // Insert at the very top of the body
    document.body.insertBefore(banner, document.body.firstChild);
}

