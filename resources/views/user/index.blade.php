@extends('template/main')

@section('title', 'Dev Store | Personal Information')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('user') }}"></div>

<div class="px-5 sm:px-5 md:px-4 lg:px-12 mt-12">
	<div class="grid grid-cols-4 gap-8">
		<div class="border border-gray-700 rounded hidden sm:hidden md:block lg:block">
			<ul>
				<a href="/user">
					<li class="bg-gray-800 text-white p-4">
						Personal Information
					</li>
				</a>
				<a href="/user/address">
					<li class="border-b border-gray-700 p-4 text-white">
						Address
					</li>
				</a>
				<a href="/user/password">
					<li class="border-b border-gray-700 p-4 text-white">
						Change Password
					</li>
				</a>
				@php
					$is_sub = DB::table('users')->where('id', auth()->user()->id)->get()->first()->is_subscribe;
				@endphp
				@if($is_sub == 1)
				<a href="/user/subscription">
					<li class="border-b border-gray-700 p-4 text-white">
						Subscription
					</li>
				</a>
				@endif
				<a href="/user/delete">
					<li class="border-b border-gray-700 p-4 text-white">
						Delete Account
					</li>
				</a>
			</ul>
		</div>
		<div class="col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 border border-gray-700 rounded" style="max-height: 75vh; overflow-y: auto;">
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white hidden sm:hidden md:block lg:block">
				Personal Information
			</div>
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white block sm:block md:hidden lg:hidden relative">
				<div class="menu-select flex items-center">
					Personal Information <img src="{{ asset('img') }}/icons/down.png" alt="Dev Store" class="ml-3">
				</div>
				<div id="menu-selector" class="hidden rounded absolute w-64 bg-gray-700" style="top: 100%;">
					<ul>
						<a href="/user/address">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Address
							</li>
						</a>
						<a href="/user/password">
							<li class="border-b border-gray-600 py-3 pl-3 bg-gray-700 hover:bg-gray-600">
								Change Password
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
			<form action="/user" method="post" enctype="multipart/form-data" class="p-4">
				@csrf
				<div class="grid grid-cols-2 gap-10">
					<div>
						<div class="flex flex-col">
							<label for="name" class="text-white mb-2">Name</label>
							<input type="text" name="name" id="name" placeholder="Your name" value="{{ $user->name }}" class="border border-gray-500 rounded px-2 h-10 text-lg">
						</div>
						<div class="flex flex-col mt-6">
							<label for="phone" class="text-white mb-2">Phone</label>
							<input type="number" name="phone" id="phone" placeholder="Your phone" value="{{ $user->phone }}" class="border border-gray-500 rounded px-2 h-10 text-lg">
						</div>
						<div class="flex flex-col mt-6">
							<label for="gender" class="text-white mb-2">Gender</label>
							<select name="gender" id="gender" class="border border-gray-500 rounded px-2 h-10 text-lg">
								<option value="null" @if($user->gender == null) selected @endif>- Select Gender -</option>
								<option value="men" @if($user->gender == 'men') selected @endif>Men</option>
								<option value="women" @if($user->gender == 'women') selected @endif>Women</option>
							</select>
						</div>
					</div>
					<div>
						<div class="flex flex-col">
							@if($errors->has('avatar'))
								<small class="text-red-600 mb-2">{{ $errors->first('avatar') }}</small>
							@else
								<label for="avatar" class="text-white mb-2">Profile Picture</label>
							@endif
							<div class="grid grid-cols-3">
								<img src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}" alt="" class="border border-gray-500 rounded" width="120">
								<div class="col-span-2">
									<input type="file" name="avatar" id="avatar" class="text-white w-full border border-gray-500 rounded px-2 py-1 h-10 text-lg">
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end">
					<button type="submit" class="bg-gray-800 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-gray-700 rounded mt-6">Save Changes</button>
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
	if (flashdata === 'profile changed') {
		swal.fire({
			title: 'Success',
			text: 'Your profile has been changed!',
			icon: 'success'
		});
	}

	$('.menu-select').click(function() {
		$('#menu-selector').toggle();
	});
</script>
@endsection