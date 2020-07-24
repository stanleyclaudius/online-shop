@extends('template/main')

@section('title', 'Dev Store | Products')

@section('content')
<div class="container mx-auto grid grid-cols-4 gap-12 mt-16">
	<div class="border rounded border-gray-400">
		<div class="flex items-center justify-between border-b border-gray-400">
			<p class="py-2 text-xl font-semibold px-3">Filter</p>
			<!-- <button class="filter-btn mr-3 px-2 py-1 rounded bg-gray-900 text-white transition duration-150 ease-in-out hover:bg-gray-800">Search</button> -->
		</div>
		<div class="px-3 mt-4">
			@php
				$counter = 0;
			@endphp
			@foreach($categories as $category)
			<div class="flex items-center mb-3">
				<input type="checkbox" id="{{ $category->id }}" class="filter-checkbox mr-3">
				<label for="{{ $category->id }}">{{ $category->category }}</label>
			</div>
			@php
				$counter++;
			@endphp
			@endforeach
		</div>
	</div>
	<div class="col-span-3 border border-gray-400 rounded p-5" style="overflow-y: auto; height: 70vh;">
		<div class="grid grid-cols-4 gap-10 product-container">
			@foreach($products as $product)
			@php
	            $price = number_format($product->product_price, 2, ',', '.');
	        @endphp
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/{{ $product->product_image }}" alt="">
				<p class="text-lg font-semibold mt-3">{{ $product->product_name }}</p>
				<p class="text-lg mt-1 mb-4">{{ 'Rp.' . $price }}</p>
				<a href="/detail/{{ $product->id }}" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			@endforeach
		</div>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script>
	
</script>
@endsection