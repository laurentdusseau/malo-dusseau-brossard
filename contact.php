<?php
/**
 * Formulaire contact — Malo Dusseau Brossard
 * Destinataire : laurentdusseau@gmail.com
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'method']);
  exit;
}

$raw = file_get_contents('php://input');
$data = [];
if ($raw !== false && $raw !== '') {
  $json = json_decode($raw, true);
  if (is_array($json)) {
    $data = $json;
  }
}
if (!$data) {
  $data = $_POST;
}

/* Honeypot anti-spam */
if (!empty($data['website']) || !empty($data['_gotcha'])) {
  http_response_code(200);
  echo json_encode(['ok' => true]);
  exit;
}

$type = trim((string) ($data['type'] ?? ''));
$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'fields']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'email']);
  exit;
}

if (mb_strlen($name) > 120 || mb_strlen($message) > 5000 || mb_strlen($type) > 80) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'length']);
  exit;
}

$to = 'laurentdusseau@gmail.com';
$subject = 'MDB site — Contact : ' . ($type !== '' ? $type : 'Message');
$body = "Nouveau message depuis malodusseaubrossard.com\n\n"
  . "Type     : " . ($type !== '' ? $type : '—') . "\n"
  . "Nom      : " . $name . "\n"
  . "Email    : " . $email . "\n\n"
  . "Message :\n" . $message . "\n";

$from = 'contact@malodusseaubrossard.com';
$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: Malo Dusseau Brossard <' . $from . '>',
  'Reply-To: ' . $name . ' <' . $email . '>',
  'X-Mailer: PHP/' . phpversion(),
];

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$ok) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => 'mail']);
  exit;
}

http_response_code(200);
echo json_encode(['ok' => true]);
