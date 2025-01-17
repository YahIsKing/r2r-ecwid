# Ecwid Shop Customizations

This repository contains custom JavaScript and CSS code for enhancing and customizing an Ecwid-powered e-commerce store. The code here is specifically designed to extend Ecwid's functionality and appearance beyond its default capabilities.

## Repository Purpose

This codebase serves as a centralized location for all custom front-end modifications to our Ecwid shop. The code here is intended to be:
- Injected into the Ecwid store via the HTML/JS code widget
- Loaded as external resources in the store's configuration
- Referenced in custom theme modifications

## Development Context

### Primary Goals
1. Enhance the user interface and experience of the Ecwid store
2. Implement custom functionality not available in Ecwid's default feature set
3. Maintain consistency with Ecwid's core functionality while extending it

### Technical Boundaries
- Focus exclusively on client-side modifications (JavaScript and CSS)
- Work within Ecwid's available hooks and APIs
- Avoid modifications that could break during Ecwid platform updates

## Ecwid Development Guidelines

### JavaScript Development
When developing JavaScript customizations:
- Use Ecwid's JavaScript SDK and Public API
- Listen for Ecwid's page load events (`Ecwid.OnPageLoaded`)
- Handle dynamic content loading and store state changes
- Ensure compatibility with Ecwid's single-page application architecture
- Test modifications across different store pages and states

### CSS Customizations
When writing CSS:
- Use Ecwid's class naming conventions for consistency
- Implement responsive designs that work with Ecwid's layout
- Consider specificity to avoid conflicts with Ecwid's default styles
- Test modifications across different screen sizes and devices

## Common Customization Areas

### Product Display
- Custom product layouts
- Enhanced image galleries
- Additional product information displays
- Modified add-to-cart functionality

### Shopping Cart
- Cart widget modifications
- Custom cart page layouts
- Enhanced checkout process flows
- Additional cart functionality

### Category Pages
- Modified category layouts
- Custom filtering systems
- Enhanced sorting options
- Category-specific styling

### Store Navigation
- Custom menu systems
- Enhanced search functionality
- Modified breadcrumb navigation
- Custom mobile navigation

## Testing Requirements

All modifications should be tested for:
1. Compatibility with Ecwid's core functionality
2. Performance impact on page load times
3. Mobile responsiveness
4. Cross-browser compatibility
5. Graceful degradation when JavaScript is disabled

## Development Best Practices

1. **Code Organization**
   - Separate CSS and JavaScript into logical modules
   - Use clear, descriptive file names
   - Comment code thoroughly, especially for complex modifications

2. **Performance**
   - Minimize DOM manipulations
   - Optimize asset loading
   - Use event delegation where appropriate
   - Implement lazy loading when possible

3. **Maintenance**
   - Document all customizations
   - Version control significant changes
   - Keep backup copies of working code
   - Monitor Ecwid platform updates for potential conflicts

## Available Ecwid Hooks and Events

Common hooks and events to use:
```javascript
Ecwid.OnPageLoaded
Ecwid.OnCartChanged
Ecwid.OnProductOptionsChanged
Ecwid.OnSetProfile
Ecwid.OnPageSwitch
Ecwid.OnSetStoreCategoryPage
Ecwid.OnSetStoreFrontPage
```

## Debugging Tools

Useful tools for development:
- Ecwid's developer console
- Browser developer tools
- CSS specificity calculator
- JavaScript performance profilers

## Security Considerations

1. Avoid storing sensitive information in client-side code
2. Validate all user inputs
3. Use HTTPS for external resources
4. Follow content security policy guidelines
5. Implement XSS prevention measures

This repository should help maintain a structured approach to Ecwid store customizations while ensuring compatibility and performance.