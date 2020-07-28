<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="I'm Nadia Bella, an English - Indonesian Translator based in Melbourne, make your work worlwide by translate it, I'm here to help you translate your work from Indonesian to English or otherwise.">
    <meta name="author" content="Nadia Bella">

    <title>Dev Store | Order List</title>

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
                        <h1 class="h3 mb-0 text-gray-800">Order List</h1>
                    </div> 
                    <table class="table table-hover">
                      <thead>
                        <tr class="text-center">
                          <th scope="col">No</th>
                          <th scope="col">Order Code</th>
                          <th scope="col">Name</th>
                          <th scope="col">Total</th>
                          <th scope="col">Receipt</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        @php
                            $i = 1;
                        @endphp
                        @foreach($checkouts as $checkout)
                        @php
                            $afterDiscountPrice = $checkout->total - $checkout->discount;
                            $price = number_format($afterDiscountPrice, 2, ',', '.');
                        @endphp
                        <tr class="text-center mx-auto">
                          <th scope="row">{{ $i }}</th>
                          <td><a href="/order/invoice/{{ $checkout->id }}">{{ $checkout->order_code }}</a></td>
                          <td>{{ $checkout->shipping->name }}</td>
                          <td>{{ 'Rp.' . $price }}</td>
                          @if($checkout->status == 0)
                            <td class="text-danger font-weight-bold">UNVERIFIED</td>
                          @else
                            @if($checkout->receipt == null)
                                <td class="text-warning font-weight-bold">ON PROCESS</td>
                            @else 
                                <td>{{ $checkout->receipt }}</td>
                            @endif
                          @endif
                          @if($checkout->status == 0)
                            <td class="text-danger font-weight-bold">UNVERIFIED</td>
                          @else
                            @if($checkout->is_done == 0)
                                <td class="text-success font-weight-bold">VERIFIED</td>
                            @else
                                <td class="text-success font-weight-bold">DONE</td>
                            @endif
                          @endif
                          <td>
                            <a href="/order/verified/{{ $checkout->id }}" class="btn btn-success btn-sm mr-3">Verifed</a>
                            <a href="/order/receipt/{{ $checkout->id }}" class="btn btn-primary btn-sm mr-3">Post Receipt</a>
                            <a href="/order/done/{{ $checkout->id }}" class="btn btn-warning btn-sm mr-3">Done</a>
                            <a href="javascript:void(0)" class="delete-btn btn btn-danger btn-sm" data-id="{{ $checkout->id }}">Delete</a>
                          </td>
                        </tr>
                        @php
                            $i++;
                        @endphp
                        @endforeach
                      </tbody>
                    </table>
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

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="{{ asset('js') }}/admin/jquery.min.js"></script>
<script src="{{ asset('js') }}/admin/bootstrap.bundle.min.js"></script>
<script src="{{ asset('js') }}/admin/jquery.easing.min.js"></script>
<script src="{{ asset('js') }}/admin/sb-admin-2.min.js"></script>
<script src="{{ asset('js') }}/admin/flashdata.js"></script>
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
                document.location.href="/order/delete/" + dataID;
            }
        })
    });
</script>
</body>
</html>