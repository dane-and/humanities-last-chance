
<?php
require_once 'config.php';

// Add a comment to an article
function addComment() {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }
    
    // Validate required fields
    if (empty($data['articleId']) || empty($data['name']) || empty($data['content'])) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Missing required fields (articleId, name, content)']);
        exit;
    }
    
    // Check if article exists
    $checkSql = "SELECT id FROM articles WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $data['articleId']);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Article not found']);
        exit;
    }
    
    // Generate comment ID
    $commentId = uniqid();
    
    // Get current date
    $date = date('F j, Y');
    
    // Insert comment into database
    $sql = "INSERT INTO comments (id, article_id, name, content, date, likes, dislikes) 
            VALUES (?, ?, ?, ?, ?, 0, 0)";
    
    $stmt = $conn->prepare($sql);
    
    $stmt->bind_param(
        "sssss", 
        $commentId, 
        $data['articleId'], 
        $data['name'], 
        $data['content'], 
        $date
    );
    
    if (!$stmt->execute()) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to add comment: ' . $stmt->error]);
        exit;
    }
    
    // Return success with the created comment
    header('HTTP/1.1 201 Created');
    echo json_encode([
        'success' => true,
        'message' => 'Comment added successfully',
        'comment' => [
            'id' => $commentId,
            'articleId' => $data['articleId'],
            'name' => $data['name'],
            'content' => $data['content'],
            'date' => $date,
            'likes' => 0,
            'dislikes' => 0
        ]
    ]);
}

// Remove a comment
function removeComment($commentId) {
    global $conn;
    
    // Check if comment exists
    $checkSql = "SELECT id FROM comments WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $commentId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Comment not found']);
        exit;
    }
    
    // Delete the comment
    $sql = "DELETE FROM comments WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $commentId);
    
    if (!$stmt->execute()) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to remove comment: ' . $stmt->error]);
        exit;
    }
    
    // Return success
    echo json_encode([
        'success' => true,
        'message' => 'Comment removed successfully'
    ]);
}

// Update comment vote
function updateCommentVote($commentId) {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['voteType'])) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid request data. voteType is required']);
        exit;
    }
    
    // Validate vote type
    if ($data['voteType'] !== 'like' && $data['voteType'] !== 'dislike') {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid vote type. Must be either "like" or "dislike"']);
        exit;
    }
    
    // Check if comment exists
    $checkSql = "SELECT id, likes, dislikes FROM comments WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $commentId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Comment not found']);
        exit;
    }
    
    $comment = $checkResult->fetch_assoc();
    $likes = $comment['likes'];
    $dislikes = $comment['dislikes'];
    
    // Update the appropriate vote count
    if ($data['voteType'] === 'like') {
        $likes++;
        $sql = "UPDATE comments SET likes = ? WHERE id = ?";
    } else {
        $dislikes++;
        $sql = "UPDATE comments SET dislikes = ? WHERE id = ?";
    }
    
    $stmt = $conn->prepare($sql);
    
    if ($data['voteType'] === 'like') {
        $stmt->bind_param("is", $likes, $commentId);
    } else {
        $stmt->bind_param("is", $dislikes, $commentId);
    }
    
    if (!$stmt->execute()) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to update vote: ' . $stmt->error]);
        exit;
    }
    
    // Return success
    echo json_encode([
        'success' => true,
        'message' => 'Vote updated successfully',
        'comment' => [
            'id' => $commentId,
            'likes' => $data['voteType'] === 'like' ? $likes : $comment['likes'],
            'dislikes' => $data['voteType'] === 'dislike' ? $dislikes : $comment['dislikes']
        ]
    ]);
}

// Route API requests
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', trim(parse_url($requestUri, PHP_URL_PATH), '/'));
$commentId = isset($parts[1]) ? $parts[1] : null;
$action = isset($parts[2]) ? $parts[2] : null;

switch ($method) {
    case 'POST':
        if ($commentId && $action === 'vote') {
            updateCommentVote($commentId);
        } else {
            addComment();
        }
        break;
    case 'DELETE':
        if (!$commentId) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Comment ID is required']);
            exit;
        }
        removeComment($commentId);
        break;
    default:
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
