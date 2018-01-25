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
    $member = $data->member;
    $year = $data->year;
    mysqli_query($conn,"set NAMES utf8");

    $outp = array();
    $arrayMonth = array();
    array_push($arrayMonth,['start' => $year.'-01-01','end' => $year.'-01-31']);//1
    array_push($arrayMonth,['start' => $year.'-02-01','end' => $year.'-02-29']);//2
    array_push($arrayMonth,['start' => $year.'-03-01','end' => $year.'-03-31']);//3
    array_push($arrayMonth,['start' => $year.'-04-01','end' => $year.'-04-30']);//4
    array_push($arrayMonth,['start' => $year.'-05-01','end' => $year.'-05-31']);//5
    array_push($arrayMonth,['start' => $year.'-06-01','end' => $year.'-06-30']);//6
    array_push($arrayMonth,['start' => $year.'-07-01','end' => $year.'-07-31']);//7
    array_push($arrayMonth,['start' => $year.'-08-01','end' => $year.'-08-31']);//8
    array_push($arrayMonth,['start' => $year.'-09-01','end' => $year.'-09-30']);//9
    array_push($arrayMonth,['start' => $year.'-10-01','end' => $year.'-10-31']);//10
    array_push($arrayMonth,['start' => $year.'-11-01','end' => $year.'-11-30']);//11
    array_push($arrayMonth,['start' => $year.'-12-01','end' => $year.'-12-31']);//12

    $i = 0;
    foreach ($arrayMonth as $value) {

        $sql = "SELECT Count(DISTINCT(booking.booking_date)) as count FROM booking  ".
            "WHERE booking.id_mem = '".$member."' ".
            "AND booking.booking_date BETWEEN '".$arrayMonth[$i]['start']."' AND '".$arrayMonth[$i]['end']."' ".
            "ORDER BY booking.booking_date ASC ";
        $result = mysqli_query($conn,$sql);
        while($row = $result->fetch_assoc()) {
            array_push($outp,['id' =>  $i + 1,'count' => $row['count']]);
        }
        $i = $i + 1;
    }
       
    echo json_encode($outp);
    $conn->close();
?>