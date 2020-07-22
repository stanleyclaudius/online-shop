<div class="relative" x-data="{ isOpen: true }" @click.away="isOpen = false">
	<img src="{{ asset('img') }}/icons/search.png" alt="" class="absolute top-0 ml-3 mt-3" width="15">
	<div class="loader absolute top-0 right-0 mt-1 mr-3" wire:loading></div>
	<input wire:model.debounce.100ms="search" type="text" class="rounded-full w-64 h-10 px-10 border border-gray-400 focus:shadow-outline focus:outline-none" @focus="isOpen = true" @keydown.shift.tab="isOpen = false" @keydown="isOpen = true">
	@if (strlen($search) >= 2)
		<div class="absolute w-64 bg-white border border-gray-400 rounded mt-6" x-show.transition.opacity="isOpen" @keydown.escape.window="isOpen = false">
			@if ($results->count() > 0)
				<ul>
					@foreach($results as $result)
					<li class="p-3 border-b border-gray-400 hover:bg-gray-200">
						<a href="/detail/{{ $result->id }}" class="flex items-center" @if ($loop->last) @keydown.tab="isOpen = false" @endif>
							<img src="{{ asset('img') }}/products/{{ $result->product_image }}" alt="" width="80">
							<div class="ml-4">
								<p>{{ $result->product_name }}</p>
							</div>
						</a>
					</li>
					@endforeach
				</ul>
			@else
				<div class="p-3">No results for "{{ $search }}"</div>
			@endif
		</div>
	@endif
</div>