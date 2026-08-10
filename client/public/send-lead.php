<?php
/**
 * Lead form handler for metron.ae
 *
 * Receives the enquiry form POST from the homepage and emails it to the
 * sales inbox. Returns JSON so the front-end can show success/failure.
 *
 * Deliverability note: the From address MUST be a metron.ae address, not the
 * visitor's. Sending "as" the visitor fails SPF/DMARC and the mail silently
 * disappears. The visitor's address goes in Reply-To instead, so hitting
 * Reply in the inbox still replies to them.
 */

header('Content-Type: application/json; charset=utf-8');

const RECIPIENT   = 'info@metron.ae';
const FROM_HEADER = 'Metron Website <noreply@metron.ae>';

function fail(string $message, int $status = 400): void {
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Method not allowed.', 405);
}

/* Strip CR/LF so submitted values can never inject extra mail headers. */
function clean(string $value): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value));
}

$name        = clean($_POST['name'] ?? '');
$email       = clean($_POST['email'] ?? '');
$company     = clean($_POST['company'] ?? '');
$projectType = clean($_POST['project'] ?? '');
$message     = trim($_POST['message'] ?? '');   // newlines are fine in the body
$honeypot    = trim($_POST['website'] ?? '');   // hidden field; humans leave it empty

/* Silently accept and discard bot submissions. */
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

if ($name === '' || $email === '' || $message === '') {
    fail('Please fill in your name, email address, and project details.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('Please enter a valid email address.');
}
if (mb_strlen($message) > 5000) {
    fail('Your message is too long. Please keep it under 5000 characters.');
}

$subject = 'Website enquiry' . ($projectType !== '' ? ' - ' . ucfirst($projectType) : '');

$body = "New enquiry from the metron.ae website\n"
      . str_repeat('-', 46) . "\n\n"
      . "Name:         " . $name . "\n"
      . "Email:        " . $email . "\n"
      . "Company:      " . ($company !== '' ? $company : '(not provided)') . "\n"
      . "Project type: " . ($projectType !== '' ? ucfirst($projectType) : '(not provided)') . "\n\n"
      . "Project details:\n" . $message . "\n\n"
      . str_repeat('-', 46) . "\n"
      . "Submitted: " . date('Y-m-d H:i:s') . "\n"
      . "IP:        " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

/* Encode the display name so non-ASCII names don't corrupt the header. */
$replyName = mb_encode_mimeheader($name, 'UTF-8');

$headers = implode("\r\n", [
    'From: ' . FROM_HEADER,
    'Reply-To: ' . $replyName . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: metron.ae lead form',
]);

$sent = @mail(
    RECIPIENT,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    $headers,
    '-f noreply@metron.ae'
);

/*
 * Safety net: if the mail server rejects or is misconfigured, keep the lead on
 * disk rather than losing it. Written outside the web root so it is never
 * publicly readable.
 */
if (!$sent) {
    $logDir = __DIR__ . '/../private';
    if (is_dir($logDir) && is_writable($logDir)) {
        @file_put_contents(
            $logDir . '/lead-submissions.log',
            "==== " . date('Y-m-d H:i:s') . " (mail send FAILED) ====\n" . $body . "\n",
            FILE_APPEND | LOCK_EX
        );
    }
    fail('We could not send your message right now. Please email us directly at ' . RECIPIENT . '.', 500);
}

echo json_encode(['ok' => true]);
