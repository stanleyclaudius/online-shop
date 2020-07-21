@extends('template/main')

@section('title', 'Dev Store | Home')

@section('content')
<div class="container mx-auto mt-16 flex items-center px-12">
	<div>
		<p class="text-3xl">Find Your Best Laptop Here</p>
		<p class="text-lg text-gray-600 mt-3 mb-8">Dev Store is a laptop or computer accesories store that provide you the best accesories for your laptop or computer with the best price and high quality. <br> Grab yours now!</p>
		<a href="" class="rounded bg-gray-800 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-gray-700">See Products</a>
	</div>
	<div>
		<img src="{{ asset('img') }}/contents/jumbotron.png" alt="" width="1100">
	</div>
</div>

<div class="container mx-auto px-12 mt-12">
	<p class="text-3xl">Latest Products</p>
	<div class="grid grid-cols-5 gap-10 mt-6">
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
	</div>
</div>

<div class="container mx-auto px-12 mt-24">
	<p class="text-3xl">Signature Products</p>
	<div class="grid grid-cols-5 gap-10 mt-6">
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
		<div>
			<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
			<p class="text-2xl mt-3">Orange Juice</p>
			<p class="text-lg mt-1 mb-4">IDR 25K</p>
			<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
		</div>
	</div>
</div>

<div class="w-full bg-gray-200 pt-6 pb-10 px-12 mt-24 text-center">
	<p class="text-3xl">Not a member yet?</p>
	<p class="text-md mt-2 text-gray-600">Simply Sign In and become member and get exclusive discount and exclusive rewards.</p>
	<p class="mb-5 text-md mt-2 text-gray-600">We'll hold a giveaway event for all member that purchase more than IDR 50M a year</p>
	<a href="/login" class="rounded bg-gray-800 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-700">Sign In</a>
</div>
@endsection