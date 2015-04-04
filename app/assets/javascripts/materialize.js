// Responsive design
$(function (){
	$(".button-collapse").sideNav();
});

// Smooth Scrolling
// Subtracted 64px to make up for the width of the fixed nav bar
$('a[href*="#"]').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 64
    }, 400);
    return false;
});