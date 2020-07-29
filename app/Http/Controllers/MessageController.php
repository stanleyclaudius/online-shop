<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PublicMessage;
use App\Message;

class MessageController extends Controller
{
    public function index()
    {   
        $publicMessages = PublicMessage::where('user_id', auth()->user()->id)->get();
    	$messages = Message::where('user_id', auth()->user()->id)->get();
    	return view('message/index', compact(['messages', 'publicMessages']));
    }

    public function deleteMessage($id)
    {
    	$message = Message::find($id);
    	$message->delete();
    	return redirect()->back();
    }

    public function deletePublicMessage($id)
    {
        $publicMessage = PublicMessage::find($id);
        $publicMessage->delete();
        return redirect()->back();
    }

    public function updateMessage(Request $request)
    {
        $message = Message::find($request->dataID);
        $message->update(['is_read' => 1]);
    }

    public function updatePublicMessage(Request $request)
    {
        $publicMessage = PublicMessage::find($request->dataID);
        $publicMessage->update(['is_read' => 1]);
    }
}
