
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
        // Use query parameter ID if not provided explicitly
        if (!$articleId && isset($_GET['id'])) {
            $articleId = $_GET['id'];
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
                    sendErrorResponse(400, 'Article ID is required for update operations');
                    return;
                }
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
        sendErrorResponse(500, 'Server error: ' . $e->getMessage());
    }
}
?>
