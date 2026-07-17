<?php

declare(strict_types=1);

/*
 * MITOMS consultation form endpoint for Hostinger shared hosting.
 * Before uploading, update the three email settings below to mailboxes
 * created for your domain in Hostinger.
 */
const CONSULTATION_TO_EMAIL = 'sales@mitoms.com';
const FROM_EMAIL = 'sales@mitoms.com';
const FROM_NAME = 'MITOMS Website';
const CONSULTATION_CC_EMAILS = [
    'sreejith@mitoms.com',
    'akash@mitoms.com',
    'romit@mitoms.com',
];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function respond(array $body, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_text(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = preg_replace('/[\r\n\t]+/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/u', ' ', trim($value)) ?? '';

    return truncate_text($value, $maxLength);
}

function clean_message(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = preg_replace('/[ \t]+\n/u', "\n", $value) ?? '';
    $value = preg_replace('/\n{4,}/u', "\n\n\n", trim($value)) ?? '';

    return truncate_text($value, $maxLength);
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function truncate_text(string $value, int $maxLength): string
{
    return function_exists('mb_substr')
        ? mb_substr($value, 0, $maxLength, 'UTF-8')
        : substr($value, 0, $maxLength);
}

function header_safe(string $value): string
{
    return str_replace(["\r", "\n"], '', $value);
}

function client_ip(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if (is_string($forwarded) && $forwarded !== '') {
        $parts = explode(',', $forwarded);
        return trim($parts[0]);
    }

    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function rate_limit(string $key, int $maxRequests, int $windowSeconds): bool
{
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'mitoms-form-rate-limit';
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return true; // Fail open if temporary storage is unavailable.
    }

    $path = $directory . DIRECTORY_SEPARATOR . hash('sha256', $key) . '.json';
    $now = time();
    $record = ['count' => 0, 'resetAt' => $now + $windowSeconds];

    $handle = @fopen($path, 'c+');
    if ($handle === false) {
        return true;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return true;
        }

        $existing = stream_get_contents($handle);
        if (is_string($existing) && $existing !== '') {
            $decoded = json_decode($existing, true);
            if (is_array($decoded) && isset($decoded['count'], $decoded['resetAt'])) {
                $record = $decoded;
            }
        }

        if ((int) $record['resetAt'] <= $now) {
            $record = ['count' => 0, 'resetAt' => $now + $windowSeconds];
        }

        if ((int) $record['count'] >= $maxRequests) {
            return false;
        }

        $record['count'] = (int) $record['count'] + 1;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($record));
        fflush($handle);

        return true;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength <= 0 || $contentLength > 20000) {
    respond(['success' => false, 'message' => 'Invalid request size.'], 413);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode(is_string($rawBody) ? $rawBody : '', true);
if (!is_array($payload)) {
    respond(['success' => false, 'message' => 'Invalid request body.'], 400);
}

$name = clean_text($payload['name'] ?? '', 70);
$phone = clean_text($payload['phone'] ?? '', 30);
$email = strtolower(clean_text($payload['email'] ?? '', 180));
$company = clean_text($payload['company'] ?? '', 100);
$service = clean_text($payload['service'] ?? '', 100);
$budget = clean_text($payload['budget'] ?? '', 100);
$message = clean_message($payload['message'] ?? '', 3000);
$source = clean_text($payload['source'] ?? '', 50);
$website = clean_text($payload['website'] ?? '', 200);
$startedAt = filter_var($payload['startedAt'] ?? null, FILTER_VALIDATE_INT);

if ($website !== '') {
    respond(['success' => true]); // Honeypot: do not reveal detection.
}

$nowMs = (int) round(microtime(true) * 1000);
if ($startedAt === false || $startedAt <= 0 || ($nowMs - $startedAt) < 2500 || ($nowMs - $startedAt) > 10800000) {
    respond(['success' => false, 'message' => 'Please refresh the page and submit the form again.'], 400);
}

if (text_length($name) < 2 || !preg_match("/^[\\p{L}\\p{M} .'-]+$/u", $name)) {
    respond(['success' => false, 'message' => 'Please enter a valid name.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 180) {
    respond(['success' => false, 'message' => 'Please enter a valid email address.'], 400);
}

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if (!preg_match('/^[+()\-\s\d]+$/', $phone) || strlen($phoneDigits) < 8 || strlen($phoneDigits) > 15) {
    respond(['success' => false, 'message' => 'Please enter a valid phone number.'], 400);
}

$allowedServices = [
    'Website Development',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud Solutions',
    'AI & Digital Transformation',
    'IT Consulting',
    'Digital Marketing',
    'Other',
];

if (!in_array($service, $allowedServices, true)) {
    respond(['success' => false, 'message' => 'Please select a valid service.'], 400);
}

// if (text_length($message) < 10) {
//     respond(['success' => false, 'message' => 'Please provide a little more information about your requirement.'], 400);
// }

if (!rate_limit('ip:' . client_ip(), 4, 900) || !rate_limit('email:' . $email, 3, 3600)) {
    respond(['success' => false, 'message' => 'Too many requests. Please try again later.'], 429);
}

$subject = header_safe('New MITOMS consultation request - ' . $service);
$replyTo = header_safe($email);
$toEmail = header_safe(CONSULTATION_TO_EMAIL);
$fromEmail = header_safe(FROM_EMAIL);
$fromName = header_safe(FROM_NAME);

$leadBody = implode("\n", [
    'New consultation request',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . $phone,
    'Company: ' . ($company !== '' ? $company : 'Not provided'),
    'Service: ' . $service,
    'Budget: ' . ($budget !== '' ? $budget : 'Not provided'),
    'Source: ' . ($source !== '' ? $source : 'Website'),
    '',
    'Message:',
    $message,
    '',
    'Submitted: ' . date(DATE_RFC2822),
    'IP: ' . client_ip(),
]);

$leadHeaders = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $replyTo,
    'Cc: ' . implode(', ', CONSULTATION_CC_EMAILS),
    'X-Mailer: PHP/' . PHP_VERSION,
];

$leadSent = @mail($toEmail, $subject, $leadBody, implode("\r\n", $leadHeaders));
if (!$leadSent) {
    error_log('MITOMS consultation email could not be sent.');
    respond(['success' => false, 'message' => 'We could not send your request. Please try again or email sales@mitoms.com.'], 500);
}

$confirmationSubject = 'We received your consultation request - MITOMS';
$confirmationBody = implode("\n", [
    'Hello ' . $name . ',',
    '',
    'Thank you for contacting MITOMS.',
    'We received your request regarding ' . $service . '.',
    'Our team will review the details and contact you within one business day.',
    '',
    'Your message:',
    $message,
    '',
    'Regards,',
    'MITOMS Team',
]);
$confirmationHeaders = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $toEmail,
    'X-Mailer: PHP/' . PHP_VERSION,
];
$confirmationSent = @mail($email, $confirmationSubject, $confirmationBody, implode("\r\n", $confirmationHeaders));

respond(['success' => true, 'confirmationSent' => $confirmationSent]);
