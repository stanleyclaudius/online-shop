@extends('template/main')

@section('title', 'Dev Store | Payment Status')

@section('content')
<div class="container mx-auto mt-16">
	<p class="text-3xl text-center">Payment Status</p>
	<table cellspacing="0" cellpadding="10" class="w-full border border-gray-500 mt-8 mb-24">
		<thead>
			<tr>
				<th class="border border-gray-500">No</th>
				<th class="border border-gray-500">Order ID</th>
				<th class="border border-gray-500">Total Price</th>
				<th class="border border-gray-500">Courier</th>
				<th class="border border-gray-500">Status</th>
				<th class="border border-gray-500">Shipping Tracker ID</th>
			</tr>
		</thead>
		<tbody>
			<tr class="text-center">
				<td class="border border-gray-500">1</td>
				<td class="border border-gray-500">DS-7821DSF</td>
				<td class="border border-gray-500">Test Product</td>
				<td class="border border-gray-500">2</td>
				<td class="border border-gray-500 text-red-500 font-bold uppercase">unverified</td>
				<td class="border border-gray-500 text-red-500 font-bold uppercase">unverified</td>
			</tr>
			<tr class="text-center">
				<td class="border border-gray-500">1</td>
				<td class="border border-gray-500">DS-7821DSF</td>
				<td class="border border-gray-500">Test Product</td>
				<td class="border border-gray-500">2</td>
				<td class="border border-gray-500 text-green-500 font-bold uppercase">verified</td>
				<td class="border border-gray-500">87951626841204780</td>
			</tr>
		</tbody>
	</table>
</div>
@endsection