
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Create a new article
 */
function createArticle() {
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
        $data['id'] = uniqid();
    }
    
    // Generate slug if not provided
    if (empty($data['slug'])) {
        $data['slug'] = strtolower(preg_replace('/[^a-z0-9]+/', '-', $data['title']));
    }
    
    // Set default date with time if not provided
    if (empty($data['date'])) {
        $data['date'] = date('F j, Y \a\t g:i A');
    }
    
    // Set empty author if not provided
    if (!isset($data['author'])) {
        $data['author'] = '';
    }
    
    // Prepare tags for storage
    $tags = isset($data['tags']) && is_array($data['tags']) ? implode(',', $data['tags']) : '';
    
    // Insert article into database
    $sql = "INSERT INTO articles (id, title, slug, author, date, category, image, excerpt, content, featured, tags) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $featured = isset($data['featured']) && $data['featured'] ? 1 : 0;
    
    $stmt->bind_param(
        "ssssssssis", 
        $data['id'], 
        $data['title'], 
        $data['slug'], 
        $data['author'], 
        $data['date'], 
        $data['category'], 
        $data['image'], 
        $data['excerpt'], 
        $data['content'], 
        $featured,
        $tags
    );
    
    if (!$stmt->execute()) {
        sendErrorResponse(500, 'Failed to create article: ' . $stmt->error);
    }
    
    // Return success with the created article
    sendSuccessResponse(['article' => $data], 201, 'Article created successfully');
}
?>
