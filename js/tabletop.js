$(document).ready(function () {

    /*
     Navigation Controller
      */

    $('.navbar-nav a').click(function (e) {
        // Grab the page to show from the data attribute on the link
        var pageToNavigate = $(this).data('page');
w
        // Make the nav button active
        $('ul.navbar-nav > li.active').removeClass('active');
        $(this).parent().addClass('active');

        // Hide the active page
        $('.page-active').hide();

        // Show the requested page
        $('#page-' + pageToNavigate).show().addClass('page-active');

        // Prevent the browser from navigating anywhere
        e.preventDefault();
        return false;
    });

    /*
    Magic Draft Registration Controller
     */

    // Variable to hold request
    var request;

    // Function to close the alert
    function closeAlert(selector){
        $(selector)
            .hide()
            .html("")
            .removeClass("alert-success")
            .removeClass("alert-danger");
    }

    // Bind to the submit event of our form
    $("#magicRegSubmit").click(function (event) {
        // Setup some local variables
        var $form = $("#magicRegForm");

        // Validate the form first
        if ($form[0].checkValidity()){
            // Abort any pending request
            if (request) {
                request.abort();
            }

            // Let's select and cache all the fields
            var $inputs = $form.find("input, select, button, textarea");

            // Serialize the data in the form
            var serializedData = $form.serialize();

            // Let's disable the inputs for the duration of the Ajax request.
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            $inputs.prop("disabled", true);

            // Fire off the request to /form.php
            request = $.ajax({
                url: "https://script.google.com/macros/s/AKfycbwiXl45kuksLcDVdtxJkJVT0RicFZIscllYFOWbW47iAu_rLuU/exec&callback=?",
                type: "post",
                data: serializedData
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                // Show success alert
                $("#magicFormAlert")
                    .addClass("alert-success")
                    .html("<strong>Thanks!</strong> Your registration has been received. See you there!")
                    .show();

                // Close the alert in 5 seconds
                setTimeout(closeAlert("#magicFormAlert"), 5000);
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                // Show failure alert
                $("#magicFormAlert")
                    .addClass("alert-danger")
                    .html("<strong>Whoops!</strong> Something went wrong. Please try submitting again in a few minutes.")
                    .show();

                // Close the alert in 5 seconds
                setTimeout(closeAlert("#magicFormAlert"), 5000);

                // Log error to console
                console.log("An error occurred while trying to submit the form: " + textStatus, errorThrown);
            });

            // Callback handler that will be called regardless
            // if the request failed or succeeded
            request.always(function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            });
        } else {
            // Do a hacky workaround to get the browser to display the native validation messages
            $('<input type="submit">').hide().appendTo("#magicRegForm").click().remove();
        }
    });
});