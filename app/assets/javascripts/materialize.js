$(function (){
	$(".button-collapse").sideNav();
});

// Smooth Scrolling
$('a[href*="#"]').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 64
    }, 400);
    return false;
});