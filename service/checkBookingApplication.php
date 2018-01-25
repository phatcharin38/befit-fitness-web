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
    $date = $data->date;
    $id = $data->id;
    $type = $data->type;
    $code = $data->code;
    $time = $data->time;

    $sql = "SELECT booking.id,booking.id_mem,booking.status FROM booking,type_equipment  ".
            "WHERE booking.type_equipment = type_equipment.id  ".
            "AND type_equipment.name = '".$type."'  ".
            "AND booking.code_fitness = '".$code."'  ".
            "AND booking.id_equipment = '".$id."'  ".
            "AND booking.booking_date = '".$date."'  ".
            "AND booking.status IN ('booking','running') ".
            "AND '".$time."' BETWEEN booking.time_start AND booking.time_end";

    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
   
    if($result){
        if ($result->num_rows > 0) {
            $outp = json_encode(array("result"=>"SUCCESS","data"=>$result->fetch_all(MYSQLI_ASSOC)));
        }else{
            $outp = json_encode(array("result"=>"EMPTY","data"=>$result->fetch_all(MYSQLI_ASSOC)));
        }
    }else{
        $outp = json_encode(array("result"=>"ERROR",));
    }
    echo $outp;
    $conn->close();
?>