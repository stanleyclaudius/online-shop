@extends('template/main')

@section('title', 'Dev Store | Products')

@section('content')
<div class="container mx-auto grid grid-cols-4 gap-12 mt-10">
	<div>
		<div class="border rounded border-gray-700">
			<div class="border-b border-gray-700">
				<p class="py-2 text-xl font-semibold px-3 text-white">Filter By Brand</p>
			</div>
			<div class="px-3 mt-4">
				@foreach($categories as $category)
					@if($category->section == 'brand')
						<div class="flex items-center mb-5">
							<img src="{{ asset('img') }}/icons/category/{{ $category->icon }}" alt="" class="mr-5" width="20">
							@if($category->slug == request()->category)
								<a href="{{ route('products.category', ['category' => $category->slug]) }}" class="text-white"><u>{{ $category->category }}</u></a>
							@else
								<a href="{{ route('products.category', ['category' => $category->slug]) }}" class="text-white">{{ $category->category }}</a>
							@endif
						</div>
					@endif
				@endforeach
			</div>
		</div>
		<div class="border rounded border-gray-700 mt-5">
			<div class="border-b border-gray-700">
				<p class="py-2 text-xl font-semibold px-3 text-white">Filter By Price</p>
			</div>
			<div class="px-3 mt-4">
				<div class="mb-5 flex items-center">
					<img src="{{ asset('img') }}/icons/category/high.png" alt="" class="mr-5" width="20" style="transform: rotateZ(180deg);">
					<a href="{{ route('products.category', ['category' => request()->category, 'sort' => 'low_high']) }}" class="text-white">Low to High</a>
				</div>
				<div class="mb-5 flex items-center">
					<img src="{{ asset('img') }}/icons/category/high.png" alt="" class="mr-5" width="20">
					<a href="{{ route('products.category', ['category' => request()->category, 'sort' => 'high_low']) }}" class="text-white">High to Low</a>
				</div>
			</div>
		</div>
	</div>
	<div class="col-span-3 border border-gray-700 rounded" style="height: 76.5vh;">
		<div class="grid grid-cols-4 gap-10 product-container p-5" style="overflow-y: auto; height: 65vh;">
			@forelse($products as $product)
				@php
		            $price = number_format($product->product_price, 2, ',', '.');
		        @endphp
				<div class="mb-10">
					<img src="{{ asset('img') }}/products/{{ $product->product_image }}" alt="">
					<p class="text-lg font-semibold mt-4 text-white">{{ $product->product_name }}</p>
					<p class="text-lg mt-2 mb-5 text-white">{{ 'Rp.' . $price }}</p>
					<a href="/detail/{{ $product->id }}" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-gray-800 hover:bg-gray-700">See Detail</a>
				</div>
			@empty
				<p class="text-xl text-white font-semibold">No product fonud!</p>
			@endforelse
		</div>
		<div class="border-t border-gray-700 p-4">
			{{ $products->appends(request()->input())->links() }}
		</div>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script>
	
</script>
@endsection