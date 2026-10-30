<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$tiers = [
    'reseller' => [
        'name' => 'Reseller Resmi',
        'min_order_packs' => 50,
        'discount_percent' => 15,
        'benefits' => ['Bebas mix varian', 'Materi promosi digital', 'Jadwal kirim teratur']
    ],
    'agen' => [
        'name' => 'Agen Wilayah',
        'min_order_packs' => 250,
        'discount_percent' => 25,
        'benefits' => ['Eksklusivitas kecamatan', 'Prioritas armada berpendingin', 'Spanduk outlet resmi']
    ],
    'distributor' => [
        'name' => 'Distributor Utama',
        'min_order_packs' => 1000,
        'discount_percent' => 35,
        'benefits' => ['Harga pabrik langsung', 'Eksklusivitas kota/kabupaten', 'Tempo pembayaran berkala']
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'success',
        'tiers' => $tiers
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

$tier = isset($data['tier']) ? strtolower(trim($data['tier'])) : '';
$businessName = isset($data['business_name']) ? htmlspecialchars(trim($data['business_name'])) : '';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';

if (empty($tier) || empty($businessName) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Parameter permohonan kemitraan belum lengkap.'
    ]);
    exit();
}

echo json_encode([
    'status' => 'success',
    'message' => "Permohonan kemitraan untuk {$businessName} pada tingkatan [{$tier}] telah berhasil diterima.",
    'application' => [
        'business_name' => $businessName,
        'phone' => $phone,
        'tier' => $tier,
        'timestamp' => date('Y-m-d H:i:s')
    ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
