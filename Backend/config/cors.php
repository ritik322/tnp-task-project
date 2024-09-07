<?php

return [
    'paths' => ['api/*', 'posts'],  // Include paths you want to enable CORS for
    'allowed_methods' => ['*'],  // Allow all HTTP methods
    'allowed_origins' => ['http://localhost:5173'],  // Include the React app's origin
    'allowed_headers' => ['*'],  // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
