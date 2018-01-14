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
    $response = "";
    if (isset($_GET["data"])) {

        $data = json_decode($_GET["data"], false);
        $member = $data->member;
        $pincode = $data->pincode;

        mysqli_query($conn,"set NAMES utf8");
        $sql = "SELECT COUNT(*) AS count FROM member WHERE pincode = '".$pincode."' AND id_member = '".$member."'";
        $result = mysqli_query($conn,$sql);

     if($result){

     	while($row = mysqli_fetch_array($result)) {
           if($row['count'] > 0){
				$response = "SUCCESS";
           }else{
				$response = "ERROR";
           }
     	}
        
     }else{
        $response = "ERROR";
     }

    }else{
        $response = "ERROR";
    }

    echo json_encode(array("result" => "".$response));
    $conn->close();
?>