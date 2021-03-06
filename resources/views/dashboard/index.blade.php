@extends('template/admin')

@section('title', 'Dev Store | Dashboard')

@section('content')
<div class="d-sm-flex align-items-center justify-content-between mb-4">
  <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#sendNewsletterModal">
      Send Newsletter
  </button>
</div>

<!-- Content Row -->
<div class="row">

  <!-- Earnings (Monthly) Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">ongoing discount</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $discount > 1 ? $discount . ' Items' : $discount . ' Item' }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/discount.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Earnings (Monthly) Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-success shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">products count</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $product > 1 ? $product . ' Items' : $product . ' Item' }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/laptop.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Earnings (Monthly) Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-info shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">products sold</div>
             <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $sold > 1 ? $sold . ' Items' : $sold . ' Item' }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/dollar.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pending Requests Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">store review</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $review == 0 ? 0.0 : number_format($review, 1) }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/star.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row">

  <!-- Earnings (Monthly) Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">items arrived</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $complete > 1 ? $complete . ' Users' : $complete . ' User' }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/arrived.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Earnings (Monthly) Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-success shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">unverified payment</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $unverified > 1 ? $unverified . ' Users' : $unverified . ' User' }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/unverified.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Earnings (Monthly) Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-info shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">on shipping</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ $arriving > 1 ? $arriving . ' Users' : $arriving . ' User' }}</div>
          </div>
          <div class="col-auto">
            <img src="{{ asset('img') }}/icons/dashboard/arriving.png" alt="Dev Store">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Pending Requests Card Example -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
      <div class="card-body">
        <div class="row no-gutters align-items-center">
          <div class="col mr-2">
            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">post discount earning</div>
            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ 'Rp.' . number_format($postEarning, 2, ',', '.') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row mt-4 px-2">
  <div class="col-md-5" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px;">
    <h5 class="mb-3">Newsletter</h5>
    @if($newsletters->count() != 0)
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">NO</th>
          <th scope="col">TOPIC</th>
          <th scope="col">ACTION</th>
        </tr>
      </thead>
      <tbody>
        @php
          $i = 1;
        @endphp
        @foreach($newsletters as $newsletter)
        <tr>
          <th scope="row">{{ $i }}</th>
          <td>{{ strtoupper($newsletter->topic) }}</td>
          <td>
            <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm" data-id="{{ $newsletter->id }}">Delete</a>
          </td>
        </tr>
        @php
          $i++;
        @endphp
        @endforeach
      </tbody>
    </table>
    @else
      <div class="alert alert-danger" role="alert">
        No newsletter currently!
      </div>
    @endif
  </div>
  <div class="col-md-2"></div>
  <div class="col-md-5" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px;">
    <h5 class="mb-3">Home Jumbotron</h5>
    @if($jumbotron->count() != 0)
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">NO</th>
          <th scope="col">JUMBOTRON</th>
          <th scope="col">ACTION</th>
        </tr>
      </thead>
      <tbody>
        @php
          $i = 1;
        @endphp
        @foreach($jumbotron as $j)
        <tr>
          <th scope="row">{{ $i }}</th>
          <td>
            <img src="{{ asset('img') }}/contents/{{ $j->jumbotron }}" alt="Dev Store" width="130">
          </td>
          <td>
            <a href="/jumbotron/update/{{ $j->id }}" class="btn btn-warning btn-sm">Update</a>
          </td>
        </tr>
        @php
          $i++;
        @endphp
        @endforeach
      </tbody>
    </table>
    @else
      <div class="alert alert-danger" role="alert">
        No jumbotron found!
      </div>
    @endif
  </div>
</div>
<br>
@endsection

@section('modal')
<div class="modal fade" id="sendNewsletterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Send Newsletter</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="/send/newsletter" method="post">
                    @csrf
                    <div class="form-group">
                        <label for="topic">Newsletter Topic</label>
                        <input type="text" name="topic" class="form-control" id="topic" placeholder="Newsletter topic">
                        @if($errors->has('topic'))
                          <small class="text-danger">{{ $errors->first('topic') }}</small>
                        @endif
                    </div>
                    <textarea name="newsletter" id="editor"></textarea>
                    @if($errors->has('newsletter')) 
                        <small class="text-danger">{{ $errors->first('newsletter') }}</small>
                    @endif
            </div>
            <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Send</button>
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
    new FroalaEditor('#editor', {toolbarInline: false});

    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    })

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
                document.location.href="/newsletter/delete/" + dataID;
            }
        })
    });
</script>
@endsection