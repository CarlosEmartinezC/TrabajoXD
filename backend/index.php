<?php
    require_once "includes/Database.php";
    require_once "includes/client.class.php";
    $conexion = new Database;
    $clientlist = Client::get_all_clients();

