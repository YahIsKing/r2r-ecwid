Get started with Storefront JS API
Ecwid storefront is a store working on a website where customers can browse for products. Ecwid storefront has many design and configuration settings out of the box that work on any website where it's displayed. Still, you can customize storefront design and functionality further with custom scripts and stylesheets.

Our JS API has many ready-to-use functions for managing store design settings, customers, and carts, and receiving different information without going server-side and making REST API requests.

Pre-requirements
To use Storefront JS API, you need a custom app and a JavaScript file hosted on your side.

Custom application. If you don't have a custom app yet, please refer to this instruction.
Access scopes. The app requires the following access scope: customize_storefront.
Endpoints. The app requires at least one of these endpoints:
customJsUrl - link to your JavaScript file.
customCssUrl - link to your stylesheet.
Set up JavaScript file for the storefront
Host your JavaScript file on a static link and email us this link alongside your store ID or application name/ID. We will add access scope and file URL to the app settings and write back to you.

After that, Ecwid will automatically load the customJsUrland customCssUrl files from your server and execute them every time the customer opens or switches storefront pages. You only need to set up the application once and install it in all stores where your script is required. Ecwid takes care of the rest.

Ecwid ensures that your files load and execute on any store website, even if the store works on multiple websites.

Enable JS API on the storefront
Ecwid has a collection of pre-built methods for triggering your code based on certain conditions and managing store data and configs safely from the storefront. We refer to it as Storefront JS API or simply JS API. By default, the JS API is not loaded on the page to improve loading times.

Make sure you always start your code with the Ecwid.OnAPILoaded() function to enable JS API on the page.

Code example:

JavaScript

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
Write scripts for the storefront
Now you can write JavaScript code and use JS API methods to expand existing and create new functionalities on the storefront. Our JS API has dozens of ready-to-use methods to dynamically adjust store design and behavior, receive store data without server-side calls, and manage customers.

If your code requires additional JavaScript files, you can load them from the customJsUrl file. We recommend using a standard createElement() function to create a new <script> element on the page. This code doesn't rely on JS API and therefore could be called before Ecwid.OnAPILoaded() function.

Code example:

JavaScript

var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://example.com/example.js";
document.head.appendChild(s);
Learn more about available JS API methods in the pages below and build unique UI/UX with Ecwid!

Updated 5 months ago

Methods for storefront management
Storefront JS API has methods for receiving and managing different storefront details. For example, you can:

Receive and manage store settings and design configuration
Receive information about store pages and redirect users to different pages
Manage Ecwid widgets on custom websites and load them dynamically
Enable JS API on the storefront
The methods listed below require JS API to be loaded on the page. Read more on how to enable JS API.

Ecwid.getOwnerId()
This method responds with Ecwid store ID.

Code example:

JavaScript

var storeId = Ecwid.getOwnerId()
console.log(storeId);

// prints
// 1003
Ecwid.getStorefrontLang()
This method responds with the current storefront language.

Code example:

JavaScript

var lang = Ecwid.getStorefrontLang();
console.log(lang);

//prints
// "en"
Ecwid.getAppPublicToken()
This method accepts app client_id as an argument and responds with a public access token for the app. Such token is safe to use on the storefront, it won't reveal any private store data.

Code example:

JavaScript

var publicToken = Ecwid.getAppPublicToken('my-cool-app');
console.log(publicToken);

// prints
// public_qKDUqKkNXzcj9DejkMUqEkYLq2E6BXM9
Ecwid.getAppPublicConfig()
This method accepts app client_id as an argument and responds with a public config for the app. Read more about setting up a public config for applications.

Code example:

Get app public config code example

var publicConfig = Ecwid.getAppPublicConfig("client_id");
console.log(publicConfig);

// prints
// {"key": "public","value": "{'color':'red','text':'Email button','border-radius':'3px'}"}
Ecwid.getInitializedWidgets()
This method responds with a list of currently enabled widgets.

Code example:

JavaScript

var widgets = Ecwid.getInitializedWidgets();
console.log(widgets);

// prints 
// ["Minicart", "SearchPanel", "ProductBrowser"]
Full list of widgets:

Minicart - Minicart widget
SearchPanel - Search widget
ProductBrowser - Main storefront widget, contains full Ecwid store
Categories - Horizontal categories menu widget
Product - Widget with an embedded product page
Ecwid.isStorefrontV3()
This method is mostly for public applications developed before 2024. Use it to define if you should adapt your application for an old storefront design in this store.

Code example:

JavaScript

var v3Migration = Ecwid.isStorefrontV3();
console.log(v3Migration);

// prints if enabled
// true
Ecwid.formatCurrency()
This method is used to check a currency format on the storefront. It accepts a numeric price value as an argument and responds with a price format with a currency symbol according to the store settings.

Code example:

JavaScript

var currencyFormat = Ecwid.formatCurrency(12.99);
console.log(currencyFormat);

// prints
// "$12.99"
Ecwid.setStorefrontBaseUrl()
This method allows redirecting storefront widgets loaded on the current page to another page on the website. The most common use case is when you have several Ecwid widgets on different pages of your custom website and want them all to work with the same cart and checkout on one of the pages.

Example:

example.com/store - main store page

example.com/sale - page with products currently on sale

example.com/gift-cards - page with a gift card product widget

In this case, you can make all three pages to work through the checkout on the /store by executing the following line of code on pages example.com/sale and example.com/gift-cards:

JavaScript

Ecwid.setStorefrontBaseUrl('example.com/store');
Ecwid.openPage()
This method allows opening a specific page on the storefront. It accepts page slug and some additional parameters in its arguments.

Code example:

Ecwid.openPage('product')

Pages list:

'cart' - Checkout step 1. Customers enter their email and apply discount coupons.
'checkout/address' - Checkout step 2. Customers enter their address.
'checkout/shipping' - Checkout step 3. Customers choose shipping/pickup method.
'checkout/payment' - Checkout step 4. Customers choose a payment method and go to the payment page.
'checkout/order-confirmation'- "Thank you for purchase" page customers see after placing an order.
'account' - Customer's account page.
'account/address-book'- Customer's account page (saved shipping addresses).
'account/favorites'- Customer's account page (products added to favorites).
'pages/about' - Legal page (about the store).
'pages/shipping-payment' - Legal page (shipping/payment policies).
'pages/returns' - Legal page (return policy).
'pages/terms' - Legal page (Terms of use).
'pages/privacy-policy' - Legal page (Cookie/Privacy policies).
Open page with parameters
Parameters allow you to open a specific page, for example, product variation or a search with a pre-defined price range. Pass parameters as a second argument in the function.

product
For product pages, additional parameters include: 'id', 'variation', and 'options':

'id'- Product ID. This is a required parameter for opening product pages.
name - Product name as it would look in the URL: lowercase, spaces replaced with dashes. For example, "Pizza 33cm" product name would transform into pizza-33cm.
slug_value - Custom page slug for the product. Use it instead of the name parameter if a product has a custom slug.
'variation' - Accepts Product variation ID as a value to open a specific product variation.
'options' - Accepts an array of product option choices (dropdown and radio button option types). Option choices are assigned to product options depending on the option index (starts at 1). For example, 'options': [3,1] selects the third value for the first option, and the first value for the second option.
If you pass both id and name or id and slug_value parameters, Ecwid JS API will create a product URL and open it without making additional backend requests to confirm the category exists. The choice between the name or slug_value parameters depends on whether a product has a custom slug.

Code examples:

JavaScript

Ecwid.openPage('product', {'id': 72585497, 'slug_value': 'best-toys'});

Ecwid.openPage('product', {'id': 45523512, 'name': 'Pizza Roll'});

Ecwid.openPage('product', {'id': 72585497, 'variation': 16351010});

Ecwid.openPage('product', {'id': 72585497, 'options': [2,2]});
There is an alternative way to open a page with pre-selected options or a variation without JS API. You can add option choices or the variation ID (?options=1,2,3 or ?variation=123456) as a query parameter to product page URLs and open it. URL examples:
https://example.com/store/example-product?variation=163510
https://example.com/store/example-product?options=4,3

category
For category pages, additional parameters include: 'id' and 'page':

'id' - Category ID. If not specified, Ecwid will ignore any other params and open the root category page ('id': 0).
name - Category name as it would look in the URL: lowercase, spaces replaced with dashes. For example, "Rental Spaces" category name would transform into rental-spaces.
slug_value - Custom page slug for the category. Use it instead of the name parameter if a category has a custom slug.
'page' - Page number for categories where products don't fit on one page. If you pass a value bigger than the number of pages in the category, Ecwid will open the last page.
If you pass both id and name or id and slug_value parameters, Ecwid JS API will create a category URL and open it without making additional backend requests to confirm the category exists. The choice between the name or slug_value parameters depends on whether a category has a custom slug.

Code example:

JavaScript

Ecwid.openPage('category', {'id': 20671017, slug_value: 'rental', 'page': 2});
search
For the search page, Ecwid has several additional parameters passed inside the 'search' argument:

'keyword': Search string for product title, description, and SKU.
'inventory': Supports only one value: if instock, only products "In stock" are returned.
'onsale': Supports only one value: if onsale, only products with "Compare to" prices are returned.
'priceFrom': Minimum product price for search, for example, 500.00.
'priceTo': Maximum product price for search, for example, 899.99.
'offset': Offset from the beginning of the returned items list. Default is 0.
'categories': Category IDs for search, for example: 0,123456,8236623
'includeProductsFromSubcategories': Supports two values: if true, the search includes products from subcategories of selected categories, false otherwise. Default is true.
'attribute_[name]=[values]': Search by product attributes. Accepts several values separated by a comma. To search for an exact match to attribute value, enclose it in quotation marks.
'option_[name]=[values]': Search by product options. Accepts several values separated by a comma. To search for an exact match to option value, enclose it in quotation marks.
'createdFrom': Product creation datetime (lower bound) matching REST API date format, for example, createdFrom=2020-01-30 10:00:00 +0000.
'createdTo': Product creation datetime (upper bound) matching REST API date format, for example, createdFrom=2020-01-30 10:00:00 +0000.
Code examples:

JavaScript

Ecwid.openPage('search', {'keyword': 'surfboard', 'page': 2});

Ecwid.openPage('search', {'priceTo': '50'});

Ecwid.openPage(
    'search', 
    {
      'keyword': 'shoes', 
      'attribute_Brand': 'Nike',
      'inventory': 'instock',
      'offset': 50
    }
  );
account
For the account sign in page, there is only one additional parameter:

'returnurl' - Optional parameter for redirecting users to a specific URL after successful login.
Code example:

JavaScript

Ecwid.openPage('account', {'returnurl': 'https://www.ecwid.com/demo/Surfboards-c20671017'});
account/subscription
For the account subscriptions page, there is only one additional parameter:

'id' - Subscription ID used to redirect customers to a specific subscription page. Required parameter.
Code example:

JavaScript

Ecwid.openPage('account/subscription', {'id': 1006502});
Ecwid.showProductFilters()
This method is used to open the side menu with product filters on category pages.

Code example:

JavaScript

Ecwid.showProductFilters();
Methods for Instant Site home page
Instant Site home page is designed to load as fast as possible. As a result, it doesn't have the product browser and works with a limited number of JS API methods.

The collection of methods for home page includes two automatic event triggers and 3 data-receiving methods.

Read more about event triggers for Instant Site home page.

window.instantsite.getSiteId() 
This method responds with Ecwid store ID.

Code example:

JavaScript

window.instantsite.getSiteId()
window.instantsite.getAppPublicConfig("client_id")
This method accepts app client_id as an argument and responds with a public config for the app. Read more about setting up a public config for applications.

Code example:

JavaScript

var publicConfig = window.instantsite.getAppPublicConfig("client_id");
console.log(publicConfig);

// prints
// {"key": "public","value": "{'color':'red','text':'Email button','border-radius':'3px'}"}
window.instantsite.getAppPublicToken("client_id") 
This method accepts app client_id as an argument and responds with a public access token for the app. Such token is safe to use on the storefront, it won't reveal any private store data.

Code example:

JavaScript

var publicToken = Ecwid.getAppPublicToken('my-cool-app');
console.log(publicToken);

// prints
// public_qKDUqKkNXzcj9DejkMUqEkYLq2E6BXM9

Automatic event triggers
Storefront JS API can help you with developing storefront customizations. One of the most useful and often required tools is automatic triggers. Automatic triggers work like event handlers, calling the code inside when a specific event happens on the storefront. With event triggers, you don't have to write manually and test code for tracking events like page DOM load, customer login, customer cart change, etc.

The methods listed below require JS API to be loaded on the page. Read more on how to enable JS API.

Ecwid.OnAPILoaded()
This function triggers your code inside when Storefront JS API fully loads on the storefront page. It also ensures that the JS API is loaded before your code relying on it starts working. We recommend calling all JavaScript code related to the Ecwid storefront from inside this method.

Code example:

JavaScript

Ecwid.OnAPILoaded.add(function() {
    console.log("Ecwid storefront JS API has loaded");
});
Use case for other triggers and methods:

JavaScript

Ecwid.OnAPILoaded.add(function() {
    console.log("JS API is loaded");
    console.log("Ecwid store ID: "+Ecwid.getOwnerId());
    
    Ecwid.OnPageLoaded.add(function(page) {
        console.log("Page DOM is loaded");
        console.log("Page type is: "+page.type)
    });
});

// prints
// 
// JS API is loaded
// Ecwid store ID: 15695068
// Page DOM is loaded
// Page type is: SITE
When this method triggers, the website DOM is not yet loaded, so use it to load scripts that don't rely on specific page content.

Ecwid.OnPageLoad
This event runs when the page DOM is loaded. Please note that it doesn't wait for the Ecwid product browser to fully load.

Code example:

JavaScript

Ecwid.OnPageLoad.add(function() {
    console.log("Page DOM has just loaded");
});
Ecwid.OnPageLoaded
This method is different from the OnPageLoad. It runs when the page DOM with the Ecwid product browser is loaded and is ready for customization.

It contains a callback function with page argument containing information about a loaded page.

Code examples:

JavaScript
JavaScript

Ecwid.OnPageLoaded.add(function(page){
  console.log(JSON.stringify(page));
});

// prints
// 
// {
//   "type":"PRODUCT",
//   "categoryId":0,
//   "hasPrevious":false,
//   "mainCategoryId":0,
//   "name":"Desk Black 101x50x76.5 cm Engineered Wood",
//   "nameTranslated":{
//     "cs":"",
//     "en":"Desk Black 101x50x76.5 cm Engineered Wood"
//   },
//   "productId":561386461
// }
page callback fields
Name	Type	Description
type	string	Page type. Available values:
SIGN_IN - Sign in page for customers.
ACCOUNT_SETTINGS - Main customer account page.
ORDERS - Page where customers can see their order history.
ACCOUNT_SUBSCRIPTION - Page where customers can see their subscription products.
ADDRESS_BOOK - Page where customers can see their saved addresses page.
FAVORITES - Page where customers can see products added to favorites.
RESET_PASSWORD - Page where customers can reset their account password.
CATEGORY - Any category page.
PRODUCT - Any product page.
SEARCH - Products search page.
CART - Cart page, first page of the checkout.
CHECKOUT_ADDRESS - Checkout page where customers enter their address for delivery.
CHECKOUT_DELIVERY - Checkout page where customers choose shipping/pickup option.
CHECKOUT_ADDRESS_BOOK - Checkout page where customers select one of the saved addresses.
CHECKOUT_PAYMENT_DETAILS - Checkout page where customers select payment option
ORDER_CONFIRMATION - Checkout page customers see after placing an order. Sometimes referred to as the "Thank you for order" page.
ORDER_FAILURE - Page customers see in case of failed payment.
DOWNLOAD_ERROR - Page customers see in case of failed file download (for digital products only).
name	string	Name of the opened category or product. Available for CATEGORY and PRODUCT page types.
nameTranslated	array	Translated name of the currently opened product. Available for PRODUCT page type.
keywords	string	Keywords for searching orders on the customer account page or products on the product search page. Available for CATEGORY, and SEARCH page types.
offset		Offset for the current list of orders or products on the page starting from 0. Available for SEARCH, and CATEGORY page types.
categoryId	integer	Category ID. If categoryId == 0, it's a root category. Available for CATEGORY page type.
mainCategoryId	integer	Default category ID for the product. Available for PRODUCT page type.
sort	string,	Sorting tye. Available values:
normal - Default product sorting from store settings.
relevance - Most relevant to search criteria products first.
addedTimeDesc - New products first.
priceAsc - Sort products by price (from low to high).
priceDesc - Sort products by price (from high to low).
nameAsc - Sort products by name (from A to Z).
nameDesc - Sort products by price (from Z to ).

Available for SEARCH and CATEGORY page types.
orderId	integer	ID of a placed order. Available for ORDER_CONFIRMATION page type.
orderNumber	integer	Outdated field, use orderId instead. Internal ID of a placed order (still can be used in REST API requests). Available for ORDER_CONFIRMATION page type.
vendorOrderNumber	string	Outdated field, use orderId instead. Internal ID of a placed order (still can be used in REST API requests). Available for ORDER_CONFIRMATION page type.
errorType	string	Type of error when digital product download has failed. Available values:
expired - Download link expired.
invalid - Download link is incorrect
limit - Number of maximum allowed downloads for the link has been reached.

Available for DOWNLOAD_ERROR page type.
key	integer	Internal product file ID. Available for DOWNLOAD_ERROR page type.
productId	integer	Product ID. Available for PRODUCT page type.
variationId	number	Product variation ID. Available for PRODUCT page type.
filterParams	array{FilterParameters}	Filter parameters used in a product search. Available for SEARCH and CATEGORY page types.
FilterParameters
Name	Type	Description
attributes	array	Selected attributes for product search.
options	array	Selected options for product search.
categories	array	Selected category IDs for product search.
includeProductsFromSubcategories	boolean	Defines if the search includes products from subcategories of selected categories. Available values:
true - Search includes subcategories.
false - Search doesn't include subcategories.
keyword	string	Keyword used for product search.
inventory	string	Defines if the search includes only products "in stock" (with stock more than 0). Available values:
instock - Search includes only "in stock" products.
"" - Search also includes "out of stock" products.
hasPrevious	boolean	Tells if a customer visited other store pages before this one. Available values:
true - This is not an entry page.
false This is an entry page for the customer.
Ecwid.OnSetProfile
This method allows tracking when customers log in and out on the storefront. It contains a callback function with customer argument when a customer logs in, and null if a customer has logged out.

Code example:

JavaScript

Ecwid.OnSetProfile.add(function(customer){
	console.log(customer.email);
})

// prints
// "ec.apps@lightspeedhq.com"
Ecwid.OnCartChanged
This event allows tracking any cart changes excluding the payment method selection. It contains a callback function with a cart argument, that has information about the cart after the change.

Code example:

JavaScript

Ecwid.OnCartChanged.add(function(cart){
    console.log(JSON.stringify(cart));
});

// prints
// 
// {
// 	"id":"TJ6VG",
// 	"cartId":"99E7E224-5F6F-4C00-BFE9-9F72F2B5A471",
// 	"orderId":506524300,
// 	"items":[...],
// 	"productsQuantity":4,
// 	"shippingMethod":"Standard shipping",
// 	"shippingPerson":{},
// 	"weight":4
// }
Full list of Ecwid.OnCartChanged event triggers :

Cart is initialized, synced or cleared
Product added, updated (increased quantity, changed selected options) or removed
Discount coupon or discount is applied or removed
Shipping address is added or updated
Shipping method is selected or changed
Ecwid.OnProductOptionsChanged
This event allows tracking of changed product options on product pages. It contains a callback function with productid argument, containing the ID of the changed product. Only storefront V3 supports all product option types. Check the storefront version with this method.

Code example:

JavaScript

Ecwid.OnProductOptionsChanged.add(function(productid) {
   console.log("Options changed, product id: " + productid);    
});

// prints
// Options changed, product id: 123456
Ecwid.OnOrderPlaced
This event allows tracking placed orders on the storefront and receiving order details in a callback function with an order argument.

Code example:

JavaScript

Ecwid.OnAPILoaded.add(() => {
    Ecwid.OnOrderPlaced.add((order) => {
        console.log(order.total);
    });
});

// prints
// 829
order callback argument
Name	Type	Description
items	Array{OrderItems}	Details about products in order.
productsQuantity	number	Total quantity of products in order.
weight	number	Total order weight.
paymentMethod	string	Selected payment method name. undefined if no method is selected.
shippingMethod	string	Selected shipping method name. undefined if no method is selected.
shippingCarrierName	string	Selected shipping carrier name. undefined if no method is selected.
total	number	Order total cost including subtotal, discounts, coupons, taxes, fees, and shipping.
totalWithoutTax	number	Order total without taxes.
subtotal	number	Order subtotal (product cost before shipping cost applied).
subtotalWithoutTax	number	Order subtotal without taxes.
tax	number	Order total tax.
couponName	string	Applied discount coupon name. undefined if no discount coupon is applied.
couponDiscount	number	Value of coupon discount applied to order.
volumeDiscount	number	Value of discount applied to subtotal (doesn't include discount coupon).
customerGroupDiscount	number	Discount based on customer group.
discount	number	Total discount applied to order.
shipping	number	Order shipping cost.
shippingWithoutTax	number	Order shipping cost without taxes.
handlingFee	number	Order handling fee.
handlingFeeWithoutTax	number	Order handling fee without taxes.
shippingAndHandling	number	Sum of shipping and handlingFee fields
billingPerson	array{PersonInfo}	Customer billing address
shippingPerson	array{PersonInfo}	Customer shipping address
affiliateId	string	Affiliate ID used in order.
orderNumber	number	Internal order ID. Use ID from vendorNumber instead.
vendorNumber	string	Order ID. Matches order id in REST API and customer emails.
date	string	Order creation datetime in UNIX timestamp, for example, "1484638550".
paymentStatus	string	Payment status of an order. Available values: AWAITING_PAYMENT, PAID, CANCELLED, REFUNDED, PARTIALLY_REFUNDED, INCOMPLETE
fulfillmentStatus	string	Fulfillment status of an order. Available values: AWAITING_PROCESSING, PROCESSING, SHIPPED, DELIVERED, WILL_NOT_DELIVER, RETURNED, READY_FOR_PICKUP
customer	array{CustomerInfo}	Customer's email and name.
extraFields	array{OrderExtraFieldsInfo}	Order extra field details.
OrderItems
Name	Type	Description
quantity	number	Quantity of this product in order.
product	array{ProductInfo}	Product details.
options	array	Selected product options.
ProductInfo
Name	Type	Description
id	Integer	Product ID.
name	String	Product name.
price	Integer	Product price.
shortDescription	String	Product description truncated to 120 characters.
sku	String	Product SKU.
url	String	Link to a product page.
weight	Integer	Product weight.
PersonInfo
Name	Type	Description
name	string	Customer's name.
phone	string	Customer's phone number.
companyName	string	Customer's company name.
street	string	Address: street.
city	string	Address: city.
countryName	string	Address: country name.
countryCode	string	Address: country code.
stateOrProvinceName	string	Address: state name.
stateOrProvinceCode	string	Address: state code.
postalCode	string	Address: zip code.
CustomerInfo
Name	Type	Description
name	string	Customer's name.
email	string	Customer's email.
OrderExtraFieldsInfo
Name	Type	Description
orderBy	number	Sorting position for order details page in Ecwid admin. Starts with 0 (highest position).
title	string	Extra field name.
orderDetailsDisplaySection	string	Section where the extra field is displayed.
type	string	Extra field type.
value	string	Extra field value.
Ecwid.OnPageSwitch
This method allows tracking and preventing page switches on the storefront. It is triggered when a user is about to switch a page. The method works synchronously and contains a page argument in its callback function.

Use it to identify the page where users go and prevent page loading by returning a false value.

Code example:

JavaScript

Ecwid.OnPageSwitch.add(function(page) {
    if (page.type === "PRODUCT") {
        window.location.href = "index.html?type=product&id=" + page.productId
        return false
    } else if (page.type === "CATEGORY") {
        window.location.href = "index.html?type=category&id=" + page.categoryId
        return false
    }
})
window.instantsite.onTileLoaded
Ecwid Instant Site dynamically loads and unloads its sections depending on what customers currently see. This method allows you to call your JS code when a specific section (called "tile" in the function) is loaded.

Code example:

JavaScript

document.addEventListener("DOMContentLoaded", function() {
	window.instantsite.onTileLoaded.add(function (tile) {
		if (tile === 'tile-id') {
			document.getElementById("tile-id").innerHTML = '<iframe src=""></iframe>'; //add custom iframe
		}
	});
});
window.instantsite.onTileUnloaded
Ecwid Instant Site dynamically loads and unloads its sections depending on what customers currently see. This method allows you to call your JS code when a specific section (called "tile" in the function) is loaded.

JavaScript

document.addEventListener("DOMContentLoaded", function() {
	window.instantsite.onTileUnloaded.add(function (tile) {
		if (tile === 'tile-id') {
			document.getElementById("tile-id").innerHTML = ''; //remove Custom iframe
		}
	});
});