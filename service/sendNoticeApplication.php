<?php
require ("config.php");
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    $data = json_decode($_GET["data"], false);
    $response = "";
    $id = $data->id;
    $text = $data->text;

    $sql = "INSERT INTO problem(code,text,status)VALUES('".$id."','".$text."','SEND')";

    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);

    if($result){
        $response = "SUCCESS";
    }else{
        $response = "ERROR";
    }
    echo json_encode($response);
    $conn->close();
?>