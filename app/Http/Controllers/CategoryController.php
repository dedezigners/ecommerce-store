<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\DataResource;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return CategoryResource::collection(Category::latest()->get());
    }

    public function parentCategories()
    {
        return DataResource::collection(
            Category::where('parent', null)->get()
        );
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|alpha_dash|unique:categories',
            'parent' => 'integer|nullable|exists:categories,id',
            'image' => 'image|mimes:jpeg,bmp,png|max:1024'
        ]);

        $category = Category::create($request->all());
        return new CategoryResource($category);
    }

    public function update(Request $request, Category $category)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|alpha_dash|unique:categories,id,'.$category->id,
            'parent' => 'integer|nullable|exists:categories,id',
            'image' => 'image|mimes:jpeg,bmp,png|max:1024'
        ]);

        $update = $category->update($request->all());
        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
