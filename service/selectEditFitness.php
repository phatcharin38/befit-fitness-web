<?php
require ("config.php");
    $response = 0;
    $id = $_GET['id'];

    $sql = "SELECT * FROM fitness WHERE id = ".$id;
    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
   
    // $myObj->id = $result[0]['id'];
    // $myObj->code = $result[0]['code_fitness'];
    // $myObj->name = $result[0]['name_fitness'];   
    // $myObj->address = $result[0]['address_fitness'];   
    // $myObj->open = $result[0]['open_fitness'];   
    // $myObj->admin = $result[0]['admin_fitness'];        
    // $response = json_encode($myObj);

    // echo $result;
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>