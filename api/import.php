
<?php
require_once 'config.php';

// Handle importing articles data
function importArticles() {
    global $conn;
    
    if (!isset($_FILES['dataFile']) || $_FILES['dataFile']['error'] !== UPLOAD_ERR_OK) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'No file uploaded or upload error']);
        exit;
    }
    
    $fileContent = file_get_contents($_FILES['dataFile']['tmp_name']);
    $data = json_decode($fileContent, true);
    
    if (!$data || !is_array($data)) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid JSON data in uploaded file']);
        exit;
    }
    
    // Start transaction for atomic operation
    $conn->begin_transaction();
    
    try {
        // Clear existing articles and comments
        $conn->query("DELETE FROM comments");
        $conn->query("DELETE FROM articles");
        
        $importedCount = 0;
        
        foreach ($data as $article) {
            // Prepare tags for storage
            $tags = isset($article['tags']) && is_array($article['tags']) ? implode(',', $article['tags']) : '';
            
            // Insert article
            $sql = "INSERT INTO articles (id, title, slug, author, date, category, image, excerpt, content, featured, tags) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            $featured = isset($article['featured']) && $article['featured'] ? 1 : 0;
            
            $stmt->bind_param(
                "ssssssssis", 
                $article['id'], 
                $article['title'], 
                $article['slug'], 
                $article['author'], 
                $article['date'], 
                $article['category'], 
                $article['image'], 
                $article['excerpt'], 
                $article['content'], 
                $featured,
                $tags
            );
            
            $stmt->execute();
            
            // Insert comments if any
            if (isset($article['comments']) && is_array($article['comments'])) {
                foreach ($article['comments'] as $comment) {
                    $commentSql = "INSERT INTO comments (id, article_id, name, content, date, likes, dislikes) 
                                  VALUES (?, ?, ?, ?, ?, ?, ?)";
                    
                    $commentStmt = $conn->prepare($commentSql);
                    $likes = isset($comment['likes']) ? $comment['likes'] : 0;
                    $dislikes = isset($comment['dislikes']) ? $comment['dislikes'] : 0;
                    
                    $commentStmt->bind_param(
                        "sssssii", 
                        $comment['id'], 
                        $article['id'], 
                        $comment['name'], 
                        $comment['content'], 
                        $comment['date'],
                        $likes,
                        $dislikes
                    );
                    
                    $commentStmt->execute();
                }
            }
            
            $importedCount++;
        }
        
        // Commit the transaction
        $conn->commit();
        
        // Return success
        echo json_encode([
            'success' => true,
            'message' => "Successfully imported $importedCount articles"
        ]);
        
    } catch (Exception $e) {
        // Roll back the transaction on error
        $conn->rollback();
        
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Import failed: ' . $e->getMessage()]);
    }
}

// Route API requests
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    importArticles();
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>
