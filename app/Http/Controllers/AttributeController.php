<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Http\Resources\DataResource;

class AttributeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return DataResource::collection(Attribute::latest()->get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:attributes',
            'tags' => 'array'
        ]);

        $attribute = Attribute::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'tags' => json_encode($request->tags)
        ]);

        return new DataResource($attribute);
    }

    public function update(Request $request, Attribute $attribute)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:attributes,id,'.$attribute->id,
            'tags' => 'array'
        ]);

        $attribute->name = $request->name;
        $attribute->slug = $request->slug;
        $attribute->tags = json_encode($request->tags);
        $attribute->save();
        return new DataResource($attribute);
    }

    public function destroy(Attribute $attribute)
    {
        $attribute->delete();
        return response()->json(null, 204);
    }
}
