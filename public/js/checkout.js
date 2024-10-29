// Intercept form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Submit the form data using JavaScript
    submitForm();
});

// handle when submitting using AJAX
function submitForm() {
    // get the checkout form data
    var formData = new FormData(document.getElementById('checkout-form'));
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // if the request was successful
            if (xhr.status === 200) {
                // redirect to success page
                window.location.href = "checkoutconfirm.html";
            } else {
                //handle error
                console.error('Error submitting form:', xhr.statusText);
            }
        }
    };
    // set post to submit web3form
    xhr.open('POST', 'https://api.web3forms.com/submit');
    xhr.send(formData);
}
