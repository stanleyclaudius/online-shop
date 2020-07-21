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
	}
});