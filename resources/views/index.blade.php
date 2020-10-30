<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ecommerce Frontend Template</title>

    <!-- Favicons-->
    <link rel="shortcut icon" href="/assets/template/img/favicon.ico" type="image/x-icon">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link rel="preload" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap" as="fetch" crossorigin="anonymous">
    <script>
    !function(e,n,t){"use strict";var o="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap",r="__3perf_googleFonts_c2536";function c(e){(n.head||n.body).appendChild(e)}function a(){var e=n.createElement("link");e.href=o,e.rel="stylesheet",c(e)}function f(e){if(!n.getElementById(r)){var t=n.createElement("style");t.id=r,c(t)}n.getElementById(r).innerHTML=e}e.FontFace&&e.FontFace.prototype.hasOwnProperty("display")?(t[r]&&f(t[r]),fetch(o).then(function(e){return e.text()}).then(function(e){return e.replace(/@font-face {/g,"@font-face{font-display:swap;")}).then(function(e){return t[r]=e}).then(f).catch(a)):a()}(window,document,localStorage);
    </script>

    <link href="/assets/template/css/bootstrap.custom.min.css" rel="stylesheet">
    <link href="/assets/template/css/style.css" rel="stylesheet">

	<!-- SPECIFIC CSS -->
    <link href="/assets/template/css/home_1.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
    <div id="app"></div>

    <script src="{{ mix('js/app.js') }}"></script>
    <script src="/assets/template/js/common_scripts.min.js"></script>
    <script src="/assets/template/js/main.js"></script>
	
	<!-- SPECIFIC SCRIPTS -->
	<script src="/assets/template/js/carousel-home.min.js"></script>
</body>
</html>