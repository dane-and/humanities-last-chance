
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Update an existing article
 */
function updateArticle($id) {
    global $conn;
    
    // Get JSON data from request body
    $rawData = file_get_contents('php://input');
    error_log("Received update request for article ID: $id with data: $rawData");
    
    $data = json_decode($rawData, true);
    
    if (!$data) {
        error_log("Invalid JSON data received: $rawData");
        sendErrorResponse(400, 'Invalid JSON data');
        return;
    }
    
    // Check if article exists
    $checkSql = "SELECT id FROM articles WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        // Article doesn't exist, create it instead
        error_log("Article not found with ID: $id, creating new entry");
        createArticleFallback($id, $data);
        return;
    }
    
    // Prepare tags for storage
    $tags = isset($data['tags']) && is_array($data['tags']) ? implode(',', $data['tags']) : '';
    
    // Ensure all required fields have values or defaults
    $title = isset($data['title']) ? $data['title'] : '';
    $slug = isset($data['slug']) ? $data['slug'] : '';
    $author = isset($data['author']) ? $data['author'] : '';
    $date = isset($data['date']) ? $data['date'] : date('Y-m-d');
    $category = isset($data['category']) ? $data['category'] : 'Blog';
    $image = isset($data['image']) ? $data['image'] : '';
    $excerpt = isset($data['excerpt']) ? $data['excerpt'] : '';
    $content = isset($data['content']) ? $data['content'] : '';
    $featured = isset($data['featured']) && $data['featured'] ? 1 : 0;
    
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
    
    $stmt->bind_param(
        "ssssssssis", 
        $title, 
        $slug, 
        $author, 
        $date, 
        $category, 
        $image, 
        $excerpt, 
        $content, 
        $featured,
        $tags,
        $id
    );
    
    if (!$stmt->execute()) {
        error_log("Failed to update article: " . $stmt->error);
        sendErrorResponse(500, 'Failed to update article: ' . $stmt->error);
        return;
    }
    
    error_log("Article updated successfully: $id");
    
    // Return success with the updated article
    $responseData = array_merge($data, ['id' => $id]);
    sendSuccessResponse(['article' => $responseData], 200, 'Article updated successfully');
}

/**
 * Create article if it doesn't exist (fallback for development environments)
 */
function createArticleFallback($id, $data) {
    global $conn;
    
    // Prepare tags for storage
    $tags = isset($data['tags']) && is_array($data['tags']) ? implode(',', $data['tags']) : '';
    
    // Ensure all required fields have values or defaults
    $title = isset($data['title']) ? $data['title'] : '';
    $slug = isset($data['slug']) ? $data['slug'] : '';
    $author = isset($data['author']) ? $data['author'] : '';
    $date = isset($data['date']) ? $data['date'] : date('Y-m-d');
    $category = isset($data['category']) ? $data['category'] : 'Blog';
    $image = isset($data['image']) ? $data['image'] : '';
    $excerpt = isset($data['excerpt']) ? $data['excerpt'] : '';
    $content = isset($data['content']) ? $data['content'] : '';
    $featured = isset($data['featured']) && $data['featured'] ? 1 : 0;
    
    // Insert article into database
    $sql = "INSERT INTO articles (id, title, slug, author, date, category, image, excerpt, content, featured, tags) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param(
        "ssssssssis", 
        $id, 
        $title, 
        $slug, 
        $author, 
        $date, 
        $category, 
        $image, 
        $excerpt, 
        $content, 
        $featured,
        $tags
    );
    
    if (!$stmt->execute()) {
        error_log("Failed to create fallback article: " . $stmt->error);
        sendErrorResponse(500, 'Failed to create article: ' . $stmt->error);
        return;
    }
    
    error_log("Article created as fallback: $id");
    
    // Return success with the created article
    $responseData = array_merge($data, ['id' => $id]);
    sendSuccessResponse(['article' => $responseData], 201, 'Article created successfully');
}
?>
