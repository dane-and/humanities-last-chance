
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Update an existing article
 */
function updateArticle($id) {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        sendErrorResponse(400, 'Invalid JSON data');
    }
    
    // Check if article exists
    $checkSql = "SELECT id FROM articles WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        sendErrorResponse(404, 'Article not found');
    }
    
    // Prepare tags for storage
    $tags = isset($data['tags']) && is_array($data['tags']) ? implode(',', $data['tags']) : '';
    
    // Update article in database
    $sql = "UPDATE articles SET 
            title = ?, 
            slug = ?, 
            author = ?, 
            date = ?, 
            category = ?, 
            image = ?, 
            excerpt = ?, 
            content = ?, 
            featured = ?,
            tags = ?
            WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $featured = isset($data['featured']) && $data['featured'] ? 1 : 0;
    
    $stmt->bind_param(
        "ssssssssis", 
        $data['title'], 
        $data['slug'], 
        $data['author'], 
        $data['date'], 
        $data['category'], 
        $data['image'], 
        $data['excerpt'], 
        $data['content'], 
        $featured,
        $tags,
        $id
    );
    
    if (!$stmt->execute()) {
        sendErrorResponse(500, 'Failed to update article: ' . $stmt->error);
    }
    
    // Return success with the updated article
    sendSuccessResponse(['article' => array_merge($data, ['id' => $id])], 200, 'Article updated successfully');
}
?>
