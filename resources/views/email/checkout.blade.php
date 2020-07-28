<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		table, th, td {
			border: 1px solid black;
		}
	</style>
</head>
<body>

	<h1>Thanks for buying our products!</h1>
	<h3>Below is your payment detail:</h3>

	<table cellspacing="0" cellpadding="10">
		<thead>
			<tr>
				<th>Name</th>
				<th>Phone</th>
				<th>Order Code</th>
				<th>Total</th>
				<th>Discount</th>
				<th>Total After Discount</th>
				<th>Country</th>
				<th>Province</th>
				<th>City</th>
				<th>Address</th>
			</tr>
		</thead>
		<tbody>
			@php
				$total = number_format($data['total'], 2, ',', '.');
				$discount = number_format($data['discount'], 2, ',', '.');
				$afterPrice = $data['total'] - $data['discount'];
				$formatPrice = number_format($afterPrice, 2, ',', '.');
			@endphp
			<tr>
				<td>{{ $data['name'] }}</td>
				<td>{{ $data['phone'] }}</td>
				<td>{{ $data['order_code'] }}</td>
				<td>{{ 'Rp.' . $total }}</td>
				<td>{{ 'Rp.' . $discount }}</td>
				<td>{{ 'Rp.' . $formatPrice }}</td>
				<td>{{ $data['country'] }}</td>
				<td>{{ $data['province'] }}</td>
				<td>{{ $data['city'] }}</td>
				<td>{{ $data['address'] }}</td>
			</tr>
		</tbody>
	</table>

	<h2 style="text-align: center;">Please transfer the "Total After Discount" ammount to below bank number</h2>
	<h1 style="text-align: center;">1234 5687 7788</h1>
	<h1 style="text-align: center;">Dev Store, BCA</h1>

	<p style="color: red">Payment only available for less than 48 hours or 2 day, more than 2 day, we'll assumed that you cancel your order even you made payment after 2 days!</p>

	<p style="font-weight: bold">Thank You,</p>
	<p style="font-weight: bold">Dev Store Admin</p>
	<p style="font-weight: bold">Have a nice day :)</p>

</body>
</html>