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
    $date = $data->date;
    $code = $data->code;
    $id = $data->id;
    $type = $data->type;
    $member = $data->member;

    mysqli_query($conn,"set NAMES utf8");

    $sql2 = "SELECT * FROM type_equipment WHERE name = '".$type."'";

    $result = mysqli_query($conn,$sql2);

    while($row = $result->fetch_assoc()) {
        $sql = "INSERT INTO booking(id_equipment,type_equipment,booking_date,status,id_mem,code_fitness)VALUES('".$id."','".$row["id"]."','".$date."','scan','".$member."','".$code."')";

        $result2 = mysqli_query($conn,$sql);
    }

    

    

    if($result2){
        $response = "SUCCESS";
    }else{
        $response = "ERROR";
    }
    echo json_encode($response);
    $conn->close();
?>