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

function malo_header_safe(string $value): string
{
  $value = str_replace(["\r", "\n", "\0"], '', $value);
  $value = preg_replace('/[\x00-\x1F\x7F]/', '', $value) ?? '';
  return trim($value);
}

$type = malo_header_safe((string) ($data['type'] ?? ''));
$name = malo_header_safe((string) ($data['name'] ?? ''));
$email = malo_header_safe((string) ($data['email'] ?? ''));
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

function malo_client_ip(): string
{
  $raw = (string) ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? '');
  if ($raw !== '') {
    $first = trim(explode(',', $raw)[0]);
    if (filter_var($first, FILTER_VALIDATE_IP)) {
      return $first;
    }
  }
  $addr = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
  return filter_var($addr, FILTER_VALIDATE_IP) ? $addr : '0.0.0.0';
}

function malo_rate_limit(string $ip, int $max = 3, int $window = 600): bool
{
  $dir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'malo-contact';
  if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
    return true;
  }
  $file = $dir . DIRECTORY_SEPARATOR . hash('sha256', $ip);
  $now = time();
  $fp = @fopen($file, 'c+');
  if ($fp === false) {
    return true;
  }
  flock($fp, LOCK_EX);
  $raw = stream_get_contents($fp);
  $hits = [];
  if (is_string($raw) && $raw !== '') {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
      $hits = $decoded;
    }
  }
  $hits = array_values(array_filter(
    array_map('intval', $hits),
    static fn (int $t): bool => $t > $now - $window
  ));
  if (count($hits) >= $max) {
    flock($fp, LOCK_UN);
    fclose($fp);
    return false;
  }
  $hits[] = $now;
  rewind($fp);
  ftruncate($fp, 0);
  fwrite($fp, json_encode($hits));
  flock($fp, LOCK_UN);
  fclose($fp);
  return true;
}

if (!malo_rate_limit(malo_client_ip())) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'error' => 'rate']);
  exit;
}

$to = 'laurentdusseau@gmail.com';
$subject = malo_header_safe('MDB site — Contact : ' . ($type !== '' ? $type : 'Message'));
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
  'Reply-To: ' . $email,
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
