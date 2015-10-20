$(document).ready(function () {

    /*
     Navigation Controller
     */

    $('.navbar-nav a').click(function (e) {
        // Grab the page to show from the data attribute on the link
        var pageToNavigate = $(this).data('page');

        // Make the nav button active
        $('ul.navbar-nav > li.active').removeClass('active');
        $(this).parent().addClass('active');

        // Hide the active page
        $('.page-active').hide();

        // Show the requested page
        $('#page-' + pageToNavigate).show().addClass('page-active');

        // Collapse the navbar
        $("#navbar").collapse('hide');

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
    function closeAlert(selector) {
        $(selector)
            .hide()
            .html("")
            .removeClass("alert-success")
            .removeClass("alert-danger");
    }

    // Bind to the submit event of our form
    $("#magicRegSubmit").click(function (event) {
        // Setup some local variables
        var form = $("#magicRegForm");

        // Validate the form first
        if (!form[0].checkValidity()) {
            // Do a hacky workaround to get the browser to display the native validation messages
            $('<input type="submit">').hide().appendTo("#magicRegForm").click().remove();
        } else {
            // Abort any pending request
            if (request) {
                request.abort();
            }

            // Select and cache all the fields
            var inputs = form.find("input");

            // Disable the inputs for the duration of the Ajax request.
            inputs.prop("disabled", true);

            // Fire off the request to ajax.php
            request = $.ajax({
                url: "ajax.php",
                type: "post",
                data: {
                    'entry.1829442147': $("input#name").val(),
                    'entry.253069850': $("input#email").val(),
                    'entry.1939605299': $("input#phone").val()
                },
                success: function (data) {
                    // Hide the form and modal footer
                    $("#magicFormContainer").hide();
                    $("#magicFormFooter").hide();

                    // Clear the inputs
                    $("input#name").val('');
                    $("input#email").val('');
                    $("input#phone").val('');

                    // Show success alert
                    $("#magicFormAlert").addClass("alert-success").html("<strong>Thanks!</strong> Your registration has been received. See you there!").show();

                    // Dismiss the alert and modal after 5 seconds
                    setTimeout(function(){
                        closeAlert("#magicFormAlert");
                        $("#magicModal").modal('hide');
                    }, 5000);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Show failure alert
                    $("#magicFormAlert").addClass("alert-danger").html("<strong>Whoops!</strong> Something went wrong. Please try submitting again in a few minutes.").show();

                    // Dismiss the alert after 5 seconds
                    setTimeout(function(){
                        closeAlert("#magicFormAlert");
                    }, 5000);

                    // Log error to console
                    console.log("An error occurred while trying to submit the form: " + textStatus, errorThrown);
                },
                complete: function () {
                    // Re-enable the inputs
                    inputs.prop("disabled", false);
                }
            });
        }
    });
});