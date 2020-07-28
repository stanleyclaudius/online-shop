let flashdata = $('.flashdata').data('flash');
if (flashdata === 'review added') {
	swal.fire({
		title: 'Success',
		text: 'Thanks for your review on our products! Hope you love it.',
		icon: 'success'
	});
}

$('.rating-section div').click(function() {
	$('.rating-section div').removeClass('active');
	$(this).addClass('active');
});

$('.open-review-box').click(function() {
	$('.review-box').slideToggle();
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('.addtocart-btn').click(function() {
	let productID = $(this).data('product');
	let userID = $(this).data('id');
	$.ajax({
		url: '/cart/add',
		type: 'post',
		dataType: 'json',
		data: {
			productID: productID,
			userID: userID
		},
		success: function(data) {
			if (data === 'zero val') {
				document.location.href="/detail/" + productID;
			} else if (data === 'add counter') {
				$('.cart-counter').text(parseInt($('.cart-counter').text()) + 1);
			}
			swal.fire({
				title: 'Success',
				text: 'Item added to cart!',
				icon: 'success'
			});
		}
	});
});