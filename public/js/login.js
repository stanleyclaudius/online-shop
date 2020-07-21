let flashdata = $('.flashdata').data('flash');
if (flashdata === 'true verify code') {
	swal.fire({
		title: 'Success',
		text: 'Email has been verified',
		icon: 'success'
	});
} else if (flashdata === 'logout') {
	swal.fire({
		title: 'Success',
		text: 'You have been logout!',
		icon: 'success'
	});
} else if (flashdata === 'wrong user') {
	swal.fire({
		title: 'Failed',
		text: 'Your credential can\'t be found!',
		icon: 'error'
	});
} else if (flashdata === 'password changed') {
	swal.fire({
		title: 'Success',
		text: 'Your password has been changed!',
		icon: 'success'
	});
}