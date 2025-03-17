
<?php
require_once 'config.php';
require_once 'routes/article_routes.php';

// Parse request information
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Log the request details for debugging
error_log("Article API Request: $method $requestUri");
error_log("Query params: " . http_build_query($_GET));

// Get article ID from query parameters if present
$articleId = isset($_GET['id']) ? $_GET['id'] : null;

// Handle preflight CORS requests
if ($method === 'OPTIONS') {
    exit;
}

// Log the parsed request parameters
error_log("Routing article request: Method=$method, ID=$articleId");

// Route the request with potential ID from query parameter
routeArticleRequest($method, $articleId);

// Close the database connection
$conn->close();
?>
