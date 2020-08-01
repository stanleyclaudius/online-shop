@extends('template/main')

@section('title', 'Dev Store | Reset Password')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('auth') }}"></div>

<div class="container mx-auto mt-16 mb-24">
	<p class="text-3xl text-center text-white">Reset Password</p>
	<p class="text-md text-gray-500 text-center mt-3">Reset password for <b>{{ $email }}</b> account.</p>
	<div class="flex items-center justify-center mt-10">
		<form action="/reset/password/{{ $email }}/{{ $token }}" method="post" class="bg-gray-800 px-6 py-6 rounded">
			@csrf
			<div class="flex flex-col mt-5">
				@if($errors->has('password'))
					<small class="text-red-500">{{ $errors->first('password') }}</small>
				@else
					<label for="password" class="text-xl text-white">Password</label>
				@endif
				<input type="password" id="password" name="password" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<div class="flex flex-col mt-5">
				@if($errors->has('password_confirmation'))
					<small class="text-red-500">{{ $errors->first('password_confirmation') }}</small>
				@else
					<label for="password_confirmation" class="text-xl text-white">Password Confirmation</label>
				@endif
				<input type="password" id="password_confirmation" name="password_confirmation" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<button type="submit" class="mt-5 rounded bg-gray-700 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-600">Reset</button>
		</form>
	</div>
</div>
@endsection