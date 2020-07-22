$(document).ready(function() {
	let flashdata = $('.flashdata').data('flash');
	if (flashdata === 'category added') {
		swal.fire({
			title: 'Success',
			text: 'New product category has been added!',
			icon: 'success'
		});
	} else if (flashdata === 'category deleted') {
		swal.fire({
			title: 'Success',
			text: 'Product category has been deleted!',
			icon: 'success'
		});
	} else if (flashdata === 'category updated') {
		swal.fire({
			title: 'Success',
			text: 'Product category has been updated!',
			icon: 'success'
		});
	} else if (flashdata === 'product added') {
		swal.fire({
			title: 'Success',
			text: 'New product has been added!',
			icon: 'success'
		});
	} else if (flashdata === 'product deleted') {
		swal.fire({
			title: 'Success',
			text: 'Product has been deleted!',
			icon: 'success'
		});
	} else if (flashdata === 'product updated') {
		swal.fire({
			title: 'Success',
			text: 'Product has been updated!',
			icon: 'success'
		});
	} else if (flashdata === 'profile changed') {
		swal.fire({
			title: 'Success',
			text: 'Profile has been changed!',
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
			title: 'Failed',
			text: 'Wrong current password!',
			icon: 'error'
		});
	} else if (flashdata === 'signature added') {
		swal.fire({
			title: 'Success',
			text: 'New signature product has been added!',
			icon: 'success'
		});
	} else if (flashdata === 'signature deleted') {
		swal.fire({
			title: 'Success',
			text: 'Signature product has been deleted!',
			icon: 'success'
		});
	}
});