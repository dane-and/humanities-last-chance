
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
    error_log("Received update request for article ID: $id with data length: " . strlen($rawData));
    
    // More detailed debugging
    error_log("Raw data for article update: " . $rawData);
    
    $data = json_decode($rawData, true);
    
    if (!$data) {
        $jsonError = json_last_error_msg();
        error_log("Invalid JSON data received for article ID $id: $rawData (Error: $jsonError)");
        sendErrorResponse(400, "Invalid JSON data: $jsonError");
        return;
    }
    
    // Ensure ID is properly set
    if (!$id && isset($data['id'])) {
        $id = $data['id'];
        error_log("Using ID from payload: $id");
    }
    
    if (!$id) {
        error_log("No article ID provided for update");
        sendErrorResponse(400, "Article ID is required");
        return;
    }
    
    error_log("Processing update for article ID: $id with title: " . ($data['title'] ?? 'Unknown'));
    
    // Check if article exists
    $checkSql = "SELECT id FROM articles WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    
    if (!$checkStmt) {
        error_log("Prepare statement failed: " . $conn->error);
        sendErrorResponse(500, 'Database error: ' . $conn->error);
        return;
    }
    
    $checkStmt->bind_param("s", $id);
    
    if (!$checkStmt->execute()) {
        error_log("Check execution failed: " . $checkStmt->error);
        sendErrorResponse(500, 'Database error: ' . $checkStmt->error);
        return;
    }
    
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
    
    // Log update values for debugging
    error_log("Updating article $id with: title=$title, slug=$slug, featured=$featured");
    
    // Update article in database with more careful error handling
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
    
    if (!$stmt) {
        error_log("Prepare statement failed: " . $conn->error);
        sendErrorResponse(500, 'Database error: ' . $conn->error);
        return;
    }
    
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
    sendSuccessResponse(['article' => $responseData, 'success' => true], 200, 'Article updated successfully');
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
    
    // Insert article into database with more careful error handling
    $sql = "INSERT INTO articles (id, title, slug, author, date, category, image, excerpt, content, featured, tags) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        error_log("Prepare statement failed: " . $conn->error);
        sendErrorResponse(500, 'Database error: ' . $conn->error);
        return;
    }
    
    $stmt->bind_param(
        "sssssssssis", 
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
    sendSuccessResponse(['article' => $responseData, 'success' => true], 201, 'Article created successfully');
}
?>
