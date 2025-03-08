<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tabler-icons@1.35.0/iconfont/tabler-icons.min.css">
    <title>Kgbuilders.com</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>

<body>
    <div id="app"></div>
</body>

</html>
