
<?php
require_once 'config.php';

// Get all pages
function getPages() {
    global $conn;
    
    $sql = "SELECT * FROM pages ORDER BY title ASC";
    $result = $conn->query($sql);
    
    if (!$result) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Database query failed: ' . $conn->error]);
        exit;
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
    
    echo json_encode($pages);
}

// Get a single page by ID or slug
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
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Page not found']);
        exit;
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
    
    echo json_encode($page);
}

// Create a new page
function createPage() {
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
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to create page: ' . $stmt->error]);
        exit;
    }
    
    // Return success with the created page
    header('HTTP/1.1 201 Created');
    echo json_encode([
        'success' => true,
        'message' => 'Page created successfully',
        'page' => array_merge($data, ['isSystem' => $isSystem == 1])
    ]);
}

// Update an existing page
function updatePage($id) {
    global $conn;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }
    
    // Check if page exists
    $checkSql = "SELECT id, isSystem FROM pages WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Page not found']);
        exit;
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
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to update page: ' . $stmt->error]);
        exit;
    }
    
    // Return success with the updated page info
    echo json_encode([
        'success' => true,
        'message' => 'Page updated successfully',
        'page' => array_merge($data, [
            'id' => $id,
            'lastUpdated' => date('F j, Y'),
            'isSystem' => $isSystem == 1
        ])
    ]);
}

// Delete a page
function deletePage($id) {
    global $conn;
    
    // Check if page exists and is not a system page
    $checkSql = "SELECT id, isSystem FROM pages WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Page not found']);
        exit;
    }
    
    $page = $checkResult->fetch_assoc();
    
    // Prevent deletion of system pages
    if ($page['isSystem'] == 1) {
        header('HTTP/1.1 403 Forbidden');
        echo json_encode(['error' => 'System pages cannot be deleted']);
        exit;
    }
    
    // Delete the page
    $sql = "DELETE FROM pages WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    
    if (!$stmt->execute()) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(['error' => 'Failed to delete page: ' . $stmt->error]);
        exit;
    }
    
    // Return success
    echo json_encode([
        'success' => true,
        'message' => 'Page deleted successfully'
    ]);
}

// Route API requests
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', trim(parse_url($requestUri, PHP_URL_PATH), '/'));
$pageId = isset($parts[1]) ? $parts[1] : null;

switch ($method) {
    case 'GET':
        if ($pageId) {
            getPage($pageId);
        } else {
            getPages();
        }
        break;
    case 'POST':
        createPage();
        break;
    case 'PUT':
        if (!$pageId) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Page ID is required']);
            exit;
        }
        updatePage($pageId);
        break;
    case 'DELETE':
        if (!$pageId) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Page ID is required']);
            exit;
        }
        deletePage($pageId);
        break;
    default:
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
