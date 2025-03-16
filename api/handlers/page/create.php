
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Create a new page
 */
function createPage() {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        sendErrorResponse(400, 'Invalid JSON data');
    }
    
    // Validate required fields
    if (empty($data['title']) || empty($data['content'])) {
        sendErrorResponse(400, 'Missing required fields (title, content)');
    }
    
    // Generate ID if not provided
    if (empty($data['id'])) {
        $data['id'] = 'page_' . uniqid();
    }
    
    // Generate slug if not provided
    if (empty($data['slug'])) {
        $data['slug'] = strtolower(preg_replace('/[^a-z0-9]+/', '-', $data['title']));
    }
    
    // Set default lastUpdated if not provided
    if (empty($data['lastUpdated'])) {
        $data['lastUpdated'] = date('F j, Y');
    }
    
    // Default isSystem to false if not provided
    $isSystem = isset($data['isSystem']) && $data['isSystem'] ? 1 : 0;
    
    // Insert page into database
    $sql = "INSERT INTO pages (id, title, slug, content, lastUpdated, isSystem) VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param(
        "sssssi", 
        $data['id'], 
        $data['title'], 
        $data['slug'], 
        $data['content'], 
        $data['lastUpdated'],
        $isSystem
    );
    
    if (!$stmt->execute()) {
        sendErrorResponse(500, 'Failed to create page: ' . $stmt->error);
    }
    
    // Return success with the created page
    sendSuccessResponse(
        ['page' => array_merge($data, ['isSystem' => $isSystem == 1])], 
        201, 
        'Page created successfully'
    );
}
?>
