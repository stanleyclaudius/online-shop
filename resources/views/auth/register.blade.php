@extends('template/main')

@section('title', 'Dev Store | Register')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('user') }}"></div>

<div class="container mx-auto mt-16 mb-24">
	<p class="text-3xl text-center">Sign Up</p>
	<p class="text-md text-gray-500 text-center">Sign up now and become member of Dev Store.</p>
	<div class="flex items-center justify-center mt-12">
		<form action="/register" method="post" style="box-shadow: 1px 1px 15px rgba(0,0,0,.3);" class="px-6 py-6 rounded">
			@csrf
			<div class="flex flex-col">
				@if($errors->has('name'))
					<small class="text-red-500">{{ $errors->first('name') }}</small>
				@else
					<label class="text-xl" for="name">Name</label>
				@endif
				<input type="text" id="name" name="name" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none" value="{{ old('name') }}">
			</div>
			<div class="flex flex-col mt-3">
				@if($errors->has('email'))
					<small class="text-red-500">{{ $errors->first('email') }}</small>
				@else
					<label class="text-xl" for="email">Email</label>
				@endif
				<input type="text" id="email" name="email" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none" value="{{ old('email') }}">
			</div>
			<div class="flex flex-col mt-3">
				@if($errors->has('password'))
					<small class="text-red-500">{{ $errors->first('password') }}</small>
				@else
					<label class="text-xl" for="password">Password</label>
				@endif
				<input type="password" id="password" name="password" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<div class="flex flex-col mt-3">
				@if($errors->has('password_confirmation'))
					<small class="text-red-500">{{ $errors->first('password_confirmation') }}</small>
				@else
					<label class="text-xl" for="password_confirmation">Password Confirmation</label>
				@endif
				<input type="password" id="password_confirmation" name="password_confirmation" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<button type="submit" class="mt-6 rounded bg-black text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-800">Sign In</button>
		</form>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
	let flashdata = $('.flashdata').data('flash');
	if (flashdata === 'account deleted') {
		swal.fire({
			title: 'Success',
			text: 'Your account has been deleted!',
			icon: 'success'
		});
	}
</script>
@endsection