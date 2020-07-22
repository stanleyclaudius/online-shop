<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>@yield('title')</title>
	<link rel="stylesheet" href="{{ asset('css') }}/main.css">
	<style>
		.dropdown {
			float: left;
			overflow: hidden;
		}

		.dropdown .dropbtn {
			cursor: pointer;
			margin: 0;
		}

		.dropdown-content {
		  display: none;
		  position: absolute;
		  background-color: #f9f9f9;
		  min-width: 160px;
		  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		  z-index: 999;
		}

		.dropdown-content a {
		  float: none;
		  color: black;
		  padding: 12px 16px;
		  text-decoration: none;
		  display: block;
		  text-align: left;
		}

		.dropdown-content a:hover {
		  background-color: #ddd;
		}

		.show {
		  display: block !important;
		}
		.loader {
			border: 3px solid #f3f3f3;
			border-top: 3px solid #3498db;
			border-radius: 50%;
			width: 25px;
			height: 25px;
			animation: spin 1s linear infinite;
		}

		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}
	</style>
	<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.3.5/dist/alpine.min.js" defer></script>
	<livewire:styles>	
</head>
<body>

	<nav>
		<div class="flex items-center justify-between w-full px-20 py-5" style="box-shadow: 1px 1px 20px rgba(0,0,0,.5);">
			<a href="/" class="text-3xl font-semibold">Dev Store</a>
			<ul class="flex items-center">
				<li><a href="/" class="text-lg mr-10">Home</a></li>
				<li><a href="/products" class="text-lg mr-10">Products</a></li>
				@if(Session::get('log') == true)
					<li class="mr-10"><a href="/cart"><img src="{{ asset('img') }}/icons/cart.png" alt="" width="25"></a></li>
					<li class="mr-10"><a href="/status"><img src="{{ asset('img') }}/icons/delivery.png" alt="" width="35"></a></li>
					<li>
						<div class="dropdown">
							<button class="dropbtn"><img src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}" width="40" class="border border-gray-400 rounded-full" alt=""></button>
							<div class="dropdown-content" id="myDropdown">
								<a href="#">My Profile</a>
								<a href="/logout">Logout</a>
							</div>
						</div> 
					</li>
				@else
					<li><a href="/login" class="text-lg mr-10">Sign In</a></li>
					<li><a href="/register" class="rounded px-3 py-2 bg-gray-800 text-white transition duration-150 ease-in-out hover:bg-gray-700">Sign Up</a></li>
				@endif
			</ul>
			<livewire:search-dropdown>
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

<livewire:scripts>
<script>
	const dropBtn = document.querySelector('.dropbtn');
	dropBtn.addEventListener('click', function() {
		document.querySelector('.dropdown-content').classList.toggle('show');
	});
</script>
@yield('script')
</body>
</html>