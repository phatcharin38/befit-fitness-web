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
    $response = 0;
    $id = $data->member;
    $date = $data->date;

    $sql = "SELECT booking.* ,fitness.name_fitness,type_equipment.image,type_equipment.name FROM booking,fitness,type_equipment ".
            "WHERE booking.code_fitness = fitness.code_fitness ".
            "AND type_equipment.id = booking.type_equipment ".
            "AND booking.id_mem = '".$id."' ".
            "AND booking.booking_date = '".$date."' ORDER BY booking.time_start ASC";

    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>