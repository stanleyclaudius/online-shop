@extends('template/main')

@section('title', 'Dev Store | Products')

@section('content')
<div class="container mx-auto grid grid-cols-4 gap-12 mt-16">
	<div class="border rounded border-gray-400">
		<p class="border-b border-gray-400 py-2 text-xl font-semibold px-3">Filter</p>
		<div class="px-3 mt-4">
			<div class="flex items-center">
				<input type="checkbox" id="asus" class="mr-3">
				<label for="asus">ASUS</label>
			</div>
			<div class="flex items-center mt-3">
				<input type="checkbox" id="acer" class="mr-3">
				<label for="acer">ACER</label>
			</div>
		</div>
	</div>
	<div class="col-span-3 border border-gray-400 rounded p-5" style="overflow-y: auto; height: 70vh;">
		<div class="grid grid-cols-4 gap-10">
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
			<div class="mb-10">
				<img src="{{ asset('img') }}/products/ASUS_1.png" alt="">
				<p class="text-2xl mt-3">Orange Juice</p>
				<p class="text-lg mt-1 mb-4">IDR 25K</p>
				<a href="" class="rounded px-2 py-2 text-white transition duration-150 ease-in-out bg-black hover:bg-gray-800">See Detail</a>
			</div>
		</div>
	</div>
</div>
@endsection