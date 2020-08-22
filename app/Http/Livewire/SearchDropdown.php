<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Product;

class SearchDropdown extends Component
{
	public $search = '';

    public function render()
    {
    	$searchResults = [];

    	if (strlen($this->search) >= 2) {
    		$searchResults = Product::where('product_name', 'like', '%'.$this->search.'%')->get();
    	}

        return view('livewire.search-dropdown', [
        	'results' => collect($searchResults)->take(5),
        ]);
    }
}
