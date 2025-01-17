// Category page customizations
Ecwid.OnAPILoaded.add(function() {
    Ecwid.OnPageLoaded.add(function(page) {
        if (page.type == "CATEGORY" && page.categoryId == 0) { // categoryId 0 is the home page
            hideSoldOutLabels();
        }
    });
});

function hideSoldOutLabels() {
    const soldOutLabels = document.querySelectorAll('.ins-tile__product-label--outofstock');
    soldOutLabels.forEach(label => {
        label.style.display = 'none';
    });
}
