<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('checkouts', function (Blueprint $table) {
            $table->id();
            $table->string('order_code')->unique();
            $table->integer('shipping_id')->nullable();
            $table->integer('user_id');
            $table->string('product_id');
            $table->integer('total');
            $table->integer('discount');
            $table->string('courier');
            $table->string('receipt')->nullable();
            $table->integer('status');
            $table->integer('is_done');
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
        Schema::dropIfExists('checkouts');
    }
}
