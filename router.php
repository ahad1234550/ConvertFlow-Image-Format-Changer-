<?php
/**
 * Router for PHP Built-in Server
 * This file handles clean URL routing for local development
 */

// Get the requested URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove leading slash
$uri = ltrim($uri, '/');

// Define routes
$routes = [
    '' => 'index.html',
    'index' => 'index.html',
    'about' => 'about.html',
    'convert' => 'convert.html',
    'contact' => 'contact.html',
];

// Check if it's a static file (CSS, JS, images, etc.)
if (preg_match('/\.(?:css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/', $uri)) {
    // Serve the static file
    return false; // Let PHP's built-in server handle it
}

// Route to the appropriate HTML file
if (array_key_exists($uri, $routes)) {
    $file = __DIR__ . '/' . $routes[$uri];
    if (file_exists($file)) {
        // Set proper content type
        header('Content-Type: text/html; charset=UTF-8');
        readfile($file);
        exit;
    }
}

// If route not found, try to serve the file directly
$requestedFile = __DIR__ . '/' . $uri;
if (file_exists($requestedFile) && is_file($requestedFile)) {
    return false; // Let PHP's built-in server handle it
}

// 404 - Not Found
http_response_code(404);
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .container {
            padding: 2rem;
        }
        h1 {
            font-size: 6rem;
            margin: 0;
        }
        p {
            font-size: 1.5rem;
            margin: 1rem 0;
        }
        a {
            color: white;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Page Not Found</p>
        <a href="/">Go Home</a>
    </div>
</body>
</html>';
exit;
