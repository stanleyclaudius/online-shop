$('.rating-section div').click(function() {
	$('.rating-section div').removeClass('active');
	$(this).addClass('active');
});

$('.open-review-box').click(function() {
	$('.review-box').slideToggle();
});