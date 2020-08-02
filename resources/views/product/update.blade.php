@extends('template/admin')

@section('title', 'Dev Store | Update Product')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Product List</h1>
</div>
<div class="row">
    <div class="col-md-6">
        <form action="/product/update/{{ $product->id }}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="product_category">Product Category</label>
                <select class="form-control" id="product_category" name="product_category">
                    @php
                        $prodCat = DB::table('category_product')->where('product_id', $product->id)->get()->first();
                    @endphp
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" @if($category->id == $prodCat->category_id) selected @endif>{{ $category->category }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="product_name">Product Name</label>
                <input type="text" class="form-control" id="product_name" name="product_name" placeholder="Product Name" value="{{ $product->product_name }}">
                @if($errors->has('product_name'))
                    <small class="text-danger">{{ $errors->first('product_name') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="product_description">Product Description</label>
                <textarea class="form-control" id="product_description" rows="3" name="product_description">{{ $product->product_description }}</textarea>
                @if($errors->has('product_description'))
                    <small class="text-danger">{{ $errors->first('product_description') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="editor">Product Spesification</label>
                <textarea class="form-control" id="editor" rows="3" name="product_spec">{{ $product->product_spec }}</textarea>
                @if($errors->has('product_spec'))
                    <small class="text-danger">{{ $errors->first('product_spec') }}</small>
                @endif
            </div>
            <div class="form-group">
                <label for="product_price">Product Price</label>
                <input type="number" class="form-control" id="product_price" name="product_price" placeholder="Product Price" value="{{ $product->product_price }}">
                @if($errors->has('product_price'))
                    <small class="text-danger">{{ $errors->first('product_price') }}</small>
                @endif
            </div>
            <label for="product_image">Product Image</label>
            <div class="custom-file">
                <div class="row">
                    <div class="col-md">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="{{ asset('img') }}/products/{{ $product->product_image }}" alt="" class="img-thumbnail">
                            </div>
                            <div class="col-md-9">
                                <input type="file" class="custom-file-input" id="product_image" name="product_image">
                                <label class="custom-file-label" for="product_image">Choose file</label>
                                @if($errors->has('product_image'))
                                    <small class="text-danger">{{ $errors->first('product_image') }}</small>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div><br><br><br><br>
            <button type="submit" class="btn btn-primary mb-4">Save Changes</button>  
        </form>
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
</script>
@endsection