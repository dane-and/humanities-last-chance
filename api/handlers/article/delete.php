
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Delete an article
 */
function deleteArticle($id) {
    global $conn;
    
    // Check if article exists
    $checkSql = "SELECT id FROM articles WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        sendErrorResponse(404, 'Article not found');
    }
    
    // Delete related comments first
    $deleteCommentsSql = "DELETE FROM comments WHERE article_id = ?";
    $deleteCommentsStmt = $conn->prepare($deleteCommentsSql);
    $deleteCommentsStmt->bind_param("s", $id);
    $deleteCommentsStmt->execute();
    
    // Delete the article
    $sql = "DELETE FROM articles WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    
    if (!$stmt->execute()) {
        sendErrorResponse(500, 'Failed to delete article: ' . $stmt->error);
    }
    
    // Return success
    sendSuccessResponse([], 200, 'Article deleted successfully');
}
?>
