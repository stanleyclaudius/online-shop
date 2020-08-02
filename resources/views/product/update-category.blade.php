@extends('template/admin')

@section('title', 'Dev Store | Update Category')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Update Category</h1>
</div>
<div class="row">
    <div class="col-md-6">
        <form action="/product/category/update/{{ $category->id }}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="category">Product Category</label>
                <input type="text" class="form-control" id="category" name="category" placeholder="Product Category" value="{{ $category->category }}">
                @if($errors->has('category'))
                    <small class="text-danger">{{ $errors->first('category') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="section">Product Section</label>
                <input type="text" class="form-control" id="section" name="section" placeholder="Product Section" value="{{ $category->section }}">
                @if($errors->has('section'))
                    <small class="text-danger">{{ $errors->first('section') }}</small>
                @endif
            </div>
            <div class="row mt-4">
                <div class="col-md-3">
                    <img src="{{ asset('img') }}/icons/category/{{ $category->icon }}" alt="" class="img-thumbnail">
                </div>
                <div class="col-md-9">
                    <label for="customFile">Category Icon</label>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="customFile" name="icon">
                        <label class="custom-file-label" for="customFile">Choose file</label>
                        @if($errors->has('icon'))
                            <small class="text-danger">{{ $errors->first('icon') }}</small>
                        @endif
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-4">Save Changes</button>
        </form>
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
</script>
@endsection
