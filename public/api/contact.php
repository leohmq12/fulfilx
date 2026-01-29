<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  header("Content-Type: application/json");
  echo json_encode(["ok" => false, "error" => "Method not allowed"]);
  exit();
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
$email = isset($data["email"]) ? trim($data["email"]) : "";

if ($email === "") {
  http_response_code(400);
  header("Content-Type: application/json");
  echo json_encode(["ok" => false, "error" => "email is required"]);
  exit();
}

$payload = [
  "email" => $email,
  "firstName" => isset($data["firstName"]) ? trim($data["firstName"]) : "",
  "lastName" => isset($data["lastName"]) ? trim($data["lastName"]) : "",
  "phone" => isset($data["phone"]) ? trim($data["phone"]) : "",
  "company" => isset($data["company"]) ? trim($data["company"]) : "",
  "position" => isset($data["position"]) ? trim($data["position"]) : "",
  "comments" => isset($data["comments"]) ? trim($data["comments"]) : "",
  "message" => isset($data["message"]) ? trim($data["message"]) : "",
  "source" => isset($data["source"]) ? $data["source"] : "contact-page",
];

$ch = curl_init("https://fulfil-crm--nazstudios.replit.app/api/webhooks/website");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "X-API-Key: web_b4281fc9a2de0d11c024bdd243ccc8af845ba5477cc136ce",
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$responseBody = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status < 200 || $status >= 300) {
  http_response_code(502);
  header("Content-Type: application/json");
  echo json_encode(["ok" => false, "error" => $responseBody ? $responseBody : "Upstream error"]);
  exit();
}

header("Content-Type: application/json");
echo json_encode(["ok" => true]);
