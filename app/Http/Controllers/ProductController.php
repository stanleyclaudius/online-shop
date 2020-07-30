<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Signature;
use App\Category;
use App\Product;
use App\Menu;
use App\User;

class ProductController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->user()->id);
        $products = Product::orderBy('id', 'DESC')->get();
        $categories = Category::all();
    	$menus = Menu::all();
    	return view('product/index', compact(['menus', 'products', 'categories', 'user']));
    }

    public function addProduct(Request $request)
    {
        $this->validate($request, [
            'product_name' => 'required',
            'product_description' => 'required',
            'product_spec' => 'required',
            'product_price' => 'required',
            'product_image' => 'required|mimes:jpg,jpeg,png',
        ]);

        $product = Product::create([
            'product_name' => $request->product_name,
            'product_description' => $request->product_description,
            'product_spec' => $request->product_spec,
            'product_price' => $request->product_price,
        ]);

        $product->category()->attach($request->product_category);

        if ($request->hasFile('product_image')) {
            $request->file('product_image')->move('img/products/', $request->file('product_image')->getClientOriginalName());
            $product->product_image = $request->file('product_image')->getClientOriginalName();
            $product->save();
        }

        return redirect()->back()->with('admin', 'product added');
    }

    public function deleteProduct($id)
    {
        $signature = Signature::where('product_id', $id);
        $signature->delete();
        $product = Product::find($id);
        $product->delete();
        return redirect()->back()->with('admin', 'product deleted');
    }

    public function updateProduct($id)
    {
        $user = User::find(auth()->user()->id);
        $menus = Menu::all();
        $product = Product::find($id);
        $categories = Category::all();
        return view('product/update', compact(['menus', 'product', 'categories', 'user']));
    }

    public function postUpdateProduct(Request $request, $id)
    {
        $this->validate($request, [
            'product_name' => 'required',
            'product_description' => 'required',
            'product_spec' => 'required',
            'product_price' => 'required',
            'product_image' => 'mimes:jpg,jpeg,png',
        ]);

        DB::table('category_product')->where('product_id', $id)->update([
            'category_id' => $request->product_category,
        ]);

        $product = Product::find($id);
        $product->update([
            'product_name' => $request->product_name,
            'product_description' => $request-> product_description,
            'product_spec' => $request->product_spec,
            'product_price' => $request->product_price,
        ]);

        if ($request->hasFile('product_image')) {
            $request->file('product_image')->move('img/products/', $request->file('product_image')->getClientOriginalName());
            $product->product_image = $request->file('product_image')->getClientOriginalName();
            $product->save();
        } else {
            $product->product_image = $product->product_image;
            $product->save();
        }

        return redirect('/product')->with('admin', 'product updated');
    }

    public function category()
    {
        $user = User::find(auth()->user()->id);
    	$menus = Menu::all();
        $categories = Category::all();
    	return view('product/category', compact(['menus', 'categories', 'user']));
    }

    public function addCategory(Request $request)
    {
        $this->validate($request, [
            'category' => 'required|unique:categories',
            'section' => 'required',
            'icon' => 'required|mimes:jpg,png,jpeg',
        ]);
 
        $category = Category::create([
            'category' => $request->category,
            'section' => $request->section,
        ]);

        if ($request->hasFile('icon')) {
            $request->file('icon')->move('img/icons/category/', $request->file('icon')->getClientOriginalName());
            $category->icon = $request->file('icon')->getClientOriginalName();
            $category->save();
        }

        return redirect()->back()->with('admin', 'category added');
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);
        $category->delete();
        return redirect()->back()->with('admin', 'category deleted');
    }

    public function updateCategory($id)
    {
        $user = User::find(auth()->user()->id);
        $menus = Menu::all();
        $category = Category::find($id);
        return view('product/update-category', compact(['category', 'menus', 'user']));
    }

    public function postUpdateCategory(Request $request, $id)
    {
        $this->validate($request, [
            'category' => 'required',
            'section' => 'required',
            'icon' => 'mimes:jpg,jpeg,png',
        ]);

        $category = Category::find($id);
        $category->update(['category' => $request->category, 'section' => $request->section]);

        if ($request->hasFile('icon')) {
            $request->file('icon')->move('img/icons/category/', $request->file('icon')->getClientOriginalName());
            $category->icon = $request->file('icon')->getClientOriginalName();
            $category->save();
        } else {
            $category->icon = $category->icon;
            $category->save();
        }

        return redirect('/product/category')->with('admin', 'category updated');
    }
}
