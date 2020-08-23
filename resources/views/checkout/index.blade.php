<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dev Store | Checkout</title>
	<link rel="icon" type="image/png" href="{{ asset('logo') }}/icon.png" sizes="50x80" />
	<link rel="stylesheet" href="{{ asset('css') }}/main.css">
</head>
<body class="bg-gray-900">

	<div class="border-b border-gray-700 py-5 mb-10 px-6 sm:px-6 md:px-6 lg:px-0">
		<div class="container mx-auto flex items-center justify-between">
			<a href="/" class="text-2xl text-white font-semibold">Dev Store</a>
			<p class="text-2xl text-white font-semibold">Checkout</p>
		</div>
	</div>

	<div class="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-12 md:gap-12 lg:gap-20">
		<div class="px-6 sm:px-6 md:px-6 lg:px-0 block sm:block md:block lg:hidden">
			@if($items->count() == 1)
				<p class="font-semibold text-white text-lg uppercase">checkout item</p>
			@else
				<p class="font-semibold text-white text-lg uppercase">checkout items</p>
			@endif
			<div class="border rounded border-gray-700 w-full mt-3">
				<ul>
					@foreach($items as $item)
						@php
							$price = number_format($item->total, 2, ',', '.');
						@endphp
						@if(!$loop->last)
							<li class="border-b border-gray-500 p-4 flex items-center">
								<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="Dev Store" width="80">
								<div class="ml-4">
									<p class="text-lg text-white">{{ $item->product->product_name }}</p>
									<p class="text-white">QTY : {{ $item->qty }}</p>
									@if($item->total == null)
										<p class="font-semibold mt-2 text-white">@php echo "Rp." . number_format($item->product->product_price, 2, ',', '.') @endphp</p>
									@else
										<p class="font-semibold mt-2 text-white">{{ 'Rp.' . $price }}</p>
									@endif
								</div>
							</li>
						@endif
						@if($loop->last)
							<li class="p-4 flex items-center">
								<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="Dev Store" width="80">
								<div class="ml-4">
									<p class="text-lg text-white">{{ $item->product->product_name }}</p>
									<p class="text-white">QTY : {{ $item->qty }}</p>
									@if($item->total == null)
										<p class="font-semibold mt-2 text-white">@php echo "Rp." . number_format($item->product->product_price, 2, ',', '.') @endphp</p>
									@else
										<p class="font-semibold mt-2 text-white">{{ 'Rp.' . $price }}</p>
									@endif
								</div>
							</li>
						@endif
					@endforeach
				</ul>
			</div>
			<p class="text-lg font-semibold uppercase mt-5 text-white">discount voucher</p>
			<div class="border rounded border-gray-700 w-full mt-3">
				<div class="grid grid-cols-3 p-4 gap-5">
					<div class="col-span-2">
						<input type="text" class="uppercase h-10 rounded px-2 border border-gray-500 w-full discount-code">
					</div>
					<button class="discount-check bg-gray-800 transition duration-150 ease-in-out hover:bg-gray-700 text-white rounded px-2 py-2">Check</button>
				</div>
			</div>
			<div class="border border-gray-700 rounded mt-6">
				<ul>
					<li class="p-4 border-b border-gray-700 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg text-white">subtotal</p>
						<p class="text-lg text-white">@php echo "Rp." . number_format($totalPrice, 2, ',', '.') @endphp</p>
					</li>
					<li class="p-4 border-b border-gray-700 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg text-white">DISCOUNT</p>
						<p class="text-lg discount-initial text-white">Rp.0,00</p>
					</li>
					<li class="p-4 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg text-white">TOTAL</p>
						<p class="text-lg discount-initial totalAfterDiscount text-white">@php echo "Rp." . number_format($totalPrice, 2, ',', '.') @endphp</p>
					</li>
				</ul>
			</div>
		</div>

		<div class="col-span-0 sm:col-span-0 md:col-span-0 lg:col-span-2 px-6 sm:px-6 md:px-6 lg:px-0 mb-10 sm:mb-10 md:mb-10 lg:mb-0">
			<form action="/checkout" method="post">
				@csrf
				<div class="grid grid-cols-2 gap-5">
					<div>
						@if($errors->has('name'))
							<small class="text-red-500">{{ $errors->first('name') }}</small>
						@else
							<label for="name" class="text-lg text-white">Name</label>
						@endif
						<input type="text" name="name" id="name" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->name }}">
					</div>
					<div>
						@if($errors->has('phone'))
							<small class="text-red-500">{{ $errors->first('phone') }}</small>
						@else
							<label for="phone" class="text-lg text-white">Phone</label>
						@endif
						<input type="number" name="phone" id="phone" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->phone }}">
					</div>
				</div>
				<div class="grid grid-cols-2 gap-5 mt-5">
					<div>
						@if($errors->has('country'))
							<small class="text-red-500">{{ $errors->first('country') }}</small>
						@else
							<label for="country" class="text-lg text-white">Country</label>
						@endif
						<input type="text" name="country" id="country" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->country }}">
					</div>
					<div>
						@if($errors->has('province'))
							<small class="text-red-500">{{ $errors->first('province') }}</small>
						@else
							<label for="province" class="text-lg text-white">Province</label>
						@endif
						<input type="text" name="province" id="province" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->province }}">
					</div>
				</div>
				<div class="grid grid-cols-1 gap-5 mt-5">
					<div>
						@if($errors->has('city'))
							<small class="text-red-500">{{ $errors->first('city') }}</small>
						@else
							<label for="city" class="text-lg text-white">City</label>
						@endif
						<input type="text" name="city" id="city" class="rounded border mt-3 border-gray-500 w-full h-10 focus:shadow-outline focus:outline-none px-2" value="{{ auth()->user()->city }}">
					</div>
				</div>
				<div class="grid grid-cols-1 gap-5 mt-5">
					<div>
						@if($errors->has('address'))
							<small class="text-red-500">{{ $errors->first('address') }}</small>
						@else
							<label for="address" class="text-lg text-white">Address</label>
						@endif
						<textarea name="address" rows="4" id="address" class="rounded border mt-3 border-gray-500 w-full focus:shadow-outline focus:outline-none px-2">{{ auth()->user()->address }}</textarea>
					</div>
				</div>
				<input type="hidden" value="{{ $totalPrice }}" class="totalPriceHidden" name="initialtotalprice"> <!-- Constant value initial price after checkout -->
				<input type="hidden" class="discountValueHidden" name="finalResultHidden"> <!-- Price after discount -->
				<button type="submit" class="bg-gray-800 transition duration-150 ease-in-out hover:bg-gray-700 rounded px-3 py-2 text-white mt-4">Proceed</button>
			</form>
		</div>
		<!-- DESKTOP VERSION -->
		<div class="px-6 sm:px-6 md:px-6 lg:px-0 mb-10 hidden sm:hidden md:hidden lg:block">
			@if($items->count() == 1)
				<p class="font-semibold text-white text-lg uppercase">checkout item</p>
			@else
				<p class="font-semibold text-white text-lg uppercase">checkout items</p>
			@endif
			<div class="border rounded border-gray-700 w-full mt-3">
				<ul>
					@foreach($items as $item)
						@php
							$price = number_format($item->total, 2, ',', '.');
						@endphp
						@if(!$loop->last)
							<li class="border-b border-gray-500 p-4 flex items-center">
								<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="Dev Store" width="80">
								<div class="ml-4">
									<p class="text-lg text-white">{{ $item->product->product_name }}</p>
									<p class="text-white">QTY : {{ $item->qty }}</p>
									@if($item->total == null)
										<p class="font-semibold mt-2 text-white">@php echo "Rp." . number_format($item->product->product_price, 2, ',', '.') @endphp</p>
									@else
										<p class="font-semibold mt-2 text-white">{{ 'Rp.' . $price }}</p>
									@endif
								</div>
							</li>
						@endif
						@if($loop->last)
							<li class="p-4 flex items-center">
								<img src="{{ asset('img') }}/products/{{ $item->product->product_image }}" alt="Dev Store" width="80">
								<div class="ml-4">
									<p class="text-lg text-white">{{ $item->product->product_name }}</p>
									<p class="text-white">QTY : {{ $item->qty }}</p>
									@if($item->total == null)
										<p class="font-semibold mt-2 text-white">@php echo "Rp." . number_format($item->product->product_price, 2, ',', '.') @endphp</p>
									@else
										<p class="font-semibold mt-2 text-white">{{ 'Rp.' . $price }}</p>
									@endif
								</div>
							</li>
						@endif
					@endforeach
				</ul>
			</div>
			<p class="text-lg font-semibold uppercase mt-5 text-white">discount voucher</p>
			<div class="border rounded border-gray-700 w-full mt-3">
				<div class="grid grid-cols-3 p-4 gap-5">
					<div class="col-span-2">
						<input type="text" class="uppercase h-10 rounded px-2 border border-gray-500 w-full discount-code">
					</div>
					<button class="discount-check bg-gray-800 transition duration-150 ease-in-out hover:bg-gray-700 text-white rounded px-2 py-2">Check</button>
				</div>
			</div>
			<div class="border border-gray-700 rounded mt-6">
				<ul>
					<li class="p-4 border-b border-gray-700 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg text-white">subtotal</p>
						<p class="text-lg text-white">@php echo "Rp." . number_format($totalPrice, 2, ',', '.') @endphp</p>
					</li>
					<li class="p-4 border-b border-gray-700 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg text-white">DISCOUNT</p>
						<p class="text-lg discount-initial text-white">Rp.0,00</p>
					</li>
					<li class="p-4 flex items-center justify-between">
						<p class="font-semibold uppercase text-lg text-white">TOTAL</p>
						<p class="text-lg discount-initial totalAfterDiscount text-white">@php echo "Rp." . number_format($totalPrice, 2, ',', '.') @endphp</p>
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
						$('.discount-initial').text('Rp.' + (discountValue/100*totalPrice) + ',00');
						$('.totalAfterDiscount').text('Rp.' + finalPrice + ',00');
						swal.fire({
							title: 'Success',
							text: 'Discount coupon has been applied!',
							icon: 'success'
						});
					} else {
						$('.discountValueHidden').val($('.totalPriceHidden').val());
						$('.discount-initial').text('Rp.0,00');
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