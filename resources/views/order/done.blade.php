@extends('template/admin')

@section('title', 'Dev Store | Done Order')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Done Order List</h1>
</div> 
<table class="table table-hover">
  <thead>
    <tr class="text-center">
      <th scope="col">No</th>
      <th scope="col">Order Code</th>
      <th scope="col">Name</th>
      <th scope="col">Total</th>
      <th scope="col">Receipt</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    @php
        $i = 1;
    @endphp
    @foreach($checkouts as $checkout)
    @php
        $afterDiscountPrice = $checkout->total - $checkout->discount;
        $price = number_format($afterDiscountPrice, 2, ',', '.');
    @endphp
    <tr class="text-center mx-auto">
      <th scope="row">{{ $i }}</th>
      <td><a href="/order/invoice/{{ $checkout->id }}">{{ $checkout->order_code }}</a></td>
      <td>{{ $checkout->shipping->name }}</td>
      <td>{{ 'Rp.' . $price }}</td>
      @if($checkout->status == 0)
        <td class="text-danger font-weight-bold">UNVERIFIED</td>
      @else
        @if($checkout->receipt == null)
            <td class="text-warning font-weight-bold">ON PROCESS</td>
        @else 
            <td>{{ $checkout->receipt }}</td>
        @endif
      @endif
      @if($checkout->status == 0)
        <td class="text-danger font-weight-bold">UNVERIFIED</td>
      @else
        @if($checkout->is_done == 0)
            <td class="text-success font-weight-bold">VERIFIED</td>
        @else
            <td class="text-success font-weight-bold">DONE</td>
        @endif
      @endif
      <td>
        <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm" data-id="{{ $checkout->id }}">Delete</a>
      </td>
    </tr>
    @php
        $i++;
    @endphp
    @endforeach
  </tbody>
</table>
@endsection

@section('script')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
    $('.delete-btn').click(function() {
        let dataID = $(this).data('id');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                document.location.href="/order/delete/" + dataID;
            }
        })
    });
</script>
@endsection