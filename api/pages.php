
<?php
require_once 'config.php';
require_once 'routes/page_routes.php';

// Parse request information
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', trim(parse_url($requestUri, PHP_URL_PATH), '/'));
$pageId = isset($parts[1]) ? $parts[1] : null;

// Handle preflight CORS requests
if ($method === 'OPTIONS') {
    exit;
}

// Route the request
routePageRequest($method, $pageId);

// Close the database connection
$conn->close();
?>
