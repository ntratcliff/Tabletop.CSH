$(document).ready(function(){
    // Navigation Controller
    $('a.nav-button').click(function(e){
        // Grab the page to show from the data attribute on the link
        var pageToNavigate = $(this).data('page');

        // Make the nav button active
        $('ul.navbar-nav > li.active').removeClass('active');
        $(this).parent().addClass('active');

        // Hide the active page
        $('.page-active').hide();

        // Show the requested page
        $('#page-'+pageToNavigate).show().addClass('page-active');

        // Prevent the browser from navigating anywhere
        e.preventDefault();
        return false;
    });
});