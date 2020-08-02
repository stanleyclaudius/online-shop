@extends('template/admin')

@section('title', 'Dev Store | Post Receipt')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Post Receipt</h1>
</div> 
<div class="row">
    <div class="col-md-6">
        <form action="/order/receipt/{{ $checkout->id }}" method="post">
            @csrf
            <div class="form-group">
                <label for="receipt">Shipping Tracker ID</label>
                <input type="text" class="form-control" id="receipt" placeholder="Shipping Tracker ID" name="receipt">
                @if($errors->has('receipt'))
                    <small class="text-danger">{{ $errors->first('receipt') }}</small>
                @endif
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
    </div>
</div>
@endsection