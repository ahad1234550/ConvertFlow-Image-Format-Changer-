<?php
/**
 * ConvertFlow - File Conversion API Endpoint
 * 
 * This is a basic PHP backend for handling file conversions.
 * You can expand this to actually convert files using PHP libraries.
 */

// Enable error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 in production

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Configuration
$uploadDir = 'uploads/';
$convertedDir = 'converted/';
$maxFileSize = 10 * 1024 * 1024; // 10MB
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

// Create directories if they don't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}
if (!file_exists($convertedDir)) {
    mkdir($convertedDir, 0755, true);
}

// Check if file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error']);
    exit();
}

// Get file information
$file = $_FILES['file'];
$fileName = $file['name'];
$fileTmpName = $file['tmp_name'];
$fileSize = $file['size'];
$fileError = $file['error'];

// Get conversion parameters
$outputFormat = isset($_POST['format']) ? strtolower($_POST['format']) : 'png';
$quality = isset($_POST['quality']) ? intval($_POST['quality']) : 75;

// Validate file size
if ($fileSize > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File size exceeds maximum allowed size']);
    exit();
}

// Get file extension
$fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

// Validate file extension
if (!in_array($fileExt, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type']);
    exit();
}

// Validate output format
if (!in_array($outputFormat, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid output format']);
    exit();
}

// Generate unique filename
$uniqueId = uniqid('convert_', true);
$uploadPath = $uploadDir . $uniqueId . '.' . $fileExt;
$outputPath = $convertedDir . $uniqueId . '.' . $outputFormat;

// Move uploaded file
if (!move_uploaded_file($fileTmpName, $uploadPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save uploaded file']);
    exit();
}

// Perform conversion (requires GD library or ImageMagick)
try {
    $converted = convertImage($uploadPath, $outputPath, $outputFormat, $quality);
    
    if ($converted) {
        // Get file info
        $outputSize = filesize($outputPath);
        $downloadUrl = $convertedDir . basename($outputPath);
        
        // Clean up uploaded file
        unlink($uploadPath);
        
        // Schedule cleanup of converted file after 1 hour
        // In production, use a cron job for this
        
        // Return success response
        echo json_encode([
            'success' => true,
            'filename' => $uniqueId . '.' . $outputFormat,
            'size' => $outputSize,
            'downloadUrl' => $downloadUrl,
            'message' => 'File converted successfully'
        ]);
    } else {
        throw new Exception('Conversion failed');
    }
} catch (Exception $e) {
    // Clean up files
    if (file_exists($uploadPath)) {
        unlink($uploadPath);
    }
    if (file_exists($outputPath)) {
        unlink($outputPath);
    }
    
    http_response_code(500);
    echo json_encode(['error' => 'Conversion failed: ' . $e->getMessage()]);
}

/**
 * Convert image using GD library
 * 
 * @param string $inputPath Input file path
 * @param string $outputPath Output file path
 * @param string $format Output format
 * @param int $quality Quality (1-100)
 * @return bool Success status
 */
function convertImage($inputPath, $outputPath, $format, $quality) {
    // Check if GD library is available
    if (!extension_loaded('gd')) {
        throw new Exception('GD library not available');
    }
    
    // Get input image info
    $imageInfo = getimagesize($inputPath);
    if (!$imageInfo) {
        throw new Exception('Invalid image file');
    }
    
    $inputType = $imageInfo[2];
    
    // Create image resource from input file
    switch ($inputType) {
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($inputPath);
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($inputPath);
            break;
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($inputPath);
            break;
        case IMAGETYPE_BMP:
            $image = imagecreatefrombmp($inputPath);
            break;
        case IMAGETYPE_WEBP:
            $image = imagecreatefromwebp($inputPath);
            break;
        default:
            throw new Exception('Unsupported input format');
    }
    
    if (!$image) {
        throw new Exception('Failed to create image resource');
    }
    
    // Preserve transparency for PNG
    if ($format === 'png') {
        imagealphablending($image, false);
        imagesavealpha($image, true);
    }
    
    // Save image in output format
    $success = false;
    switch ($format) {
        case 'jpg':
        case 'jpeg':
            $success = imagejpeg($image, $outputPath, $quality);
            break;
        case 'png':
            // PNG quality is 0-9 (compression level)
            $pngQuality = floor((100 - $quality) / 11);
            $success = imagepng($image, $outputPath, $pngQuality);
            break;
        case 'gif':
            $success = imagegif($image, $outputPath);
            break;
        case 'bmp':
            $success = imagebmp($image, $outputPath);
            break;
        case 'webp':
            $success = imagewebp($image, $outputPath, $quality);
            break;
        default:
            throw new Exception('Unsupported output format');
    }
    
    // Free memory
    imagedestroy($image);
    
    return $success;
}

/**
 * Clean up old files (call this via cron job)
 */
function cleanupOldFiles($directory, $maxAge = 3600) {
    $files = glob($directory . '*');
    $now = time();
    
    foreach ($files as $file) {
        if (is_file($file)) {
            if ($now - filemtime($file) >= $maxAge) {
                unlink($file);
            }
        }
    }
}
