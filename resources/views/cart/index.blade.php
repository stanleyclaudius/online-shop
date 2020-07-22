@extends('template/main')

@section('title', 'Dev Store | Shopping Cart')

@section('content')
<div class="container mx-auto mt-16">
	<p class="text-3xl text-center">Shoppping Cart</p>
	<table cellspacing="0" cellpadding="10" class="w-full border border-gray-500 mt-8 mb-8">
		<thead>
			<tr>
				<th class="border border-gray-500">No</th>
				<th class="border border-gray-500">Product Image</th>
				<th class="border border-gray-500">Product Name</th>
				<th class="border border-gray-500">QTY</th>
				<th class="border border-gray-500">Product Price</th>
				<th class="border border-gray-500">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr class="text-center">
				<td class="border border-gray-500">1</td>
				<td class="border border-gray-500">
					<img src="{{ asset('img') }}/products/ASUS_3.png" alt="" width="80" class="mx-auto">
				</td>
				<td class="border border-gray-500">Test Product</td>
				<td class="border border-gray-500">2</td>
				<td class="border border-gray-500">102500</td>
				<td class="border border-gray-500">10022</td>
			</tr>
		</tbody>
	</table>
	<div class="w-full flex justify-end mb-20">
		<a href="" class="bg-green-600 px-3 py-2 rounded text-white transition duration-150 ease-in-out hover:bg-green-700">Checkout</a>
	</div>
</div>
@endsection