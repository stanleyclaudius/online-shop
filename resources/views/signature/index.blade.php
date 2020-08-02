@extends('template/admin')

@section('title', 'Dev Store | Signature Products')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Signature Products</h1>
</div> 
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Add Signature
</button>
<table class="table table-hover mt-4">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Product Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    @php
        $i = 1;
    @endphp
    @foreach($signatures as $signature)
    <tr>
      <th scope="row">{{ $i }}</th>
      <td>{{ $signature->product->product_name }}</td>
      <td>
          <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm" data-id="{{ $signature->id }}">Delete</a>
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
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Signature Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/signature" method="post">
            @csrf
            <div class="form-group">
                <label for="product_id">Product Name</label>
                <select class="form-control" id="product_id" name="product_id">
                    @foreach($products as $product)
                        <option value="{{ $product->id }}">{{ $product->product_name }}</option>
                    @endforeach
                </select>
                @if($errors->has('product_id'))
                    <small class="text-danger">{{ $errors->first('product_id') }}</small>
                @endif
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
                document.location.href="/signature/delete/" + dataID;
            }
        })
    });
</script>
@endsection