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


    mysqli_query($conn,"set NAMES utf8");

   
    $sql = "SELECT fitness.code_fitness FROM fitness";
    $result = mysqli_query($conn,$sql);
    // $outp = '[';
    $outp = array();
    while($row = $result->fetch_assoc()) {
        $sql2 = "SELECT SUM(ratingpoint.point) as count FROM ratingpoint  ".
                "WHERE ratingpoint.code_fitness = '".$row['code_fitness']."'";
        $result2 = mysqli_query($conn,$sql2);
        while($row2 = $result2->fetch_assoc()) {
            $star = 0;
            if($row2['count'] >= 0 && $row2['count'] < 10){
                $star = [];
            }else if($row2['count'] >= 10 && $row2['count'] < 20){
                $star = [1];
            }else if($row2['count'] >= 20 && $row2['count'] < 30){
                $star = [1,2];
            }else if($row2['count'] >= 30 && $row2['count'] < 40){
                $star = [1,2,3];
            }else if($row2['count'] >= 40 && $row2['count'] < 50){
                $star = [1,2,3,4];
            }else if($row2['count'] >= 50){
                $star = [1,2,3,4,5];;
            }
            array_push($outp,['id' => $row['code_fitness'],'sum' => $star]);
        }
    }
    // $outp .= ']';


    echo json_encode($outp);
    $conn->close();
?>