<?php

//function connect(){
//    //connect to db
//    $servername = "43.250.142.105";
//    $username = "gacdamia_admin";
//    $password = "W{!utsGt!M_f";
//    $dbname="gacdamia_db";
//
//    try {
//        $conn = new PDO("mysql:host=$servername;", $username, $password);
//        // set the PDO error mode to exception
//        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//        echo "Connected successfully";
//
//    } catch(PDOException $e) {
//        echo "Connection failed: " . $e->getMessage();
//    }
//}


function request_a_coffee(){
    $servername = "43.250.142.105";
    $username = "gacdamia_admin";
    $password = "W{!utsGt!M_f";
    $dbname="gacdamia_db";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO users (user_id, name ) VALUES (4, 'Doe')";
        // use exec() because no results are returned
        $conn->exec($sql);
        echo "New record created successfully";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;

}

request_a_coffee();



//store user_id, name, timestamp

//check db for any users in the last 10mins

//if match then notify

//no match in 10mins no match/retry



