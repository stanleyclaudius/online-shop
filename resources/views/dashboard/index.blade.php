<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="I'm Nadia Bella, an English - Indonesian Translator based in Melbourne, make your work worlwide by translate it, I'm here to help you translate your work from Indonesian to English or otherwise.">
    <meta name="author" content="Nadia Bella">

    <title>Dev Store | Dashboard</title>

    <link href='https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/css/froala_editor.pkgd.min.css' rel='stylesheet' type='text/css' />
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link href="{{ asset('css') }}/admin/sb-admin-2.min.css" rel="stylesheet">
</head>

<body id="page-top">
    <div class="flashdata" data-flash="{{ Session::get('admin') }}"></div>

    <div id="wrapper">
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
                <div class="sidebar-brand-icon rotate-n-15"></div>
                <div class="sidebar-brand-text mx-3">Dev Store</div>
            </a>
            @foreach($menus as $menu)
                <div class="sidebar-heading">
                    {{ $menu->menu }}
                </div>
                @foreach($menu->submenu as $submenu)
                <li class="nav-item active">
                    <a class="nav-link" href="{{ $submenu->link }}">
                        <img src="{{ asset('img') }}/icons/admin/{{ $submenu->icon }}" alt="" width="25" class="mr-2">
                        <span>{{ $submenu->submenu }}</span>
                    </a>
                </li>
                @endforeach
                <hr class="sidebar-divider">
            @endforeach
        </ul>

        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <ul class="navbar-nav ml-auto">
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ auth()->user()->name }}</span>
                                <img class="img-profile rounded-circle" src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}">
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="javascript:void(0)" data-toggle="modal" data-target="#profileModal">
                                    Profile
                                </a>
                                <a class="dropdown-item" href="javascript:void(0)" data-toggle="modal" data-target="#changePasswordModal">
                                    Settings
                                </a>
                                <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="javascript:void(0)" data-toggle="modal" data-target="#logoutModal">
                                        Logout
                                    </a>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div class="container-fluid">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/discount.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/laptop.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/dollar.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/star.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/arrived.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/unverified.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/icons/dashboard/arriving.png" alt="" width="50">
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
                                  <img src="{{ asset('img') }}/contents/{{ $j->jumbotron }}" alt="" width="130">
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
                </div>
            </div>
        </div>
    </div>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="/logout">Logout</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Modal-->
    <div class="modal fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Profile</h5>
                </div>
                <div class="modal-body">
                    <form action="/admin/editprofile/{{ auth()->user()->id }}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            @if($errors->has('name')) 
                                <small class="text-danger">{{ $errors->first('name') }}</small>
                                @else
                                <label for="name">Name</label>
                            @endif
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your name" value="{{ $user->name }}">
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-3">
                                        <img src="{{ asset('img') }}/avatar/{{ auth()->user()->avatar }}" alt="" class="img-thumbnail">
                                    </div>
                                    <div class="col-md-9">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="avatar" name="avatar">
                                            <label class="custom-file-label" for="avatar">Choose file</label>
                                            @if($errors->has('avatar'))
                                                <small class="text-danger">{{ $errors->first('avatar') }}</small>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Change Password Modal-->
    <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Change Password</h5>
                </div>
                <div class="modal-body">
                    <form action="/admin/changepassword/{{ auth()->user()->id }}" method="post">
                        @csrf
                        <div class="form-group">
                            @if($errors->has('old_password')) 
                                <small class="text-danger">{{ $errors->first('old_password') }}</small>
                            @else
                                <label for="old_password">Current Password</label>
                            @endif
                            <input type="password" name="old_password" class="form-control" id="old_password" placeholder="Current Password">
                        </div>
                        <div class="form-group">
                            @if($errors->has('password')) 
                                <small class="text-danger">{{ $errors->first('password') }}</small>
                            @else
                                <label for="password">New Password</label>
                            @endif
                            <input type="password" name="password" class="form-control" id="password" placeholder="New Password">
                        </div>
                        <div class="form-group">
                            @if($errors->has('password_confirmation')) 
                                <small class="text-danger">{{ $errors->first('password_confirmation') }}</small>
                            @else
                                <label for="password_confirmation">Password Confirmation</label>
                            @endif
                            <input type="password" name="password_confirmation" class="form-control" id="password_confirmation" placeholder="New Password Confirmation">
                        </div>
                </div>
                <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Send Newsletter  Modal -->
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

<script type='text/javascript' src='https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/js/froala_editor.pkgd.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="{{ asset('js') }}/admin/jquery.min.js"></script>
<script src="{{ asset('js') }}/admin/bootstrap.bundle.min.js"></script>
<script src="{{ asset('js') }}/admin/jquery.easing.min.js"></script>
<script src="{{ asset('js') }}/admin/sb-admin-2.min.js"></script>
<script src="{{ asset('js') }}/admin/flashdata.js"></script>
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
</body>
</html>
