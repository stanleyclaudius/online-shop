@extends('template/main')

@section('title', 'Dev Store | Delete Account')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('user') }}"></div>

<div class="px-5 sm:px-5 md:px-4 lg:px-12 mt-12">
	<div class="grid grid-cols-4 gap-8">
		<div class="border border-gray-700 rounded hidden sm:hidden md:block lg:block">
			<ul>
				<a href="/user">
					<li class="text-white p-4 border-b border-gray-700">
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
					<li class="text-white border-b border-gray-700 p-4">
						Subscription
					</li>
				</a>
				@endif
				<a href="/user/delete">
					<li class="bg-gray-800 text-white border-b border-gray-700 p-4">
						Delete Account
					</li>
				</a>
			</ul>
		</div>
		<div class="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 border border-gray-700 rounded" style="max-height: 75vh; overflow-y: auto;">
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white hidden sm:hidden md:block lg:block">
				Delete Account
			</div>
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white block sm:block md:hidden lg:hidden relative">
				<div class="menu-select flex items-center">
					Delete Account <img src="{{ asset('img') }}/icons/down.png" alt="Dev Store" class="ml-3">
				</div>
				<div id="menu-selector" class="hidden rounded absolute w-64 bg-gray-700" style="top: 100%;">
					<ul>
						<a href="/user">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Personal Information
							</li>
						</a>
						<a href="/user/address">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Address
							</li>
						</a>
						@if($is_sub == 1)
						<a href="/user/subscription">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Subscription
							</li>
						</a>
						@endif
						<a href="/user/password">
							<li class="pl-3 py-3 bg-gray-700 hover:bg-gray-600">
								Change Password
							</li>
						</a>
					</ul>
				</div>
			</div>
			<form action="/user/delete" method="post" class="p-4">
				@csrf
				<p class="mb-4 text-white">Delete your account, mean you have no any record on our system already. Do you really want to delete your account?</p>
				<p class="text-red-600 font-bold">Type in "REMOVE MY ACCOUNT" in the provided field below if you really want to delete your account.</p>
				<input type="text" name="deletemessage" class="border border-gray-500 rounded w-64 h-10 px-2 mt-4">
				@if($errors->has('deletemessage'))
					<small class="text-red-600">{{ $errors->first('deletemessage') }}</small>
				@endif
				<div>
					<button type="submit" class="bg-red-600 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-red-700 rounded mt-6">Delete Account</button>
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
	if (flashdata === 'wrong verification') {
		swal.fire({
			title: 'Failed',
			text: 'Please type "REMOVE MY ACCOUNT" (without quotes) in provided field!',
			icon: 'error'
		});
	}

	$('.menu-select').click(function() {
		$('#menu-selector').toggle();
	});
</script>
@endsection