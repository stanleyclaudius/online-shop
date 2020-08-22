@extends('template/main')

@section('title', 'Dev Store | Subscription')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('user') }}"></div>

<div class="px-5 sm:px-5 md:px-4 lg:px-12 mt-12">
	<div class="grid grid-cols-4 gap-8">
		<div class="border border-gray-700 rounded hidden sm:hidden md:block lg:block">
			<ul>
				<a href="/user">
					<li class="text-white border-b border-gray-700 p-4">
						Personal Information
					</li>
				</a>
				<a href="/user/address">
					<li class="text-white border-b border-gray-700 p-4">
						Address
					</li>
				</a>
				<a href="/user/password">
					<li class="text-white border-b border-gray-700 p-4">
						Change Password
					</li>
				</a>
				@php
					$is_sub = DB::table('users')->where('id', auth()->user()->id)->get()->first()->is_subscribe;
				@endphp
				@if($is_sub == 1)
				<a href="/user/subscription">
					<li class="border-b bg-gray-800 text-white border-gray-700 p-4">
						Subscription
					</li>
				</a>
				@endif
				<a href="/user/delete">
					<li class="text-white border-b border-gray-700 p-4">
						Delete Account
					</li>
				</a>
			</ul>
		</div>
		<div class="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 border border-gray-700 rounded" style="max-height: 75vh; overflow-y: auto;">
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white hidden sm:hidden md:block lg:block">
				Subscription
			</div>
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white block sm:block md:hidden lg:hidden relative">
				<div class="menu-select flex items-center">
					Subscription <img src="{{ asset('img') }}/icons/down.png" alt="Dev Store" class="ml-3">
				</div>
				<div id="menu-selector" class="hidden rounded absolute w-64 bg-gray-700" style="top: 100%;">
					<ul>
						<a href="/user">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Personal Information
							</li>
						</a>
						<a href="/user/password">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Change Password
							</li>
						</a>
						<a href="/user/address">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Address
							</li>
						</a>
						<a href="/user/delete">
							<li class="pl-3 py-3 bg-gray-700 hover:bg-gray-600">
								Delete Account
							</li>
						</a>
					</ul>
				</div>
			</div>
			<form action="/user/subscription" method="post" class="p-4">
				@csrf
				<p class="mb-4 text-white">Unsubscribe, mean you won't receive any news from Dev Store already. Do you really want to unsubscribe?</p>
				<p class="text-red-600 font-bold">Type in "STOP SUBSCRIBING" in the provided field below if you really want to unsubscribe from Dev Store.</p>
				<input type="text" name="stopsubscribe" class="border border-gray-500 rounded w-64 h-10 px-2 mt-4">
				@if($errors->has('stopsubscribe'))
					<small class="text-red-600">{{ $errors->first('stopsubscribe') }}</small>
				@endif
				<div>
					<button type="submit" class="bg-red-600 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-red-700 rounded mt-6">Stop Subscribe</button>
				</div>
			</form>
		</div>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
	let flashdata = $('.flashdata').data('flash');
	if (flashdata === 'wrong code') {
		swal.fire({
			title: 'Error',
			text: 'Type the red bold text in provided field (case sensitive)!',
			icon: 'error'
		});
	}

	$('.menu-select').click(function() {
		$('#menu-selector').toggle();
	});
</script>
@endsection