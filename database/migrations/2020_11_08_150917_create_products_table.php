<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->nullable()->unique();
            $table->float('price');
            $table->string('stat')->nullalbe();
            
            $table->boolean('on_sale')->default(0);
            $table->float('sale_price')->nullable();
            $table->datetime('started')->nullable();
            $table->datetime('ended')->nullalbe();
            
            $table->text('attributes')->nullable();
            $table->text('short_intro')->nullable();
            $table->longtext('detail_intro')->nullable();

            $table->foreignId('featured')->constrained('media')->nullable();
            $table->foreignId('secondary')->constrained('media')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
