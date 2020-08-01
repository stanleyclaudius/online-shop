@if($reviews->count() == 0)
	<div class="w-full bg-gray-800 flex text-white items-center justify-center h-12">This product with current star rating, has not been review by anyone!</div>
@else
	@foreach($reviews as $review)
	<div class="user-review flex items-center border-b border-gray-700 px-2 pl-4 py-5 relative bg-gray-800">
		<img src="{{ asset('img') }}/avatar/{{ $review->user->avatar }}" alt="" width="85" class="rounded-full border border-gray-600">
		<div class="ml-6">
			<p class="text-xl text-white">{{ $review->name }}</p>
			<p class="text-sm mt-1 text-white" style="width: 42rem;">{{ $review->review }}</p>
			<div class="flex mt-2">
				@for($initStar = 0; $initStar < $review->star; $initStar++)
				<img src="{{ asset('img') }}/icons/star.png" alt="" width="18" class="mr-1">
				@endfor
			</div>
		</div>
		@php
			$date = $review->created_at->format('d M Y');
		@endphp
		<div class="absolute right-0 pr-5">
			<p class="text-sm text-gray-600">{{ $date }}</p>
		</div>
	</div>
	@endforeach
@endif