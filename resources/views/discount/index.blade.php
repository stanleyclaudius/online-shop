@extends('template/admin')

@section('title', 'Dev Store | Discount')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-3">
    <h1 class="h3 mb-0 text-gray-800">Discount</h1>
</div>
<button type="button" class="btn btn-primary mb-4" data-toggle="modal" data-target="#addDiscountModal">
    Add Discount
</button>
<table class="table table-hover">
  <thead>
    <tr class="text-center">
      <th scope="col">No</th>
      <th scope="col">Discount Code</th>
      <th scope="col">Value</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    @php
        $i = 1;
    @endphp
    @foreach($discounts as $discount)
    <tr class="text-center mx-auto">
      <th scope="row">{{ $i }}</th>
      <td>{{ $discount->code }}</td>
      <td>{{ $discount->value }}%</td>
      <td>
        <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm mr-3" data-id="{{ $discount->id }}">Delete</a>
      </td>
    </tr>
    @php
        $i++;
    @endphp
    @endforeach
  </tbody>
</table>
@endsection

@section('modal')
<div class="modal fade" id="addDiscountModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Discount</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/discount" method="post">
            @csrf
            <div class="form-group">
                @if($errors->has('code'))
                    <small class="text-danger">{{ $errors->first('code') }}</small>
                @else
                    <label for="code">Discount Code</label>
                @endif
                <input type="text" name="code" class="form-control" id="code" placeholder="Discount Code">
            </div>
            <div class="form-group">
                @if($errors->has('value'))
                    <small class="text-danger">{{ $errors->first('value') }}</small>
                @else
                    <label for="value">Discount Value</label>
                @endif
                <input type="number" name="value" class="form-control" id="value" placeholder="Discount value">
            </div>
      </div>
      <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
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
                document.location.href="/discount/delete/" + dataID;
            }
        })
    });
</script>
@endsection