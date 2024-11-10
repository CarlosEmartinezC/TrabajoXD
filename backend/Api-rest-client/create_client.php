<?php
require_once('../includes/client.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Mostrar los datos recibidos para depuración
    echo '<pre>';
    print_r($_POST);
    echo '</pre>';

    if (isset($_POST['email']) && isset($_POST['name']) && isset($_POST['number_id']) &&
        isset($_POST['telephone']) && isset($_POST['type_identification'])) {

        // Llamar al método para crear un cliente
        $result = Client::crear_client(
            $_POST['type_identification'],
            $_POST['number_id'],
            $_POST['name'],
            $_POST['telephone'],
            $_POST['email']
        );

        // Verificar resultado y enviar respuesta
        if ($result) {
            echo "El cliente ha sido creado exitosamente.";
        } else {
            echo "Error al crear el cliente.";
        }
    } else {
        echo "Datos incompletos.";
    }
} else {
    echo "Método de solicitud no permitido.";
}

