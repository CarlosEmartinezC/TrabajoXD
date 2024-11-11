<?php
    require_once "includes/Database.php";
    require_once "includes/client.class.php";
    require_once "includes/ServicesandHabitation.php";
    // Encabezados CORS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept");
    $conexion = new Database;
    
