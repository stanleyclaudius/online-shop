@extends('template/main')

@section('title', 'Dev Store | Products Detail')

@section('content')
<div class="container mx-auto grid grid-cols-5 mt-12 px-12">
	<img src="{{ asset('img') }}/products/{{ $product->product_image }}" alt="" style="width: 16rem;">
	<div class="ml-16 col-span-4">
		<p class="text-3xl">{{ $product->product_name }}</p>
		<p class="text-gray-500">{{ $product->product_description }}</p>
		<p class="mt-4 text-xl mb-3">Spesification:</p>
		{!! $product->product_spec !!}
		@php
            $price = number_format($product->product_price, 2, ',', '.');
        @endphp
		<p class="text-gray-800 text-2xl mt-5 mb-5">{{ 'Rp.' . $price }}</p>
		<a href="" class="bg-gray-800 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-700 rounded">Add To Cart</a>
	</div>
</div>

<hr style="width: 95%; margin: 45px auto 45px auto;">

<div class="container mx-auto mb-10 pr-5">
	<div class="grid grid-cols-6 gap-8">
		<a href="javascript:void(0)" class="rating-section">
			<div class="bg-gray-300 w-full h-20 flex flex-col items-center justify-center active text-black">
				<p class="font-semibold text-lg">RATING</p>
				<p class="text-3xl text-orange-600 font-bold">4.0</p>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section">
			<div class="bg-gray-300 w-full h-20 flex flex-col items-center justify-center text-black">
				<p class="font-bold">RATING</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section">
			<div class="bg-gray-300 w-full h-20 flex flex-col items-center justify-center text-black">
				<p class="font-bold">RATING</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section">
			<div class="bg-gray-300 w-full h-20 flex flex-col items-center justify-center text-black">
				<p class="font-bold">RATING</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section">
			<div class="bg-gray-300 w-full h-20 flex flex-col items-center justify-center text-black">
				<p class="font-bold">RATING</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section">
			<div class="bg-gray-300 w-full h-20 flex flex-col items-center justify-center text-black">
				<p class="font-bold">RATING</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
				</div>
			</div>
		</a>
	</div>
</div>

<div class="container mx-auto mb-20 pr-5">
	<div class="grid grid-cols-6 gap-8">
		<div>
			<a href="javascript:void(0)" class="open-review-box flex items-center flex-inline bg-orange p-2 bg-gray-900 rounded text-white justify-center transition ease-in-out duration-150 hover:bg-gray-800">Add Review</a>
		</div>
		<div class="col-span-5 w-full">
			<div class="review-box w-full bg-gray-300 mb-10 px-2 pl-4 py-5 pr-4" style="display: none;">
				<p class="text-lg font-semibold tracking-wider mb-6 text-black">Post Your Review</p>
				<form action="" method="post">
					@csrf
					<div class="grid grid-cols-2 gap-10">
						<div class="flex flex-col inline-flex mr-5">
							<label for="name" class="text-black">Your name</label>
							<input type="text" name="name" id="name" placeholder="Your name" class="text-white bg-white border border-gray-400 pl-2 rounded px-2 py-1 mt-3 focus:outline-none focus:shadow-outline">
						</div>
						<div class="flex flex-col inline-flex">
							<label for="email" class="text-black">Your email</label>
							<input type="text" name="email" id="email" placeholder="Your email" class="text-white bg-white border border-gray-400 pl-2 rounded px-2 py-1 mt-3 focus:outline-none focus:shadow-outline">
						</div>
					</div>
					<div class="flex flex-col inline-flex mt-6 w-full">
						<label for="review" class="text-black">Your review</label>
						<textarea name="review" id="review" class="bg-white border border-gray-400 pl-2 rounded px-2 py-1 mt-3 focus:outline-none focus:shadow-outline"></textarea>
					</div>
					<button type="submit" class="bg-gray-900 px-2 py-1 text-white rounded mt-5 transition duration-150 ease-in-out hover:bg-gray-800">Submit</button>
				</form>
			</div>
			<div class="user-review flex items-center border-b border-gray-500 px-2 pl-4 py-5 relative bg-gray-300">
				<img src="{{ asset('img') }}/users/default.png" alt="" width="85" class="rounded-full border border-gray-600">
				<div class="ml-6">
					<p class="text-xl text-black">John Doe</p>
					<p class="text-sm mt-1 text-black" style="width: 42rem;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum unde quod vel excepturi, quidem modi.</p>
					<div class="flex mt-2">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
					</div>
				</div>
				<div class="absolute right-0 pr-5">
					<p class="text-sm text-gray-600">Feb 20, 2020</p>
				</div>
			</div>
			<div class="user-review flex items-center border-b border-gray-500 px-2 pl-4 py-5 relative bg-gray-300">
				<img src="{{ asset('img') }}/users/default.png" alt="" width="85" class="rounded-full border border-gray-600">
				<div class="ml-5">
					<p class="text-xl text-black">John Doe</p>
					<p class="text-sm mt-1 text-black" style="width: 42rem;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum unde quod vel excepturi, quidem modi, vitae molestiae magnam in ipsa.</p>
					<div class="flex mt-2">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
					</div>
				</div>
				<div class="absolute right-0 pr-5">
					<p class="text-sm text-gray-600">Feb 20, 2020</p>
				</div>
			</div>
			<div class="user-review flex items-center border-b border-gray-500 px-2 pl-4 py-5 relative bg-gray-300">
				<img src="{{ asset('img') }}/users/default.png" alt="" width="85" class="rounded-full border border-gray-600">
				<div class="ml-5">
					<p class="text-xl text-black">John Doe</p>
					<p class="text-sm mt-1 text-black" style="width: 42rem;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum unde quod vel excepturi, quidem modi, vitae molestiae magnam in ipsa.</p>
					<div class="flex mt-2">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
						<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
					</div>
				</div>
				<div class="absolute right-0 pr-5">
					<p class="text-sm text-gray-600">Feb 20, 2020</p>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="{{ asset('js') }}/detail.js"></script>
@endsection