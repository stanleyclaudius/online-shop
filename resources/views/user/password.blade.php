@extends('template/main')

@section('title', 'Dev Store | Change Password')

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
					<li class="border-b border-gray-700 p-4 bg-gray-800 text-white">
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
					<li class="text-white border-b border-gray-700 p-4">
						Delete Account
					</li>
				</a>
			</ul>
		</div>
		<div class="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 border border-gray-700 rounded" style="max-height: 75vh; overflow-y: auto;">
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white hidden sm:hidden md:block lg:block">
				Change Password
			</div>
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white block sm:block md:hidden lg:hidden relative">
				<div class="menu-select flex items-center">
					Change Password <img src="{{ asset('img') }}/icons/down.png" alt="Dev Store" class="ml-3">
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
						<a href="/user/delete">
							<li class="pl-3 py-3 bg-gray-700 hover:bg-gray-600">
								Delete Account
							</li>
						</a>
					</ul>
				</div>
			</div>
			<form action="/user/password" method="post" class="p-4">
				@csrf
				<div class="flex flex-col">
					<label for="old_password" class="text-white mb-3">Current Password</label>
					<input type="password" id="old_password" name="old_password" class="border border-gray-500 rounded h-10 px-2 w-full">
					@if($errors->has('old_password'))
						<small class="text-red-600">{{ $errors->first('old_password') }}</small>
					@endif
				</div>
				<div class="flex flex-col mt-4">
					<label for="password" class="text-white mb-3">New Password</label>
					<input type="password" id="password" name="password" class="border border-gray-500 rounded h-10 px-2 w-full">
					@if($errors->has('password'))
						<small class="text-red-600">{{ $errors->first('password') }}</small>
					@endif
				</div>
				<div class="flex flex-col mt-4">
					<label for="password_confirmation" class="text-white mb-3">Password Confirmation</label>
					<input type="password" id="password_confirmation" name="password_confirmation" class="border border-gray-500 rounded h-10 px-2 w-full">
					@if($errors->has('password_confirmation'))
						<small class="text-red-600">{{ $errors->first('password_confirmation') }}</small>
					@endif
				</div>
				<button type="submit" class="bg-gray-800 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-gray-700 rounded mt-6">Change Password</button>
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
	if (flashdata === 'password changed') {
		swal.fire({
			title: 'Success',
			text: 'Your password has been changed!',
			icon: 'success'
		});
	} else if (flashdata === 'wrong cur pass') {
		swal.fire({
			title: 'Failed',
			text: 'Your current password is invalid!',
			icon: 'error'
		});
	}

	$('.menu-select').click(function() {
		$('#menu-selector').toggle();
	});
</script>
@endsection