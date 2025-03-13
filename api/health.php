
<?php
require_once 'config.php';

// Return API health status
function checkHealth() {
    global $conn;
    
    $status = [
        'status' => 'ok',
        'timestamp' => date('Y-m-d H:i:s'),
        'services' => [
            'database' => 'connected',
            'api' => 'online'
        ]
    ];
    
    try {
        // Check database connection
        if ($conn->ping()) {
            $status['services']['database'] = 'connected';
        } else {
            $status['services']['database'] = 'error';
            $status['status'] = 'degraded';
        }
    } catch (Exception $e) {
        $status['services']['database'] = 'error';
        $status['status'] = 'degraded';
    }
    
    echo json_encode($status);
}

// Handle the request
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    checkHealth();
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>
