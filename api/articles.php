
<?php
require_once 'config.php';
require_once 'handlers/article_handlers.php';
require_once 'handlers/article_crud.php';

// Route API requests
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', trim(parse_url($requestUri, PHP_URL_PATH), '/'));
$articleId = isset($parts[1]) ? $parts[1] : null;

switch ($method) {
    case 'GET':
        if ($articleId) {
            getArticle($articleId);
        } else {
            getArticles();
        }
        break;
    case 'POST':
        createArticle();
        break;
    case 'PUT':
        if (!$articleId) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Article ID is required']);
            exit;
        }
        updateArticle($articleId);
        break;
    case 'DELETE':
        if (!$articleId) {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Article ID is required']);
            exit;
        }
        deleteArticle($articleId);
        break;
    default:
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

$conn->close();
?>
