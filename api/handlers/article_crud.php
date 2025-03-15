
<?php
require_once __DIR__ . '/../config.php';

/**
 * Create a new article
 */
function createArticle() {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }
    
    // Validate required fields
    if (empty($data['title']) || empty($data['content'])) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Missing required fields (title, content)']);
        exit;
    }
    
    // Generate ID if not provided
    if (empty($data['id'])) {
        $data['id'] = uniqid();
    }
    
    // Generate slug if not provided
    if (empty($data['slug'])) {
        $data['slug'] = strtolower(preg_replace('/[^a-z0-9]+/', '-', $data['title']));
    }
    
    // Set default date if not provided
    if (empty($data['date'])) {
        $data['date'] = date('F j, Y');
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
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to create article: ' . $stmt->error]);
        exit;
    }
    
    // Return success with the created article
    header('HTTP/1.1 201 Created');
    echo json_encode([
        'success' => true,
        'message' => 'Article created successfully',
        'article' => $data
    ]);
}

/**
 * Update an existing article
 */
function updateArticle($id) {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }
    
    // Check if article exists
    $checkSql = "SELECT id FROM articles WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Article not found']);
        exit;
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
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to update article: ' . $stmt->error]);
        exit;
    }
    
    // Return success with the updated article
    echo json_encode([
        'success' => true,
        'message' => 'Article updated successfully',
        'article' => array_merge($data, ['id' => $id])
    ]);
}

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
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Article not found']);
        exit;
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
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to delete article: ' . $stmt->error]);
        exit;
    }
    
    // Return success
    echo json_encode([
        'success' => true,
        'message' => 'Article deleted successfully'
    ]);
}
