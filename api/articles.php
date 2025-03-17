
<?php
require_once 'config.php';
require_once 'routes/article_routes.php';

// Parse request information
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Get article ID from query parameters if present
$articleId = isset($_GET['id']) ? $_GET['id'] : null;

// Handle preflight CORS requests
if ($method === 'OPTIONS') {
    exit;
}

// Route the request with potential ID from query parameter
routeArticleRequest($method, $articleId);

// Close the database connection
$conn->close();
?>
