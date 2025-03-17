
<?php
require_once 'config.php';
require_once 'routes/article_routes.php';

// Parse request information
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Enhanced logging for request details
error_log("Article API Request: $method $requestUri from " . $_SERVER['REMOTE_ADDR']);
error_log("Query params: " . http_build_query($_GET));

// Get article ID from query parameters if present
$articleId = isset($_GET['id']) ? $_GET['id'] : null;

// Ensure Content-Type header for proper JSON handling
if (($method === 'POST' || $method === 'PUT') && !isset($_SERVER['CONTENT_TYPE'])) {
    $_SERVER['CONTENT_TYPE'] = 'application/json';
}

// Handle preflight CORS requests
if ($method === 'OPTIONS') {
    // Don't close connection here - let the config.php CORS headers be applied
    // We just need to exit after the headers are set
    exit;
}

// Log the parsed request parameters
error_log("Routing article request: Method=$method, ID=$articleId");

// Route the request with potential ID from query parameter
routeArticleRequest($method, $articleId);

// Close the database connection
$conn->close();
?>
