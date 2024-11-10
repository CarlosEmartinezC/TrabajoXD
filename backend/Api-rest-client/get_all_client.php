<?php
require_once('../includes/client.class.php');
require_once('../includes/config/config.php'); // Incluir las credenciales
require_once('../includes/config/Respuestas.php'); // Incluir las respuestas

$respuestas = new respuestas();

// Función para verificar las credenciales
function authenticate() {
    if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
        return false;
    }
    return $_SERVER['PHP_AUTH_USER'] === API_USER && $_SERVER['PHP_AUTH_PW'] === API_PASSWORD;
}

// Verificar autenticación
if (!authenticate()) {
    header('Content-Type: application/json');
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode($respuestas->error_401("Autenticación requerida"));
    exit;
}

// Si la autenticación es exitosa, ejecutar el método get_all_clients
$clientList = Client::get_all_clients();

if ($clientList !== false) {
    header('Content-Type: application/json');
    echo $clientList; // Los resultados ya se imprimen en JSON desde la función
} else {
    header('Content-Type: application/json');
    echo json_encode($respuestas->error_500("Error al consultar los clientes"));
}


