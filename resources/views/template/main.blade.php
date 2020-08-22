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
		.dropdown,
		.dropdown2 {
			float: left;
			overflow: hidden;
		}

		.dropdown .dropbtn,
		.dropdown2 .dropbtn2 {
			cursor: pointer;
			margin: 0;
		}

		.dropdown-content,
		.dropdown-content2 {
		  display: none;
		  position: absolute;
		  background-color: #f9f9f9;
		  min-width: 160px;
		  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		  z-index: 999;
		}

		.dropdown-content a,
		.dropdown-content2 a {
		  float: none;
		  color: black;
		  padding: 12px 16px;
		  text-decoration: none;
		  display: block;
		  text-align: left;
		}

		.dropdown-content a:hover,
		.dropdown-content2 a:hover {
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

		.info-scrollbar::-webkit-scrollbar {
		  display: none;
		}

		.info-scrollbar {
		  -ms-overflow-style: none;
		  scrollbar-width: none;
		}

		.product-container::-webkit-scrollbar {
			width: .75em;
		}

		.product-container::-webkit-scrollbar-track {
			border: 1px solid #a0a0a0;
		}

		.product-container::-webkit-scrollbar-thumb {
			background-color: #a0a0a0;
			outline: 1px solid slategrey;
		}
	</style>
	<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.3.5/dist/alpine.min.js" defer></script>
	<livewire:styles>	
</head>
<body class="bg-gray-900">

	<div class="flashdata-subscribe" data-flash="{{ Session::get('subscribe') }}"></div>

	<nav>
		<div class="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-between w-full px-2 sm:px-2 md:px-2 lg:px-20 py-5 border-b border-gray-800">
			<div class="flex items-center mb-8 sm:mb-8 md:mb-8 lg:mb-0">
				<a href="/" class="text-3xl text-white font-semibold">Dev Store</a>
				@if(Auth::check())
				<div class="dropdown ml-6 block sm:block md:hidden lg:hidden">
					<button class="dropbtn"><img src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}" width="40" class="border border-gray-400 rounded-full" alt="Dev Store"></button>
					<div class="dropdown-content" id="myDropdown">
						<a href="/user">Control Panel</a>
						<a href="/logout">Logout</a>
					</div>
				</div>
				@endif
			</div>
			<ul class="flex items-center mb-8 sm:mb-8 md:mb-8 lg:mb-0">
				<li><a href="/" class="text-lg mr-10 text-white">Home</a></li>
				<li><a href="/products" class="text-lg mr-10 text-white">Products</a></li>
				@if(Session::get('log') == true)
					<li class="mr-10 flex-shrink-0">
						<a href="/cart" class="relative">
							<img src="{{ asset('img') }}/icons/cart.png" alt="Dev Store">
							@php
								$cartCount = DB::table('carts')->where('user_id', auth()->user()->id)->where('show_cart', 1)->count();
							@endphp
							@if($cartCount > 0)
								<div class="cart-counter absolute w-5 h-5 flex items-center justify-center text-sm rounded-full bg-red-600 text-white ml-4" style="margin-top: -8px; top: 8%;">{{ $cartCount }}</div>
							@endif
						</a>
					</li>
					<li class="mr-10 flex-shrink-0">
						<a href="/status">
							<img src="{{ asset('img') }}/icons/delivery.png" alt="Dev Store">
							@php
								$statusCount = DB::table('checkouts')->where('user_id', auth()->user()->id)->where('is_done', 0)->count();
							@endphp
							@if($statusCount > 0)
								<div class="absolute w-5 h-5 top-9 sm:top-9 md:top-9 lg:top-0 flex items-center justify-center text-sm rounded-full bg-red-600 text-white ml-5 mt-8 sm:mt-8 md:mt-8 lg:mt-6">{{ $statusCount }}</div>
							@endif
						</a>
					</li>
					<li class="mr-10 flex-shrink-0">
						<a href="/message">
							<img src="{{ asset('img') }}/icons/message.png" alt="Dev Store">
							@php
								$personalMessageCount = DB::table('messages')->where('user_id', auth()->user()->id)->where('is_read', 0)->count();
								$publicMessageCount = DB::table('public_messages')->where('user_id', auth()->user()->id)->where('is_read', 0)->count();
								$totalCount = $personalMessageCount + $publicMessageCount;
							@endphp
							@if($totalCount > 0)
								<div class="absolute w-5 h-5 top-9 sm:top-9 md:top-9 lg:top-0 flex items-center justify-center text-sm rounded-full bg-red-600 text-white ml-5 mt-8 sm:mt-8 md:mt-8 lg:mt-6">{{ $totalCount }}</div>
							@endif
						</a>
					</li>
					<li class="flex-shrink-0 hidden sm:hidden md:block lg:block">
						<div class="dropdown2">
							<button class="dropbtn2"><img src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}" width="40" class="border border-gray-400 rounded-full" alt=""></button>
							<div class="dropdown-content2" id="myDropdown">
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
	<footer class="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-5 md:gap-5 lg:gap-0 container mx-auto mb-3 px-5 sm:px-5 md:px-5 lg:px-0 text-center sm:text-center md:text-center lg:text-left">
		<div>
			<p class="text-3xl font-semibold text-white">Dev Store</p>
		</div>
		<div class="col-span-2 flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between">
			<div class="mb-10 sm:mb-10 md:mb-10 lg:mb-0">
				<ul>
					<li class="mb-3 text-white"><a href="/">Home</a></li>
					<li class="mb-3 text-white"><a href="/products">Products</a></li>
					<li class="mb-5 text-white"><a href="/login">Sign In</a></li>
					<li class="mb-3 text-white"><a href="/register" class="rounded bg-gray-800 px-4 py-2 transition duration-150 ease-in-out hover:bg-gray-700 text-white">Sign Up</a></li>
				</ul>
			</div>
			<div class="mb-10 sm:mb-10 md:mb-10 lg:mb-0">
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
							<button class="rounded bg-gray-800 text-white px-3 py-2 transition duration-150 ease-in-out hover:bg-gray-700">Send</button>
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

	const dropBtn2 = document.querySelector('.dropbtn2');
	dropBtn2.addEventListener('click', function() {
		document.querySelector('.dropdown-content2').classList.toggle('show');
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