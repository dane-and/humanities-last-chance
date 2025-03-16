
<?php
require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../utils/response_utils.php';

/**
 * Get all pages
 */
function getPages() {
    global $conn;
    
    $sql = "SELECT * FROM pages ORDER BY title ASC";
    $result = $conn->query($sql);
    
    if (!$result) {
        sendErrorResponse(500, 'Database query failed: ' . $conn->error);
    }
    
    $pages = [];
    while ($row = $result->fetch_assoc()) {
        $page = [
            'id' => $row['id'],
            'title' => $row['title'],
            'slug' => $row['slug'],
            'content' => $row['content'],
            'lastUpdated' => $row['lastUpdated'],
            'isSystem' => $row['isSystem'] == 1 ? true : false
        ];
        
        $pages[] = $page;
    }
    
    sendDataResponse($pages);
}

/**
 * Get a single page by ID or slug
 */
function getPage($identifier) {
    global $conn;
    
    // Check if identifier is an ID or slug
    if (strpos($identifier, 'page_') === 0) {
        // It's an ID
        $sql = "SELECT * FROM pages WHERE id = ?";
    } else {
        // It's a slug
        $sql = "SELECT * FROM pages WHERE slug = ?";
    }
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $identifier);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendErrorResponse(404, 'Page not found');
    }
    
    $row = $result->fetch_assoc();
    
    $page = [
        'id' => $row['id'],
        'title' => $row['title'],
        'slug' => $row['slug'],
        'content' => $row['content'],
        'lastUpdated' => $row['lastUpdated'],
        'isSystem' => $row['isSystem'] == 1 ? true : false
    ];
    
    sendDataResponse($page);
}
?>
