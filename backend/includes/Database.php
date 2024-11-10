<?php
class Database {
    private $server = '127.0.0.1:3306';
    private $user = 'root';
    private $password = '';
    private $database = 'hotel_db';

    public function getConnection() {
        $hostDB = "mysql:host=".$this->server.";dbname=".$this->database.";charset=utf8";

        try {
            $connection = new PDO($hostDB, $this->user, $this->password);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $connection->exec("set names utf8");
            return $connection;
        } catch (PDOException $e) {
            die("ERROR: ".$e->getMessage());
        }
    }
}

