
<?php
// Database configuration
$host = 'localhost'; // Your Hostinger database hostname
$username = 'your_database_username'; // Update this with your actual database username
$password = 'your_database_password'; // Update this with your actual database password
$database = 'your_database_name'; // Update this with your actual database name

// Create database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Set headers for JSON responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // In production, restrict this to your domain
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
?>
