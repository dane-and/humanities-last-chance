
<?php
require_once __DIR__ . '/../config.php';

/**
 * Get all articles
 */
function getArticles() {
    global $conn;
    
    $sql = "SELECT * FROM articles ORDER BY date DESC";
    $result = $conn->query($sql);
    
    if (!$result) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Database query failed: ' . $conn->error]);
        exit;
    }
    
    $articles = [];
    while ($row = $result->fetch_assoc()) {
        // Handle comments separately to create proper JSON structure
        $articleId = $row['id'];
        $commentsSql = "SELECT * FROM comments WHERE article_id = ?";
        $stmt = $conn->prepare($commentsSql);
        $stmt->bind_param("s", $articleId);
        $stmt->execute();
        $commentsResult = $stmt->get_result();
        
        $comments = [];
        while ($commentRow = $commentsResult->fetch_assoc()) {
            $comments[] = [
                'id' => $commentRow['id'],
                'articleId' => $commentRow['article_id'],
                'name' => $commentRow['name'],
                'content' => $commentRow['content'],
                'date' => $commentRow['date'],
                'likes' => intval($commentRow['likes']),
                'dislikes' => intval($commentRow['dislikes'])
            ];
        }
        
        // Handle tags conversion from comma-separated string to array
        $tags = !empty($row['tags']) ? explode(',', $row['tags']) : [];
        
        // Build article object with proper structure
        $article = [
            'id' => $row['id'],
            'title' => $row['title'],
            'slug' => $row['slug'],
            'author' => $row['author'],
            'date' => $row['date'],
            'category' => $row['category'],
            'image' => $row['image'],
            'excerpt' => $row['excerpt'],
            'content' => $row['content'],
            'featured' => $row['featured'] == 1 ? true : false,
            'tags' => $tags,
            'comments' => $comments
        ];
        
        $articles[] = $article;
    }
    
    echo json_encode($articles);
}

/**
 * Get a single article by ID
 */
function getArticle($id) {
    global $conn;
    
    $sql = "SELECT * FROM articles WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Article not found']);
        exit;
    }
    
    $row = $result->fetch_assoc();
    
    // Get comments for this article
    $commentsSql = "SELECT * FROM comments WHERE article_id = ?";
    $stmt = $conn->prepare($commentsSql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $commentsResult = $stmt->get_result();
    
    $comments = [];
    while ($commentRow = $commentsResult->fetch_assoc()) {
        $comments[] = [
            'id' => $commentRow['id'],
            'articleId' => $commentRow['article_id'],
            'name' => $commentRow['name'],
            'content' => $commentRow['content'],
            'date' => $commentRow['date'],
            'likes' => intval($commentRow['likes']),
            'dislikes' => intval($commentRow['dislikes'])
        ];
    }
    
    // Handle tags
    $tags = !empty($row['tags']) ? explode(',', $row['tags']) : [];
    
    $article = [
        'id' => $row['id'],
        'title' => $row['title'],
        'slug' => $row['slug'],
        'author' => $row['author'],
        'date' => $row['date'],
        'category' => $row['category'],
        'image' => $row['image'],
        'excerpt' => $row['excerpt'],
        'content' => $row['content'],
        'featured' => $row['featured'] == 1 ? true : false,
        'tags' => $tags,
        'comments' => $comments
    ];
    
    echo json_encode($article);
}
