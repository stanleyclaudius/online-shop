@extends('template/admin')

@section('title', 'Dev Store | Product Category')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Product Category</h1>
</div>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addCategoryModal">
  Add Category
</button>
<table class="table table-hover mt-4">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Category</th>
      <th scope="col">Section</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    @php
        $i = 1;
    @endphp
    @foreach($categories as $category)
    <tr>
      <th scope="row">{{ $i }}</th>
      <td>{{ $category->category }}</td>
      <td>{{ $category->section }}</td>
      <td>
          <a href="/product/category/update/{{ $category->id }}" class="btn btn-warning btn-sm mr-3">Update</a>
          <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm" data-id="{{ $category->id }}">Delete</a>
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
<div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="/product/category" method="post" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="category">Category</label>
                <input type="text" class="form-control" id="category" placeholder="Product category" name="category" value="{{ old('category') }}">
                @if($errors->has('category'))
                    <small class="text-danger">{{ $errors->first('category') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="section">Section</label>
                <input type="text" class="form-control" id="section" placeholder="Product section" name="section" value="{{ old('section') }}">
                @if($errors->has('section'))
                    <small class="text-danger">{{ $errors->first('section') }}</small>
                @endif
            </div>
            <label for="customFile">Category Icon</label>
            <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" name="icon">
                <label class="custom-file-label" for="customFile">Choose file</label>
                @if($errors->has('icon'))
                    <small class="text-danger">{{ $errors->first('icon') }}</small>
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
    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });

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
                document.location.href="/product/category/delete/" + dataID;
            }
        })
    });
</script>
@endsection