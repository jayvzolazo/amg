<?php

class Database {
    var $host;
    var $user;
    var $pass;
    var $db;
    var $conn;
    
    function _config(){
        $this->host = 'localhost';
        $this->user = 'amguser';
        $this->pass = '6u4rdi4ns';
        $this->db = 'guardians';
        
        $this->conn = new PDO("mysql:host={$this->host};dbname={$this->db}", $this->user, $this->pass);
        
        return $this->conn;
    }
}