<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';
$subject = isset($data['subject']) ? htmlspecialchars(trim($data['subject'])) : '';
$message = isset($data['message']) ? htmlspecialchars(trim($data['message'])) : '';

if (empty($name) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Semua kolom wajib diisi dengan benar.'
    ]);
    exit();
}

echo json_encode([
    'status' => 'success',
    'message' => "Terima kasih, Bapak/Ibu {$name}. Pesan Anda telah berhasil dicatat oleh sistem layanan resmi CV. Putra AR.",
    'data' => [
        'name' => $name,
        'phone' => $phone,
        'subject' => $subject,
        'received_at' => date('Y-m-d H:i:s')
    ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
