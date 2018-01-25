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

    $codeFitness = $_GET['codeFitness'];
    $sql = "SELECT T.*,E.* FROM type_equipment T,equipment E WHERE T.id = E.type_equipment AND E.code_fitness = ".$codeFitness." ORDER BY T.name ASC";
    $result = mysqli_query($conn,"set NAMES utf8");
    $result = mysqli_query($conn,$sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
    $conn->close();
?>