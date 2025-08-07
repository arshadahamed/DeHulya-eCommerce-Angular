<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('imgPrimary');
            $table->string('imgSecondary')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('salePrice', 10, 2)->nullable();
            $table->boolean('isNew')->default(false);
            $table->boolean('onSale')->default(false);
            $table->boolean('isStock')->default(true);
            $table->timestamp('countdownDate')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
