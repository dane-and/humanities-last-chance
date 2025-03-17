
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
        
        // Debug log to trace request information
        error_log("Article request: Method=$method, ID=$articleId, Query string=" . http_build_query($_GET));
        
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
                    sendErrorResponse(400, 'Article ID is required for update operations');
                    return;
                }
                // Log the payload for debugging
                $rawData = file_get_contents('php://input');
                error_log("UPDATE request body: $rawData");
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
        error_log("Article API Exception: " . $e->getMessage());
        sendErrorResponse(500, 'Server error: ' . $e->getMessage());
    }
}
?>
