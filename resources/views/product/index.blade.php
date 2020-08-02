@extends('template/admin')

@section('title', 'Dev Store | Product List')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Product List</h1>
</div>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Add Product
</button>
<table class="table table-hover mt-4">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Product Category</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Price</th>
      <th scope="col">Rating</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    @php
        $i = 1;
    @endphp
    @foreach($products as $product)
    @php
        $price = number_format($product->product_price, 2, ',', '.');
    @endphp
    <tr>
      <th scope="row">{{ $i }}</th>
      <td>
          @foreach($product->category as $cat)
            {{ $cat->category }}
          @endforeach
      </td>
      <td>{{ $product->product_name }}</td>
      <td>{{ 'Rp.' . $price }}</td>
      @if($product->product_rating == 0)
        <td>0</td>
      @else
        <td>{{ $product->product_rating }}</td>
      @endif
      <td>
          <a href="/product/update/{{ $product->id }}" class="btn btn-warning btn-sm mr-3">Update</a>
          <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm" data-id="{{ $product->id }}">Delete</a>
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
        <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/product/add" method="post" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="product_category">Product Category</label>
                <select class="form-control" id="product_category" name="product_category">
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}">{{ $category->category }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="product_name">Product Name</label>
                <input type="text" class="form-control" id="product_name" placeholder="Product Name" name="product_name" value="{{ old('product_name') }}">
                @if($errors->has('product_name'))
                    <small class="text-danger">{{ $errors->first('product_name') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="product_description">Product Description</label>
                <textarea class="form-control" id="product_description" rows="3" name="product_description" placeholder="Product Description">{{ old('product_description') }}</textarea>
                @if($errors->has('product_description'))
                    <small class="text-danger">{{ $errors->first('product_description') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="editor">Product Spesification</label>
                <textarea class="form-control" id="editor" name="product_spec" rows="3">{{ old('product_spec') }}</textarea>
                @if($errors->has('product_spec'))
                    <small class="text-danger">{{ $errors->first('product_spec') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="product_price">Product Price</label>
                <input type="number" class="form-control" id="product_price" placeholder="Product Price" name="product_price" value="{{ old('product_price') }}">
                @if($errors->has('product_price'))
                    <small class="text-danger">{{ $errors->first('product_price') }}</small>
                @endif
            </div>
            <label for="product_image">Product Image</label>
            <div class="custom-file">
                <input type="file" class="custom-file-input" id="product_image" name="product_image" value="{{ old('product_image') }}">
                <label class="custom-file-label" for="product_image">Choose file</label>
                @if($errors->has('product_image'))
                    <small class="text-danger">{{ $errors->first('product_image') }}</small>
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
<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/js/froala_editor.pkgd.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script>
    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    })

    new FroalaEditor('#editor', {toolbarInline: false});

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
                document.location.href="/product/delete/" + dataID;
            }
        })
    });
</script>
@endsection