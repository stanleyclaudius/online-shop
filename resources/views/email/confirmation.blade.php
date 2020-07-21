<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

	<p style="font-size: 15px;">Hi, {{ $data['name'] }}.</p>
	<p style="font-size: 15px;">This is your verification code for <b>Dev Store</b> account.</p>

	<p style="font-size: 40px; font-weight: bold; letter-spacing: 2px;">{{ $data['token'] }}</p>

	<p style="font-size: 15px;">Thank You. <br> Dev Store Admin.</p>
	
</body>
</html>