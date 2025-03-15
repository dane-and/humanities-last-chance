
<?php
/**
 * Utilities for handling API responses consistently
 */

/**
 * Sends a JSON error response with the specified status code and message
 * 
 * @param int $statusCode HTTP status code
 * @param string $message Error message
 * @return void
 */
function sendErrorResponse($statusCode, $message) {
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit;
}

/**
 * Sends a JSON success response with optional data
 * 
 * @param array $data Data to include in the response
 * @param int $statusCode HTTP status code (default: 200)
 * @param string|null $message Optional success message
 * @return void
 */
function sendSuccessResponse($data = [], $statusCode = 200, $message = null) {
    http_response_code($statusCode);
    
    $response = ['success' => true];
    
    if ($message) {
        $response['message'] = $message;
    }
    
    if (!empty($data)) {
        $response = array_merge($response, $data);
    }
    
    echo json_encode($response);
    exit;
}

/**
 * Sends a JSON response with just the data
 * Used for GET requests where we want to return just the data
 * 
 * @param mixed $data Data to send in the response
 * @return void
 */
function sendDataResponse($data) {
    http_response_code(200);
    echo json_encode($data);
    exit;
}
?>
