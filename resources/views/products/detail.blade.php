@extends('template/main')

@section('meta')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('title', 'Dev Store | Products Detail')

@section('content')
<div class="flashdata" data-flash="{{ Session::get('detail') }}"></div>
<div class="container mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 mt-12 px-12">
	<img src="{{ asset('img') }}/products/{{ $product->product_image }}" alt="Dev Store" style="width: 16rem;">
	<div class="ml-0 sm:ml-0 md:ml-0 lg:ml-16 col-span-4 mt-6 sm:mt-6 md:mt-6 lg:mt-0">
		<p class="text-3xl text-white">{{ $product->product_name }}</p>
		<p class="text-gray-500 mt-2">{{ $product->product_description }}</p>
		<p class="mt-5 text-white font-semibold text-xl mb-3">Spesification:</p>
		<div class="text-white spec-list">{!! $product->product_spec !!}</div>
		@php
            $price = number_format($product->product_price, 2, ',', '.');
        @endphp
		<p class="text-white text-2xl mt-4 mb-6">{{ 'Rp.' . $price }}</p>
		@if(Session::get('log') == true)
			<a href="javascript:void(0)" class="addtocart-btn bg-gray-800 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-700 rounded" data-product="{{ $product->id }}" data-id="{{ auth()->user()->id }}">Add To Cart</a>
		@else
			<a href="/login" class="bg-gray-800 text-white px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-700 rounded">Add To Cart</a>
		@endif
	</div>
</div>

<hr style="width: 95%; margin: 45px auto 45px auto; border-top: 1px solid #4a5568;">

<div class="container mx-auto mb-10 px-5 sm:px-5 md:px-5 lg:px-0">
	<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8">
		<a href="javascript:void(0)" class="rating-section get-all-rating" data-product="{{ $product->id }}">
			<div class="bg-white w-full h-20 flex flex-col items-center justify-center active text-black">
				<p class="font-semibold text-lg">RATING ({{ $reviews->count() }})</p>
				@if($reviews->count() == 0)
					<p class="text-3xl text-orange-600 font-bold">0.0</p>
				@else
					@php
						$userReviewCount = $reviews->count();
						$finalRating = DB::table('reviews')->where('product_id', $product->id)->where('is_review', 1)->sum('star');
						$totalRating = $finalRating/$userReviewCount;
					@endphp
					<p class="text-3xl text-orange-600 font-bold">{{ $totalRating }}</p>
				@endif
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section rating-star-review" data-product="{{ $product->id }}" data-star="1">
			<div class="bg-white w-full h-20 flex flex-col items-center justify-center text-black">
				@php
					$oneStar = DB::table('reviews')->where('product_id', $product->id)->where('is_review', 1)->where('star', 1)->get()->count();
				@endphp
				<p class="font-bold hidden sm:hidden md:hidden lg:block">RATING ({{ $oneStar }})</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<p class="font-bold block sm:block md:block lg:hidden">({{ $oneStar }})</p>
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section rating-star-review"  data-product="{{ $product->id }}" data-star="2">
			<div class="bg-white w-full h-20 flex flex-col items-center justify-center text-black">
				@php
					$twoStar = DB::table('reviews')->where('product_id', $product->id)->where('is_review', 1)->where('star', 2)->get()->count();
				@endphp
				<p class="font-bold hidden sm:hidden md:hidden lg:block">RATING ({{ $twoStar }})</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<p class="font-bold block sm:block md:block lg:hidden">({{ $twoStar }})</p>
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section rating-star-review" data-product="{{ $product->id }}" data-star="3">
			<div class="bg-white w-full h-20 flex flex-col items-center justify-center text-black">
				@php
					$threeStar = DB::table('reviews')->where('product_id', $product->id)->where('is_review', 1)->where('star', 3)->get()->count();
				@endphp
				<p class="font-bold hidden sm:hidden md:hidden lg:block">RATING ({{ $threeStar }})</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<p class="font-bold block sm:block md:block lg:hidden">({{ $threeStar }})</p>
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section rating-star-review" data-product="{{ $product->id }}" data-star="4">
			<div class="bg-white w-full h-20 flex flex-col items-center justify-center text-black">
				@php
					$fourStar = DB::table('reviews')->where('product_id', $product->id)->where('is_review', 1)->where('star', 4)->get()->count();
				@endphp
				<p class="font-bold hidden sm:hidden md:hidden lg:block">RATING ({{ $fourStar }})</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<p class="font-bold block sm:block md:block lg:hidden">({{ $fourStar }})</p>
				</div>
			</div>
		</a>
		<a href="javascript:void(0)" class="rating-section rating-star-review" data-product="{{ $product->id }}" data-star="5">
			<div class="bg-white w-full h-20 flex flex-col items-center justify-center text-black">
				@php
					$fiveStar = DB::table('reviews')->where('product_id', $product->id)->where('is_review', 1)->where('star', 5)->get()->count();
				@endphp
				<p class="font-bold hidden sm:hidden md:hidden lg:block">RATING ({{ $fiveStar }})</p>
				<div class="flex mt-2">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<img src="{{ asset('img') }}/icons/star.png" alt="" width="25" class="mr-1">
					<p class="font-bold block sm:block md:block lg:hidden">({{ $fiveStar }})</p>
				</div>
			</div>
		</a>
	</div>
</div>

<div class="container mx-auto mb-20 px-5 sm:px-5 md:px-5 lg:px-0">
	<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6 gap-8">
		@if(Session::get('log') == true)
			@php
				$result = DB::table('reviews')->where('user_id', auth()->user()->id)->where('product_id', $product->id)->where('is_review', 0)->get()->first();
			@endphp
			@if($result != null)
				<div>
					<a href="javascript:void(0)" class="open-review-box flex items-center flex-inline bg-orange p-2 bg-gray-800 rounded text-white justify-center transition ease-in-out duration-150 hover:bg-gray-700">Add Review</a>
				</div>
			@endif
		@endif
		@if(Session::get('log') == true)
			@if($result != null)
				<div class="col-span-5 w-full">
			@else
				<div class="col-span-6 w-full">	
			@endif
		@else
			<div class="col-span-6 w-full">
		@endif
			<div class="review-box w-full bg-gray-800 mb-10 px-2 pl-4 py-5 pr-4" style="display: none;">
				<p class="text-lg font-semibold tracking-wider mb-6 text-white">Post Your Review</p>
				<form action="/review" method="post">
					@csrf
					<input type="hidden" name="productID" value="{{ $product->id }}">
					<div class="grid grid-cols-2 gap-10">
						<div class="flex flex-col inline-flex mr-5">
							<label for="name" class="text-white">Your name</label>
							<input type="text" name="name" id="name" placeholder="Your name" class="text-white bg-gray-700 border border-gray-600 pl-2 rounded px-2 py-1 mt-3 focus:outline-none focus:shadow-outline">
							@if($errors->has('name'))
								<small class="text-red-600">{{ $errors->first('name') }}</small>
							@endif
						</div>
						<div class="flex flex-col inline-flex">
							<label for="email" class="text-white">Your email</label>
							<input type="text" name="email" id="email" placeholder="Your email" class="text-white bg-gray-700 border border-gray-600 pl-2 rounded px-2 py-1 mt-3 focus:outline-none focus:shadow-outline">
							@if($errors->has('email'))
								<small class="text-red-600">{{ $errors->first('email') }}</small>
							@endif
						</div>
					</div>
					<div class="flex flex-col inline-flex mt-6 w-full">
						<label for="review" class="text-white">Your review</label>
						<textarea name="review" id="review" class="text-white bg-gray-700 border border-gray-600 pl-2 rounded px-2 py-1 mt-3 focus:outline-none focus:shadow-outline"></textarea>
						@if($errors->has('review'))
							<small class="text-red-600">{{ $errors->first('review') }}</small>
						@endif
					</div>
					<div class="mt-4">
						<select name="starrating">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
					<button type="submit" class="bg-gray-700 px-2 py-1 text-white rounded mt-5 transition duration-150 ease-in-out hover:bg-gray-600">Submit</button>
				</form>
			</div>
			<div class="review-section-container">
				@if($reviews->count() == 0)
					<div class="w-full bg-gray-800 text-white flex items-center justify-center h-12">This product has not been review by anyone!</div>
				@else
					@foreach($reviews as $review)
					<div class="user-review flex items-center border-b border-gray-700 px-2 pl-4 py-5 relative bg-gray-800">
						<img src="{{ asset('img') }}/avatar/{{ $review->user->avatar }}" alt="" width="85" class="rounded-full border border-gray-600">
						<div class="ml-6">
							<p class="text-xl text-white">{{ $review->name }}</p>
							<p class="text-sm mt-1 text-white" style="width: 42rem;">{{ $review->review }}</p>
							<div class="flex mt-2 mb-3">
								@for($initStar = 0; $initStar < $review->star; $initStar++)
								<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
								@endfor
							</div>
							<p class="text-sm text-gray-600 block sm:block md:block lg:hidden">{{ $review->created_at->format('d M Y') }}</p>
						</div>
						@php
							$date = $review->created_at->format('d M Y');
						@endphp
						<div class="absolute right-0 pr-5 hidden sm:hidden md:hidden lg:block">
							<p class="text-sm text-gray-600">{{ $date }}</p>
						</div>
					</div>
					@endforeach
				@endif
			</div>
		</div>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="{{ asset('js') }}/detail.js"></script>
@endsection