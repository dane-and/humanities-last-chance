
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Delete a page
 */
function deletePage($id) {
    global $conn;
    
    // Check if page exists and is not a system page
    $checkSql = "SELECT id, isSystem FROM pages WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        sendErrorResponse(404, 'Page not found');
    }
    
    $page = $checkResult->fetch_assoc();
    
    // Prevent deletion of system pages
    if ($page['isSystem'] == 1) {
        sendErrorResponse(403, 'System pages cannot be deleted');
    }
    
    // Delete the page
    $sql = "DELETE FROM pages WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    
    if (!$stmt->execute()) {
        sendErrorResponse(500, 'Failed to delete page: ' . $stmt->error);
    }
    
    // Return success
    sendSuccessResponse([], 200, 'Page deleted successfully');
}
?>
