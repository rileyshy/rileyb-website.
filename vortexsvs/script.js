const CLIENT_ID = 'AQ3XkanIb_lOO59v6Q68RE0AedWK5xOuYfrczvPaM3AAtzy979hB9NcshQvXFa_Fs6Ha3tAbX2EKwGvt';
const RETURN_URL = 'https://yourdomain.com/confirmation.html'; // URL where users are redirected after payment

// Helper function to render PayPal buttons for a product
function renderPayPalButtons(containerId, price, description, product) {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price,
                        currency_code: 'GBP'
                    },
                    description: description
                }],
                application_context: {
                    return_url: `${RETURN_URL}?product=${product}&token=${generateToken()}`,
                    cancel_url: window.location.href
                }
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Redirect to confirmation page
                window.location.href = `${RETURN_URL}?product=${product}&token=${generateToken()}`;
            });
        }
    }).render(`#${containerId}`);
}

// Render PayPal buttons for each product
renderPayPalButtons('paypal-button-container-loading-screen1', '2.00', 'Loading Screen 1', 'loading-screen1');
renderPayPalButtons('paypal-button-container-loading-screen2', '5.00', 'Loading Screen 2', 'loading-screen2');
renderPayPalButtons('paypal-button-container-script1', '15.00', 'Script 1', 'script1');
renderPayPalButtons('paypal-button-container-script2', '30.00', 'Script 2', 'script2');
renderPayPalButtons('paypal-button-container-mlo1', '5.00', 'MLO 1', 'mlo1');
renderPayPalButtons('paypal-button-container-mlo2', '2.00', 'MLO 2', 'mlo2');
renderPayPalButtons('paypal-button-container-logo1', '5.00', 'Logo 1', 'logo1');
renderPayPalButtons('paypal-button-container-logo2', '2.00', 'Logo 2', 'logo2');
renderPayPalButtons('paypal-button-container-logo3', '2.00', 'Logo 3', 'logo3');
renderPayPalButtons('paypal-button-container-logo4', '2.00', 'Logo 4', 'logo4');
renderPayPalButtons('paypal-button-container-logo5', '3.00', 'Logo 5', 'logo5');
renderPayPalButtons('paypal-button-container-logo6', '3.00', 'Logo 6', 'logo6');
renderPayPalButtons('paypal-button-container-logo7', '2.00', 'Logo 7', 'logo7');
renderPayPalButtons('paypal-button-container-banner1', '12.00', 'Banner 1', 'banner1');
renderPayPalButtons('paypal-button-container-banner2', '18.00', 'Banner 2', 'banner2');
renderPayPalButtons('paypal-button-container-more1', '25.00', 'More Product 1', 'more1');
renderPayPalButtons('paypal-button-container-more2', '35.00', 'More Product 2', 'more2');

// Generate a unique token for each transaction
function generateToken() {
    return Math.random().toString(36).substr(2, 9);
}
