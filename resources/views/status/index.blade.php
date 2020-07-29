@extends('template/main')

@section('title', 'Dev Store | Ongoing Payment Status')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('status') }}"></div>
<div class="container mx-auto mt-16">
	<p class="text-3xl text-center">Ongoing Payment Status</p>
	<p class="text-orange-500 text-center font-bold text-lg mt-2 mb-6">(Every items that has been checkout, use the payment method that has been sent to your register email)</p>
	<a href="/status/done" class="bg-gray-800 transition duration-150 ease-in-out px-3 py-2 rounded hover:bg-gray-700 text-white">Purchase History</a>
	@if($data->count() == 0)
	<div class="bg-red-600 flex items-center text-lg py-3 w-full rounded text-white justify-center mt-6 px-3">Checkout some items first to check your payment status.</div>
	@else
	<table cellspacing="0" cellpadding="10" class="w-full border border-gray-500 mt-8 mb-24">
		<thead>
			<tr>
				<th class="bg-gray-900 text-white border border-gray-500">No</th>
				<th class="bg-gray-900 text-white border border-gray-500">Order ID</th>
				<th class="bg-gray-900 text-white border border-gray-500">Total Price</th>
				<th class="bg-gray-900 text-white border border-gray-500">Courier</th>
				<th class="bg-gray-900 text-white border border-gray-500">Status</th>
				<th class="bg-gray-900 text-white border border-gray-500">Shipping Tracker ID</th>
				<th class="bg-gray-900 text-white border border-gray-500">Invoice</th>
			</tr>
		</thead>
		<tbody>
			@php
				$i = 1;
			@endphp
			@foreach($data as $d)
				@php
					$price = number_format($d->total - $d->discount, 2, ',', '.');
				@endphp
				<tr class="text-center">
					<td class="border border-gray-500">{{ $i }}</td>
					<td class="border border-gray-500">{{ $d->order_code }}</td>
					<td class="border border-gray-500">{{ 'Rp.' . $price }}</td>
					<td class="border border-gray-500">{{ $d->courier }}</td>
					@if($d->status == 0)
						<td class="border border-gray-500 text-red-500 font-bold uppercase">unverified</td>
					@else
						@if($d->is_done == 0)
							<td class="border border-gray-500 text-green-500 font-bold uppercase">verified</td>
						@else
							<td class="border border-gray-500 text-green-500 font-bold uppercase">done</td>
						@endif
					@endif
					@if($d->status == 0)
						<td class="border border-gray-500 text-red-500 font-bold uppercase">unverified</td>
					@else
						@if($d->receipt == null)
							<td class="border border-gray-500 text-orange-500 font-bold uppercase">on process</td>
						@else
							<td class="border border-gray-500 text-green-500 font-bold uppercase">{{ $d->receipt }}</td>
						@endif
					@endif
					<td class="border border-gray-500">
						<a href="/status/invoice/{{ $d->id }}" class="bg-blue-500 rounded px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-600">Print Invoice</a>
					</td>
				</tr>
			@php
				$i++;
			@endphp
			@endforeach
		</tbody>
	</table>
	@endif
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
	let flashdata = $('.flashdata').data('flash');
	if (flashdata === 'status added') {
		swal.fire({
			title: 'One step to go',
			text: 'An email has been sent to you using your registered email, please read the instruction at the email!',
			icon: 'warning'
		});
	} else if (flashdata === 'invoice unavailable') {
		swal.fire({
			title: 'Error',
			text: 'Invoice not found!',
			icon: 'error',
		});
	}
</script>
@endsection