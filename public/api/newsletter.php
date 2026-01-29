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
  "name" => isset($data["name"]) ? $data["name"] : "",
  "source" => isset($data["source"]) ? $data["source"] : "footer",
];

$ch = curl_init("https://fulfil-crm--nazstudios.replit.app/api/webhooks/newsletter");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "X-API-Key: nws_656be6e3243a33ab05ad56f186fef924858d8798af72b8dc",
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
