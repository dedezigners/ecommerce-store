<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('signup', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

### Categories
Route::get('categories', 'CategoryController@index');
Route::get('parent-categories', 'CategoryController@parentCategories');
Route::post('category', 'CategoryController@store');
Route::post('category/{category}', 'CategoryController@update');
Route::delete('category/{category}', 'CategoryController@destroy');

### Attributes
Route::get('attributes', 'AttributeController@index');
Route::post('attribute', 'AttributeController@store');
Route::post('attribute/{attribute}', 'AttributeController@update');
Route::delete('attribute/{attribute}', 'AttributeController@destroy');