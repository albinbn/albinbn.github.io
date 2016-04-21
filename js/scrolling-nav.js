//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$.getJSON('http://ipinfo.io', function (data) {
  console.log(data);
  console.log("YO");
   $("#ip").append("Some people wants to hide this but it's pretty easy to get... " + data.ip + " Yeah, that's your IP."); 
    $("#region").append("How's the weather in " + data.region + "?");
})
