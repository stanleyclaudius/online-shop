<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Dev Store | Verify Your Account</title>
	<link rel="stylesheet" href="{{ asset('css') }}/main.css">
</head>
<body>

	<div class="flashdata" data-flash="{{ Session::get('auth') }}"></div>

	<div class="container mx-auto mt-12 px-24 mb-32">
		<p class="text-xl bg-green-500 text-center px-5 rounded text-white py-3">We have sent an verification code to <b>{{ $email }}</b>. Please check and type in the provided field.</p>
		<p class="text-center mt-8"><a href="/verify/resend/{{ $email }}" class="text-blue-500 hover:text-blue-700">Resend Verification Code</a></p>
		<div class="mt-8">
			<form action="/verify/{{ $email }}" method="post">
				@csrf
				<div class="flex items-center justify-center">
					<input type="text" name="input1" class="uppercase inputs input-1 mr-6 w-20 h-20 rounded shadow-xl border border-gray-300 text-center text-4xl focus:outline-none focus:shadow-outline" maxlength="1" autofocus>
					<input type="text" name="input2" class="uppercase inputs input-2 mr-6 w-20 h-20 rounded shadow-xl border border-gray-300 text-center text-4xl focus:outline-none focus:shadow-outline" maxlength="1">
					<input type="text" name="input3" class="uppercase inputs input-3 mr-6 w-20 h-20 rounded shadow-xl border border-gray-300 text-center text-4xl focus:outline-none focus:shadow-outline" maxlength="1">
					<input type="text" name="input4" class="uppercase inputs input-4 mr-6 w-20 h-20 rounded shadow-xl border border-gray-300 text-center text-4xl focus:outline-none focus:shadow-outline" maxlength="1">
					<input type="text" name="input5" class="uppercase inputs input-5 w-20 h-20 rounded shadow-xl border border-gray-300 text-center text-4xl focus:outline-none focus:shadow-outline" maxlength="1">
				</div>
				<div class="flex items-center justify-center mt-12">
					<button class="bg-gray-900 rounded px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-gray-700 verify-btn">Verify</a>
				</div>
			</form>
		</div>
	</div>

	<footer class="mt-16 grid grid-cols-3 container mx-auto mb-3">
		<div>
			<p class="text-3xl font-semibold">Dev Store</p>
		</div>
		<div class="col-span-2 flex justify-between">
			<div>
				<ul>
					<li class="mb-3"><a href="">Home</a></li>
					<li class="mb-3"><a href="">Products</a></li>
					<li class="mb-5"><a href="">Sign In</a></li>
					<li class="mb-3"><a href="" class="rounded bg-gray-800 px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-700 text-white">Sign Up</a></li>
				</ul>
			</div>
			<div>
				<ul>
					<li class="mb-3"><a href="">ASUS</a></li>
					<li class="mb-3"><a href="">ACER</a></li>
					<li class="mb-3"><a href="">HP</a></li>
					<li class="mb-3"><a href="">Apple</a></li>
					<li class="mb-3"><a href="">Razer</a></li>
					<li class="mb-3"><a href="">Rexus</a></li>
				</ul>
			</div>
			<div>
				<p class="text-lg">Subscribe</p>
				<p class="text-sm text-gray-600 mt-2">Get our latest news by subscribe to our newsletter</p>
				<form action="" method="post" class="mt-5">
					@csrf
					<input type="text" name="email" class="w-64 px-2 py-2 border border-gray-400 rounded focus:outline-none focus:shadow-outline" placeholder="Email address ...">
					<button class="rounded bg-black text-white px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-900">Send</button>
				</form>
			</div>
		</div>
	</footer>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="{{ asset('js') }}/verify.js"></script>
</body>
</html>