<?php
/**
 * Image Upload Handler for Hostinger
 *
 * KURULUM ADIMLARI:
 * 1. Bu dosyayı Hostinger'a yükleyin: public_html/api/upload.php
 * 2. uploads/ klasörü oluşturun: public_html/uploads/
 * 3. uploads/ klasörüne yazma izni verin (chmod 755)
 * 4. .htaccess dosyası ile güvenlik ekleyin
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// OPTIONS request için
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Sadece POST kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Dosya yükleme kontrolü
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit();
}

$file = $_FILES['file'];
$productId = isset($_POST['productId']) ? $_POST['productId'] : 'general';

// Dosya doğrulama
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, GIF, WEBP allowed']);
    exit();
}

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File too large. Max 5MB']);
    exit();
}

// Klasör oluştur
$uploadDir = __DIR__ . '/../uploads/image/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Benzersiz dosya adı oluştur
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = time() . '_' . uniqid() . '.' . $extension;
$filePath = $uploadDir . $fileName;

// Dosyayı taşı
if (move_uploaded_file($file['tmp_name'], $filePath)) {
    // Başarılı - URL döndür
    $baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
    $fileUrl = $baseUrl . '/uploads/image/' . $fileName;

    echo json_encode([
        'success' => true,
        'url' => $fileUrl,
        'fileName' => $fileName
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save file']);
}
?>
