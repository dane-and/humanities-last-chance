
<?php
require_once __DIR__ . '/../handlers/page/index.php';
require_once __DIR__ . '/../utils/response_utils.php';

/**
 * Routes page-related API requests to the appropriate handler
 * 
 * @param string $method HTTP method
 * @param string|null $pageId Optional page ID for single-page operations
 * @return void
 */
function routePageRequest($method, $pageId = null) {
    try {
        switch ($method) {
            case 'GET':
                if ($pageId) {
                    getPage($pageId);
                } else {
                    getPages();
                }
                break;
                
            case 'POST':
                createPage();
                break;
                
            case 'PUT':
                if (!$pageId) {
                    sendErrorResponse(400, 'Page ID is required for update operations');
                    return;
                }
                updatePage($pageId);
                break;
                
            case 'DELETE':
                if (!$pageId) {
                    sendErrorResponse(400, 'Page ID is required for delete operations');
                    return;
                }
                deletePage($pageId);
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
