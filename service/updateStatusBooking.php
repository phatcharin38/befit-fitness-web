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

    

    $outp = array();
    $data = json_decode($_GET["data"], false);  
    $id = $data->id;
    $status = $data->status;
    
    mysqli_query($conn,"set NAMES utf8");
    $sql = "UPDATE booking  ".
            "SET status = '".$status."' ".
            "WHERE id = ".$id;

    $result = mysqli_query($conn,$sql);
    if($result){
        $sql2 = "SELECT * FROM booking  ".
            "WHERE id = ".$id;
        $result2 = mysqli_query($conn,$sql2);
        while($row2 = mysqli_fetch_array($result2)) {
            array_push($outp,['result' =>  'SUCCESS','timeE' => $row2['time_end']]);
        }
    }else{
        array_push($outp,['result' =>  'ERROR']);
    }

    echo json_encode($outp);
    $conn->close();
?>