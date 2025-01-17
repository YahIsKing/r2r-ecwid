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
// prints
//
//      Page loaded!
//      Ecwid store ID is: 1003
//      Product ID is: 560656065