document.getElementById("request-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Show success message
    document.getElementById("successMessage").style.display = "block";
    
    // Hide success message after 2 seconds
    setTimeout(function() {
        document.getElementById("successMessage").style.display = "none";
    }, 2000);
});