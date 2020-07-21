$('.inputs').keyup(function() {
	if (this.value.length == this.maxLength) {
		var $next = $(this).next('.inputs');
		if ($next.length)
		  	$(this).next('.inputs').focus();
		else
			$(this).blur();
	}
});

$('.verify-btn').click(function() {
	const email = $(this).data('email');

	const input1 = $('.input-1').val();
	const input2 = $('.input-2').val();
	const input3 = $('.input-3').val();
	const input4 = $('.input-4').val();
	const input5 = $('.input-5').val();

	if (input1 == "") {
		swal.fire({
			title: 'Failed',
			text: 'Field may not be empty!',
			icon: 'error'
		});
	} else if (input2 == "") {
		swal.fire({
			title: 'Failed',
			text: 'Field may not be empty!',
			icon: 'error'
		});
	} else if (input3 == "") {
		swal.fire({
			title: 'Failed',
			text: 'Field may not be empty!',
			icon: 'error'
		});
	} else if (input4 == "") {
		swal.fire({
			title: 'Failed',
			text: 'Field may not be empty!',
			icon: 'error'
		});
	} else if (input5 == "") {
		swal.fire({
			title: 'Failed',
			text: 'Field may not be empty!',
			icon: 'error'
		});
	}
});

let flashdata = $('.flashdata').data('flash');
if (flashdata === 'false verify code') {
	swal.fire({
		title: 'Failed',
		text: 'Wrong verification code!',
		icon: 'error'
	});
}