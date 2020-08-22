@extends('template/admin')

@section('title', 'Dev Store | Jumbotron')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Edit Home Jumbotron</h1>
</div>
<div class="row">
  <div class="col-md-6">
    <form action="/jumbotron/update/{{ $jumbotron->id }}" method="post" enctype="multipart/form-data">
      @csrf
      <div class="row">
        <div class="col-md-3">
          <img src="{{ asset('img') }}/contents/{{ $jumbotron->jumbotron }}" alt="Dev Store" class="img-thumbnail" width="200">
        </div>
        <div class="col-md-9">
          <label for="">Jumbotron Image</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" name="jumbotron">
            <label class="custom-file-label" for="customFile">Choose file</label>
            @if($errors->has('jumbotron'))
                <small class="text-danger">{{ $errors->first('jumbotron') }}</small>
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
    })
</script>
@endsection