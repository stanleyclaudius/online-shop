<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dev Store | Checkout</title>
	<link rel="stylesheet" href="{{ asset('css') }}/main.css">
</head>
<body>

	<div class="shadow-xl py-5 mb-10">
		<div class="container mx-auto">
			<p class="text-2xl font-semibold">Dev Store | Checkout</p>
		</div>
	</div>

	<div class="container mx-auto grid grid-cols-3 gap-20">
		<div class="col-span-2">
			<form action="/checkout" method="post">
				@csrf
				<div class="grid grid-cols-2 gap-5">
					<div>
						@if($errors->has('name'))
							<small class="text-red-500">{{ $errors->first('name') }}</small>
						@else
							<label for="name" class="text-lg">Name</label>
						@endif
						<input type="text" name="name" id="name" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->name }}">
					</div>
					<div>
						@if($errors->has('phone'))
							<small class="text-red-500">{{ $errors->first('phone') }}</small>
						@else
							<label for="phone" class="text-lg">Phone</label>
						@endif
						<input type="number" name="phone" id="phone" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->phone }}">
					</div>
				</div>
				<div class="grid grid-cols-2 gap-5 mt-5">
					<div>
						@if($errors->has('country'))
							<small class="text-red-500">{{ $errors->first('country') }}</small>
						@else
							<label for="country" class="text-lg">Country</label>
						@endif
						<input type="text" name="country" id="country" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->country }}">
					</div>
					<div>
						@if($errors->has('province'))
							<small class="text-red-500">{{ $errors->first('province') }}</small>
						@else
							<label for="province" class="text-lg">Province</label>
						@endif
						<input type="text" name="province" id="province" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->province }}">
					</div>
				</div>
				<div class="grid grid-cols-1 gap-5 mt-5">
					<div>
						@if($errors->has('city'))
							<small class="text-red-500">{{ $errors->first('city') }}</small>
						@else
							<label for="city" class="text-lg">City</label>
						@endif
						<input type="text" name="city" id="city" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->city }}">
					</div>
				</div>
				<div class="grid grid-cols-1 gap-5 mt-5">
					<div>
						@if($errors->has('address'))
							<small class="text-red-500">{{ $errors->first('address') }}</small>
						@else
							<label for="address" class="text-lg">Address</label>
						@endif
						<textarea name="address" rows="4" id="address" class="rounded border mt-3 border-gray-500 w-full focus:shadow-outline focus:outline-none px-2">{{ auth()->user()->address }}</textarea>
					</div>
				</div>
				<input type="hidden" value="{{ $totalPrice }}" class="totalPriceHidden" name="initialtotalprice"> <!-- Constant value initial price after checkout -->
				<input type="hidden" class="discountValueHidden" name="finalResultHidden"> <!-- Price after discount -->
				<button type="submit" class="bg-gray-900 transition duration-150 ease-in-out hover:bg-gray-800 rounded px-3 py-2 text-white mt-4">Proceed</button>
			</form>
		</div>
		<div>
			@if($items->count() == 1)
				<p class="font-semibold text-lg uppercase">checkout item</p>
			@else
				<p class="font-semibold text-lg uppercase">checkout items</p>
			@endif
			<div class="border rounded border-gray-500 w-full mt-3">
				<ul>
					@foreach($items as $item)
						@php
							$price = number_format($item->total, 2, ',', '.');
						@endphp
						@if(!$loop->last)
							<li class="border-b border-gray-500 p-4 flex items-center">
								<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="" width="80">
								<div class="ml-4">
									<p class="text-lg">{{ $item->product->product_name }}</p>
									<p>QTY : {{ $item->qty }}</p>
									@if($item->total == null)
										<p class="font-semibold mt-2">@php echo "Rp." . number_format($item->product->product_price, 2, ',', '.') @endphp</p>
									@else
										<p class="font-semibold mt-2">{{ 'Rp.' . $price }}</p>
									@endif
								</div>
							</li>
						@endif
						@if($loop->last)
							<li class="p-4 flex items-center">
								<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="" width="80">
								<div class="ml-4">
									<p class="text-lg">{{ $item->product->product_name }}</p>
									<p>QTY : {{ $item->qty }}</p>
									@if($item->total == null)
										<p class="font-semibold mt-2">@php echo "Rp." . number_format($item->product->product_price, 2, ',', '.') @endphp</p>
									@else
										<p class="font-semibold mt-2">{{ 'Rp.' . $price }}</p>
									@endif
								</div>
							</li>
						@endif
					@endforeach
				</ul>
			</div>
			<p class="text-lg font-semibold uppercase mt-8">discount voucher</p>
			<div class="border rounded border-gray-500 w-full mt-3">
				<div class="grid grid-cols-3 p-4 gap-5">
					<div class="col-span-2">
						<input type="text" class="uppercase h-10 rounded px-2 border border-gray-500 w-full discount-code">
					</div>
					<button class="discount-check bg-gray-900 transition duration-150 ease-in-out hover:bg-gray-800 text-white rounded px-2 py-2">Check</button>
				</div>
			</div>
			<div class="border border-gray-500 rounded mt-8">
				<ul>
					<li class="p-4 border-b border-gray-500 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg">subtotal</p>
						<p class="text-lg">@php echo "Rp." . number_format($totalPrice, 2, ',', '.') @endphp</p>
					</li>
					<li class="p-4 border-b border-gray-500 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg">DISCOUNT</p>
						<p class="text-lg discount-initial">0</p>
					</li>
					<li class="p-4 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg">TOTAL</p>
						<p class="text-lg discount-initial totalAfterDiscount">@php echo "Rp." . number_format($totalPrice, 2, ',', '.') @endphp</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
	
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
	$(document).ready(function() {
		$('.discount-check').click(function() {
			let discountCode = $('.discount-code').val();
			$.ajax({
				url: '/checkout/discount',
				type: 'get',
				data: {
					code : discountCode
				},
				dataType: 'json',
				success: function(data) {
					if (data.status === 'applied') {
						let totalPrice = $('.totalPriceHidden').val();
						let discountValue = data.value;
						let finalPrice = totalPrice - (discountValue/100*totalPrice);
						$('.discountValueHidden').val(finalPrice);
						$('.discount-initial').text('Rp. ' + (discountValue/100*totalPrice) + ',00');
						$('.totalAfterDiscount').text('Rp.' + finalPrice + ',00');
						swal.fire({
							title: 'Success',
							text: 'Discount coupon has been applied!',
							icon: 'success'
						});
					} else {
						$('.discountValueHidden').val($('.totalPriceHidden').val());
						$('.discount-initial').text('0');
						$('.totalAfterDiscount').text('Rp.' + $('.totalPriceHidden').val() + ',00');
						swal.fire({
							title: 'Failed',
							text: 'Discount coupon unavailable!',
							icon: 'error'
						});
					}
				}
			});
		});
	});
</script>
</body>
</html>