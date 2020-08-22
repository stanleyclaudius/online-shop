@extends('template/main')

@section('meta')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('title', 'Dev Store | Shopping Cart')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('cart') }}"></div>
<div class="container mx-auto mt-16 px-6 sm:px-6 md:px-6 lg:px-0">
	<p class="text-3xl text-center text-white">Shoppping Cart</p>
	@if ($items->count() == 0)
	<div class="bg-red-600 flex items-center text-lg py-3 w-full rounded text-white justify-center mt-6 px-3">Your shopping cart is still empty, purchase some item to fill it up.</div>
	@else
	<div style="overflow-y: auto;" class="info-scrollbar">
		<table cellspacing="0" cellpadding="10" class="w-full border border-gray-700 mt-8 mb-8">
			<thead>
				<tr>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">No</th>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">Product Image</th>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">Product Name</th>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">QTY</th>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">Product Price</th>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">Total</th>
					<th class="bg-gray-800 text-white border border-gray-700 uppercase">Action</th>
				</tr>
			</thead>
			<tbody>
				@php 
					$i = 1;
				@endphp
				@foreach($items as $item)
				@php
	                $price = number_format($item->product->product_price, 2, ',', '.');
	            @endphp
				<tr class="text-center">
					<td class="border border-gray-700 text-white">{{ $i }}</td>
					<td class="border border-gray-700">
						<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="" width="80" class="mx-auto">
					</td>
					<td class="border border-gray-700 text-white">{{ $item->product->product_name }}</td>
					<td class="border border-gray-700">
						<input type="number" data-id="{{ $item->id }}" class="qty-count border border-gray-500 w-12 h-12 text-center focus:shadow-outline focus:outline-none text-xl" min="1" value="{{ $item->qty }}">
					</td>
					<td class="border border-gray-700 text-white">{{ 'Rp.' . $price }}</td>
					@if($item->qty == 1)
						@php
							$single_total = 1 * $item->product->product_price;
							$single_price = number_format($single_total, 2, ',', '.');
						@endphp
						<td class="total_val_{{ $item->id }} border border-gray-700 text-white">{{ 'Rp.' . $single_price }}</td>
					@else
						@php
							$multiple_price = number_format($item->total, '2', ',', '.');
						@endphp
						<td class="total_val_{{ $item->id }} border border-gray-700 text-white">{{ 'Rp.' . $multiple_price }}</td>
					@endif
					<td class="border border-gray-700">
						<a href="javascript:void(0)" data-id="{{ $item->id }}" class="delete-btn bg-red-600 text-white px-3 py-2 rounded transition duration-150 ease-in-out hover:bg-red-700">DELETE</a>
					</td>
				</tr>
				@php
					$i++;
				@endphp
				@endforeach
			</tbody>
		</table>
	</div>
	<div class="w-full flex justify-end mb-20">
		<a href="/checkout" class="bg-gray-800 px-3 py-2 rounded text-white transition duration-150 ease-in-out hover:bg-gray-700">Checkout</a>
	</div>
	@endif
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
	let flashdata = $('.flashdata').data('flash');
	if (flashdata === 'item deleted') {
		swal.fire({
			title: 'Success',
			text: 'Item has been deleted!',
			icon: 'success'
		});
	}

	$('.delete-btn').click(function() {
        let dataID = $(this).data('id');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                document.location.href="/cart/delete/" + dataID;
            }
        })
    });

    $.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});

    $('.qty-count').on('input', function() {
    	let itemID = $(this).data('id');
    	let curVal = this.value;
    	$.ajax({
    		url: '/cart/update/' + itemID,
    		type: 'post',
    		data: {
    			qty: curVal
    		},
    		success: function(data) {
    			data = data.replace(/"/g, "");
    			$('.total_val_'+itemID).html(data);
    		}
    	});
    });
</script>
@endsection