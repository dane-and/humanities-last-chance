
<?php
// Database configuration
// Set environment variables in your Hostinger hosting panel
// or use a .env file with a library like phpdotenv
$host = getenv('DB_HOST') ?: 'localhost';
$username = getenv('DB_USERNAME') ?: 'your_database_username';
$password = getenv('DB_PASSWORD') ?: 'your_database_password';
$database = getenv('DB_DATABASE') ?: 'your_database_name';

// Create database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    // Log error to server logs instead of exposing details
    error_log('Database connection failed: ' . $conn->connect_error);
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database connection failed. Please try again later.']);
    exit;
}

// Set headers for JSON responses
header('Content-Type: application/json');

// Production-safe CORS headers
$allowedOrigins = [
    'https://www.humanitieslast.com', 
    'https://humanitieslast.com'
];

// For development, you can uncomment this line
if (getenv('APP_ENV') === 'development') {
    $allowedOrigins[] = 'http://localhost:5173';
}

// Set CORS headers based on origin
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // Default fallback for development
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
?>
