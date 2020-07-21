<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Product;
use App\Menu;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $categories = Category::all();
    	$menus = Menu::all();
    	return view('product/index', compact(['menus', 'products', 'categories']));
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

        $product = new Product;
        $product->category_id = $request->product_category;
        $product->product_name = $request->product_name;
        $product->product_description = $request->product_description;
        $product->product_spec = $request->product_spec;
        $product->product_price = $request->product_price;
        $product->save();

        if ($request->hasFile('product_image')) {
            $request->file('product_image')->move('img/products/', $request->file('product_image')->getClientOriginalName());
            $product->product_image = $request->file('product_image')->getClientOriginalName();
            $product->save();
        }

        return redirect()->back()->with('admin', 'product added');
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
        $product->delete();
        return redirect()->back()->with('admin', 'product deleted');
    }

    public function updateProduct($id)
    {
        $menus = Menu::all();
        $product = Product::find($id);
        $categories = Category::all();
        return view('product/update', compact(['menus', 'product', 'categories']));
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

        $product = Product::find($id);
        $product->update([
            'category_id' => $request->product_category,
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
    	$menus = Menu::all();
        $categories = Category::all();
    	return view('product/category', compact(['menus', 'categories']));
    }

    public function addCategory(Request $request)
    {
        $this->validate($request, [
            'category' => 'required|unique:categories',
        ]);
 
        Category::create([
            'category' => $request->category,
        ]);

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
        $menus = Menu::all();
        $category = Category::find($id);
        return view('product/update-category', compact(['category', 'menus']));
    }

    public function postUpdateCategory(Request $request, $id)
    {
        $this->validate($request, [
            'category' => 'required',
        ]);

        $category = Category::find($id);
        $category->update(['category' => $request->category]);

        return redirect('/product/category')->with('admin', 'category updated');
    }
}
