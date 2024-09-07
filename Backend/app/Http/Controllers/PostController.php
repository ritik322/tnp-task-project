<?php

namespace App\Http\Controllers;

use App\Models\Post;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::orderBy('updated_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
        ]);

        $post = new Post();
        $post->content = $request->content;
        $result = $post->save();

        if ($result) {
            return response()->json(['message' => 'Post created successfully!', 'success' => 'true'], 200);
        } else {
            return response()->json(['message' => 'Some Error Occured']);
        }
    }
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found']);
        }

        $post->delete();

        return response()->json(['message' => 'success'], status: 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required',
        ]);

        $post = Post::find($id);
        if (!$post)
            return response()->json(['message' => 'Post not found'], 404);

        $post->content = $request->content;
        $result = $post->save();

        if ($result) {
            return response()->json(['message' => 'success'], 200);
        } else {
            return response()->json(['message' => 'Some error occured']);
        }
    }

}

