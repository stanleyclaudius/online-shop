@extends('template/main')

@section('title', 'Dev Store | Register')

@section('content')
<div class="container mx-auto mt-16 mb-24">
	<p class="text-3xl text-center">Sign Up</p>
	<p class="text-md text-gray-500 text-center">Sign up now and become member of Dev Store.</p>
	<div class="flex items-center justify-center mt-12">
		<form action="" method="post" style="box-shadow: 1px 1px 15px rgba(0,0,0,.3);" class="px-6 py-6 rounded">
			@csrf
			<div class="flex flex-col">
				<label class="text-xl" for="name">Name</label>
				<input type="text" id="name" name="name" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<div class="flex flex-col mt-3">
				<label class="text-xl" for="email">Email</label>
				<input type="text" id="email" name="email" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<div class="flex flex-col mt-3">
				<label for="password" class="text-xl">Password</label>
				<input type="password" id="password" name="password" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<div class="flex flex-col mt-3">
				<label for="password_confirmation" class="text-xl">Password Confirmation</label>
				<input type="password" id="password_confirmation" name="password_confirmation" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none">
			</div>
			<button type="submit" class="mt-6 rounded bg-black text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-800">Sign In</button>
		</form>
	</div>
</div>
@endsection