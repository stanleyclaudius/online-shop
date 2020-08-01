@extends('template/main')

@section('title', 'Dev Store | Forget Password')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('auth') }}"></div>
<div class="container mx-auto mt-16 mb-24">
	<p class="text-3xl text-center text-white">Forget Password?</p>
	<p class="text-md text-gray-500 text-center mt-3">Simply type in your email address, than we'll send confirmation link.</p>
	<div class="flex items-center justify-center mt-12">
		<form action="/forgetpass" method="post" class="px-6 py-6 rounded bg-gray-800">
			@csrf
			<div class="flex flex-col">
				@if($errors->has('email'))
					<small class="text-red-500">{{ $errors->first('email') }}</small>
				@else
					<label class="text-xl text-white" for="email">Email</label>
				@endif
				<input type="text" id="email" name="email" class="border border-gray-400 rounded w-64 px-2 h-10 mt-3 focus:shadow-outline focus:outline-none" value="{{ old('email') }}">
			</div>
			<button type="submit" class="mt-5 rounded bg-gray-700 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-600">Send</button>
		</form>
	</div>
</div>
@endsection

@section('script')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="{{ asset('js') }}/forget.js"></script>
@endsection