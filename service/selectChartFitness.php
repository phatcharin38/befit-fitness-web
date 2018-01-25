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
    mysqli_query($conn,"set NAMES utf8");

   
    $sql = "SELECT DISTINCT(fitness.code_fitness),fitness.name_fitness FROM fitness,booking  ".
            "WHERE fitness.code_fitness = booking.code_fitness  ".
            "AND booking.id_mem = '".$member."' ";
    $result = mysqli_query($conn,$sql);
    // $outp = '[';
    $outp = array();
    while($row = $result->fetch_assoc()) {
        $sql2 = "SELECT Count(booking.id) as count FROM booking ".
                "WHERE booking.id_mem = '".$member."' ".
                "AND booking.code_fitness = '".$row['code_fitness']."'";
        $result2 = mysqli_query($conn,$sql2);
        while($row2 = $result2->fetch_assoc()) {
            array_push($outp,['id' => $row['code_fitness'],'name' => $row['name_fitness'],'count' => $row2['count']]);
        }
    }
    // $outp .= ']';


    echo json_encode($outp);
    $conn->close();
?>