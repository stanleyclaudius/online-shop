<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	@yield('meta')
	<title>@yield('title')</title>
	<link rel="stylesheet" href="{{ asset('css') }}/main.css">
	<style>
		.spec-list ul {
			margin-left: 20px;
			list-style: circle;
		}
		.icon-trash {
			width: 30px;
			height: 30px;
			position: relative;
			overflow: hidden;
		}
		
		.icon-trash .trash-lid {
			width: 62%;
			height: 10%;
			position: absolute;
			left: 50%;
			margin-left: -31%;
			top: 10.5%;
			background-color: #000;
			border-top-left-radius: 80%;
			border-top-right-radius: 80%;
			-webkit-transform: rotate(-5deg);
			-moz-transform: rotate(-5deg);
			-ms-transform: rotate(-5deg);
			transform: rotate(-5deg); 
		}

		.icon-trash .trash-lid:after {
			content: "";
			width: 26%;
			height: 100%;
			position: absolute;
			left: 50%;
			margin-left: -13%;
			margin-top: -10%;
			background-color: inherit;
			border-top-left-radius: 30%;
			border-top-right-radius: 30%;
			-webkit-transform: rotate(-1deg);
			-moz-transform: rotate(-1deg);
			-ms-transform: rotate(-1deg);
			transform: rotate(-1deg); 
		}

		.icon-trash .trash-container {
			width: 56%;
			height: 65%;
			position: absolute;
			left: 50%;
			margin-left: -28%;
			bottom: 10%;
			background-color: #C5BFB6;
			border-bottom-left-radius: 15%;
			border-bottom-right-radius: 15%;
		}

		.icon-trash .trash-container:after {
			content: "";
			width: 110%;
			height: 12%;
			position: absolute;
			left: 50%;
			margin-left: -55%;
			top: 0;
			background-color: inherit;
			border-bottom-left-radius: 45%;
			border-bottom-right-radius: 45%;
		}

		.icon-trash .trash-line-1 {
			width: 4%;
			height: 50%;
			position: absolute;
			left: 38%;
			margin-left: -2%;
			bottom: 17%;
			background-color: #FFF;
		}

		.icon-trash .trash-line-2 {
		width: 4%;
		height: 50%;
		position: absolute;
		left: 50%;
		margin-left: -2%;
		bottom: 17%;
		background-color: #FFF;
		}

		.icon-trash .trash-line-3 {
		width: 4%;
		height: 50%;
		position: absolute;
		left: 62%;
		margin-left: -2%;
		bottom: 17%;
		background-color: #FFF;
		}
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
			border: 3px solid #4a5568;
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

		.product-container::-webkit-scrollbar {
		  display: none;
		}

		.product-container {
		  -ms-overflow-style: none;
		  scrollbar-width: none;
		}
	</style>
	<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.3.5/dist/alpine.min.js" defer></script>
	<livewire:styles>	
</head>
<body class="bg-gray-900">

	<div class="flashdata-subscribe" data-flash="{{ Session::get('subscribe') }}"></div>

	<nav>
		<div class="flex items-center justify-between w-full px-20 py-5 border-b border-gray-800">
			<a href="/" class="text-3xl text-white font-semibold">Dev Store</a>
			<ul class="flex items-center">
				<li><a href="/" class="text-lg mr-10 text-white">Home</a></li>
				<li><a href="/products" class="text-lg mr-10 text-white">Products</a></li>
				@if(Session::get('log') == true)
					<li class="mr-10">
						<a href="/cart" class="relative">
							<img src="{{ asset('img') }}/icons/cart.png" alt="" width="25">
							@php
								$cartCount = DB::table('carts')->where('user_id', auth()->user()->id)->where('show_cart', 1)->count();
							@endphp
							@if($cartCount > 0)
								<div class="cart-counter absolute top-0 w-5 h-5 flex items-center justify-center text-sm rounded-full bg-red-600 text-white ml-4" style="margin-top: -8px;">{{ $cartCount }}</div>
							@endif
						</a>
					</li>
					<li class="mr-10">
						<a href="/status">
							<img src="{{ asset('img') }}/icons/delivery.png" alt="" width="35">
							@php
								$statusCount = DB::table('checkouts')->where('user_id', auth()->user()->id)->where('is_done', 0)->count();
							@endphp
							@if($statusCount > 0)
								<div class="absolute top-0 w-5 h-5 flex items-center justify-center text-sm rounded-full bg-red-600 text-white ml-5" style="margin-top: 18px;">{{ $statusCount }}</div>
							@endif
						</a>
					</li>
					<li class="mr-10">
						<a href="/message">
							<img src="{{ asset('img') }}/icons/message.png" alt="" width="30">
							@php
								$personalMessageCount = DB::table('messages')->where('user_id', auth()->user()->id)->where('is_read', 0)->count();
								$publicMessageCount = DB::table('public_messages')->where('user_id', auth()->user()->id)->where('is_read', 0)->count();
								$totalCount = $personalMessageCount + $publicMessageCount;
							@endphp
							@if($totalCount > 0)
								<div class="absolute top-0 w-5 h-5 flex items-center justify-center text-sm rounded-full bg-red-600 text-white ml-5" style="margin-top: 18px;">{{ $totalCount }}</div>
							@endif
						</a>
					</li>
					<li>
						<div class="dropdown">
							<button class="dropbtn"><img src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}" width="40" class="border border-gray-400 rounded-full" alt=""></button>
							<div class="dropdown-content" id="myDropdown">
								<a href="/user">Control Panel</a>
								<a href="/logout">Logout</a>
							</div>
						</div> 
					</li>
				@else
					<li><a href="/login" class="text-lg mr-10 text-white">Sign In</a></li>
					<li><a href="/register" class="rounded-full px-4 py-2 bg-gray-800 text-white transition duration-150 ease-in-out hover:bg-gray-700">Sign Up</a></li>
				@endif
			</ul>
			<livewire:search-dropdown>
		</div>
	</nav>

	@yield('content')
	<footer class="mt-16 grid grid-cols-3 container mx-auto mb-3">
		<div>
			<p class="text-3xl font-semibold text-white">Dev Store</p>
		</div>
		<div class="col-span-2 flex justify-between">
			<div>
				<ul>
					<li class="mb-3 text-white"><a href="/">Home</a></li>
					<li class="mb-3 text-white"><a href="/products">Products</a></li>
					<li class="mb-5 text-white"><a href="/login">Sign In</a></li>
					<li class="mb-3 text-white"><a href="/register" class="rounded bg-gray-800 px-4 py-2 transition duration-150 ease-in-out hover:bg-gray-700 text-white">Sign Up</a></li>
				</ul>
			</div>
			<div>
				<ul>
					@php
						$category = DB::table('categories')->get();
					@endphp
					@foreach($category as $c)
						<li class="mb-3 text-white"><a href="{{ route('products.category', ['category' => $c->slug]) }}">{{ $c->category }}</a></li>
					@endforeach
				</ul>
			</div>
			<div>
				<p class="text-lg text-white">Subscribe</p>
				<p class="text-sm text-gray-600 mt-2">Get our latest news by subscribe to our newsletter</p>
				@if(Session::get('log') == true)
					@php
						$data = DB::table('users')->where('id', auth()->user()->id)->get()->first()->is_subscribe;
					@endphp
					@if($data == 1)
						<p class="bg-green-500 rounded px-2 py-2 text-lg text-white mt-5">You have subscribe to our newsletter!</p>
					@else
						<form action="/subscribe" method="post" class="mt-5">
							@csrf
							<input type="text" name="email" class="w-64 px-2 py-2 border border-gray-400 rounded focus:outline-none focus:shadow-outline" placeholder="Email address ...">
							<button class="rounded bg-black text-white px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-900">Send</button>
							@if($errors->has('email'))
								<p class="text-red-500">{{ $errors->first('email') }}</p>
							@endif
						</form>
					@endif
				@else
					<form action="/subscribe" method="post" class="mt-5">
						@csrf
						<input type="text" name="email" class="w-64 px-2 py-2 border border-gray-400 rounded focus:outline-none focus:shadow-outline" placeholder="Email address ...">
						<button class="rounded bg-gray-800 border border-gray-700 text-white px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-700">Send</button>
						@if($errors->has('email'))
							<p class="text-red-500">{{ $errors->first('email') }}</p>
						@endif
					</form>
				@endif
			</div>
		</div>
	</footer>

<livewire:scripts>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
	@if(Session::get('log') == true)
	const dropBtn = document.querySelector('.dropbtn');
	dropBtn.addEventListener('click', function() {
		document.querySelector('.dropdown-content').classList.toggle('show');
	});
	@endif

	let flashdata_subscribe = $('.flashdata-subscribe').data('flash');
	if (flashdata_subscribe === 'issubscribe') {
		swal.fire({
			title: 'Success',
			text: 'You\'ll get every news from Dev Store through your registered email!',
			icon: 'success'
		});
	} else if (flashdata_subscribe === 'unsubscribe') {
		swal.fire({
			title: 'Unsubscribe',
			text: 'You wont get any news from Dev Store through your email already!',
			icon: 'warning'
		});
	}
</script>
@yield('script')
</body>
</html>