@extends('template/main')

@section('meta')
<meta name="csrf-token" content="{{ csrf_token() }}">
@endsection

@section('title','Dev Store | Message')

@section('content')
<div class="container mx-auto mt-8 px-12">
	<p class="text-center text-4xl text-white">Message</p>
	<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-10 md:gap-10 lg:gap-16 mt-8">
		<div class="w-full h-64 border border-gray-700 rounded" style="overflow-y: auto;">
			<div class="w-full bg-gray-800 border-b border-gray-700 text-white px-3 py-3">
				<p>General Message</p>
			</div>
			<ul>
				@foreach($publicMessages as $publicMessage)
					<a href="javascript:void(0)" class="publicmessage-link" data-link="{{ $publicMessage->link_page }}" data-id="{{ $publicMessage->id }}">
						<li class="border-b border-gray-500 flex justify-between px-3 py-3 items-center">
							<div class="flex items-center">
								<div class="flex items-center justify-center mr-3">
									<img src="{{ asset('img') }}/icons/message/{{ $publicMessage->icon }}" alt="Dev Store" class="border border-gray-400 rounded-full w-10 h-10">
								</div>
								<div>
									@if($publicMessage->is_read == 0)
										<b class="flex items-center text-white">
											{{ $publicMessage->main_tagline }}
											<div class="ml-3 bg-red-600 font-semibold text-white" style="font-size: 11px; padding: 2px 9px; border-radius: 50px;">NEW</div>
										</b>
									@else
										<b class="text-white">{{ $publicMessage->main_tagline }}</b>
									@endif
									<p class="text-white">{{ $publicMessage->sub_tagline }}</p>
								</div>
							</div>
							<div class="icon-trash">
								<a href="/message/public/delete/{{ $publicMessage->id }}">
									<div class="trash-lid" style="background-color: #C5BFB6"></div>
									<div class="trash-container" style="background-color: #C5BFB6"></div>
									<div class="trash-line-1"></div>
									<div class="trash-line-2"></div>
									<div class="trash-line-3"></div>
								</a>
							</div>
						</li>
					</a>
				@endforeach
			</ul>
		</div>
		<div class="w-full h-64 border border-gray-500 rounded" style="overflow-y: auto;">
			<div class="w-full bg-gray-800 border-b border-gray-700 text-white px-3 py-3">
				<p>Review Message</p>
			</div>
			<ul>
				@foreach($messages as $message)
					<a href="javascript:void(0)" class="message-link" data-link="{{ $message->link_page }}" data-id="{{ $message->id }}">
						<li class="border-b border-gray-500 flex justify-between px-3 py-3 items-center">
							<div class="flex items-center">
								<div class="flex items-center justify-center mr-3">
									<img src="{{ asset('img') }}/icons/message/{{ $message->icon }}" alt="Dev Store" class="border border-gray-400 rounded-full w-10 h-10">
								</div>
								<div>
									@if($message->is_read == 0)
										<b class="flex text-white items-center">
											{{ $message->main_tagline }}
											<div class="ml-3 bg-red-600 font-semibold text-white" style="font-size: 11px; padding: 2px 9px; border-radius: 50px;">NEW</div>
										</b>
									@else
										<b class="text-white">{{ $message->main_tagline }}</b>
									@endif
									<p class="text-white">{{ $message->sub_tagline }}</p>
								</div>
							</div>
							<div class="icon-trash">
								<a href="/message/delete/{{ $message->id }}">
									<div class="trash-lid" style="background-color: #C5BFB6"></div>
									<div class="trash-container" style="background-color: #C5BFB6"></div>
									<div class="trash-line-1"></div>
									<div class="trash-line-2"></div>
									<div class="trash-line-3"></div>
								</a>
							</div>
						</li>
					</a>
				@endforeach
			</ul>
		</div>
	</div>
</div>
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script>
	$(document).ready(function() {
		$.ajaxSetup({
		    headers: {
		        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		    }
		});

		$('.publicmessage-link').click(function() {
			let dataLink = $(this).data('link');
			let dataID = $(this).data('id');
			$.ajax({
				url: '/message/public/update',
				type: 'post',
				data: {
					dataID: dataID
				},
				success: function() {
					document.location.href = dataLink;
				}
			});
		});

		$('.message-link').click(function() {
			let dataLink = $(this).data('link');
			let dataID = $(this).data('id');
			$.ajax({
				url: '/message/update',
				type: 'post',
				data: {
					dataID: dataID
				},
				success: function() {
					document.location.href = dataLink;
				}
			});
		});
	});
</script>
@endsection