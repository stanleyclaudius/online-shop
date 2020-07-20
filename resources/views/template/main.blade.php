<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>@yield('title')</title>
	<link rel="stylesheet" href="{{ asset('css') }}/main.css">
</head>
<body>

	<nav>
		<div class="flex items-center justify-between w-full px-20 py-5" style="box-shadow: 1px 1px 20px rgba(0,0,0,.5);">
			<a href="/" class="text-3xl font-semibold">Dev Store</a>
			<ul class="flex items-center">
				<li><a href="/" class="text-lg mr-10">Home</a></li>
				<li><a href="/products" class="text-lg mr-10">Products</a></li>
				<li><a href="/login" class="text-lg mr-10">Sign In</a></li>
				<li><a href="/register" class="rounded px-3 py-2 bg-gray-800 text-white transition duration-150 ease-in-out hover:bg-gray-700">Sign Up</a></li>
			</ul>
		</div>
	</nav>

	@yield('content')

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
	
</body>
</html>