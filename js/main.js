Ecwid.OnAPILoaded.add(function() {
	Ecwid.OnPageLoaded.add(function(page) {
    if (page.type == "PRODUCT") {
       console.log(
        `
       Page loaded!
       Ecwid store ID is: ${Ecwid.getOwnerId()}
       Product ID is: ${page.productId}
        `
       )
    }
	})
})

Ecwid.OnAPILoaded.add(function() {
    Ecwid.OnPageLoaded.add(function(page) {
        if (page.type == "CATEGORY" && page.categoryId == 0) { // categoryId 0 is the home page
            const soldOutLabels = document.querySelectorAll('.ins-tile__product-label--outofstock');
            soldOutLabels.forEach(label => {
                label.style.display = 'none';
            });
        }
    });
});