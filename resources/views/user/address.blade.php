@extends('template/main')

@section('title', 'Dev Store | Address')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('user') }}"></div>

<div class="container mx-auto mt-12">
	<div class="grid grid-cols-4 gap-8">
		<div class="border border-gray-700 rounded">
			<ul>
				<a href="/user">
					<li class="border-b border-gray-700 p-4 text-white">
						Personal Information
					</li>
				</a>
				<a href="/user/address">
					<li class="bg-gray-800 text-white border-b border-gray-700 p-4">
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
		<div class="col-span-3 border border-gray-700 rounded" style="max-height: 75vh; overflow-y: auto;">
			<div class="border-b border-gray-700 p-4 bg-gray-800 text-white">
				Address
			</div>
			<form action="/user/address" method="post" class="p-4">
				@csrf
				<div class="flex flex-col">
					<label for="country" class="text-white mb-2">Country</label>
					<input type="text" name="country" id="country" placeholder="Country" value="{{ $user->country }}" class="border border-gray-500 rounded px-2 h-10 text-lg" style="width: 55%;">
				</div>
				<div class="flex flex-col mt-6">
					<label for="province" class="text-white mb-2">Province</label>
					<input type="text" name="province" id="province" placeholder="Province" value="{{ $user->province }}" class="border border-gray-500 rounded px-2 h-10 text-lg" style="width: 55%;">
				</div>
				<div class="flex flex-col mt-6">
					<label for="city" class="text-white mb-2">Province</label>
					<input type="text" name="city" id="city" placeholder="City" value="{{ $user->city }}" class="border border-gray-500 rounded px-2 h-10 text-lg" style="width: 55%;">
				</div>
				<div class="flex flex-col mt-6">
					<label for="address" class="text-white mb-2">Address</label>
					<textarea name="address" cols="5" id="address" class="border border-gray-500 rounded px-2 h-10 text-lg" style="width: 55%;" placeholder="Address">{{ $user->address }}</textarea>
				</div>
				<button type="submit" class="bg-gray-800 px-3 py-2 text-white transition duration-150 ease-in-out hover:bg-gray-700 rounded mt-6">Save Changes</button>
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
	if (flashdata === 'address changed') {
		swal.fire({
			title: 'Success',
			text: 'Your address has been changed!',
			icon: 'success'
		});
	}
</script>
@endsection