let flashdata = $('.flashdata').data('flash');

if (flashdata === 'no email') {
	swal.fire({
		title: 'Error',
		text: 'Email not found!',
		icon: 'error'
	});
} else if (flashdata === 'link send') {
	swal.fire({
		title: 'Success',
		text: 'We have sent you a verification button at your email, please check it!',
		icon: 'success'
	});
} else if (flashdata === 'no token') {
	swal.fire({
		title: 'Error',
		text: 'It seems that you never forget your password!',
		icon: 'error'
	});
}