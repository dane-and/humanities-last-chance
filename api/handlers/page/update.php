
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Update an existing page
 */
function updatePage($id) {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        sendErrorResponse(400, 'Invalid JSON data');
    }
    
    // Check if page exists
    $checkSql = "SELECT id, isSystem FROM pages WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        sendErrorResponse(404, 'Page not found');
    }
    
    $pageRow = $checkResult->fetch_assoc();
    $isSystem = $pageRow['isSystem'];
    
    // If it's a system page, only allow content updates
    if ($isSystem == 1) {
        $sql = "UPDATE pages SET content = ?, lastUpdated = ? WHERE id = ?";
        
        $stmt = $conn->prepare($sql);
        $lastUpdated = date('F j, Y');
        
        $stmt->bind_param(
            "sss", 
            $data['content'], 
            $lastUpdated,
            $id
        );
    } else {
        // For non-system pages, allow all updates
        $sql = "UPDATE pages SET title = ?, slug = ?, content = ?, lastUpdated = ? WHERE id = ?";
        
        $stmt = $conn->prepare($sql);
        $lastUpdated = date('F j, Y');
        
        $stmt->bind_param(
            "sssss", 
            $data['title'], 
            $data['slug'], 
            $data['content'], 
            $lastUpdated,
            $id
        );
    }
    
    if (!$stmt->execute()) {
        sendErrorResponse(500, 'Failed to update page: ' . $stmt->error);
    }
    
    // Return success with the updated page info
    sendSuccessResponse(
        ['page' => array_merge($data, [
            'id' => $id,
            'lastUpdated' => date('F j, Y'),
            'isSystem' => $isSystem == 1
        ])],
        200,
        'Page updated successfully'
    );
}
?>
