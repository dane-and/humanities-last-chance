
<?php
require_once __DIR__ . '/../handlers/article/index.php';
require_once __DIR__ . '/../utils/response_utils.php';

/**
 * Routes article-related API requests to the appropriate handler
 * 
 * @param string $method HTTP method
 * @param string|null $articleId Optional article ID for single-article operations
 * @return void
 */
function routeArticleRequest($method, $articleId = null) {
    try {
        // Ensure we always have the article ID if provided in the query string
        if (!$articleId && isset($_GET['id'])) {
            $articleId = $_GET['id'];
        }
        
        // Enhanced debug log to trace request information
        error_log("Article request: Method=$method, ID=$articleId, Remote IP=" . $_SERVER['REMOTE_ADDR']);
        
        // Log all query parameters for debugging
        error_log("All query parameters: " . json_encode($_GET));
        
        if ($method === 'PUT' || $method === 'POST') {
            // Log the incoming payload for debugging
            $rawData = file_get_contents('php://input');
            error_log("Raw request body: " . $rawData);
            
            // Check if it's valid JSON
            $jsonData = json_decode($rawData, true);
            if ($jsonData === null && json_last_error() !== JSON_ERROR_NONE) {
                error_log("Invalid JSON received: " . json_last_error_msg());
            } else {
                error_log("JSON parsed successfully: " . json_encode($jsonData));
            }
        }
        
        switch ($method) {
            case 'GET':
                if ($articleId) {
                    getArticle($articleId);
                } else {
                    getArticles();
                }
                break;
                
            case 'POST':
                createArticle();
                break;
                
            case 'PUT':
                if (!$articleId) {
                    // Extract ID from body if not in query parameter
                    $rawData = file_get_contents('php://input');
                    $jsonData = json_decode($rawData, true);
                    if ($jsonData && isset($jsonData['id'])) {
                        $articleId = $jsonData['id'];
                        error_log("Article ID extracted from request body: $articleId");
                    } else {
                        sendErrorResponse(400, 'Article ID is required for update operations');
                        return;
                    }
                }
                
                // Log request headers for debugging CORS issues
                $headers = getallheaders();
                error_log("UPDATE request headers: " . json_encode($headers));
                
                updateArticle($articleId);
                break;
                
            case 'DELETE':
                if (!$articleId) {
                    sendErrorResponse(400, 'Article ID is required for delete operations');
                    return;
                }
                deleteArticle($articleId);
                break;
                
            default:
                sendErrorResponse(405, 'Method not allowed');
                break;
        }
    } catch (Exception $e) {
        error_log("Article API Exception: " . $e->getMessage() . " - Stack trace: " . $e->getTraceAsString());
        sendErrorResponse(500, 'Server error: ' . $e->getMessage());
    }
}
?>
