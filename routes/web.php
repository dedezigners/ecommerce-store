<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('index'); });
Route::get('/admin', function () { return view('admin'); });
Route::get('/{slug}', function () { return view('index'); });
Route::get('/admin/{slug}', function () { return view('admin'); });
Route::get('/{slug}/{info}', function () { return view('index'); });
Route::get('/admin/{slug}/{info}', function () { return view('admin'); });
