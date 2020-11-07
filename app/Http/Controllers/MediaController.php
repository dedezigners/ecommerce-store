<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use App\Http\Resources\DataResource;
use App\Http\Resources\MediaResource;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return MediaResource::collection(Media::latest()->get());
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'media_files' => 'required|array'
        ]);
        
        $media = [];
        foreach ($request->media_files as $file) {
            $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->extension();
            $path = $file->store('uploads');

            $createMedia = Media::create([
                'name' => $name,
                'type' => $extension,
                'path' => $path
            ]);
            array_push($media, $createMedia);
        }

        return MediaResource::collection($media);
        
    }
}
