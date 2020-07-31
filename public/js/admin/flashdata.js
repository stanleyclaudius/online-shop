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
	} else if (flashdata === 'discount added') {
		swal.fire({
			title: 'Success',
			text: 'New discount voucher has been added!',
			icon: 'success'
		});
	} else if (flashdata === 'discount deleted') {
		swal.fire({
			title: 'Success',
			text: 'Discount voucher has been removed!',
			icon: 'success'
		});
	} else if (flashdata === 'order verified') {
		swal.fire({
			title: 'Success',
			text: 'Order has been verified!',
			icon: 'success',
		});
	} else if (flashdata === 'invoice unavailable') {
		swal.fire({
			title: 'Error',
			text: 'Invoice not found!',
			icon: 'error',
		});
	} else if (flashdata === 'order deleted') {
		swal.fire({
			title: 'Success',
			text: 'Order has been deleted!',
			icon: 'success'
		})
	} else if (flashdata === 'order done') {
		swal.fire({
			title: 'Success',
			text: 'Order done!',
			icon: 'success'
		});
	} else if (flashdata === 'receipt null') {
		swal.fire({
			title: 'Error',
			text: 'Shipping tracker ID haven\'t been post to user status!',
			icon: 'error'
		});
	} else if (flashdata === 'receipt posted') {
		swal.fire({
			title: 'Success',
			text: 'Shipping tracker ID has been posted to user status!',
			icon: 'success'
		});
	} else if (flashdata === 'payment unverified') {
		swal.fire({
			title: 'Error',
			text: 'Payment has not been verified!',
			icon: 'error'
		});
	} else if (flashdata === 'done before') {
		swal.fire({
			title: 'Warning',
			text: 'This order has been done before!',
			icon: 'warning'
		});
	} else if (flashdata === 'sendnewsletter') {
		swal.fire({
			title: 'Success',
			text: 'Newsletter has been sent!',
			icon: 'success'
		});
	} else if (flashdata === 'newsletter deleted') {
		swal.fire({
			title: 'Success',
			text: 'Newsletter has been deleted!',
			icon: 'success'
		});
	}
});