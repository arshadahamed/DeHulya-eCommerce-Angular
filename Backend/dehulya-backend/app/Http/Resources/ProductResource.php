<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'imgPrimary' => $this->imgPrimary,
            'imgSecondary' => $this->imgSecondary,
            'price' => $this->price,
            'salePrice' => $this->salePrice,
            'isNew' => $this->isNew,
            'onSale' => $this->onSale,
            'isStock' => $this->isStock,
            'countdownDate' => $this->countdownDate,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'description' => $this->description,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
