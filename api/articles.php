
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

// Log all available article information
error_log("Article ID from query: " . ($articleId ?: 'not provided'));

// Ensure Content-Type header for proper JSON handling
header('Content-Type: application/json');

// Handle preflight CORS requests
if ($method === 'OPTIONS') {
    // Set CORS headers to allow all origins for testing
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');  // 24 hours
    exit;
}

// For non-OPTIONS requests, apply CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Log the parsed request parameters
error_log("Routing article request: Method=$method, ID=$articleId");

// Get request body for logging
if (in_array($method, ['POST', 'PUT'])) {
    $rawBody = file_get_contents('php://input');
    error_log("Request body: $rawBody");
}

// Route the request with potential ID from query parameter
routeArticleRequest($method, $articleId);

// Close the database connection
$conn->close();
?>
