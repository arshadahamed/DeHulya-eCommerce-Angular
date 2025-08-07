<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
class ProductConntroller extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();

        if ($products->count() > 0) {
            return ProductResource::collection($products);
        } else {
            return response()->json(['message' => 'No record available'], 200);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'imgPrimary' => 'required|string|max:255',
            'imgSecondary' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'salePrice' => 'nullable|numeric|min:0|lte:price',
            'isNew' => 'boolean',
            'onSale' => 'boolean',
            'isStock' => 'boolean',
            'countdownDate' => 'nullable|date',
            'category_id' => ['required', 'integer', Rule::exists('categories', 'id')],
            'description' => 'nullable|string',
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
        ]);

        // Set default booleans if missing
        $validated = array_merge([
            'isNew' => false,
            'onSale' => false,
            'isStock' => true,
        ], $validated);

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => new ProductResource($product)
        ], 201);

    }


    public function show(Product $product)
    {
        return new ProductResource($product->load('category'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'imgPrimary' => 'sometimes|required|string|max:255',
            'imgSecondary' => 'nullable|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'salePrice' => 'nullable|numeric|min:0|lte:price',
            'isNew' => 'boolean',
            'onSale' => 'boolean',
            'isStock' => 'boolean',
            'countdownDate' => 'nullable|date',
            'category_id' => ['sometimes', 'required', 'integer', Rule::exists('categories', 'id')],
            'description' => 'nullable|string',
            'status' => ['nullable', Rule::in(['active', 'inactive'])],
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => new ProductResource($product)
        ], 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 200);
    }
}
