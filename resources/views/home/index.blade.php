@extends('template/main')

@section('title', 'Dev Store | Home')

@section('content')
<div class="container mx-auto mt-10">
	<div class="min-w-full mx-auto px-12">
		@foreach($jumbotron as $j)
			<img src="{{ asset('img') }}/contents/{{ $j->jumbotron }}" alt="Dev Store">
		@endforeach
	</div>
</div>

<div class="container mx-auto px-12 mt-12">
	<p class="text-3xl text-white">Latest Products</p>
	<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-20 sm:gap-20 md:gap-20 lg:gap-10 mt-6">
		@foreach($products as $product)
		@php
            $price = number_format($product->product_price, 2, ',', '.');
        @endphp
		<div>
			<img src="{{ asset('img') }}/products/{{ $product->product_image }}" alt="Dev Store">
			<p class="text-lg font-semibold mt-4 text-white">{{ $product->product_name }}</p>
			<p class="text-lg mt-2 mb-5 text-white">{{ 'Rp.' . $price }}</p>
			<a href="/detail/{{ $product->id }}" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-gray-800 hover:bg-gray-700">See Detail</a>
		</div>
		@endforeach
	</div>
</div>

<div class="container mx-auto px-12 mt-24">
	<p class="text-3xl text-white">Signature Products</p>
	<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-20 sm:gap-20 md:gap-20 lg:gap-10 mt-6">
		@foreach($signatures as $signature)
		@php
            $price = number_format($signature->product->product_price, 2, ',', '.');
        @endphp
		<div>
			<img src="{{ asset('img') }}/products/{{ $signature->product->product_image }}" alt="Dev Store">
			<p class="text-lg text-white font-semibold mt-4">{{ $signature->product->product_name }}</p>
			<p class="text-lg text-white mt-2 mb-5">{{ 'Rp.' . $price }}</p>
			<a href="/detail/{{ $signature->product->id }}" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-gray-800 hover:bg-gray-700">See Detail</a>
		</div>
		@endforeach
	</div>
</div>

<div class="w-full bg-gray-800 pt-6 pb-10 px-12 mt-24 text-center">
	<p class="text-3xl text-white">Not a member yet?</p>
	<p class="text-md mt-5 text-gray-300 text-white">Simply Sign In and become member and get exclusive discount and exclusive rewards.</p>
	<p class="mb-8 text-md mt-2 text-gray-300">We'll hold a giveaway event for all member that purchase more than IDR 50M a year</p>
	<a href="/login" class="rounded bg-gray-700 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-600">Sign In</a>
</div>
@endsection