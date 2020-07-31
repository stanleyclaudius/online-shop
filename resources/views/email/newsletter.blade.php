<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

	{!! $data['getNews'] !!}
	
	<p>Article created at : {{ $data['postDate']->format('d M Y') }}</p>

	<p style="line-height: 28px;">Thank You, <br> Dev Store Admin <br>Have a nice day.</p>
	
</body>
</html>