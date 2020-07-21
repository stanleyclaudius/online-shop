<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		a {
			color: #fff !important;
			background-color: blue;
			padding: 8px 10px;
			transition: background-color .3s;
			border-radius: 3px;
			text-decoration: none;
		}
		a:hover {
			background-color: darkblue;
		}
	</style>
</head>
<body>

	<p style="font-size: 15px;">Hi, {{ $data['name'] }}.</p>
	<p style="font-size: 15px;">Click the button to reset your password.</p>

	<a href="http://127.0.0.1:8000/reset/{{ $data['token'] }}" target="_blank">Reset Password</a>

	<p style="font-size: 15px;">Thank You. <br> Dev Store Admin.</p>
	
</body>
</html>