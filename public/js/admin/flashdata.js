$(document).ready(function() {
	let flashdata = $('.flashdata').data('flash');
	if (flashdata === 'profile updated') {
		swal.fire({
			title: 'Success',
			text: 'Your profile has been updated!',
			icon: 'success'
		});
	} else if (flashdata === 'password changed') {
		swal.fire({
			title: 'Success',
			text: 'Your password has been changed!',
			icon: 'success'
		});
	} else if (flashdata === 'wrong cur pass') {
		swal.fire({
			title: 'Error',
			text: 'Your current password not match!',
			icon: 'error'
		})
	} else if (flashdata === 'portfolio added') {
		swal.fire({
			title: 'Success',
			text: 'Portfolio has been added!',
			icon: 'success'
		});
	} else if (flashdata === 'portfolio deleted') {
		swal.fire({
			title: 'success',
			text: 'Portfolio has been deleted',
			icon: 'success'
		})
	} else if (flashdata === 'portfolio updated') {
		swal.fire({
			title: 'success',
			text: 'Portfolio has been updated',
			icon: 'success'
		});
	}
});