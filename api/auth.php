
<?php
// Basic API authentication
function isAuthorized() {
    // Check for authorization header
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    // If no auth header is present
    if (empty($authHeader)) {
        return false;
    }
    
    // Extract the token
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
        
        // In production, use environment variable
        $validToken = getenv('ADMIN_API_TOKEN') ?: 'your-secure-admin-token';
        
        // Compare token
        return hash_equals($validToken, $token);
    }
    
    return false;
}

// Use this function to protect admin endpoints
function requireAuth() {
    if (!isAuthorized()) {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode(['error' => 'Unauthorized access']);
        exit;
    }
}
?>
