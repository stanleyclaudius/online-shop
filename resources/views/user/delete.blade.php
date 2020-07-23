@extends('template/main')

@section('title', 'Dev Store | Delete Account')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('user') }}"></div>

<div class="container mx-auto mt-12">
	<div class="grid grid-cols-4 gap-8">
		<div class="border border-gray-500 rounded">
			<ul>
				<a href="/user">
					<li class="p-4 border-b border-gray-500">
						Personal Information
					</li>
				</a>
				<a href="/user/address">
					<li class="border-b border-gray-500 p-4">
						Address
					</li>
				</a>
				<a href="/user/password">
					<li class="border-b border-gray-500 p-4">
						Change Password
					</li>
				</a>
				<a href="/user/delete">
					<li class="bg-gray-900 text-white border-b border-gray-500 p-4">
						Delete Account
					</li>
				</a>
			</ul>
		</div>
		<div class="col-span-3 border border-gray-500 rounded" style="max-height: 75vh; overflow-y: auto;">
			<div class="border-b border-gray-500 p-4 bg-gray-900 text-white">
				Delete Account
			</div>
			<form action="/user/delete" method="post" class="p-4">
				@csrf
				<p class="mb-4">Delete your account, mean you have no any record on our system already. Do you really want to delete your account?</p>
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
</script>
@endsection