var windowHeight;
var quotes;

$(document).ready(function () {
    windowHeight = $(window).height();
    $('.panning').css('height', windowHeight);
});

var fd = 'method=getQuote&format=jsonp&lang=en&jsonp=callback'
$.ajax({
    url: "http://api.forismatic.com/api/1.0/",
    jsonp: 'callback',
    dataType:'jsonp',
    data: fd
});
var callback = function (response) {
    $('.quoteText').text("\""+response.quoteText+"\"");
}

var $example = $('#panning .example');
var frame = $example.find('.frame')[0];
var offset = $example.offset();
var motio = new Motio(frame, {
	fps: 48,
});

// Play/Pause when mouse enters/leaves the frame
$example.on('mouseenter mouseleave', function (event) {
	if (event.type === 'mouseenter') {
		motio.play();
	} else {
		motio.pause();
	}
});

// Update the animation speed & direction based on a cursor position
$example.on('mousemove', function (event) {
	motio.set('speedX', event.pageX - offset.left - motio.width / 2);
	motio.set('speedY', event.pageY - offset.top - motio.height / 2);
});

$(window).resize(function () {
    windowHeight = $(window).height();
    $('.panning').css('height', windowHeight);
})
// console.log($(window).width());